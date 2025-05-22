"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  ChevronDown,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

type ViewType = "inbox" | "conversations" | "customers" | "analytics" | "settings"

interface DashboardShellProps {
  children: React.ReactNode
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export function DashboardShell({ children, currentView, onViewChange }: DashboardShellProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const isMobile = useMobile()

  // Close mobile nav when switching to desktop
  useEffect(() => {
    if (!isMobile && isMobileNavOpen) {
      setIsMobileNavOpen(false)
    }
  }, [isMobile, isMobileNavOpen])

  const navItems = [
    {
      title: "Inbox",
      icon: Inbox,
      value: "inbox" as ViewType,
    },
    {
      title: "Conversations",
      icon: MessageSquare,
      value: "conversations" as ViewType,
    },
    {
      title: "Customers",
      icon: Users,
      value: "customers" as ViewType,
    },
    {
      title: "Analytics",
      icon: BarChart3,
      value: "analytics" as ViewType,
    },
    {
      title: "Settings",
      icon: Settings,
      value: "settings" as ViewType,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <Link href="#" className="flex items-center gap-2 font-semibold" onClick={(e) => e.preventDefault()}>
            <LayoutDashboard className="h-6 w-6 text-[#3e63dd]" />
            <span className="hidden md:inline text-[#3e63dd]">Intercom</span>
          </Link>
        </div>
        {!isMobile ? (
          <div className="relative flex-1 md:grow-0 md:basis-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
        ) : isSearchOpen ? (
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
            <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8" autoFocus />
            <Button variant="ghost" size="icon" className="ml-1 shrink-0" onClick={() => setIsSearchOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 ml-auto md:hidden"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Open search</span>
          </Button>
        )}
        <nav className="hidden gap-2 md:flex md:items-center">
          {navItems.map((item) => (
            <Button
              key={item.value}
              variant={currentView === item.value ? "default" : "ghost"}
              className={cn("text-sm font-medium", currentView === item.value ? "bg-[#3e63dd] hover:bg-[#3a5ccc]" : "")}
              onClick={() => onViewChange(item.value)}
            >
              {item.title}
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-4 md:gap-2 md:ml-auto">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full overflow-hidden h-8 w-8 aspect-square">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsMobileNavOpen(false)} />
      )}

      {/* Mobile Navigation Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[280px] bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-[#3e63dd]" />
            <span className="font-semibold text-[#3e63dd]">Intercom</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileNavOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.value}
              variant={currentView === item.value ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left",
                currentView === item.value ? "bg-[#3e63dd] hover:bg-[#3a5ccc]" : "",
              )}
              onClick={() => {
                onViewChange(item.value)
                setIsMobileNavOpen(false)
              }}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.title}
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  )
}
