import { NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

declare global {
  // On ajoute la propriété à l’interface globale
  // (TypeScript ne la met pas vraiment sur le globalThis, c’est juste pour le typage)
  var __code_cache: { [phone: string]: { code: string; expire: number } } | undefined
}

const ALLOWED_NUMBERS = ["+243827029543", "+1335161876"] // Mets tes numéros autorisés ici
const CODE_CACHE: { [phone: string]: { code: string; expire: number } } = globalThis.__code_cache || (globalThis.__code_cache = {})

export async function POST(req: NextRequest) {
  const { phone } = await req.json()
  if (!phone || !ALLOWED_NUMBERS.includes(phone)) {
    return NextResponse.json({ error: "Numéro non autorisé." }, { status: 401 })
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString()
  CODE_CACHE[phone] = { code, expire: Date.now() + 10 * 60 * 1000 }

        console.log(`[Wedding Admin] Code pour ${phone} = ${code}`)

  // ENVOI WHATSAPP AVEC TWILIO
  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    )
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM!,
      to: "whatsapp:" + phone.replace(/^whatsapp:/, ""), // Ajoute whatsapp: si pas déjà là
      body: `Votre code d'accès Admin Mariage : ${code}`,
    })

  } catch (err) {
    console.error("Erreur Twilio:", err)
    return NextResponse.json({ error: "Erreur d'envoi WhatsApp." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
