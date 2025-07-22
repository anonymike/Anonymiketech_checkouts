"use client"
// Opt-out of static prerendering
export const dynamic = "force-dynamic"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Wallet, CreditCard, ReceiptText, DollarSign, Check } from "lucide-react"
import ParticlesBackground from "@/components/particles-background"
import MobileMenu from "@/components/mobile-menu" // Import the new MobileMenu component

export default function PesapalPaymentForm() {
  const [amount, setAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("") // This will store the formatted number
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState("") // This will store what the user types
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Add no-scroll class to body on main page to prevent scrolling
  useEffect(() => {
    document.body.classList.add("no-scroll")
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [])

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setDisplayPhoneNumber(value) // Always update display with what user types

    // Format the number for the backend
    // Ensure the number is at least 10 digits for 07/01 prefix before attempting conversion
    if (value.startsWith("07") && value.length >= 10) {
      value = "254" + value.substring(1) // Replace '0' with '254'
    } else if (value.startsWith("01") && value.length >= 10) {
      // Added 01 prefix handling
      value = "254" + value.substring(1) // Replace '0' with '254'
    } else if (value.startsWith("+2547") && value.length >= 13) {
      value = value.substring(1) // Remove the '+'
    } else if (value.startsWith("+2541") && value.length >= 13) {
      // Added +2541 prefix handling
      value = value.substring(1) // Remove the '+'
    } else if (value.startsWith("2547") && value.length >= 12) {
      // Already in 2547 format, do nothing
    } else if (value.startsWith("2541") && value.length >= 12) {
      // Added 2541 prefix handling
      // Already in 2541 format, do nothing
    }
    // You might want more robust validation here (e.g., regex for digits only)
    setPhoneNumber(value) // Set the formatted number for submission
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("handleSubmit called.") // Debugging log
    setLoading(true)

    console.log("--- Validation Check ---") // NEW DEBUG LOG
    console.log("Current amount:", amount) // NEW DEBUG LOG
    console.log("Current phoneNumber (formatted):", phoneNumber) // NEW DEBUG LOG
    console.log("Current displayPhoneNumber (raw):", displayPhoneNumber) // NEW DEBUG LOG

    // Use the formatted phoneNumber for submission
    if (
      !amount ||
      !phoneNumber ||
      phoneNumber.length < 12 || // Ensure it's 12 digits after formatting
      (!phoneNumber.startsWith("2547") && !phoneNumber.startsWith("2541")) // Ensure correct prefix
    ) {
      console.log("Validation failed. Details:") // Debugging log
      console.log("  !amount:", !amount)
      console.log("  !phoneNumber:", !phoneNumber)
      console.log("  phoneNumber.length:", phoneNumber.length) // NEW DEBUG LOG
      console.log("  phoneNumber.length < 12:", phoneNumber.length < 12)
      console.log("  !phoneNumber.startsWith('2547'):", !phoneNumber.startsWith("2547"))
      console.log("  !phoneNumber.startsWith('2541'):", !phoneNumber.startsWith("2541"))
      toast({
        title: "Error",
        description: "Please enter a valid amount and M-Pesa phone number (e.g., 07XXXXXXXX or 2547XXXXXXXX).",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    console.log("Validation passed. Initiating fetch...") // Debugging log
    try {
      const response = await fetch("/api/pesapal/stk-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number.parseFloat(amount), phoneNumber }), // Use the formatted phoneNumber
      })

      const data = await response.json()
      console.log("API response received:", data) // Debugging log

      if (response.ok) {
        console.log("API response OK. Redirecting...") // Debugging log
        toast({
          title: "Redirecting...",
          description: data.message,
        })
        // Redirect the user to Pesapal's payment page
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl
        } else {
          console.log("No redirect URL received.") // Debugging log
          toast({
            title: "Error",
            description: "No redirect URL received from Pesapal.",
            variant: "destructive",
          })
        }
      } else {
        console.log("API response NOT OK.", data.error) // Debugging log
        toast({
          title: "Payment Initiation Failed",
          description: data.error || "An unexpected error occurred.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error initiating payment (catch block):", error) // Debugging log
      toast({
        title: "Error",
        description: "Could not connect to the payment service. Please try again.",
        variant: "destructive",
      })
    } finally {
      console.log("Finally block: setting loading to false.") // Debugging log
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative">
      {/* Particles background layer */}
      <ParticlesBackground />
      {/* Overlay on top of the particles for better text readability */}
      <div className="absolute inset-0 -z-10 bg-black/70"></div>

      {/* Mobile Menu Button - positioned absolutely at top-left */}
      <div className="absolute top-4 left-4 z-20">
        <MobileMenu />
      </div>

      {/* Card component - remains centered and transparent, now on top of the animated background */}
      <Card className="w-full max-w-md shadow-lg rounded-lg relative overflow-hidden bg-transparent z-10">
        <CardHeader className="text-center pb-4 relative z-10">
          <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <img src="/images/anonymiketech-logo.jpeg" alt="ANONYMIKETECH Logo" className="h-10 w-10 object-contain" />
            ANONYMIKETECH CHECKOUTS
          </CardTitle>
          <CardDescription className="text-gray-100 mt-2">
            Your secure payment gateway powered by Anonymiketech systems.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-gray-100">
                Amount (KES)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 100.00"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber" className="text-gray-100">
                M-Pesa Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="e.g., 07XXXXXXXX or 2547XXXXXXXX"
                value={displayPhoneNumber}
                onChange={handlePhoneNumberChange}
                required
                className="border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <Button
              type="submit"
              variant="ghost"
              className="w-full py-2 text-lg font-semibold pay-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin text-white" />
                  <span className="btn-text">Initiating Payment...</span>
                </>
              ) : (
                <>
                  <div className="icon-container">
                    <Wallet className="icon default-icon wallet-icon" />
                    <CreditCard className="icon card-icon" />
                    <ReceiptText className="icon payment-icon" />
                    <DollarSign className="icon dollar-icon" />
                    <Check className="icon check-icon" />
                  </div>
                  <span className="btn-text">Pay Now</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center text-center text-sm text-gray-100 mt-4 relative z-10 px-4">
          {'By clicking "Pay Now", you agree to our '}
          <a href="/terms-and-conditions" className="underline hover:text-blue-400 mx-1">
            terms and conditions
          </a>
          {"."}
        </CardFooter>
      </Card>
    </div>
  )
}
