"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PDFGenerator } from "./pdf-generator"

type Table = {
  id: number
  name: string
  seats: { id: number; label: string; guest: any[] }[]
}

type Guest = {
  id: number
  name: string
  phone: string
  guestCount: number
  attendanceType?: string
  partnerName?: string
  dietaryRestrictions?: string
  message?: string
  seatId?: number | null
  seat?: { id: number; label: string; table: { name: string } }
}

type Props = {
  open: boolean
  guest: Guest | any
  tables: Table[]
  onClose: () => void
  onSave: () => void
}

export default function GuestEditDialog({ open, guest, tables, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guestCount: 1,
    attendanceType: "",
    partnerName: "",
    dietaryRestrictions: "",
    message: "",
    seatId: null as number | null,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (guest) {
      setForm({
        name: guest.name ?? "",
        phone: guest.phone ?? "",
        guestCount: guest.guestCount ?? 1,
        attendanceType: guest.attendanceType ?? "",
        partnerName: guest.partnerName ?? "",
        dietaryRestrictions: guest.dietaryRestrictions ?? "",
        message: guest.message ?? "",
        seatId: guest.seatId ?? null,
      })
      setError("")
    }
  }, [guest])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: name === "guestCount" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!guest) return

    setSaving(true)
    setError("")

    const res = await fetch(`/api/guests/${guest.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    setSaving(false)

    if (res.ok) {
      onSave()
      onClose()
    } else {
      const data = await res.json()
      setError(data?.error || "Erreur lors de la mise à jour.")
    }
  }

  // Create a guest object with current form data for PDF generation
  const currentGuest = guest
    ? {
        ...guest,
        ...form,
        seat: guest.seat || (form.seatId ? tables.flatMap((t) => t.seats).find((s) => s.id === form.seatId) : null),
      }
    : null

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Éditer l'invité</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Modifier les informations</TabsTrigger>
            <TabsTrigger value="pdf">Générer l'invitation PDF</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-sm">Nom</label>
                  <Input name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <label className="font-medium text-sm">Téléphone</label>
                  <Input name="phone" value={form.phone} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <label className="font-medium text-sm">Nombre de personnes</label>
                <Input
                  type="number"
                  name="guestCount"
                  value={form.guestCount}
                  min={1}
                  max={5}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="font-medium text-sm">Type de présence</label>
                <select
                  name="attendanceType"
                  className="border rounded p-2 w-full"
                  value={form.attendanceType}
                  onChange={handleChange}
                >
                  <option value="">—</option>
                  <option value="solo">Seul(e)</option>
                  <option value="couple">En couple</option>
                </select>
              </div>

              {form.attendanceType === "couple" && (
                <div>
                  <label className="font-medium text-sm">Nom du partenaire</label>
                  <Input name="partnerName" value={form.partnerName} onChange={handleChange} required />
                </div>
              )}

              <div>
                <label className="font-medium text-sm">Restrictions alimentaires</label>
                <Input name="dietaryRestrictions" value={form.dietaryRestrictions} onChange={handleChange} />
              </div>

              <div>
                <label className="font-medium text-sm">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  rows={2}
                />
              </div>

              <div>
                <label className="font-medium text-sm">Attribuer une place</label>
                <select
                  name="seatId"
                  value={form.seatId ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, seatId: e.target.value ? Number(e.target.value) : null }))}
                  className="border rounded p-2 w-full"
                >
                  <option value="">Non attribuée (laisser au marié)</option>
                  {tables.map((table) => (
                    <optgroup key={table.id} label={table.name}>
                      {table.seats.map((seat) => (
                        <option
                          key={seat.id}
                          value={seat.id}
                          disabled={seat.guest.length > 0 && seat.id !== guest?.seatId}
                        >
                          {seat.label} {seat.guest.length > 0 && seat.id !== guest?.seatId ? " (occupée)" : ""}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <DialogFooter className="mt-4">
                <Button type="submit" className="bg-rose-500 text-white" disabled={saving}>
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={saving}>
                    Annuler
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="pdf" className="space-y-4">
            <div className="text-center py-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Invitation personnalisée pour {currentGuest?.name}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Générez une invitation PDF personnalisée avec les informations de l'invité
              </p>

              {currentGuest && (
                <PDFGenerator
                  guest={currentGuest}
                  onGenerated={() => {
                    // Optional: Show success message or close dialog
                    console.log("PDF generated successfully")
                  }}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
