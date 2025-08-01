// app/api/admin/verify-code/route.ts
import { NextRequest, NextResponse } from "next/server"

const CODE_CACHE: { [phone: string]: { code: string; expire: number } } = globalThis.__code_cache || (globalThis.__code_cache = {})

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json()
  if (!phone || !code) {
    return NextResponse.json({ error: "Champs manquants." }, { status: 400 })
  }
  const entry = CODE_CACHE[phone]
  if (!entry || entry.expire < Date.now()) {
    return NextResponse.json({ error: "Code expiré. Renvoyez un code." }, { status: 401 })
  }
  if (entry.code !== code) {
    return NextResponse.json({ error: "Code incorrect." }, { status: 401 })
  }

  // Supprime le code après utilisation (one-shot)
  delete CODE_CACHE[phone]
  return NextResponse.json({ success: true })
}
