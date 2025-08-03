"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Table = {
  id: number
  name: string
  seats: { id: number; label: string; guest: any[] }[]
}

export default function RSVPPage() {
  const [tables, setTables] = useState<Table[]>([])
  const [selectedTable, setSelectedTable] = useState<number | "">("")
  const [selectedSeat, setSelectedSeat] = useState<number | "">("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendanceType: "",
    partnerName: "",
    dietaryRestrictions: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Fetch tables + seats
  useEffect(() => {
    fetch("/api/tables").then(res => res.json()).then(setTables)
  }, [])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // RSVP submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const body = {
      ...formData,
      guestCount: formData.attendanceType === "couple" ? 2 : 1,
      seatId: selectedSeat || null,
    }
    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    setIsSubmitting(false)
    if (res.ok) setShowSuccess(true)
    else alert("Error, please try again!")
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-serif mb-4">Thank you!</h2>
            <p className="mb-6 text-gray-600">Your confirmation has been received. See you at the wedding!</p>
            <Button href="/" asChild>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-serif">RSVP Confirmation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Guest Info */}
              <div>
                <Label>Full Name *</Label>
                <Input name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label>Phone *</Label>
                <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>

              {/* Attendance Type */}
              <div>
                <Label>I am coming *</Label>
                <div className="flex gap-3 mt-1">
                  <Button type="button" variant={formData.attendanceType === "solo" ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, attendanceType: "solo", partnerName: "" })}>
                    Alone
                  </Button>
                  <Button type="button" variant={formData.attendanceType === "couple" ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, attendanceType: "couple" })}>
                    As a couple
                  </Button>
                </div>
              </div>
              {formData.attendanceType === "couple" && (
                <div>
                  <Label>Partner's Name *</Label>
                  <Input name="partnerName" value={formData.partnerName} onChange={handleChange} required />
                </div>
              )}

              {/* Table Selection */}
              <div>
                <Label>Table selection</Label>
                <select className="border rounded w-full p-2 mt-1"
                  value={selectedTable}
                  onChange={e => { setSelectedTable(Number(e.target.value) || ""); setSelectedSeat("") }}
                >
                  <option value="">Let the couple choose for me</option>
                  {tables.map(table =>
                    <option key={table.id} value={table.id}>{table.name}</option>
                  )}
                </select>
              </div>

              {/* Seat Selection */}
              {selectedTable && (
                <div>
                  <Label>Seat selection</Label>
                  <select className="border rounded w-full p-2 mt-1"
                    value={selectedSeat}
                    onChange={e => setSelectedSeat(Number(e.target.value) || "")}
                  >
                    <option value="">Let the couple choose my seat</option>
                    {tables.find(t => t.id === selectedTable)?.seats
                      .filter(seat => seat.guest.length === 0)
                      .map(seat =>
                        <option key={seat.id} value={seat.id}>{seat.label}</option>
                      )}
                  </select>
                </div>
              )}

              {/* Dietary Restrictions */}
              <div>
                <Label>Dietary restrictions</Label>
                <Textarea name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} rows={2} />
              </div>
              {/* Message */}
              <div>
                <Label>Message for the couple</Label>
                <Textarea name="message" value={formData.message} onChange={handleChange} rows={2} />
              </div>

              {/* Submit */}
              <Button type="submit" disabled={isSubmitting || !formData.name || !formData.phone || !formData.attendanceType}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 text-lg font-medium">
                {isSubmitting ? "Sending..." : "Confirm my attendance"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
