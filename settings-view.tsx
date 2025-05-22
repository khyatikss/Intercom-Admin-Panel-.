"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Bell, Building, CreditCard, Globe, Lock, Mail, MessageSquare, Save, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function SettingsView() {
  const [activeTab, setActiveTab] = useState("general")
  const isMobile = useMobile()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className={cn("lg:w-1/5", isMobile && "overflow-x-auto")}>
            <TabsList
              className={cn(
                "flex w-full h-auto space-y-1 bg-transparent p-0",
                isMobile ? "flex-row space-y-0 space-x-2 pb-4" : "flex-col",
              )}
            >
              <TabsTrigger
                value="general"
                className={cn("justify-start px-3 py-2 h-9 font-normal", isMobile && "whitespace-nowrap")}
              >
                <Globe className="w-4 h-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className={cn("justify-start px-3 py-2 h-9 font-normal", isMobile && "whitespace-nowrap")}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className={cn("justify-start px-3 py-2 h-9 font-normal", isMobile && "whitespace-nowrap")}
              >
                <Users className="w-4 h-4 mr-2" />
                Team
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className={cn("justify-start px-3 py-2 h-9 font-normal", isMobile && "whitespace-nowrap")}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Billing
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className={cn("justify-start px-3 py-2 h-9 font-normal", isMobile && "whitespace-nowrap")}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className={cn("justify-start px-3 py-2 h-9 font-normal", isMobile && "whitespace-nowrap")}
              >
                <Lock className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="messaging"
                className={cn("justify-start px-3 py-2 h-9 font-normal", isMobile && "whitespace-nowrap")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Messaging
              </TabsTrigger>
            </TabsList>
          </aside>
          <div className="flex-1 lg:max-w-3xl">
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure general settings for your Intercom account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input id="website" defaultValue="https://acme.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america-new_york">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-new_york">America/New York (UTC-05:00)</SelectItem>
                        <SelectItem value="america-los_angeles">America/Los Angeles (UTC-08:00)</SelectItem>
                        <SelectItem value="europe-london">Europe/London (UTC+00:00)</SelectItem>
                        <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+09:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#3e63dd] hover:bg-[#3a5ccc]">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                  <CardDescription>Set your business hours to manage customer expectations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="business-hours" defaultChecked />
                      <Label htmlFor="business-hours">Enable business hours</Label>
                    </div>
                  </div>
                  <div className="grid gap-4 pt-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Monday</Label>
                      <div className="col-span-2 flex items-center gap-2">
                        <Select defaultValue="9">
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Start" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9">9:00 AM</SelectItem>
                            <SelectItem value="10">10:00 AM</SelectItem>
                            <SelectItem value="11">11:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                        <span>to</span>
                        <Select defaultValue="17">
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="End" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="17">5:00 PM</SelectItem>
                            <SelectItem value="18">6:00 PM</SelectItem>
                            <SelectItem value="19">7:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Tuesday</Label>
                      <div className="col-span-2 flex items-center gap-2">
                        <Select defaultValue="9">
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Start" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9">9:00 AM</SelectItem>
                            <SelectItem value="10">10:00 AM</SelectItem>
                            <SelectItem value="11">11:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                        <span>to</span>
                        <Select defaultValue="17">
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="End" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="17">5:00 PM</SelectItem>
                            <SelectItem value="18">6:00 PM</SelectItem>
                            <SelectItem value="19">7:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {/* Additional days would be added here */}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#3e63dd] hover:bg-[#3a5ccc]">Save Business Hours</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Manage your personal information and how it appears to customers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" defaultValue="Alex Rivera" />
                    <p className="text-sm text-muted-foreground">
                      This is the name that will be shown to your customers.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="alex@acme.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" defaultValue="Customer Support Manager" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Customer support professional with 5+ years of experience helping customers solve their problems."
                    />
                    <p className="text-sm text-muted-foreground">
                      A brief description that will be visible to customers.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#3e63dd] hover:bg-[#3a5ccc]">Update Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>Manage your team members and their permissions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Team Members</h3>
                      <p className="text-sm text-muted-foreground">You have 5 team members in your account.</p>
                    </div>
                    <Button className="bg-[#3e63dd] hover:bg-[#3a5ccc]">
                      <Users className="w-4 h-4 mr-2" />
                      Invite Team Member
                    </Button>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    {/* Team member list would go here */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Alex Rivera</p>
                          <p className="text-sm text-muted-foreground">alex@acme.com</p>
                        </div>
                      </div>
                      <Badge className="bg-[#3e63dd]">Admin</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Jamie Smith</p>
                          <p className="text-sm text-muted-foreground">jamie@acme.com</p>
                        </div>
                      </div>
                      <Badge variant="outline">Agent</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Teams & Departments</CardTitle>
                  <CardDescription>Organize your team into departments for better workflow management.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Customer Support</h3>
                        <p className="text-sm text-muted-foreground">3 members</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Technical Support</h3>
                        <p className="text-sm text-muted-foreground">2 members</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Sales</h3>
                        <p className="text-sm text-muted-foreground">2 members</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#3e63dd] hover:bg-[#3a5ccc]">
                    <Building className="w-4 h-4 mr-2" />
                    Add Department
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Pro Plan</h3>
                        <p className="text-sm text-muted-foreground">$99/month, billed annually</p>
                      </div>
                      <Badge className="bg-[#3e63dd]">Current Plan</Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#3e63dd]" />
                        <span>Unlimited conversations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#3e63dd]" />
                        <span>Up to 10 team members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#3e63dd]" />
                        <span>Advanced analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#3e63dd]" />
                        <span>Custom integrations</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline" className="text-destructive">
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment methods and billing address.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 04/2025</p>
                        </div>
                      </div>
                      <Badge variant="outline">Default</Badge>
                    </div>
                  </div>
                  <Button variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how and when you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-conversation" className="flex-1">
                          New conversation
                        </Label>
                        <Switch id="new-conversation" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="conversation-assigned" className="flex-1">
                          Conversation assigned to you
                        </Label>
                        <Switch id="conversation-assigned" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="customer-reply" className="flex-1">
                          Customer replies to your conversation
                        </Label>
                        <Switch id="customer-reply" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="team-mention" className="flex-1">
                          Mentioned in a conversation
                        </Label>
                        <Switch id="team-mention" defaultChecked />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-medium">Browser Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="browser-new-conversation" className="flex-1">
                          New conversation
                        </Label>
                        <Switch id="browser-new-conversation" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="browser-conversation-assigned" className="flex-1">
                          Conversation assigned to you
                        </Label>
                        <Switch id="browser-conversation-assigned" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="browser-customer-reply" className="flex-1">
                          Customer replies to your conversation
                        </Label>
                        <Switch id="browser-customer-reply" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#3e63dd] hover:bg-[#3a5ccc]">Save Notification Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication methods.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Change Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="mt-2 bg-[#3e63dd] hover:bg-[#3a5ccc]">Update Password</Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Session Management</h3>
                        <p className="text-sm text-muted-foreground">
                          Manage your active sessions and sign out from other devices.
                        </p>
                      </div>
                      <Button variant="outline">Manage Sessions</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messaging" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Messaging Settings</CardTitle>
                  <CardDescription>Configure your messaging preferences and automated responses.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Welcome Message</h3>
                    <p className="text-sm text-muted-foreground">
                      This message is sent automatically when a customer starts a new conversation.
                    </p>
                    <Textarea
                      defaultValue="👋 Hi there! Thanks for reaching out. How can we help you today?"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-medium">Away Message</h3>
                    <p className="text-sm text-muted-foreground">
                      This message is sent automatically when no team members are available.
                    </p>
                    <Textarea
                      defaultValue="Thanks for your message! Our team is currently away, but we'll get back to you as soon as possible."
                      className="min-h-[100px]"
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Canned Responses</h3>
                        <p className="text-sm text-muted-foreground">
                          Create and manage pre-written responses for common questions.
                        </p>
                      </div>
                      <Button variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Manage Responses
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#3e63dd] hover:bg-[#3a5ccc]">Save Messaging Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
