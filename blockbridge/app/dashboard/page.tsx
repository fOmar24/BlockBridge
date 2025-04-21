import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Award, CircleDollarSign, Users, Lightbulb, Activity, TrendingUp, Gift, UserPlus, Calendar } from "lucide-react"
import ProfileCard from "@/components/profile-card"
import OpportunityCard from "@/components/opportunity-card"
import ProjectCard from "@/components/project-card"
import ActivityFeed from "@/components/activity-feed"

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Gift className="mr-2 h-4 w-4" />
              Apply for Grant
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
              <Award className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">856</div>
              <p className="text-xs text-muted-foreground">+23 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earned Rewards</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,245</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Connections</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">+7 new connections this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Lightbulb className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">1 pending approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Profile Card */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Your on-chain identity and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileCard />
                </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your network</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActivityFeed />
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events & Recommended */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events and deadlines for your calendar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Calendar className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Grant Application Deadline</p>
                        <p className="text-sm text-muted-foreground">Apr 15, 2024 • 11:59 PM UTC</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Calendar className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Web3 Africa Meetup</p>
                        <p className="text-sm text-muted-foreground">Apr 22, 2024 • 6:00 PM WAT</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Calendar className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Blockchain Development Workshop</p>
                        <p className="text-sm text-muted-foreground">May 5, 2024 • 2:00 PM EAT</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                  <CardDescription>Personalized suggestions based on your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <UserPlus className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Connect with Sarah N., UI/UX Designer</p>
                        <p className="text-sm text-muted-foreground">Based on your interest in UI/UX</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Gift className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Apply for Infrastructure Grant</p>
                        <p className="text-sm text-muted-foreground">Matches your blockchain expertise</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Lightbulb className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Join EcoBlockchain Project</p>
                        <p className="text-sm text-muted-foreground">Seeking developers with your skills</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <OpportunityCard
                title="Web3 Developer Position"
                type="Job"
                organization="TechAfrica"
                deadline="Apr 30, 2024"
                compensation="$3,000 - $4,500/month"
                status="Open"
                description="Join TechAfrica as a Web3 Developer to build decentralized solutions for emerging markets. Required skills include Solidity, React, and experience with blockchain frameworks."
              />
              <OpportunityCard
                title="DeFi Innovation Grant"
                type="Grant"
                organization="BlockBridge DAO"
                deadline="May 15, 2024"
                compensation="Up to $7,500"
                status="Open"
                description="Funding for innovative DeFi solutions that address financial inclusion challenges in African communities. Focus areas include microfinance, remittances, and decentralized identity."
              />
              <OpportunityCard
                title="Blockchain for Healthcare"
                type="Project"
                organization="Health+ Initiative"
                deadline="Ongoing"
                compensation="Equity + 1,500 BLCK tokens"
                status="Recruiting"
                description="Building a blockchain solution for medical record management and pharmaceutical supply chain verification. Seeking developers, UI/UX designers, and healthcare specialists."
              />
              <OpportunityCard
                title="Smart Contract Auditor"
                type="Job"
                organization="SecureChain"
                deadline="May 5, 2024"
                compensation="$50-75/hour, Contract"
                status="Open"
                description="Looking for experienced smart contract auditors to review and secure blockchain applications. Must have strong background in security and Solidity."
              />
              <OpportunityCard
                title="Web3 Educational Content"
                type="Grant"
                organization="Crypto Education Fund"
                deadline="Rolling basis"
                compensation="$500-3,000 per approved proposal"
                status="Open"
                description="Funding for creating educational content that teaches blockchain and cryptocurrency concepts to beginners. Content can be in any African language."
              />
              <OpportunityCard
                title="Mentorship Program"
                type="Mentorship"
                organization="BlockBridge Academy"
                deadline="Apr 25, 2024"
                compensation="Knowledge exchange + 500 BLCK tokens"
                status="Matching"
                description="Connect with experienced blockchain professionals for 3-month mentorship relationships. Mentors receive recognition and tokens for their contributions."
              />
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="AgroChain"
                description="Blockchain solution for agricultural supply chain tracking and farmer payments."
                role="Lead Developer"
                progress={75}
                collaborators={4}
                status="Active"
              />
              <ProjectCard
                title="Digital Identity Portal"
                description="Self-sovereign identity solution for accessing services without traditional documentation."
                role="Smart Contract Developer"
                progress={32}
                collaborators={6}
                status="Active"
              />
              <ProjectCard
                title="Microfinance DAO"
                description="Community-governed lending platform for small businesses in underserved communities."
                role="Frontend Developer"
                progress={90}
                collaborators={3}
                status="Active"
              />
              <ProjectCard
                title="Decentralized Marketplace"
                description="P2P marketplace for digital services with crypto payments and escrow."
                role="Technical Advisor"
                progress={100}
                collaborators={5}
                status="Completed"
              />
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Leaderboard Position</CardTitle>
                  <CardDescription>Your standing among BlockBridge community members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 rounded-full p-2">
                          <TrendingUp className="h-8 w-8 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold">Ranked #36</p>
                          <p className="text-sm text-muted-foreground">Top 5% of contributors</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Current Points</p>
                        <p className="text-2xl font-bold text-purple-600">3,245</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Progress to next level</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        755 points until Level 23: "Blockchain Veteran"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Badges</CardTitle>
                  <CardDescription>Recognition of your achievements and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-amber-100 rounded-full p-3 mb-2">
                        <Award className="h-6 w-6 text-amber-600" />
                      </div>
                      <p className="text-sm font-medium">First Grant</p>
                      <p className="text-xs text-muted-foreground">Mar 2024</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-100 rounded-full p-3 mb-2">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium">Network Builder</p>
                      <p className="text-xs text-muted-foreground">Feb 2024</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-green-100 rounded-full p-3 mb-2">
                        <Activity className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-sm font-medium">Active Member</p>
                      <p className="text-xs text-muted-foreground">Jan 2024</p>
                    </div>
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

