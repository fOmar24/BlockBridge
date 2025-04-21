import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Gift,
  Calendar,
  Clock,
  ArrowUpRight,
  Filter,
  ThumbsUp,
  ThumbsDown,
  Users,
  ChevronRight,
  Star,
} from "lucide-react"

export default function GrantsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-r from-violet-950 via-indigo-900 to-purple-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Micro-Grant DAO</h1>
              <p className="text-lg text-purple-200 max-w-xl">
                Community-driven funding for African innovators building on blockchain technology.
              </p>
            </div>
            <div className="flex gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium">Submit Proposal</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>New Grant Proposal</DialogTitle>
                    <DialogDescription>Submit your project for community funding consideration</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-center text-muted-foreground mb-6">
                      Complete application form on the proposals page
                    </p>
                    <div className="flex justify-center">
                      <Link href="/grants/proposals/new" passHref>
                        <Button className="w-full">
                          Continue to Application
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Link href="/grants/faq" passHref>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Grant FAQ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Available Funds</p>
                      <p className="text-2xl font-bold">$125,000</p>
                    </div>
                    <div className="bg-purple-100 rounded-full p-2 h-fit">
                      <Gift className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Grants</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <div className="bg-green-100 rounded-full p-2 h-fit">
                      <Gift className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Proposals</p>
                      <p className="text-2xl font-bold">38</p>
                    </div>
                    <div className="bg-blue-100 rounded-full p-2 h-fit">
                      <Gift className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Next Voting</p>
                      <p className="text-2xl font-bold">3 days</p>
                    </div>
                    <div className="bg-amber-100 rounded-full p-2 h-fit">
                      <Calendar className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active">Active Grants</TabsTrigger>
              <TabsTrigger value="proposals">Proposals</TabsTrigger>
              <TabsTrigger value="voting">Voting</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Currently Funded Projects</h2>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <Badge variant="outline">$5,000</Badge>
                    </div>
                    <CardTitle className="mt-2">Web3 Education Portal</CardTitle>
                    <CardDescription>by Edu-Tech Collective</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Creating accessible blockchain education content in multiple African languages for students and
                      professionals transitioning into Web3.
                    </p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Ends in 2 months</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <Badge variant="outline">$7,500</Badge>
                    </div>
                    <CardTitle className="mt-2">Rural DeFi Access</CardTitle>
                    <CardDescription>by Financial Inclusion Labs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Building offline-capable blockchain wallets and financial tools for rural communities with limited
                      internet access.
                    </p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="font-medium">42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Ends in 3 months</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <Badge variant="outline">$4,200</Badge>
                    </div>
                    <CardTitle className="mt-2">Healthcare Verification</CardTitle>
                    <CardDescription>by MediChain Collective</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Blockchain solution for verifying authentic medications and reducing counterfeit pharmaceuticals
                      in African markets.
                    </p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Ends in 1 month</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <Badge variant="outline">$3,800</Badge>
                    </div>
                    <CardTitle className="mt-2">Artisan Marketplace</CardTitle>
                    <CardDescription>by Creative Commons Africa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Connecting traditional African artisans with global markets through blockchain-verified
                      authenticity and direct payments.
                    </p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="font-medium">50%</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Ends in 2 months</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <Badge variant="outline">$6,500</Badge>
                    </div>
                    <CardTitle className="mt-2">Clean Energy Tracking</CardTitle>
                    <CardDescription>by GreenTech Alliance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Building a blockchain system to track renewable energy generation and carbon credits for
                      small-scale solar installations.
                    </p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Ends in 4 months</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <Badge variant="outline">$4,800</Badge>
                    </div>
                    <CardTitle className="mt-2">Identity for Land Rights</CardTitle>
                    <CardDescription>by Land Registry Innovations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Decentralized land registry system to secure property rights for underserved communities without
                      formal documentation.
                    </p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="font-medium">62%</span>
                        </div>
                        <Progress value={62} className="h-2" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Ends in 2 months</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline">View All Active Grants</Button>
              </div>
            </TabsContent>

            <TabsContent value="proposals" className="mt-6 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Current Proposals</h2>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
                      <Badge variant="outline">Requested: $5,200</Badge>
                    </div>
                    <CardTitle className="mt-2">Blockchain for Agriculture</CardTitle>
                    <CardDescription>by AgriTech Innovations • Submitted 5 days ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Building a blockchain-based system for small-scale farmers to track production, access fair
                      pricing information, and connect directly with buyers.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="outline">Agriculture</Badge>
                      <Badge variant="outline">Supply Chain</Badge>
                      <Badge variant="outline">Financial Inclusion</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Voting starts in 2 days</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Details</Button>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm">24</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm">3</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm">8</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
                      <Badge variant="outline">Requested: $7,800</Badge>
                    </div>
                    <CardTitle className="mt-2">Digital Credentials for Education</CardTitle>
                    <CardDescription>by EdTech Foundation • Submitted 1 week ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Creating a blockchain-based credentials system for verifying educational achievements regardless
                      of institution, addressing certificate fraud.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="outline">Education</Badge>
                      <Badge variant="outline">Credentials</Badge>
                      <Badge variant="outline">Identity</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Voting starts in 2 days</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Details</Button>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm">42</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm">7</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm">12</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
                      <Badge variant="outline">Requested: $4,500</Badge>
                    </div>
                    <CardTitle className="mt-2">Cross-Border Payments Solution</CardTitle>
                    <CardDescription>by Borderless Payments • Submitted 2 weeks ago</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Building a stablecoin-based remittance system for low-fee cross-border transfers between African
                      countries with currency volatility.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="outline">Fintech</Badge>
                      <Badge variant="outline">Remittance</Badge>
                      <Badge variant="outline">Stablecoins</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Voting starts in 2 days</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Details</Button>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm">36</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm">12</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm">9</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline">View All Proposals</Button>
              </div>
            </TabsContent>

            <TabsContent value="voting" className="mt-6 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Open for Voting</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Voting cycle ends in 3 days</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-amber-100 text-amber-800">Voting Active</Badge>
                      <Badge variant="outline">Requested: $6,200</Badge>
                    </div>
                    <CardTitle className="mt-2">Smart Contract Security Audit Tools</CardTitle>
                    <CardDescription>by Security Collective • Voting ends in 3 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Developing open-source security audit tools specifically for African developers building on Sui
                      and other blockchains.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Yes Votes</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: "68%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>No Votes</span>
                          <span className="font-medium">32%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full" style={{ width: "32%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>132 votes cast of 200 required quorum</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button className="flex-1">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Vote Yes
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Vote No
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-amber-100 text-amber-800">Voting Active</Badge>
                      <Badge variant="outline">Requested: $5,800</Badge>
                    </div>
                    <CardTitle className="mt-2">Microfinance Pool for Women Entrepreneurs</CardTitle>
                    <CardDescription>by Women in Business • Voting ends in 3 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Creating a DeFi-based microfinance pool for women entrepreneurs in rural areas, with focus on
                      financial inclusion and business education.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Yes Votes</span>
                          <span className="font-medium">75%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>No Votes</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full" style={{ width: "25%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>168 votes cast of 200 required quorum</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button className="flex-1">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Vote Yes
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Vote No
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline">View All Active Votes</Button>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Completed Grants</h2>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                      <Badge variant="outline">$4,200</Badge>
                    </div>
                    <CardTitle className="mt-2">Blockchain Developer Academy</CardTitle>
                    <CardDescription>by Tech Educators Collective</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Training program for blockchain developers across 5 African countries, graduated 78 developers
                      with job placement assistance.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Duration</span>
                        <span>6 months (completed Mar 2024)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Impact</span>
                        <span>78 developers trained, 52 employed</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Star className="h-4 w-4 mr-2 text-amber-500" />
                        <span>Success Rating: Excellent</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Case Study
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                      <Badge variant="outline">$3,800</Badge>
                    </div>
                    <CardTitle className="mt-2">Local Markets dApp</CardTitle>
                    <CardDescription>by Digital Markets Group</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Mobile app connecting local producers with consumers through blockchain verification of product
                      origin and quality.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Duration</span>
                        <span>5 months (completed Jan 2024)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Impact</span>
                        <span>12,000+ users, 350+ producers</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Star className="h-4 w-4 mr-2 text-amber-500" />
                        <span>Success Rating: Very Good</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Case Study
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                      <Badge variant="outline">$5,500</Badge>
                    </div>
                    <CardTitle className="mt-2">Digital ID for Refugees</CardTitle>
                    <CardDescription>by Humanitarian Tech Initiative</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Blockchain-based identity solution for refugees to access services without physical documentation
                      or government IDs.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Duration</span>
                        <span>8 months (completed Dec 2023)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Impact</span>
                        <span>3,200+ IDs issued in 2 refugee camps</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Star className="h-4 w-4 mr-2 text-amber-500" />
                        <span>Success Rating: Excellent</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Case Study
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline">View All Completed Grants</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

