// app/api/seats/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { label, tableId } = body
    if (!label || !tableId) return NextResponse.json({ error: "Champs requis" }, { status: 400 })

    const seat = await prisma.seat.create({
      data: {
        label,
        tableId: Number(tableId),
      }
    })
    return NextResponse.json(seat, { status: 201 })
  } catch (err) {
    console.error("POST /api/seats", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
