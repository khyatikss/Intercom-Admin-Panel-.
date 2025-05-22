"use client"

import { X, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  priority?: "normal" | "high" | "urgent"
  messages: {
    id: string
    sender: "customer" | "agent" | "bot"
    content: string
    timestamp: string
    agentName?: string
    agentAvatar?: string
    agentInitials?: string
  }[]
}

interface AiSummaryProps {
  conversation: Conversation
  onClose: () => void
}

export function AiSummary({ conversation, onClose }: AiSummaryProps) {
  // Generate a summary based on the conversation
  const generateSummary = () => {
    if (conversation.id === "1") {
      return {
        summary:
          "Customer is experiencing issues with subscription renewal due to an invalid payment method error, despite having verified their payment details.",
        keyPoints: [
          "Payment method shows as invalid during renewal",
          "Customer has verified their payment information is correct",
          "Customer needs assistance troubleshooting the renewal process",
        ],
        sentiment: "frustrated",
        nextSteps: [
          "Verify payment method status in the system",
          "Check for any failed transaction logs",
          "Provide manual renewal option if needed",
        ],
      }
    } else if (conversation.id === "3") {
      return {
        summary:
          "Customer noticed an unexpected 'Premium Add-on' charge on their invoice and requested clarification. The AI assistant explained the charge, disabled the feature, and processed a refund.",
        keyPoints: [
          "Unexpected 'Premium Add-on' charge appeared on invoice",
          "Customer did not recall activating this feature",
          "Feature was activated on June 15th",
          "Customer requested to disable the feature",
        ],
        sentiment: "satisfied",
        nextSteps: [
          "Confirm refund processing (3-5 business days)",
          "Follow up to ensure customer satisfaction",
          "Review activation process to prevent unintended sign-ups",
        ],
      }
    } else {
      return {
        summary:
          "Customer has reached out regarding " + conversation.subject.toLowerCase() + " and requires assistance.",
        keyPoints: [
          "Customer initiated conversation about " + conversation.subject.toLowerCase(),
          "Issue requires follow-up from support team",
          conversation.priority === "high" || conversation.priority === "urgent"
            ? "This is a " + (conversation.priority || "normal") + " priority issue"
            : "Standard priority issue",
        ],
        sentiment: "neutral",
        nextSteps: [
          "Acknowledge the customer's inquiry",
          "Gather more information about the specific issue",
          "Provide relevant documentation or solutions",
        ],
      }
    }
  }

  const summary = generateSummary()

  return (
    <div className="px-4 py-3 bg-[#f0f4ff] border-b border-[#d1deff] animate-in slide-in-from-top-5 duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#3e63dd]" />
          <span className="text-sm font-medium text-[#3e63dd]">AI Conversation Summary</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-white rounded-md border border-[#d1deff] p-3 mb-2">
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-1">SUMMARY</h4>
            <p className="text-sm">{summary.summary}</p>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-1">KEY POINTS</h4>
            <ul className="text-sm space-y-1">
              {summary.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#3e63dd] mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-1">CUSTOMER SENTIMENT</h4>
            <div className="flex items-center gap-2">
              {summary.sentiment === "frustrated" && (
                <span className="text-sm px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs">Frustrated</span>
              )}
              {summary.sentiment === "neutral" && (
                <span className="text-sm px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">Neutral</span>
              )}
              {summary.sentiment === "satisfied" && (
                <span className="text-sm px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs">Satisfied</span>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-1">RECOMMENDED NEXT STEPS</h4>
            <ul className="text-sm space-y-1">
              {summary.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#3e63dd] mt-1">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <span className="text-xs text-muted-foreground mr-1">Was this summary helpful?</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-[#f0f4ff]">
                <ThumbsUp className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Helpful</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-[#f0f4ff]">
                <ThumbsDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Not helpful</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
