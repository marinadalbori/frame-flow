'use client'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { SupplierOverview } from '@/components/dashboard/supplier/overview'

export default function SupplierDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard Fornitore"
        text="Gestisci i tuoi prodotti, profili e regole dimensionali"
      />
      <SupplierOverview />
    </DashboardShell>
  )
}
