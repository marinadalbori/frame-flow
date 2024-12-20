'use client'

import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { InstallerOverview } from '@/components/dashboard/installer/overview'

export default function InstallerDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard Installatore"
        text="Gestisci preventivi, ordini e calcoli dimensionali"
      />
      <InstallerOverview />
    </DashboardShell>
  )
}
