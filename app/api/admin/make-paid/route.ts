import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Update current logged in user to paid
    await prisma.user.update({
      where: { email: session.user.email },
      data: { isPaid: true },
    })

    return NextResponse.json({ 
      success: true,
      message: "User upgraded to Pro!"
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upgrade" },
      { status: 500 }
    )
  }
}
