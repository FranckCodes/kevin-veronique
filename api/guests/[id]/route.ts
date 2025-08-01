// app/api/guests/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const { selectedSeat } = body;

  if (!selectedSeat) {
    return NextResponse.json({ error: "Place manquante" }, { status: 400 });
  }

  const updatedGuest = await prisma.guest.update({
    where: { id: Number(id) },
    data: { selectedSeat },
  });

  return NextResponse.json(updatedGuest);
}
