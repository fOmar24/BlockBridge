import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Lightbulb,
  LinkIcon,
  Twitter,
  Github,
  Globe,
  Check,
  Star,
  Users,
  Gift,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  return (
    <div className="min-h-screen pb-10">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-purple-900 to-indigo-800"></div>
        <div className="container max-w-6xl mx-auto px-4">
          <div className="relative flex flex-col md:flex-row -mt-16 md:items-end pb-4 md:pb-0">
            <div className="z-10 w-32 h-32 md:w-40 md:h-40 border-4 border-white rounded-full bg-white flex items-center justify-center overflow-hidden">
              <User className="h-20 w-20 md:h-24 md:w-24 text-purple-600" />
            </div>
            <div className="md:ml-6 mt-4 md:mt-0 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between w-full">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Ade Johnson</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>Full Stack Blockchain Developer</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Lagos, Nigeria</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined January 2024</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button size="sm">Connect</Button>
                <Button size="sm" variant="outline">
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="mx-auto flex justify-center">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Full stack blockchain developer with 3+ years of experience building decentralized applications.
                      Specialized in smart contract development, Web3 integration, and frontend development with React.
                      Currently focused on creating solutions for financial inclusion and digital identity in Africa.
                    </p>

                    <div className="mt-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">JavaScript</Badge>
                          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">TypeScript</Badge>
                          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">Solidity</Badge>
                          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">Move</Badge>
                          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">React</Badge>
                          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">Node.js</Badge>
                          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">Web3.js</Badge>
                          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">ethers.js</Badge>
                          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">Next.js</Badge>
                          <Badge className="bg-purple-100 hover:bg-purple-200 text-purple-800">Sui SDK</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Interests</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">DeFi</Badge>
                          <Badge variant="outline">Digital Identity</Badge>
                          <Badge variant="outline">DAOs</Badge>
                          <Badge variant="outline">Financial Inclusion</Badge>
                          <Badge variant="outline">Smart Contract Security</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Briefcase className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Blockchain Developer</h3>
                        <p className="text-sm text-purple-600">TechAfrica</p>
                        <p className="text-sm text-gray-500">Jan 2023 - Present</p>
                        <ul className="mt-2 text-sm text-gray-700 space-y-1 list-disc list-inside ml-1">
                          <li>Developed smart contracts for supply chain tracking and microlending platforms</li>
                          <li>Built frontend interfaces for DApps using React and Web3 libraries</li>
                          <li>Implemented wallet integration and transaction signing for multiple blockchains</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 mt-1">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Briefcase className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Software Engineer</h3>
                        <p className="text-sm text-purple-600">FinTech Innovations</p>
                        <p className="text-sm text-gray-500">Mar 2021 - Dec 2022</p>
                        <ul className="mt-2 text-sm text-gray-700 space-y-1 list-disc list-inside ml-1">
                          <li>Developed and maintained RESTful APIs using Node.js and Express</li>
                          <li>Created React components for user-facing applications</li>
                          <li>Collaborated with product team to implement new features and improvements</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Soulbound Token ID</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 border rounded-lg bg-gray-50 break-all text-xs font-mono">
                      0x73a5edf7750e8dacc986433cd0bcca3a22c61358d45d63c7d6b732fdf1f4f58f
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Created</span>
                        <span>Jan 15, 2024</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Last Updated</span>
                        <span>Apr 2, 2024</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Status</span>
                        <div className="flex items-center">
                          <span className="text-green-600 mr-1">Verified</span>
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      View on Explorer
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reputation Score</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex justify-center">
                      <div className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center border-8 border-purple-200">
                        <div className="text-center">
                          <span className="text-3xl font-bold text-purple-600">856</span>
                          <p className="text-xs text-gray-600 mt-1">Excellent</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Technical Skills</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Community Engagement</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Project Completion</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact & Social</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <a href="#" className="text-purple-600 hover:underline">
                        adejohnson.dev
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Twitter className="h-5 w-5 text-gray-500" />
                      <a href="#" className="text-purple-600 hover:underline">
                        @adedev
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Github className="h-5 w-5 text-gray-500" />
                      <a href="#" className="text-purple-600 hover:underline">
                        github.com/adedev
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>AgroChain</CardTitle>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <CardDescription>Lead Developer • 2023 - Present</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Blockchain solution for agricultural supply chain tracking and farmer payments. Enabling small-scale
                    farmers to access fair markets and receive payments directly.
                  </p>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progress</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Sui Move</Badge>
                    <Badge variant="outline">Supply Chain</Badge>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Node.js</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">JD</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">TM</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">SN</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">KO</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-xs text-gray-500">4 collaborators</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Digital Identity Portal</CardTitle>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <CardDescription>Smart Contract Developer • 2024 - Present</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Self-sovereign identity solution for accessing services without traditional documentation. Helping
                    unbanked populations access financial and government services.
                  </p>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progress</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Solidity</Badge>
                    <Badge variant="outline">Identity</Badge>
                    <Badge variant="outline">Zero-knowledge Proofs</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">EM</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">AK</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">JO</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">+3</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-xs text-gray-500">6 collaborators</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Microfinance DAO</CardTitle>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <CardDescription>Frontend Developer • 2023 - Present</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Community-governed lending platform for small businesses in underserved communities. Enabling
                    peer-to-peer loans without traditional banking infrastructure.
                  </p>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progress</span>
                      <span className="font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Move</Badge>
                    <Badge variant="outline">DAO</Badge>
                    <Badge variant="outline">DeFi</Badge>
                    <Badge variant="outline">React</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">PN</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">LM</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">CO</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-xs text-gray-500">3 collaborators</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>Decentralized Marketplace</CardTitle>
                    <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                  </div>
                  <CardDescription>Technical Advisor • 2022 - 2023</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">
                    P2P marketplace for digital services with crypto payments and escrow. Connecting African freelancers
                    with global clients through secure blockchain transactions.
                  </p>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progress</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Solidity</Badge>
                    <Badge variant="outline">Smart Contracts</Badge>
                    <Badge variant="outline">Marketplace</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">RK</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">MN</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">FO</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">SA</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">JT</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-xs text-gray-500">5 collaborators</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="credentials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certificates & Credentials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Award className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Blockchain Developer Certification</h3>
                      <p className="text-sm text-purple-600">Sui Foundation</p>
                      <p className="text-sm text-gray-500">March 2024</p>
                      <div className="mt-2 flex items-center">
                        <Badge variant="outline" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Verified On-Chain
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Award className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Move Language Mastery</h3>
                      <p className="text-sm text-purple-600">Move Accelerator</p>
                      <p className="text-sm text-gray-500">February 2024</p>
                      <div className="mt-2 flex items-center">
                        <Badge variant="outline" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Verified On-Chain
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4 mt-1">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Award className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Full Stack Web Development</h3>
                      <p className="text-sm text-purple-600">Tech Academy Africa</p>
                      <p className="text-sm text-gray-500">October 2022</p>
                      <div className="mt-2 flex items-center">
                        <Badge variant="outline" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Verified On-Chain
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges & Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-amber-100 rounded-full p-4 mb-2">
                        <Award className="h-8 w-8 text-amber-600" />
                      </div>
                      <p className="text-sm font-medium">Grant Recipient</p>
                      <p className="text-xs text-muted-foreground">Mar 2024</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-100 rounded-full p-4 mb-2">
                        <Star className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium">Top Contributor</p>
                      <p className="text-xs text-muted-foreground">Feb 2024</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-green-100 rounded-full p-4 mb-2">
                        <Lightbulb className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-sm font-medium">Innovator</p>
                      <p className="text-xs text-muted-foreground">Jan 2024</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-purple-100 rounded-full p-4 mb-2">
                        <Users className="h-8 w-8 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium">Community Builder</p>
                      <p className="text-xs text-muted-foreground">Dec 2023</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-red-100 rounded-full p-4 mb-2">
                        <Award className="h-8 w-8 text-red-600" />
                      </div>
                      <p className="text-sm font-medium">Hackathon Winner</p>
                      <p className="text-xs text-muted-foreground">Nov 2023</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gray-100 rounded-full p-4 mb-2">
                        <Award className="h-8 w-8 text-gray-600" />
                      </div>
                      <p className="text-sm font-medium">Early Adopter</p>
                      <p className="text-xs text-muted-foreground">Oct 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contributions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Contribution History</CardTitle>
                  <CardDescription>Recent activity and contributions to the BlockBridge ecosystem</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Lightbulb className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="h-full w-px bg-gray-200 my-2"></div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium">Submitted proposal for AgroChain enhancements</h3>
                          <span className="text-xs text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Proposed adding supply chain verification features to track product origin.
                        </p>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            +75 points
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Star className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="h-full w-px bg-gray-200 my-2"></div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium">Mentored 3 new developers</h3>
                          <span className="text-xs text-gray-500">1 week ago</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Provided guidance on smart contract development and security best practices.
                        </p>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            +120 points
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="h-full w-px bg-gray-200 my-2"></div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium">Participated in DAO vote for grant allocation</h3>
                          <span className="text-xs text-gray-500">2 weeks ago</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Reviewed and voted on 12 grant proposals for Q2 funding cycle.
                        </p>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            +50 points
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <Gift className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="h-full w-px bg-gray-200 my-2"></div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium">Received grant for Digital Identity Portal</h3>
                          <span className="text-xs text-gray-500">3 weeks ago</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Awarded $3,500 for development of privacy-preserving identity verification features.
                        </p>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            +200 points
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contribution Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Points Earned</span>
                      <span className="font-bold text-purple-600">3,245</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Projects Initiated</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Projects Contributed To</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">DAO Votes Participated</span>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mentees Guided</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Grants Received</span>
                      <span className="font-medium">3</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Activity Heatmap</h4>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 35 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-4 rounded-sm ${
                            Math.random() > 0.6
                              ? Math.random() > 0.8
                                ? "bg-purple-700"
                                : "bg-purple-500"
                              : Math.random() > 0.5
                                ? "bg-purple-300"
                                : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">Last 5 weeks of activity</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

