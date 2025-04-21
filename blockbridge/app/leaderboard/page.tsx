import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  ChevronUp,
  ChevronDown,
  Star,
  TrendingUp,
  Zap,
  Trophy,
  Filter,
  MapPin,
  Users,
  Lightbulb,
} from "lucide-react"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen pb-10">
      <div className="bg-gradient-to-r from-violet-950 via-indigo-900 to-purple-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">BlockBridge Leaderboard</h1>
            <p className="text-lg text-purple-200">
              Celebrating innovation, contribution, and impact across the BlockBridge ecosystem
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="top-innovators" className="space-y-8">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="top-innovators">Top Innovators</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="countries">Countries</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <TabsContent value="top-innovators" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Innovators</CardTitle>
                <CardDescription>Leading contributors ranked by reputation, impact, and innovation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Featured Top 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* 2nd Place */}
                    <div className="flex flex-col items-center order-2 md:order-1">
                      <div className="relative mb-4">
                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-800 font-bold text-sm">2</span>
                        </div>
                        <Avatar className="h-28 w-28">
                          <AvatarImage src="/placeholder.svg?height=112&width=112" alt="Sarah N." />
                          <AvatarFallback className="text-2xl">SN</AvatarFallback>
                        </Avatar>
                      </div>
                      <h3 className="text-lg font-semibold">Sarah N.</h3>
                      <p className="text-sm text-muted-foreground mb-1">UI/UX Designer</p>
                      <div className="flex items-center text-sm mb-2">
                        <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-gray-500">Nairobi, Kenya</span>
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-full">
                        <span className="font-semibold">4,125 pts</span>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-green-600">
                        <ChevronUp className="h-4 w-4 mr-1" />
                        <span>Up 2 places</span>
                      </div>
                    </div>

                    {/* 1st Place */}
                    <div className="flex flex-col items-center order-1 md:order-2">
                      <div className="relative mb-6">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                          <Trophy className="h-10 w-10 text-amber-500" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-800 font-bold text-sm">1</span>
                        </div>
                        <Avatar className="h-32 w-32 border-4 border-amber-200">
                          <AvatarImage src="/placeholder.svg?height=132&width=132" alt="Michael O." />
                          <AvatarFallback className="text-2xl">MO</AvatarFallback>
                        </Avatar>
                      </div>
                      <h3 className="text-xl font-bold">Michael O.</h3>
                      <p className="text-sm text-muted-foreground mb-1">Blockchain Architect</p>
                      <div className="flex items-center text-sm mb-2">
                        <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-gray-500">Lagos, Nigeria</span>
                      </div>
                      <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                        <span className="font-semibold">5,280 pts</span>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-gray-600">
                        <span>Holding strong</span>
                      </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex flex-col items-center order-3">
                      <div className="relative mb-4">
                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-800 font-bold text-sm">3</span>
                        </div>
                        <Avatar className="h-28 w-28">
                          <AvatarImage src="/placeholder.svg?height=112&width=112" alt="David K." />
                          <AvatarFallback className="text-2xl">DK</AvatarFallback>
                        </Avatar>
                      </div>
                      <h3 className="text-lg font-semibold">David K.</h3>
                      <p className="text-sm text-muted-foreground mb-1">Smart Contract Developer</p>
                      <div className="flex items-center text-sm mb-2">
                        <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-gray-500">Accra, Ghana</span>
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-full">
                        <span className="font-semibold">3,840 pts</span>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-green-600">
                        <ChevronUp className="h-4 w-4 mr-1" />
                        <span>Up 5 places</span>
                      </div>
                    </div>
                  </div>

                  {/* Rest of Leaderboard */}
                  <div className="divide-y">
                    <LeaderboardItem
                      rank={4}
                      name="Ade Johnson"
                      avatar="AJ"
                      title="Full Stack Blockchain Developer"
                      location="Lagos, Nigeria"
                      points={3245}
                      change={-2}
                      skills={["JavaScript", "React", "Solidity"]}
                    />
                    <LeaderboardItem
                      rank={5}
                      name="Chioma E."
                      avatar="CE"
                      title="DeFi Specialist"
                      location="Port Harcourt, Nigeria"
                      points={2980}
                      change={1}
                      skills={["DeFi", "Finance", "Solidity"]}
                    />
                    <LeaderboardItem
                      rank={6}
                      name="Ahmed H."
                      avatar="AH"
                      title="Mobile dApp Developer"
                      location="Cairo, Egypt"
                      points={2865}
                      change={3}
                      skills={["React Native", "Mobile", "Flutter"]}
                    />
                    <LeaderboardItem
                      rank={7}
                      name="Grace M."
                      avatar="GM"
                      title="Blockchain Educator"
                      location="Kigali, Rwanda"
                      points={2740}
                      change={0}
                      skills={["Education", "Content", "Community"]}
                    />
                    <LeaderboardItem
                      rank={8}
                      name="Kwame O."
                      avatar="KO"
                      title="System Architect"
                      location="Kumasi, Ghana"
                      points={2590}
                      change={-3}
                      skills={["Architecture", "Security", "Performance"]}
                    />
                    <LeaderboardItem
                      rank={9}
                      name="Amina S."
                      avatar="AS"
                      title="Product Manager"
                      location="Dar es Salaam, Tanzania"
                      points={2430}
                      change={2}
                      skills={["Product", "Strategy", "UX"]}
                    />
                    <LeaderboardItem
                      rank={10}
                      name="Oluwaseun F."
                      avatar="OF"
                      title="Backend Engineer"
                      location="Ibadan, Nigeria"
                      points={2320}
                      change={-1}
                      skills={["Node.js", "Python", "Databases"]}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Award className="mr-2 h-5 w-5 text-amber-500" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="font-bold text-gray-500">1</div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>DK</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">David K.</div>
                      </div>
                      <div className="font-medium text-sm">145 contributions</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="font-bold text-gray-500">2</div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Amina S.</div>
                      </div>
                      <div className="font-medium text-sm">132 contributions</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="font-bold text-gray-500">3</div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>MO</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Michael O.</div>
                      </div>
                      <div className="font-medium text-sm">128 contributions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="mr-2 h-5 w-5 text-blue-500" />
                    Rising Stars
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>JT</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Joshua T.</div>
                      </div>
                      <div className="flex items-center text-green-600 text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+18 places</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>FM</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Fatima M.</div>
                      </div>
                      <div className="flex items-center text-green-600 text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+15 places</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>RN</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Robert N.</div>
                      </div>
                      <div className="flex items-center text-green-600 text-sm">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+12 places</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Star className="mr-2 h-5 w-5 text-amber-500" />
                    Most Endorsed Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Solidity</span>
                        <span className="font-medium">872 endorsements</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Move</span>
                        <span className="font-medium">745 endorsements</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>React</span>
                        <span className="font-medium">689 endorsements</span>
                      </div>
                      <Progress value={69} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Smart Contracts</span>
                        <span className="font-medium">612 endorsements</span>
                      </div>
                      <Progress value={61} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Projects</CardTitle>
                <CardDescription>
                  Highest-rated and most impactful projects in the BlockBridge ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  <ProjectItem
                    rank={1}
                    name="AgroChain"
                    teamLead="Ade Johnson"
                    category="Supply Chain"
                    impact="12,000+ farmers onboarded"
                    score={98}
                    teamSize={4}
                  />
                  <ProjectItem
                    rank={2}
                    name="Digital Identity Portal"
                    teamLead="Sarah N."
                    category="Identity"
                    impact="3,200+ identities verified"
                    score={95}
                    teamSize={6}
                  />
                  <ProjectItem
                    rank={3}
                    name="Microfinance DAO"
                    teamLead="Michael O."
                    category="DeFi"
                    impact="$125K+ distributed in microloans"
                    score={93}
                    teamSize={3}
                  />
                  <ProjectItem
                    rank={4}
                    name="EduChain"
                    teamLead="Grace M."
                    category="Education"
                    impact="5,800+ certificates issued"
                    score={90}
                    teamSize={5}
                  />
                  <ProjectItem
                    rank={5}
                    name="Healthcare Verification"
                    teamLead="David K."
                    category="Healthcare"
                    impact="20,000+ medications verified"
                    score={88}
                    teamSize={4}
                  />
                  <ProjectItem
                    rank={6}
                    name="Clean Energy Tracking"
                    teamLead="Amina S."
                    category="Sustainability"
                    impact="12,000+ kWh tracked on-chain"
                    score={85}
                    teamSize={7}
                  />
                  <ProjectItem
                    rank={7}
                    name="Artisan Marketplace"
                    teamLead="Kwame O."
                    category="Marketplace"
                    impact="450+ artisans connected to global markets"
                    score={82}
                    teamSize={4}
                  />
                  <ProjectItem
                    rank={8}
                    name="Land Registry Solution"
                    teamLead="Ahmed H."
                    category="Property Rights"
                    impact="1,200+ land titles registered"
                    score={80}
                    teamSize={5}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="countries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>African nations leading in BlockBridge innovation and participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  <CountryItem rank={1} name="Nigeria" users={3200} projects={42} funding="$85,000+" />
                  <CountryItem rank={2} name="Kenya" users={2100} projects={29} funding="$72,000+" />
                  <CountryItem rank={3} name="South Africa" users={1800} projects={24} funding="$65,000+" />
                  <CountryItem rank={4} name="Ghana" users={1300} projects={18} funding="$48,000+" />
                  <CountryItem rank={5} name="Egypt" users={950} projects={13} funding="$37,000+" />
                  <CountryItem rank={6} name="Rwanda" users={780} projects={10} funding="$32,000+" />
                  <CountryItem rank={7} name="Ethiopia" users={620} projects={8} funding="$25,000+" />
                  <CountryItem rank={8} name="Tanzania" users={560} projects={7} funding="$21,000+" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface LeaderboardItemProps {
  rank: number
  name: string
  avatar: string
  title: string
  location: string
  points: number
  change: number
  skills: string[]
}

