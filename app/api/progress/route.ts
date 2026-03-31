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

    const { roadmap, section, topic, completed } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" }, 
        { status: 404 }
      )
    }

    await prisma.progress.upsert({
      where: {
        id: `${user.id}_${roadmap}_${section}_${topic}`.replace(/\s/g, "_"),
      },
      update: { completed },
      create: {
        id: `${user.id}_${roadmap}_${section}_${topic}`.replace(/\s/g, "_"),
        userId: user.id,
        roadmap,
        section,
        completed,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    )
  }
}
