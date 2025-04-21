import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Briefcase, Gift, Lightbulb, Users } from "lucide-react"

interface OpportunityCardProps {
  title: string
  type: "Job" | "Grant" | "Project" | "Mentorship"
  organization: string
  deadline: string
  compensation: string
  status: "Open" | "Closed" | "Recruiting" | "Matching"
  description: string
}

export default function OpportunityCard({
  title,
  type,
  organization,
  deadline,
  compensation,
  status,
  description,
}: OpportunityCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case "Job":
        return <Briefcase className="h-4 w-4" />
      case "Grant":
        return <Gift className="h-4 w-4" />
      case "Project":
        return <Lightbulb className="h-4 w-4" />
      case "Mentorship":
        return <Users className="h-4 w-4" />
      default:
        return <Briefcase className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800"
      case "Closed":
        return "bg-red-100 text-red-800"
      case "Recruiting":
        return "bg-blue-100 text-blue-800"
      case "Matching":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={getStatusColor()}>{status}</Badge>
        </div>
        <CardDescription className="flex items-center mt-1">
          <Badge variant="outline" className="mr-2 font-normal">
            {getTypeIcon()}
            <span className="ml-1">{type}</span>
          </Badge>
          {organization}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Deadline: {deadline}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Gift className="h-4 w-4 mr-2" />
            <span>{compensation}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  )
}