function LeaderboardItem({ rank, name, avatar, title, location, points, change, skills }: LeaderboardItemProps) {
  return (
    <div className="py-4 flex items-center">
      <div className="w-8 text-center font-bold text-gray-500">{rank}</div>
      <div className="ml-4 mr-6">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={name} />
          <AvatarFallback>{avatar}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          <div className="mt-2 md:mt-0 text-right">
            <div className="font-bold text-lg">{points.toLocaleString()}</div>
            <div
              className={`flex items-center text-xs ${change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-500"}`}
            >
              {change > 0 ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  <span>Up {change} places</span>
                </>
              ) : change < 0 ? (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  <span>Down {Math.abs(change)} places</span>
                </>
              ) : (
                <span>No change</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ProjectItemProps {
  rank: number
  name: string
  teamLead: string
  category: string
  impact: string
  score: number
  teamSize: number
}

function ProjectItem({ rank, name, teamLead, category, impact, score, teamSize }: ProjectItemProps) {
  return (
    <div className="py-4 flex items-center">
      <div className="w-8 text-center font-bold text-gray-500">{rank}</div>
      <div className="ml-4 flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">Lead: {teamLead}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
              <span className="text-xs text-muted-foreground">{impact}</span>
            </div>
          </div>
          <div className="mt-2 md:mt-0 text-right">
            <div className="font-bold text-lg">{score}</div>
            <div className="text-xs text-muted-foreground">
              <Users className="h-3 w-3 inline mr-1" />
              <span>{teamSize} team members</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CountryItemProps {
  rank: number
  name: string
  users: number
  projects: number
  funding: string
}

function CountryItem({ rank, name, users, projects, funding }: CountryItemProps) {
  return (
    <div className="py-4 flex items-center">
      <div className="w-8 text-center font-bold text-gray-500">{rank}</div>
      <div className="ml-4 flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-semibold">{name}</h3>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                <span>{users.toLocaleString()} users</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Lightbulb className="h-3 w-3 mr-1" />
                <span>{projects} projects</span>
              </div>
            </div>
          </div>
          <div className="mt-2 md:mt-0 text-right">
            <div className="font-bold text-lg">{funding}</div>
            <div className="text-xs text-muted-foreground">Total funding</div>
          </div>
        </div>
      </div>
    </div>
  )
}

