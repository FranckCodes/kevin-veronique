// app/api/guests/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"



export async function GET() {
  try {
    const guests = await prisma.guest.findMany({
      include: {
        seat: {
          include: {
            table: true
          }
        }
      }
    })
    return NextResponse.json(guests)
  } catch (err) {
    console.error("GET /api/guests", err)
    return NextResponse.json([], { status: 200 })
  }
}



export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, phone, guestCount, seatId, ...rest } = body
  if (!name || !phone || !guestCount) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 })
  }
  const guest = await prisma.guest.create({
    data: {
      name,
      phone,
      guestCount: Number(guestCount),
      seatId: seatId ? Number(seatId) : null,
      ...rest,
    },
  })
  return NextResponse.json(guest, { status: 201 })
}
