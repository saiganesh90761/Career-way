"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"

interface PaymentButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function PaymentButton({ 
  className = "px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50",
  children = "Upgrade to Pro — ₹200/month"
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handlePayment() {
    setLoading(true)
    try {
      // Create order
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
      })
      
      if (res.status === 401) {
        router.push("/login?callbackUrl=" + encodeURIComponent(window.location.pathname))
        return
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create order");
      }

      const order = await res.json()

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "CareerWay",
        description: "Pro Plan - Monthly",
        order_id: order.id,
        handler: async function (response: any) {
          // Verify payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })

          const data = await verifyRes.json()
          if (data.success) {
            router.push("/dashboard?payment=success")
            router.refresh()
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#2563eb",
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button
        onClick={handlePayment}
        disabled={loading}
        className={className}
      >
        {loading ? "Processing..." : children}
      </button>
    </>
  )
}
