"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profiles", href: "/profiles" },
    { name: "Grants", href: "/grants" },
    { name: "Leaderboard", href: "/leaderboard" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
              BlockBridge
            </span>
          </Link>
        </div>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
                    BlockBridge
                  </span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 text-lg mt-8 px-7">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link href={item.href} className="hover:text-purple-600 transition-colors">
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-8 px-7 space-y-3">
                <SheetClose asChild>
                  <Button className="w-full" variant="outline">
                    Log In
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="w-full">Sign Up</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-6 text-sm font-medium flex-1 justify-center">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-purple-600">
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex flex-1 items-center justify-end space-x-4">
          {!isMobile && (
            <>
              <Button variant="ghost">Log In</Button>
              <Button>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

