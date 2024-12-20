-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create enum types
CREATE TYPE user_role AS ENUM ('supplier', 'installer', 'client');
CREATE TYPE quote_status AS ENUM ('draft', 'sent', 'approved', 'rejected');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL,
    full_name TEXT NOT NULL,
    company_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create suppliers table
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_details JSONB NOT NULL DEFAULT '{}',
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    specifications JSONB NOT NULL DEFAULT '{}',
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    specifications JSONB NOT NULL DEFAULT '{}',
    price_per_unit DECIMAL(10,2) NOT NULL CHECK (price_per_unit >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create window_types table
CREATE TABLE window_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    base_profiles JSONB[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create dimension_rules table
CREATE TABLE dimension_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    window_type_id UUID NOT NULL REFERENCES window_types(id) ON DELETE CASCADE,
    rule_name TEXT NOT NULL,
    formula TEXT NOT NULL,
    parameters JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create quotes table
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    installer_id UUID NOT NULL REFERENCES users(id),
    client_id UUID NOT NULL REFERENCES users(id),
    status quote_status NOT NULL DEFAULT 'draft',
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create quote_items table
CREATE TABLE quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    dimensions JSONB NOT NULL DEFAULT '{}',
    calculated_price DECIMAL(10,2) NOT NULL CHECK (calculated_price >= 0),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID NOT NULL REFERENCES quotes(id),
    status order_status NOT NULL DEFAULT 'pending',
    payment_status payment_status NOT NULL DEFAULT 'pending',
    shipping_details JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_quotes_installer ON quotes(installer_id);
CREATE INDEX idx_quotes_client ON quotes(client_id);
CREATE INDEX idx_quote_items_quote ON quote_items(quote_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at
    BEFORE UPDATE ON suppliers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_window_types_updated_at
    BEFORE UPDATE ON window_types
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dimension_rules_updated_at
    BEFORE UPDATE ON dimension_rules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
    BEFORE UPDATE ON quotes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quote_items_updated_at
    BEFORE UPDATE ON quote_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE window_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE dimension_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Users policies
CREATE POLICY "Users can view own data"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Anyone can view active products"
    ON products FOR SELECT
    USING (active = true);

CREATE POLICY "Suppliers can manage their products"
    ON products FOR ALL
    USING (
        supplier_id IN (
            SELECT id FROM suppliers WHERE user_id = auth.uid()
        )
    );

-- Quotes policies
CREATE POLICY "Installers can view their quotes"
    ON quotes FOR SELECT
    USING (installer_id = auth.uid());

CREATE POLICY "Clients can view their quotes"
    ON quotes FOR SELECT
    USING (client_id = auth.uid());

CREATE POLICY "Installers can create quotes"
    ON quotes FOR INSERT
    WITH CHECK (installer_id = auth.uid());

CREATE POLICY "Installers can update draft quotes"
    ON quotes FOR UPDATE
    USING (installer_id = auth.uid() AND status = 'draft');

-- Orders policies
CREATE POLICY "Related users can view orders"
    ON orders FOR SELECT
    USING (
        quote_id IN (
            SELECT id FROM quotes
            WHERE installer_id = auth.uid()
            OR client_id = auth.uid()
        )
    );