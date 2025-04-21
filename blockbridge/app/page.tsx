import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Award, Users, Coins } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import HeroAnimation from "@/components/hero-animation"
import { CountryMap } from "@/components/country-map"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:py-32 bg-gradient-to-br from-violet-950 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Empowering African Innovators Through Blockchain
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-lg">
                Build your on-chain identity, collaborate globally, and access micro-grants to fuel your innovation
                journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-medium">
                  Create Your Profile
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Explore Opportunities
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-96 lg:h-[500px]">
              <HeroAnimation />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-purple-600">12K+</p>
              <p className="text-sm md:text-base text-gray-600">Innovators</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-purple-600">750+</p>
              <p className="text-sm md:text-base text-gray-600">Projects Funded</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-purple-600">$320K</p>
              <p className="text-sm md:text-base text-gray-600">Grants Distributed</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-purple-600">18</p>
              <p className="text-sm md:text-base text-gray-600">African Countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How BlockBridge Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines blockchain technology with community-driven opportunities to create a powerful
              ecosystem for African innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Award className="h-10 w-10 text-purple-600" />}
              title="Soulbound Profiles"
              description="Mint non-transferable Soulbound NFTs that showcase your verified skills, contributions, and feedback."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-purple-600" />}
              title="Opportunity Matching"
              description="Get matched with mentors, teams, and micro-grant opportunities based on your skills and interests."
            />
            <FeatureCard
              icon={<Coins className="h-10 w-10 text-purple-600" />}
              title="Micro-Grant DAO"
              description="Community votes on project pitches to award grants in stablecoins or platform tokens."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-purple-600" />}
              title="Leaderboards"
              description="Compete and collaborate with fellow innovators through gamified engagement and contributions."
            />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Growing African Community</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              BlockBridge is empowering innovators across the African continent, building a network of talented
              individuals and teams.
            </p>
          </div>

          <div className="h-[400px] md:h-[500px] w-full bg-white rounded-xl shadow-md overflow-hidden">
            <CountryMap />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-purple-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Join the BlockBridge Community?</h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Create your on-chain identity, connect with opportunities, and start your innovation journey today.
            </p>
            <div className="pt-4">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-medium">
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

