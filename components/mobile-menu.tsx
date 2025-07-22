"use client"

import Link from "next/link"
import { MenuIcon, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function MobileMenu() {
  const paymentOptions = [
    { type: "Send money", details: "0113313240", color: "bg-orange-500" },
    { type: "TILL NO", details: "4930086 [lipa na Mpesa]", color: "bg-green-500" },
    { type: "Paybill", details: "Business No: 247247 Account No.0790181410905", color: "bg-pink-500" },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/20">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-gray-900 text-white border-r border-gray-700">
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-bold text-white">ANONYMIKETECH</SheetTitle>
        </SheetHeader>
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="https://anonymiketech.surge.sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white hover:bg-gray-800"
          >
            Home
          </Link>

          {/* WhatsApp Support Button */}
          <Link
            href="https://wa.me/254113313240"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white hover:bg-green-700 bg-green-600"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Support
          </Link>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Other Payment Options</h3>
            <div className="grid gap-4">
              {paymentOptions.map((option, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-300">
                  <div className={`w-4 h-4 rounded-sm flex-shrink-0 mt-1 ${option.color}`} />
                  <div>
                    <p className="font-medium text-white">{option.type}:</p>
                    <p className="text-sm">{option.details}</p>
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
