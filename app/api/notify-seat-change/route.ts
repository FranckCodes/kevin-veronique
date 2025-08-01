import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { guestEmail, guestName, oldSeat, newSeat } = await request.json()

    // Ici vous intégreriez votre service d'email (SendGrid, Mailjet, etc.)
    // Pour la démo, on simule l'envoi
    console.log("Notification email envoyée:", {
      to: guestEmail,
      subject: "Modification de votre place - Mariage Sarah & Marcus",
      message: `Bonjour ${guestName}, votre place a été modifiée de ${oldSeat} vers ${newSeat}`,
    })

    // Simulation d'un délai d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Email de notification envoyé",
    })
  } catch (error) {
    console.error("Erreur envoi email:", error)
    return NextResponse.json({ success: false, error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
  }
}
