"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Download, Filter, MoreHorizontal, Plus, Search, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

interface Customer {
  id: string
  name: string
  email: string
  company?: string
  status: "active" | "inactive" | "new"
  lastActive: string
  conversations: number
  location?: string
  browser?: string
  os?: string
  firstSeen: string
  avatar?: string
  initials: string
}

const customers: Customer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    company: "Acme Inc.",
    status: "active",
    lastActive: "2 minutes ago",
    conversations: 3,
    location: "New York, USA",
    browser: "Chrome",
    os: "Windows",
    firstSeen: "Jan 15, 2023",
    initials: "SJ",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    company: "TechGrowth",
    status: "active",
    lastActive: "1 hour ago",
    conversations: 7,
    location: "San Francisco, USA",
    browser: "Firefox",
    os: "macOS",
    firstSeen: "Mar 3, 2023",
    initials: "MC",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    company: "Wilson Enterprises",
    status: "inactive",
    lastActive: "2 weeks ago",
    conversations: 2,
    location: "London, UK",
    browser: "Safari",
    os: "iOS",
    firstSeen: "Nov 20, 2022",
    initials: "EW",
  },
  {
    id: "4",
    name: "James Rodriguez",
    email: "james.r@example.com",
    company: "Global Solutions",
    status: "active",
    lastActive: "3 days ago",
    conversations: 5,
    location: "Toronto, Canada",
    browser: "Edge",
    os: "Windows",
    firstSeen: "Feb 8, 2023",
    initials: "JR",
  },
  {
    id: "5",
    name: "Olivia Kim",
    email: "olivia.k@example.com",
    company: "Fashion Forward",
    status: "new",
    lastActive: "Just now",
    conversations: 1,
    location: "Seoul, South Korea",
    browser: "Chrome",
    os: "Android",
    firstSeen: "May 1, 2023",
    initials: "OK",
  },
  {
    id: "6",
    name: "David Müller",
    email: "david.m@example.com",
    company: "Müller GmbH",
    status: "active",
    lastActive: "5 hours ago",
    conversations: 4,
    location: "Berlin, Germany",
    browser: "Chrome",
    os: "Windows",
    firstSeen: "Dec 12, 2022",
    initials: "DM",
  },
]

export function CustomersView() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false)
  const isMobile = useMobile()

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.company && customer.company.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchesSearch) return false

    if (activeTab === "all") return true
    if (activeTab === "active") return customer.status === "active"
    if (activeTab === "inactive") return customer.status === "inactive"
    if (activeTab === "new") return customer.status === "new"

    return true
  })

  // Handle customer selection
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    if (isMobile) {
      setIsMobileDetailOpen(true)
    }
  }

  // Handle back button in mobile view
  const handleBackToList = () => {
    setIsMobileDetailOpen(false)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Customer List - Hide on mobile when detail is open */}
      <div className={cn("lg:col-span-2", isMobile && isMobileDetailOpen ? "hidden" : "block")}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Customers</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-[#3e63dd] hover:bg-[#3a5ccc]">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Last Active</TableHead>
                  <TableHead className="hidden md:table-cell">Conversations</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="cursor-pointer" onClick={() => handleSelectCustomer(customer)}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={customer.avatar || "/placeholder.svg?height=40&width=40"}
                            alt={customer.name}
                          />
                          <AvatarFallback>{customer.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">{customer.email}</div>
                          <div className="md:hidden flex items-center gap-1 mt-1">
                            <Badge
                              variant={
                                customer.status === "active"
                                  ? "default"
                                  : customer.status === "new"
                                    ? "outline"
                                    : "secondary"
                              }
                              className={cn(
                                "text-xs",
                                customer.status === "active" && "bg-green-500",
                                customer.status === "new" && "border-blue-200 bg-blue-50 text-blue-600",
                              )}
                            >
                              {customer.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{customer.lastActive}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={
                          customer.status === "active" ? "default" : customer.status === "new" ? "outline" : "secondary"
                        }
                        className={cn(
                          customer.status === "active" && "bg-green-500",
                          customer.status === "new" && "border-blue-200 bg-blue-50 text-blue-600",
                        )}
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{customer.lastActive}</TableCell>
                    <TableCell className="hidden md:table-cell">{customer.conversations}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit customer</DropdownMenuItem>
                          <DropdownMenuItem>Start conversation</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Customer Detail - Show on mobile only when detail is open */}
      <div
        className={cn(
          "lg:col-span-1",
          isMobile && !isMobileDetailOpen ? "hidden" : "block",
          "transition-all duration-300 ease-in-out",
        )}
      >
        {selectedCustomer ? (
          <Card>
            <CardHeader className="pb-3">
              {isMobile && (
                <Button variant="ghost" size="sm" onClick={handleBackToList} className="mb-2 -ml-2">
                  <ChevronDown className="h-4 w-4 -rotate-90 mr-1" />
                  Back to customers
                </Button>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedCustomer.avatar || "/placeholder.svg?height=40&width=40"}
                      alt={selectedCustomer.name}
                    />
                    <AvatarFallback>{selectedCustomer.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedCustomer.name}</CardTitle>
                    <CardDescription>{selectedCustomer.email}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit customer</DropdownMenuItem>
                    <DropdownMenuItem>Start conversation</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Add tag</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Company</div>
                  <div className="font-medium">{selectedCustomer.company || "—"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div>
                    <Badge
                      variant={
                        selectedCustomer.status === "active"
                          ? "default"
                          : selectedCustomer.status === "new"
                            ? "outline"
                            : "secondary"
                      }
                      className={cn(
                        selectedCustomer.status === "active" && "bg-green-500",
                        selectedCustomer.status === "new" && "border-blue-200 bg-blue-50 text-blue-600",
                      )}
                    >
                      {selectedCustomer.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium">{selectedCustomer.location || "—"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Conversations</div>
                  <div className="font-medium">{selectedCustomer.conversations}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Activity</div>
                <div className="rounded-md bg-muted p-3 space-y-3">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="space-y-1">
                      <div className="text-sm">First seen</div>
                      <div className="text-sm text-muted-foreground">{selectedCustomer.firstSeen}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="space-y-1">
                      <div className="text-sm">Last active</div>
                      <div className="text-sm text-muted-foreground">{selectedCustomer.lastActive}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Browser Information</div>
                <div className="rounded-md bg-muted p-3 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div className="text-sm">Browser</div>
                      <div className="text-sm text-muted-foreground">{selectedCustomer.browser || "—"}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm">OS</div>
                      <div className="text-sm text-muted-foreground">{selectedCustomer.os || "—"}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-[#3e63dd] hover:bg-[#3a5ccc]">Start Conversation</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <User className="h-10 w-10 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No customer selected</h3>
              <p className="text-muted-foreground">Select a customer from the list to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
