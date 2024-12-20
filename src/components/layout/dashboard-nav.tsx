'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const supplierRoutes = [
  {
    title: "Overview",
    href: "/supplier",
    icon: "dashboard"
  },
  {
    title: "Prodotti",
    href: "/supplier/products",
    icon: "package"
  },
  {
    title: "Profili",
    href: "/supplier/profiles",
    icon: "ruler"
  },
  {
    title: "Regole Dimensionali",
    href: "/supplier/rules",
    icon: "calculator"
  }
]

const installerRoutes = [
  {
    title: "Overview",
    href: "/installer",
    icon: "dashboard"
  },
  {
    title: "Preventivi",
    href: "/installer/quotes",
    icon: "file-text"
  },
  {
    title: "Ordini",
    href: "/installer/orders",
    icon: "shopping-cart"
  },
  {
    title: "Calcoli",
    href: "/installer/calculator",
    icon: "calculator"
  }
]

const clientRoutes = [
  {
    title: "Overview",
    href: "/client",
    icon: "dashboard"
  },
  {
    title: "Preventivi",
    href: "/client/quotes",
    icon: "file-text"
  },
  {
    title: "Ordini",
    href: "/client/orders",
    icon: "package"
  }
]

export function DashboardNav() {
  const pathname = usePathname()
  const role = pathname.split('/')[1] // Estrae il ruolo dall'URL

  const routes = {
    supplier: supplierRoutes,
    installer: installerRoutes,
    client: clientRoutes
  }[role] || []

  return (
    <nav className="grid items-start gap-2 p-4">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === route.href ? "bg-accent" : "transparent"
          )}
        >
          <span>{route.title}</span>
        </Link>
      ))}
    </nav>
  )
}
