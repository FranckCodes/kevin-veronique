// app/api/seats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const seats = await prisma.seat.findMany();
  return NextResponse.json(seats);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, label } = body;
  if (!id || !label) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }
  const seat = await prisma.seat.create({
    data: { id, label },
  });
  return NextResponse.json(seat, { status: 201 });
}
