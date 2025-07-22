"use client"

// The callback relies on search params & router – disable SSG
export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation" // Import useRouter
import { Button } from "@/components/ui/button"

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [paymentStatus, setPaymentStatus] = useState("pending") // pending, success, failed, error
  const [statusMessage, setStatusMessage] = useState("Checking payment status...")
  const [orderTrackingId, setOrderTrackingId] = useState<string | null>(null)
  const [merchantReference, setMerchantReference] = useState<string | null>(null)
  const router = useRouter() // Initialize useRouter

  useEffect(() => {
    const orderTrackingIdParam = searchParams.get("OrderTrackingId")
    const orderNotificationTypeParam = searchParams.get("OrderNotificationType")
    const orderMerchantReferenceParam = searchParams.get("OrderMerchantReference")

    setOrderTrackingId(orderTrackingIdParam)
    setMerchantReference(orderMerchantReferenceParam)

    if (orderTrackingIdParam) {
      const fetchPaymentStatus = async () => {
        try {
          const response = await fetch(`/api/pesapal/get-transaction-status?orderTrackingId=${orderTrackingIdParam}`)
          const data = await response.json()

          if (response.ok) {
            const status = data.status // Assuming 'status' field like 'COMPLETED', 'FAILED', 'PENDING'
            setPaymentStatus(status === "COMPLETED" ? "success" : status === "FAILED" ? "failed" : "pending")
            setStatusMessage(data.message || `Payment status: ${status}`)
            toast({
              title: "Payment Update",
              description: data.message || `Payment status: ${status}`,
              variant: status === "COMPLETED" ? "default" : "destructive",
            })
          } else {
            setPaymentStatus("error")
            setStatusMessage(data.error || "Failed to retrieve payment status.")
            toast({
              title: "Error",
              description: data.error || "Failed to retrieve payment status.",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error("Error fetching payment status:", error)
          setPaymentStatus("error")
          setStatusMessage("An error occurred while checking payment status.")
          toast({
            title: "Error",
            description: "An error occurred while checking payment status.",
            variant: "destructive",
          })
        }
      }
      fetchPaymentStatus()
    } else {
      setPaymentStatus("error")
      setStatusMessage("No Order Tracking ID found in URL. Invalid callback.")
      toast({
        title: "Error",
        description: "No Order Tracking ID found in URL. Invalid callback.",
        variant: "destructive",
      })
    }
  }, [searchParams, toast])

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "pending":
        return <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
      case "success":
        return <CheckCircle2 className="h-16 w-16 text-green-500" />
      case "failed":
        return <XCircle className="h-16 w-16 text-red-500" />
      case "error":
        return <XCircle className="h-16 w-16 text-gray-500" />
      default:
        return null
    }
  }

  const getStatusCardClass = () => {
    switch (paymentStatus) {
      case "success":
        return "border-green-500 shadow-lg"
      case "failed":
        return "border-red-500 shadow-lg"
      case "error":
        return "border-gray-500 shadow-lg"
      default:
        return "border-blue-500 shadow-lg"
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className={`w-full max-w-md text-center ${getStatusCardClass()}`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Payment Status</CardTitle>
          <CardDescription className="mt-2">Details about your recent transaction.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 p-6">
          {getStatusIcon()}
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-50">{statusMessage}</p>
          {orderTrackingId && (
            <p className="text-sm text-muted-foreground">
              Order Tracking ID: <span className="font-mono font-medium">{orderTrackingId}</span>
            </p>
          )}
          {merchantReference && (
            <p className="text-sm text-muted-foreground">
              Your Reference: <span className="font-mono font-medium">{merchantReference}</span>
            </p>
          )}
          {paymentStatus === "success" && (
            <p className="text-base text-green-600 font-medium">Your payment was successful! Thank you.</p>
          )}
          {(paymentStatus === "failed" || paymentStatus === "error") && (
            <p className="text-base text-red-600 font-medium">
              There was an issue with your payment. Please try again or contact support.
            </p>
          )}
          <Button
            onClick={() => router.push("/")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
