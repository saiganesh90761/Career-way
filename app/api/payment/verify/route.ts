import { NextResponse } from "next/server"
import { auth } from "@/auth"
import crypto from "crypto"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      )
    }

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = await req.json()

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid signature" }, 
        { status: 400 }
      )
    }

    // Update user to paid
    await prisma.user.update({
      where: { email: session.user?.email! },
      data: { isPaid: true },
    })

    // Save payment record
    await prisma.payment.create({
      data: {
        userId: session.user?.id!,
        amount: 20000,
        status: "success",
        orderId: razorpay_order_id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Verification failed" }, 
      { status: 500 }
    )
  }
}
