# Struttura Directory FrameFlow

## Root Structure
```
/
├── src/                        # Codice sorgente principale
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Route group autenticazione
│   │   │   ├── forgot-password/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/           # Componenti React
│   │   ├── auth/            # Componenti autenticazione
│   │   │   └── auth-form.tsx
│   │   └── ui/              # Componenti UI base
│   │       ├── layout/     # Layout components
│   │       │   ├── main-nav.tsx
│   │       │   └── user-nav.tsx
│   │       ├── button.tsx
│   │       ├── icons.tsx
│   │       ├── mode-toggle.tsx
│   │       └── navigation-menu.tsx
│   ├── lib/                # Utility e configurazioni
│   │   ├── auth/          # Utility autenticazione
│   │   │   └── utils.ts
│   │   └── supabase/      # Client e utility Supabase
│   │       ├── client.ts
│   │       ├── config.ts
│   │       └── utils.ts
│   └── types/             # TypeScript type definitions
│       ├── supabase.ts
│       └── middleware.ts
├── supabase/               # Configurazione Supabase
├── .gitignore
├── .windsurfrules
├── db_structure.md
├── directory_structure.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── postcss.config.js
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## /public Directory
```
public/
├── images/                # Immagini statiche
├── icons/                # Icone
└── fonts/                # Font
```

## Convenzioni di Naming

### File e Directory
- Components React: PascalCase (es. `MainNav.tsx`)
- Utility e Config: camelCase (es. `utils.ts`, `config.ts`)
- Route Pages: `page.tsx`
- Route Handlers: `route.ts`
- File di Configurazione: kebab-case (es. `next-env.d.ts`)
- File di Documentazione: UPPERCASE (es. `README.md`)

### Struttura delle Route
- Group Routes: parentesi () es. `(auth)`
- API Routes: snake_case
- Dynamic Routes: [paramName]

### Organizzazione Componenti
- Layout Components: `/components/ui/layout/`
- UI Components: `/components/ui/`
- Feature Components: `/components/[feature]/`

### Utility e Configurazione
- Supabase Utils: `/lib/supabase/`
- Auth Utils: `/lib/auth/`
- Types: `/types/`

## Note Importanti
- Mantenere la struttura piatta dove possibile
- Raggruppare componenti correlati in cartelle dedicate
- Separare chiaramente UI components da feature components
- Mantenere le configurazioni al root level
- Documentazione sempre aggiornata in MD files