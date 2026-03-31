import Razorpay from "razorpay"
import { NextResponse } from "next/server"
import { auth } from "@/auth"

export async function POST() {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      )
    }

    const order = await razorpay.orders.create({
      amount: 20000, // ₹200 in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    })

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" }, 
      { status: 500 }
    )
  }
}
