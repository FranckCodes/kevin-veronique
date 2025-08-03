// app/api/guests/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  // On extrait TOUTES les infos modifiables possibles
  const {
    name,
    phone,
    guestCount,
    attendanceType,
    partnerName,
    dietaryRestrictions,
    message,
    seatId, // <-- Ici tu dois passer l'id de la place (number ou null)
  } = body;

  // Petite validation basique
  if (!name || !phone) {
    return NextResponse.json({ error: "Nom ou téléphone manquant" }, { status: 400 });
  }

  // Met à jour toutes les infos (seatId nullable !)
  const updatedGuest = await prisma.guest.update({
    where: { id: Number(id) },
    data: {
      name,
      phone,
      guestCount: Number(guestCount) || 1,
      attendanceType,
      partnerName,
      dietaryRestrictions,
      message,
      seatId: seatId === null || seatId === undefined || seatId === "" ? null : Number(seatId),
    },
    include: {
      seat: { include: { table: true } }
    }
  });

  return NextResponse.json(updatedGuest);
}
