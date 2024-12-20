'use client'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { ClientOverview } from '@/components/dashboard/client/overview'

export default function ClientDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard Cliente"
        text="Visualizza e approva preventivi, monitora lo stato degli ordini"
      />
      <ClientOverview />
    </DashboardShell>
  )
}
