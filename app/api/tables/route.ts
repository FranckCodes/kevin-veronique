// app/api/tables/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const tables = await prisma.weddingTable.findMany({
      include: {
        seats: {
          include: { guest: true }
        }
      }
    })
    return NextResponse.json(tables)
  } catch (err) {
    console.error("GET /api/tables", err)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name } = body
    if (!name) return NextResponse.json({ error: "Nom requis" }, { status: 400 })

    const table = await prisma.weddingTable.create({
      data: { name }
    })
    return NextResponse.json(table, { status: 201 })
  } catch (err) {
    console.error("POST /api/tables", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
