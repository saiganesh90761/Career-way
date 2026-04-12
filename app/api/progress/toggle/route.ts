import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { roadmap, section, completed } = body
    console.log("Progress toggle request:", { roadmap, section, completed, userId: session.user.id })

    const existing = await prisma.progress.findFirst({
      where: {
        userId: session.user.id,
        roadmap,
        section,
      },
    })

    let progress;
    if (existing) {
      progress = await prisma.progress.update({
        where: { id: existing.id },
        data: { completed },
      })
    } else {
      progress = await prisma.progress.create({
        data: {
          userId: session.user.id,
          roadmap,
          section,
          completed,
        },
      })
    }

    return NextResponse.json(progress)
  } catch (error: any) {
    console.error("Error toggling progress:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
