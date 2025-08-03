"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit2, Check, X, Users, MapPin, Printer, FileSpreadsheet } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import GuestEditDialog from "@/components/GuestEditDialog"

type Guest = {
  id: number
  name: string
  phone: string
  seatId?: number | null
  seat?: { id: number; label: string; table: { name: string } }
}

export default function AdminPage() {
  // Auth (réutilise ta logique à code)
  const [auth, setAuth] = useState(typeof window !== "undefined" && localStorage.getItem("wedding-admin-auth") === "OK")
  const [modalOpen, setModalOpen] = useState(!auth)
  const [phone, setPhone] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState("")
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeError, setCodeError] = useState("")
  const router = useRouter()

  // Admin data
  const [tablesData, setTablesData] = useState<any[]>([])
  const [guestsData, setGuestsData] = useState<any[]>([])
  const [newTable, setNewTable] = useState("")
  const [newSeat, setNewSeat] = useState({ tableId: 0, label: "" })
  const [loading, setLoading] = useState(false)
  const [editingGuest, setEditingGuest] = useState<any | null>(null)

  // Fetch data
  useEffect(() => {
    if (!auth) return
    setLoading(true)
    Promise.all([fetch("/api/tables").then((r) => r.json()), fetch("/api/guests").then((r) => r.json())])
      .then(([tables, guests]) => {
        setTablesData(tables)
        setGuestsData(guests)
      })
      .finally(() => setLoading(false))
  }, [auth])

  // Calculs des statistiques
  const totalSeats = tablesData.reduce((acc, table) => acc + table.seats.length, 0)
  const occupiedSeats = tablesData.reduce(
    (acc, table) => acc + table.seats.filter((seat : any) => seat.guest.length > 0).length,
    0,
  )
  const freeSeats = totalSeats - occupiedSeats

  // Fonction d'export CSV
  const exportToCSV = () => {
    const headers = ["Nom", "Téléphone", "Table", "Place"]
    const csvContent = [
      headers.join(","),
      ...guestsData.map((guest) =>
        [
          `"${guest.name}"`,
          `"${guest.phone}"`,
          `"${guest.seat?.table?.name || "Non assigné"}"`,
          `"${guest.seat?.label || "Non assigné"}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "invites-mariage.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Fonction d'impression
  const printTable = () => {
    const printContent = document.getElementById("guests-table")?.innerHTML
    const originalContent = document.body.innerHTML

    document.body.innerHTML = `
      <div style="padding: 20px;">
        <h1 style="text-align: center; margin-bottom: 30px; font-family: serif;">Liste des Invités - Mariage</h1>
        <div style="margin-bottom: 20px;">
          <p><strong>Total invités:</strong> ${guestsData.length}</p>
          <p><strong>Total tables:</strong> ${tablesData.length}</p>
          <p><strong>Places occupées:</strong> ${occupiedSeats}/${totalSeats}</p>
        </div>
        ${printContent}
      </div>
    `

    window.print()
    document.body.innerHTML = originalContent
    window.location.reload()
  }

  // Auth modal
  const authModal = (
    <Dialog open={modalOpen}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Authentification admin</DialogTitle>
          <DialogDescription>Saisis ton numéro WhatsApp autorisé pour recevoir un code d'accès.</DialogDescription>
        </DialogHeader>
        {!codeSent ? (
          <>
            <input
              className="border rounded p-2 w-full mb-2"
              placeholder="Numéro WhatsApp (ex: +243...)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoFocus
            />
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
            <input
              className="border rounded p-2 w-full mb-2"
              placeholder="Code reçu"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
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
            <Button
              variant="ghost"
              className="mt-2"
              onClick={() => {
                setCodeSent(false)
                setCode("")
              }}
            >
              <span className="text-sm">Renvoyer un code</span>
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )

  if (!auth) return authModal

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <svg
          className="animate-spin h-8 w-8 text-rose-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <span className="ml-4 text-rose-500 text-lg font-medium">Chargement...</span>
      </div>
    )
  }

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
    const tables = await fetch("/api/tables").then((r) => r.json())
    setTablesData(tables)
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
    const tables = await fetch("/api/tables").then((r) => r.json())
    setTablesData(tables)
    setLoading(false)
  }

  // --- Admin interface ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* HEADER + LOGOUT */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-4xl font-serif text-gray-800 text-center flex-1">Dashboard Mariage</h1>
          <Button
            variant="outline"
            className="w-full md:w-auto bg-transparent"
            onClick={() => {
              localStorage.removeItem("wedding-admin-auth")
              router.push("/")
            }}
          >
            Déconnexion
          </Button>
        </div>

        {/* STATISTIQUES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Invités</p>
                  <p className="text-3xl font-bold">{guestsData.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Tables</p>
                  <p className="text-3xl font-bold">{tablesData.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Places Occupées</p>
                  <p className="text-3xl font-bold">{occupiedSeats}</p>
                </div>
                <Check className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Places Libres</p>
                  <p className="text-3xl font-bold">{freeSeats}</p>
                </div>
                <X className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TABLES CRUD */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Créer une Table</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col md:flex-row items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                addTable()
              }}
            >
              <Input
                placeholder="Nom de la table (ex: VIP, Famille B...)"
                value={newTable}
                onChange={(e) => setNewTable(e.target.value)}
              />
              <Button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* SEATS PAR TABLE */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {tablesData.map((table) => {
            const occupiedSeatsCount = table.seats.filter((seat : any) => seat.guest.length > 0).length
            const totalSeatsCount = table.seats.length
            const freeSeatsCount = totalSeatsCount - occupiedSeatsCount

            return (
              <Card key={table.id} className="bg-white/90 shadow relative">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{table.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {freeSeatsCount} libres
                      </Badge>
                      <Badge variant="outline">{totalSeatsCount} total</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Ajout de place */}
                  <form
                    className="flex gap-2 mb-3"
                    onSubmit={(e) => {
                      e.preventDefault()
                      addSeat(table.id)
                    }}
                  >
                    <Input
                      placeholder="Nom de la place (ex: Place 1)"
                      value={table.id === newSeat.tableId ? newSeat.label : ""}
                      onChange={(e) => setNewSeat({ tableId: table.id, label: e.target.value })}
                    />
                    <Button type="submit" size="sm" className="bg-pink-500 text-white">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </form>
                  {/* Liste places */}
                  <div className="flex flex-wrap gap-2">
                    {table.seats.map((seat : any) => (
                      <Badge
                        key={seat.id}
                        variant={seat.guest.length ? "secondary" : "outline"}
                        className={
                          seat.guest.length ? "bg-gray-200 text-gray-600 line-through" : "bg-green-50 text-green-700"
                        }
                      >
                        {seat.label} {seat.guest.length ? "(réservée)" : ""}
                      </Badge>
                    ))}
                    {table.seats.length === 0 && <span className="text-gray-400 text-sm">Aucune place</span>}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* TABLEAU DES INVITÉS */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Invités confirmés ({guestsData.length})
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={printTable}>
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimer
                </Button>
                <Button variant="outline" size="sm" onClick={exportToCSV}>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Exporter CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div id="guests-table" className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Nom</TableHead>
                    <TableHead className="w-[150px]">Téléphone</TableHead>
                    <TableHead className="w-[120px]">Table</TableHead>
                    <TableHead className="w-[120px]">Place</TableHead>
                    <TableHead className="w-[100px]">Statut</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guestsData.map((guest) => (
                    <TableRow key={guest.id} className="hover:bg-pink-50/50">
                      <TableCell className="font-medium">{guest.name}</TableCell>
                      <TableCell>{guest.phone}</TableCell>
                      <TableCell>
                        {guest.seat?.table?.name ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {guest.seat.table.name}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                            Non assigné
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {guest.seat?.label ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {guest.seat.label}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                            Non assigné
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {guest.seat ? (
                          <Badge className="bg-green-500 text-white">Placé</Badge>
                        ) : (
                          <Badge variant="destructive">À placer</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingGuest(guest)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {guestsData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                        Aucun invité confirmé pour le moment
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* MODALE DÉTAIL INVITÉ */}
        <GuestEditDialog
          open={!!editingGuest}
          guest={editingGuest}
          tables={tablesData}
          onClose={() => setEditingGuest(null)}
          onSave={async () => {
            // Recharge la liste à la sauvegarde !
            const guests = await fetch("/api/guests").then((r) => r.json())
            setGuestsData(guests)
            // Tu peux aussi re-fetch les tables si besoin
            const tables = await fetch("/api/tables").then((r) => r.json())
            setTablesData(tables)
          }}
        />
      </div>
    </div>
  )
}
