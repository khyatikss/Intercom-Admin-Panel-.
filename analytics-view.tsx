"use client"

import { Calendar, ChevronDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function AnalyticsView() {
  const isMobile = useMobile()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Apr 1 - Apr 30
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className={cn("grid w-full", isMobile ? "grid-cols-2" : "grid-cols-4 lg:w-[400px]")}>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          {!isMobile && (
            <>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Conversations"
              value="1,234"
              change="+12.3%"
              trend="up"
              description="vs. previous period"
            />
            <MetricCard
              title="Active Customers"
              value="856"
              change="+5.7%"
              trend="up"
              description="vs. previous period"
            />
            <MetricCard
              title="Avg. Response Time"
              value="2h 14m"
              change="-8.4%"
              trend="down"
              description="vs. previous period"
            />
            <MetricCard
              title="Customer Satisfaction"
              value="94%"
              change="+2.1%"
              trend="up"
              description="vs. previous period"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Conversation Volume</CardTitle>
                  <Select defaultValue="7days">
                    <SelectTrigger className="h-8 w-[150px]">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>Daily conversation count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                  <div className="text-muted-foreground">Chart: Conversation Volume</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Response Times</CardTitle>
                  <Select defaultValue="7days">
                    <SelectTrigger className="h-8 w-[150px]">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>Average time to first response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                  <div className="text-muted-foreground">Chart: Response Times</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Customer Satisfaction</CardTitle>
                <CardDescription>Rating distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                  <div className="text-muted-foreground">Chart: Satisfaction Ratings</div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Conversation Topics</CardTitle>
                <CardDescription>Most common conversation topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                  <div className="text-muted-foreground">Chart: Topic Distribution</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Analytics</CardTitle>
              <CardDescription>Detailed metrics about your customer conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                <div className="text-muted-foreground">Conversation Analytics Dashboard</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>Insights about your customer base and behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                <div className="text-muted-foreground">Customer Analytics Dashboard</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Metrics about your support team's performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                <div className="text-muted-foreground">Team Performance Dashboard</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
}

function MetricCard({ title, value, change, trend, description }: MetricCardProps) {
  return (
    <Card className="border-t-4 border-t-[#3e63dd]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{change}</span>
          <span className="text-xs text-muted-foreground ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}
