"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, Check, X, Users, MapPin, Info } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import GuestEditDialog from "@/components/GuestEditDialog"

type Table = {
  id: number
  name: string
  seats: { id: number; label: string; guest: any[] }[]
}

type Guest = {
  id: number
  name: string
  phone: string
  seatId?: number | null
  seat?: { id: number; label: string; table: { name: string } }
}

export default function AdminPage() {
  // Auth (réutilise ta logique à code)
  const [auth, setAuth] = useState(
    typeof window !== "undefined" && localStorage.getItem("wedding-admin-auth") === "OK"
  )
  const [modalOpen, setModalOpen] = useState(!auth)
  const [phone, setPhone] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState("")
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeError, setCodeError] = useState("")
  const router = useRouter()

  // Admin data
  const [tables, setTables] = useState<Table[]>([])
  const [guests, setGuests] = useState<Guest[]>([])
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [newTable, setNewTable] = useState("")
  const [newSeat, setNewSeat] = useState({ tableId: 0, label: "" })
  const [loading, setLoading] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)



  // Fetch data
  useEffect(() => {
    if (!auth) return
    setLoading(true)
    Promise.all([
      fetch("/api/tables").then(r => r.json()),
      fetch("/api/guests").then(r => r.json()),
    ]).then(([tables, guests]) => {
      setTables(tables)
      setGuests(guests)
    }).finally(() => setLoading(false))
  }, [auth])

    // Auth modal
    const authModal = (
      <Dialog open={modalOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Authentification admin</DialogTitle>
            <DialogDescription>
              Saisis ton numéro WhatsApp autorisé pour recevoir un code d’accès.
            </DialogDescription>
          </DialogHeader>
          {!codeSent ? (
            <>
              <input className="border rounded p-2 w-full mb-2" placeholder="Numéro WhatsApp (ex: +243...)" value={phone} onChange={e => setPhone(e.target.value)} autoFocus />
              <Button
                className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                onClick={async () => {
                  setCodeLoading(true)
                  setCodeError("")
                  const res = await fetch("/api/admin/send-code", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone }),
                  })
                  if (res.ok) setCodeSent(true)
                  else setCodeError((await res.json())?.error || "Erreur d'envoi.")
                  setCodeLoading(false)
                }}
                disabled={codeLoading || !phone.trim()}
              >
                {codeLoading ? "Envoi..." : "Recevoir le code"}
              </Button>
              {codeError && <div className="text-red-600 mt-2">{codeError}</div>}
            </>
          ) : (
            <>
              <input className="border rounded p-2 w-full mb-2" placeholder="Code reçu" value={code} onChange={e => setCode(e.target.value)} />
              <Button
                className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                onClick={async () => {
                  setCodeLoading(true)
                  setCodeError("")
                  const res = await fetch("/api/admin/verify-code", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone, code }),
                  })
                  if (res.ok) {
                    setAuth(true)
                    setModalOpen(false)
                    localStorage.setItem("wedding-admin-auth", "OK")
                  } else setCodeError((await res.json())?.error || "Code incorrect.")
                  setCodeLoading(false)
                }}
                disabled={codeLoading || !code.trim()}
              >
                {codeLoading ? "Vérification..." : "Valider"}
              </Button>
              {codeError && <div className="text-red-600 mt-2">{codeError}</div>}
              <Button variant="ghost" className="mt-2" onClick={() => { setCodeSent(false); setCode(""); }}>
                <span className="text-sm">Renvoyer un code</span>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    )
    if (!auth) return authModal

  // CRUD Tables
  const addTable = async () => {
    if (!newTable.trim()) return
    setLoading(true)
    await fetch("/api/tables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTable }),
    })
    setNewTable("")
    const tables = await fetch("/api/tables").then(r => r.json())
    setTables(tables)
    setLoading(false)
  }

  // CRUD Seats
  const addSeat = async (tableId: number) => {
    if (!newSeat.label.trim() || !tableId) return
    setLoading(true)
    await fetch("/api/seats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: newSeat.label, tableId }),
    })
    setNewSeat({ tableId: 0, label: "" })
    const tables = await fetch("/api/tables").then(r => r.json())
    setTables(tables)
    setLoading(false)
  }

  // --- Admin interface ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* HEADER + LOGOUT */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-4xl font-serif text-gray-800 text-center flex-1">Dashboard Mariage</h1>
          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => {
              localStorage.removeItem("wedding-admin-auth")
              router.push("/")
            }}
          >
            Déconnexion
          </Button>
        </div>

        {/* TABLES CRUD */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Créer une Table</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col md:flex-row items-center gap-2"
              onSubmit={e => { e.preventDefault(); addTable() }}
            >
              <Input placeholder="Nom de la table (ex: VIP, Famille B...)" value={newTable} onChange={e => setNewTable(e.target.value)} />
              <Button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white">Ajouter</Button>
            </form>
          </CardContent>
        </Card>

        {/* SEATS PAR TABLE */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {tables.map(table => (
            <Card key={table.id} className="bg-white/90 shadow">
              <CardHeader>
                <CardTitle>{table.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Ajout de place */}
                <form className="flex gap-2 mb-3" onSubmit={e => { e.preventDefault(); addSeat(table.id) }}>
                  <Input
                    placeholder="Nom de la place (ex: Place 1)"
                    value={table.id === newSeat.tableId ? newSeat.label : ""}
                    onChange={e => setNewSeat({ tableId: table.id, label: e.target.value })}
                  />
                  <Button type="submit" className="bg-pink-500 text-white">Ajouter</Button>
                </form>
                {/* Liste places */}
                <div className="flex flex-wrap gap-2">
                  {table.seats.map(seat =>
                    <span key={seat.id} className={`border rounded px-2 py-1 text-sm ${seat.guest.length ? "bg-gray-300 text-gray-500 line-through" : "bg-green-50"}`}>
                      {seat.label} {seat.guest.length ? "(réservée)" : ""}
                    </span>
                  )}
                  {table.seats.length === 0 && <span className="text-gray-400">Aucune place</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* LISTE DES INVITÉS */}
        <Card>
          <CardHeader>
            <CardTitle>Invités confirmés ({guests.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {guests.map(g =>
                <div key={g.id} className="border rounded px-3 py-2 flex justify-between items-center bg-white/80 cursor-pointer hover:bg-pink-50"
                  onClick={() => setEditingGuest(g)}>
                  <div>
                    <span className="font-bold">{g.name}</span> — <span>{g.phone}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="text-xs text-gray-600">
                      {g.seat?.table?.name ? `${g.seat.table.name}, ` : ""}
                      {g.seat?.label ? g.seat.label : <em className="text-pink-600">À attribuer</em>}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* MODALE DÉTAIL INVITÉ */}
        <GuestEditDialog
          open={!!editingGuest}
          guest={editingGuest}
          tables={tables}
          onClose={() => setEditingGuest(null)}
          onSave={async () => {
            // Recharge la liste à la sauvegarde !
            const guests = await fetch("/api/guests").then(r => r.json())
            setGuests(guests)
            // Tu peux aussi re-fetch les tables si besoin
            const tables = await fetch("/api/tables").then(r => r.json())
            setTables(tables)
          }}
        />
      </div>
    </div>
  )
}
