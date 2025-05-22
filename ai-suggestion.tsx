"use client"

import { useState } from "react"
import { Copy, ThumbsDown, ThumbsUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AiSuggestionProps {
  onSelectSuggestion: (suggestion: string) => void
  onClose: () => void
}

const suggestions = [
  {
    id: "1",
    type: "formal",
    content:
      "Thank you for reaching out about your subscription renewal issue. I've checked your account and can confirm that your payment method appears to be valid in our system. Let me investigate further to identify what might be causing the error message you're seeing. In the meantime, could you please let me know which payment method you're using (credit card, PayPal, etc.) and when you last attempted to renew your subscription?",
  },
  {
    id: "2",
    type: "friendly",
    content:
      "Hi there! Thanks for letting us know about the trouble with your subscription renewal. I just checked your account and interestingly, your payment method looks perfectly fine on our end! Let's figure this out together. Could you tell me which payment method you're trying to use and when you last tried to renew? That will help me get to the bottom of this for you right away!",
  },
  {
    id: "3",
    type: "concise",
    content:
      "I've checked your account and your payment method appears valid. To help troubleshoot, please confirm: 1) Which payment method you're using 2) When you last attempted renewal 3) The exact error message you received. I'll resolve this promptly.",
  },
]

export function AiSuggestion({ onSelectSuggestion, onClose }: AiSuggestionProps) {
  const [activeTab, setActiveTab] = useState("formal")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const activeSuggestion = suggestions.find((s) => s.type === activeTab) || suggestions[0]

  return (
    <div className="px-4 py-2 bg-[#f0f4ff] border-y border-[#d1deff] animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#3e63dd]">AI Suggested Responses</span>
          <Tabs defaultValue="formal" value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="h-7 p-0 bg-transparent">
              <TabsTrigger
                value="formal"
                className={cn(
                  "px-2 py-1 h-7 text-xs rounded-md data-[state=active]:bg-[#3e63dd] data-[state=active]:text-white",
                )}
              >
                Formal
              </TabsTrigger>
              <TabsTrigger
                value="friendly"
                className={cn(
                  "px-2 py-1 h-7 text-xs rounded-md data-[state=active]:bg-[#3e63dd] data-[state=active]:text-white",
                )}
              >
                Friendly
              </TabsTrigger>
              <TabsTrigger
                value="concise"
                className={cn(
                  "px-2 py-1 h-7 text-xs rounded-md data-[state=active]:bg-[#3e63dd] data-[state=active]:text-white",
                )}
              >
                Concise
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative p-3 bg-white rounded-md border border-[#d1deff] mb-2">
        <p className="text-sm">{activeSuggestion.content}</p>
        <div className="absolute right-2 bottom-2 flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-[#f0f4ff]"
                  onClick={() => handleCopy(activeSuggestion.id, activeSuggestion.content)}
                >
                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{copiedId === activeSuggestion.id ? "Copied!" : "Copy to clipboard"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 py-1 text-xs bg-white hover:bg-[#f0f4ff]"
            onClick={() => onSelectSuggestion(activeSuggestion.content)}
          >
            Use response
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <span className="text-xs text-muted-foreground mr-1">Was this suggestion helpful?</span>
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
