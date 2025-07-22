"use client"

import Link from "next/link"
import { MenuIcon, Home, FileText, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function TermsMobileMenu() {
  const menuItems = [
    {
      href: "/",
      label: "Back to Main Page",
      icon: Home,
      description: "Return to payment form",
    },
    {
      href: "https://anonymiketech.surge.sh/",
      label: "ANONYMIKETECH Home",
      icon: Home,
      description: "Visit our main website",
      external: true,
    },
    {
      href: "/terms-and-conditions",
      label: "Terms & Conditions",
      icon: FileText,
      description: "Current page",
    },
  ]

  const contactOptions = [
    { type: "Send money", details: "0113313240", color: "bg-orange-500" },
    { type: "TILL NO", details: "4930086 [lipa na Mpesa]", color: "bg-green-500" },
    { type: "Paybill", details: "Business No: 247247 Account No.0790181410905", color: "bg-pink-500" },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/20 transition-colors">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-900 text-white border-r border-gray-700 w-80">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-bold text-white">ANONYMIKETECH</SheetTitle>
          <p className="text-sm text-gray-300">Navigation & Support</p>
        </SheetHeader>

        <nav className="space-y-6">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">Navigation</h3>
            <div className="space-y-3">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={index}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-300 transition-all hover:text-white hover:bg-gray-800 group"
                  >
                    <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* WhatsApp Support - Prominent placement */}
          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Get Support</h3>
            <Link
              href="https://wa.me/254113313240"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-4 py-3 bg-green-600 hover:bg-green-700 transition-all group w-full"
            >
              <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-white">WhatsApp Support</p>
                <p className="text-xs text-green-100">+254113313240</p>
              </div>
            </Link>
          </div>

          {/* Payment Options */}
          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Alternative Payment Options</h3>
            <div className="space-y-4">
              {contactOptions.map((option, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-300 p-3 rounded-lg bg-gray-800/50">
                  <div className={`w-4 h-4 rounded-sm flex-shrink-0 mt-1 ${option.color}`} />
                  <div>
                    <p className="font-medium text-white text-sm">{option.type}:</p>
                    <p className="text-xs text-gray-300 break-all">{option.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
