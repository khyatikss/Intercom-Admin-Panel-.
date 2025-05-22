"use client"

import { useState } from "react"
import {
  Archive,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Star,
  Tag,
  User,
  MessageSquare,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface Conversation {
  id: string
  customer: {
    name: string
    email: string
    avatar?: string
    initials: string
  }
  subject: string
  preview: string
  date: string
  unread: boolean
  status: "open" | "closed"
  messages: {
    id: string
    sender: "customer" | "agent"
    content: string
    timestamp: string
    agentName?: string
    agentAvatar?: string
    agentInitials?: string
  }[]
}

const conversations: Conversation[] = [
  {
    id: "1",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      initials: "SJ",
    },
    subject: "Help with subscription",
    preview: "I'm having trouble with my subscription renewal...",
    date: "10:23 AM",
    unread: true,
    status: "open",
    messages: [
      {
        id: "m1",
        sender: "customer",
        content:
          "Hi there, I'm having trouble with my subscription renewal. It says my payment method is invalid but I've checked and everything seems correct. Can you help?",
        timestamp: "10:23 AM",
      },
    ],
  },
  {
    id: "2",
    customer: {
      name: "Michael Chen",
      email: "michael.c@example.com",
      initials: "MC",
    },
    subject: "Feature request",
    preview: "I was wondering if you could add a feature that...",
    date: "Yesterday",
    unread: false,
    status: "open",
    messages: [
      {
        id: "m1",
        sender: "customer",
        content:
          "I was wondering if you could add a feature that allows us to export data in CSV format? This would be really helpful for our reporting.",
        timestamp: "Yesterday",
      },
      {
        id: "m2",
        sender: "agent",
        content:
          "Hi Michael, thanks for reaching out! That's a great suggestion. We actually have this feature on our roadmap for the next quarter. I'll make a note of your request and let our product team know there's interest.",
        timestamp: "Yesterday",
        agentName: "Alex Rivera",
        agentInitials: "AR",
      },
      {
        id: "m3",
        sender: "customer",
        content: "That's great to hear! Looking forward to it. Is there any way to get early access when it's in beta?",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "3",
    customer: {
      name: "Emma Wilson",
      email: "emma.w@example.com",
      initials: "EW",
    },
    subject: "Billing question",
    preview: "I noticed an extra charge on my last invoice...",
    date: "2 days ago",
    unread: false,
    status: "closed",
    messages: [
      {
        id: "m1",
        sender: "customer",
        content:
          "I noticed an extra charge on my last invoice labeled 'Premium Add-on' but I don't recall signing up for this. Could you explain what this is?",
        timestamp: "2 days ago",
      },
    ],
  },
  {
    id: "4",
    customer: {
      name: "James Rodriguez",
      email: "james.r@example.com",
      initials: "JR",
    },
    subject: "Account access",
    preview: "I can't log into my account after changing my...",
    date: "3 days ago",
    unread: false,
    status: "open",
    messages: [
      {
        id: "m1",
        sender: "customer",
        content:
          "I can't log into my account after changing my password. I keep getting an 'invalid credentials' error even though I'm sure I'm using the right password.",
        timestamp: "3 days ago",
      },
    ],
  },
  {
    id: "5",
    customer: {
      name: "Olivia Kim",
      email: "olivia.k@example.com",
      initials: "OK",
    },
    subject: "Integration help",
    preview: "Do you have any documentation on how to integrate...",
    date: "1 week ago",
    unread: false,
    status: "closed",
    messages: [
      {
        id: "m1",
        sender: "customer",
        content:
          "Do you have any documentation on how to integrate your API with Shopify? I'm trying to set up automatic order syncing.",
        timestamp: "1 week ago",
      },
    ],
  },
]

export function ConversationsView() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [replyText, setReplyText] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isMobileConversationOpen, setIsMobileConversationOpen] = useState(false)
  const isMobile = useMobile()

  const filteredConversations = conversations.filter((conversation) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return conversation.unread
    if (activeTab === "open") return conversation.status === "open"
    if (activeTab === "closed") return conversation.status === "closed"
    return true
  })

  // Handle conversation selection
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    if (isMobile) {
      setIsMobileConversationOpen(true)
    }
  }

  // Handle back button in mobile view
  const handleBackToList = () => {
    setIsMobileConversationOpen(false)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Conversation List - Hide on mobile when conversation is open */}
      <div className={cn("lg:col-span-1", isMobile && isMobileConversationOpen ? "hidden" : "block")}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Conversations</h2>
          <Button size="sm" className="bg-[#3e63dd] hover:bg-[#3a5ccc]">
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCcw className="h-3.5 w-3.5" />
            Refresh
          </Button>
          <Input placeholder="Search conversations..." className="flex-1" />
        </div>

        <div className="space-y-2">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "cursor-pointer rounded-lg border p-3 transition-all hover:bg-muted/50 hover:shadow-sm",
                selectedConversation?.id === conversation.id && "bg-muted border-[#3e63dd]",
                conversation.unread && "border-l-4 border-l-[#3e63dd]",
              )}
              onClick={() => handleSelectConversation(conversation)}
            >
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage
                    src={conversation.customer.avatar || "/placeholder.svg?height=40&width=40"}
                    alt={conversation.customer.name}
                  />
                  <AvatarFallback>{conversation.customer.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{conversation.customer.name}</div>
                    <div className="text-xs text-muted-foreground">{conversation.date}</div>
                  </div>
                  <div className="text-sm font-medium">{conversation.subject}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{conversation.preview}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Detail - Show on mobile only when conversation is open */}
      <div
        className={cn(
          "lg:col-span-2",
          isMobile && !isMobileConversationOpen ? "hidden" : "block",
          "transition-all duration-300 ease-in-out",
        )}
      >
        {selectedConversation ? (
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              {isMobile && (
                <Button variant="ghost" size="sm" onClick={handleBackToList} className="mr-2">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                  <span className="sr-only">Back</span>
                </Button>
              )}
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  {selectedConversation.subject}
                  {selectedConversation.status === "open" ? (
                    <Badge variant="default" className="bg-green-500">
                      Open
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Closed</Badge>
                  )}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage
                      src={selectedConversation.customer.avatar || "/placeholder.svg?height=20&width=20"}
                      alt={selectedConversation.customer.name}
                    />
                    <AvatarFallback className="text-xs">{selectedConversation.customer.initials}</AvatarFallback>
                  </Avatar>
                  {selectedConversation.customer.name} ({selectedConversation.customer.email})
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Assign
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tag className="h-4 w-4 mr-2" />
                      Add tag
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="h-4 w-4 mr-2" />
                      Mark as priority
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Close conversation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="flex-1 overflow-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    message.sender === "customer" ? "mr-auto" : "ml-auto flex-row-reverse",
                  )}
                >
                  <Avatar className="h-8 w-8 mt-1">
                    {message.sender === "customer" ? (
                      <>
                        <AvatarImage
                          src={selectedConversation.customer.avatar || "/placeholder.svg?height=32&width=32"}
                          alt={selectedConversation.customer.name}
                        />
                        <AvatarFallback>{selectedConversation.customer.initials}</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage
                          src={message.agentAvatar || "/placeholder.svg?height=32&width=32"}
                          alt={message.agentName}
                        />
                        <AvatarFallback>{message.agentInitials}</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {message.sender === "customer"
                          ? selectedConversation.customer.name
                          : message.agentName || "You"}
                      </span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <div
                      className={cn(
                        "rounded-lg p-3 text-sm",
                        message.sender === "customer" ? "bg-muted" : "bg-[#3e63dd] text-white",
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="w-full space-y-3">
                <Textarea
                  placeholder="Type your reply..."
                  className="min-h-[100px] resize-none"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Add note
                    </Button>
                    <Button variant="outline" size="sm" className="hidden md:flex">
                      Canned responses
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                  <Button className="bg-[#3e63dd] hover:bg-[#3a5ccc]">Send reply</Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <MessageSquare className="h-10 w-10 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No conversation selected</h3>
              <p className="text-muted-foreground">Select a conversation from the list to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
