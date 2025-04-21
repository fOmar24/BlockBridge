import Link from "next/link"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/5 py-10">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl">
        <div className="space-y-4">
          <h3 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
            BlockBridge
          </h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Empowering African innovators to build on-chain identities, collaborate globally, and access micro-grants.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-500 hover:text-purple-600">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-purple-600">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-purple-600">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-purple-600">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-4">Platform</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/dashboard" className="text-gray-500 hover:text-purple-600">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/profiles" className="text-gray-500 hover:text-purple-600">
                Profiles
              </Link>
            </li>
            <li>
              <Link href="/grants" className="text-gray-500 hover:text-purple-600">
                Micro-Grants
              </Link>
            </li>
            <li>
              <Link href="/leaderboard" className="text-gray-500 hover:text-purple-600">
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-4">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/docs" className="text-gray-500 hover:text-purple-600">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="/tutorials" className="text-gray-500 hover:text-purple-600">
                Tutorials
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-500 hover:text-purple-600">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/community" className="text-gray-500 hover:text-purple-600">
                Community
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/about" className="text-gray-500 hover:text-purple-600">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="text-gray-500 hover:text-purple-600">
                Roadmap
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-500 hover:text-purple-600">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-500 hover:text-purple-600">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 BlockBridge. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-purple-600">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-purple-600">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-purple-600">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

