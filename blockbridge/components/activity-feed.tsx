import type React from "react"
import { Award, MessageSquare, Gift, Handshake, Heart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ActivityFeed() {
  return (
    <div className="space-y-4">
      <ActivityItem
        icon={<Gift className="h-4 w-4 text-green-500" />}
        avatar="CH"
        name="Community Hub"
        action="awarded a micro-grant to your project"
        project="AgroChain"
        time="2 hours ago"
        highlight
      />
      <ActivityItem
        icon={<Heart className="h-4 w-4 text-pink-500" />}
        avatar="EM"
        name="Emmanuel M."
        action="endorsed your skills in"
        project="Solidity, Smart Contracts"
        time="Yesterday"
      />
      <ActivityItem
        icon={<MessageSquare className="h-4 w-4 text-blue-500" />}
        avatar="SN"
        name="Sarah N."
        action="commented on your post"
        project="Decentralized Identity Systems"
        time="2 days ago"
      />
      <ActivityItem
        icon={<Handshake className="h-4 w-4 text-purple-500" />}
        avatar="JO"
        name="John O."
        action="invited you to collaborate on"
        project="EduChain Project"
        time="3 days ago"
      />
      <ActivityItem
        icon={<Award className="h-4 w-4 text-amber-500" />}
        avatar="BB"
        name="BlockBridge"
        action="awarded you a badge for"
        project="Active Contributor"
        time="1 week ago"
      />
    </div>
  )
}

interface ActivityItemProps {
  icon: React.ReactNode
  avatar: string
  name: string
  action: string
  project: string
  time: string
  highlight?: boolean
}

function ActivityItem({ icon, avatar, name, action, project, time, highlight }: ActivityItemProps) {
  return (
    <div className={`flex items-start space-x-4 p-3 rounded-lg ${highlight ? "bg-purple-50" : ""}`}>
      <div className="mt-0.5">{icon}</div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={name} />
        <AvatarFallback>{avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm">
          <span className="font-semibold">{name}</span> {action}{" "}
          <span className="font-medium text-purple-600">{project}</span>
        </p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}

