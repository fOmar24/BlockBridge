import { User, MapPin, Calendar, Award, Code, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProfileCard() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
            <User className="h-12 w-12 text-purple-600" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
        </div>

        <div className="md:flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold">Ade Johnson</h3>
          <p className="text-sm text-muted-foreground">Full Stack Blockchain Developer</p>
          <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
            <Badge variant="outline" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified Developer
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Award className="h-3 w-3 mr-1" />
              Grant Recipient
            </Badge>
          </div>
          <div className="flex items-center mt-2 text-sm text-muted-foreground justify-center md:justify-start">
            <MapPin className="h-3 w-3 mr-1" />
            <span>Lagos, Nigeria</span>
            <span className="mx-2">•</span>
            <Calendar className="h-3 w-3 mr-1" />
            <span>Joined January 2024</span>
          </div>
        </div>

        <Button variant="outline" size="sm" asChild>
          <Link href="/profile">View Full Profile</Link>
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">JavaScript</Badge>
            <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">Solidity</Badge>
            <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">React</Badge>
            <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">Node.js</Badge>
            <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">Move</Badge>
            <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">Web3</Badge>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Credentials</h4>
          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <Award className="h-4 w-4 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Blockchain Developer Certification</p>
                <p className="text-xs text-muted-foreground">Issued by Sui Foundation • March 2024</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Code className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Move Language Mastery</p>
                <p className="text-xs text-muted-foreground">Issued by Move Accelerator • February 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

