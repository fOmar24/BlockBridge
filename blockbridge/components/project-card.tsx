import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  role: string
  progress: number
  collaborators: number
  status: "Active" | "Completed" | "Paused"
}

export default function ProjectCard({ title, description, role, progress, collaborators, status }: ProjectCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Paused":
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
        <CardDescription className="flex items-center mt-1">Your role: {role}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Project Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>{collaborators} collaborators</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          View Project
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

