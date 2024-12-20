# Schema Database FrameFlow

## Tipi Enumerati

```sql
user_role: enum ('supplier', 'installer', 'client')
quote_status: enum ('draft', 'sent', 'approved', 'rejected')
order_status: enum ('pending', 'processing', 'shipped', 'delivered')
payment_status: enum ('pending', 'paid', 'failed')
```

## Tabelle

### users
```sql
id: UUID PRIMARY KEY
email: TEXT UNIQUE
role: user_role
full_name: TEXT
company_name: TEXT NULL
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### suppliers
```sql
id: UUID PRIMARY KEY
user_id: UUID -> users.id
company_details: JSONB
settings: JSONB
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### products
```sql
id: UUID PRIMARY KEY
supplier_id: UUID -> suppliers.id
name: TEXT
description: TEXT
category: TEXT
specifications: JSONB
price: DECIMAL(10,2)
active: BOOLEAN
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### profiles
```sql
id: UUID PRIMARY KEY
supplier_id: UUID -> suppliers.id
name: TEXT
type: TEXT
specifications: JSONB
price_per_unit: DECIMAL(10,2)
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### window_types
```sql
id: UUID PRIMARY KEY
supplier_id: UUID -> suppliers.id
name: TEXT
description: TEXT
base_profiles: JSONB[]
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### dimension_rules
```sql
id: UUID PRIMARY KEY
window_type_id: UUID -> window_types.id
rule_name: TEXT
formula: TEXT
parameters: JSONB
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### quotes
```sql
id: UUID PRIMARY KEY
installer_id: UUID -> users.id
client_id: UUID -> users.id
status: quote_status
total_amount: DECIMAL(10,2)
valid_until: TIMESTAMPTZ
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### quote_items
```sql
id: UUID PRIMARY KEY
quote_id: UUID -> quotes.id
product_id: UUID -> products.id
quantity: INTEGER
dimensions: JSONB
calculated_price: DECIMAL(10,2)
notes: TEXT
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### orders
```sql
id: UUID PRIMARY KEY
quote_id: UUID -> quotes.id
status: order_status
payment_status: payment_status
shipping_details: JSONB
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

## Indici e Vincoli

### Indici
- users.email (UNIQUE)
- products.supplier_id
- quotes.installer_id
- quotes.client_id
- quote_items.quote_id

### Check Constraints
- products.price >= 0
- profiles.price_per_unit >= 0
- quotes.total_amount >= 0
- quote_items.quantity > 0
- quote_items.calculated_price >= 0

## Row Level Security (RLS)

### users
- Read: self or admin
- Create: authenticated
- Update: self or admin
- Delete: admin only

### products
- Read: authenticated
- Create/Update/Delete: supplier only

### quotes
- Read: creator or client
- Create: installer only
- Update: creator only if status = 'draft'
- Delete: creator only if status = 'draft'

### orders
- Read: related supplier, installer, or client
- Create: system only on quote approval
- Update: supplier only for status updates

## Relazioni

### One-to-Many
- users -> suppliers
- suppliers -> products
- suppliers -> profiles
- suppliers -> window_types
- window_types -> dimension_rules
- quotes -> quote_items
- quotes -> orders

### Many-to-One
- products -> suppliers
- quotes -> users (installer)
- quotes -> users (client)
- quote_items -> quotes
- quote_items -> products
- orders -> quotes