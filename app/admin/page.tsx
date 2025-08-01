"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, UserCheck, Clock, MapPin, Edit2, Check, X, Trash2, Phone, Mail, User, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

export default function AdminPage() {
  const [guests, setGuests] = useState<any[]>([])
  const [seats, setSeats] = useState<any[]>([])
  const [editing, setEditing] = useState<{ id: number; seat: string } | null>(null)
  const [stats, setStats] = useState({ total: 0, totalPeople: 0, couples: 0, solos: 0 })
  const [newSeat, setNewSeat] = useState({ id: "", label: "" })
  const [loadingSeats, setLoadingSeats] = useState(false)
  const [errorSeat, setErrorSeat] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<any | null>(null) // État pour la modale

  // Charger les invités et places
  useEffect(() => {
    fetch("/api/guests").then(res => res.json()).then(setGuests)
    fetchSeats()
  }, [])

  const fetchSeats = () => {
    setLoadingSeats(true)
    fetch("/api/seats")
      .then(res => res.json())
      .then(setSeats)
      .finally(() => setLoadingSeats(false))
  }

  useEffect(() => {
    setStats({
      total: guests.length,
      totalPeople: guests.reduce((s, g) => s + g.guestCount, 0),
      couples: guests.filter(g => g.guestCount > 1).length,
      solos: guests.filter(g => g.guestCount === 1).length,
    })
  }, [guests])

  const handleEdit = (id: number, seat: string) => setEditing({ id, seat })
  const handleSave = async (id: number) => {
    await fetch(`/api/guests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selectedSeat: editing?.seat }),
    })
    setEditing(null)
    fetch("/api/guests").then(res => res.json()).then(setGuests)
  }

  // Ajouter une nouvelle place
  const handleNewSeat = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorSeat("")
    if (!newSeat.id.trim() || !newSeat.label.trim()) {
      setErrorSeat("ID et libellé obligatoires.")
      return
    }
    if (seats.some(s => s.id === newSeat.id)) {
      setErrorSeat("Cette place existe déjà.")
      return
    }
    await fetch("/api/seats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSeat),
    })
    setNewSeat({ id: "", label: "" })
    fetchSeats()
  }

  // Supprimer une place (optionnel)
  const handleDeleteSeat = async (id: string) => {
    if (!confirm("Supprimer cette place ?")) return
    await fetch(`/api/seats/${id}`, { method: "DELETE" })
    fetchSeats()
  }

  // Formatage de la date
  const formatDate = (date: string) =>
    new Date(date).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-serif text-gray-800 mb-6 text-center">Dashboard Mariage</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="text-center p-4"><Users className="mx-auto mb-2"/>{stats.total} invités</CardContent></Card>
          <Card><CardContent className="text-center p-4"><Heart className="mx-auto mb-2"/>{stats.totalPeople} personnes</CardContent></Card>
          <Card><CardContent className="text-center p-4"><UserCheck className="mx-auto mb-2"/>{stats.solos} solos</CardContent></Card>
          <Card><CardContent className="text-center p-4"><Clock className="mx-auto mb-2"/>{stats.couples} groupes</CardContent></Card>
        </div>

        {/* Formulaire de création de place */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Créer une nouvelle place / table</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex gap-2 flex-col md:flex-row items-center" onSubmit={handleNewSeat}>
              <input
                required placeholder="Ex: A1" className="border rounded p-2 w-32"
                value={newSeat.id}
                onChange={e => setNewSeat(ns => ({ ...ns, id: e.target.value }))}
              />
              <input
                required placeholder="Libellé (ex: Table A - Place 1)" className="border rounded p-2 flex-1"
                value={newSeat.label}
                onChange={e => setNewSeat(ns => ({ ...ns, label: e.target.value }))}
              />
              <Button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white w-full md:w-auto">Ajouter</Button>
            </form>
            {errorSeat && <div className="text-red-600 mt-2">{errorSeat}</div>}

            {/* Liste dynamique des places */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-gray-700">Places existantes :</h3>
              {loadingSeats ? (
                <div>Chargement…</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {seats.map(seat =>
                    <div key={seat.id} className="flex items-center gap-2 border rounded p-2 bg-white/90">
                      <span className="font-mono">{seat.id}</span>
                      <span>{seat.label}</span>
                      {/* <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => handleDeleteSeat(seat.id)}
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button> */}
                    </div>
                  )}
                  {seats.length === 0 && <div className="text-gray-400">Aucune place créée.</div>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Liste des invités */}
        <Card>
          <CardHeader>
            <CardTitle>Invités confirmés ({guests.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {guests.map(g =>
                <div
                  key={g.id}
                  className="p-4 border rounded flex items-center justify-between cursor-pointer hover:bg-rose-50"
                  onClick={() => setSelectedGuest(g)}
                  title="Afficher les détails"
                >
                  <div>
                    <div className="font-semibold">{g.name}</div>
                    <div className="text-gray-500 text-sm">{g.guestCount > 1 ? `${g.guestCount} personnes` : "1 personne"}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {editing?.id === g.id ? (
                      <>
                        <select
                          value={editing.seat}
                          onChange={e => setEditing({ ...editing, seat: e.target.value })}
                          className="border rounded p-1"
                          onClick={e => e.stopPropagation()} // Empêche l'ouverture de la modale si on clique dans le select
                        >
                          {seats.map(seat => (
                            <option key={seat.id} value={seat.id}>{seat.label}</option>
                          ))}
                        </select>
                        <Button size="sm" onClick={e => { e.stopPropagation(); handleSave(g.id); }}><Check /></Button>
                        <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); setEditing(null); }}><X /></Button>
                      </>
                    ) : (
                      <>
                        <span>{seats.find(s => s.id === g.selectedSeat)?.label || g.selectedSeat}</span>
                        <Button size="sm" variant="ghost" onClick={e => { e.stopPropagation(); handleEdit(g.id, g.selectedSeat); }}><Edit2 /></Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modale d'informations invité */}
        <Dialog open={!!selectedGuest} onOpenChange={(open) => { if (!open) setSelectedGuest(null) }}>
          <DialogContent className="max-w-lg">
            {selectedGuest && (
              <>
                <DialogHeader>
                  <DialogTitle>
                    <Info className="inline mr-2" />
                    Détail de l'invité
                  </DialogTitle>
                  <DialogDescription>
                    Toutes les informations transmises lors de la confirmation.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    <span className="font-bold">{selectedGuest.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <span>{selectedGuest.phone}</span>
                  </div>
                  {selectedGuest.attendanceType && (
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <span>{selectedGuest.attendanceType === "couple" ? "En couple" : "Seul(e)"} ({selectedGuest.guestCount} personne{selectedGuest.guestCount > 1 ? "s" : ""})</span>
                    </div>
                  )}
                  {selectedGuest.partnerName && (
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5" />
                      <span>Partenaire : {selectedGuest.partnerName}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span>
                      Place : {seats.find(s => s.id === selectedGuest.selectedSeat)?.label || selectedGuest.selectedSeat}
                    </span>
                  </div>
                  {selectedGuest.dietaryRestrictions && (
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">Restrictions :</span>
                      <span>{selectedGuest.dietaryRestrictions}</span>
                    </div>
                  )}
                  {selectedGuest.message && (
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">Message :</span>
                      <span className="italic">{selectedGuest.message}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Confirmation : {formatDate(selectedGuest.submittedAt)}</span>
                  </div>
                </div>
                <DialogFooter className="pt-2">
                  <DialogClose asChild>
                    <Button variant="outline">Fermer</Button>
                  </DialogClose>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </div>
  )
}
