// app/api/guests/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const guests = await prisma.guest.findMany();
  return NextResponse.json(guests);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, guestCount, selectedSeat } = body;
  if (!name || !guestCount || !selectedSeat) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }
  const guest = await prisma.guest.create({
    data: { name, guestCount: Number(guestCount), selectedSeat },
  });
  return NextResponse.json(guest, { status: 201 });
}
