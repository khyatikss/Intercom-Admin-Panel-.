"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { ConversationsView } from "@/components/conversations-view"
import { CustomersView } from "@/components/customers-view"
import { AnalyticsView } from "@/components/analytics-view"
import { SettingsView } from "@/components/settings-view"
import { InboxView } from "@/components/inbox-view"

type ViewType = "inbox" | "conversations" | "customers" | "analytics" | "settings"

export function DashboardPage() {
  const [currentView, setCurrentView] = useState<ViewType>("inbox")

  return (
    <DashboardShell currentView={currentView} onViewChange={setCurrentView}>
      {currentView === "inbox" && <InboxView />}
      {currentView === "conversations" && <ConversationsView />}
      {currentView === "customers" && <CustomersView />}
      {currentView === "analytics" && <AnalyticsView />}
      {currentView === "settings" && <SettingsView />}
    </DashboardShell>
  )
}
