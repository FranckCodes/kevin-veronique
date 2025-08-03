"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, User, MapPin } from "lucide-react"

export default function ConfirmationPage() {
  const [name, setName] = useState("")
  const [guestCount, setGuestCount] = useState(1)
  const [selectedSeat, setSelectedSeat] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [seats, setSeats] = useState<{ id: string; label: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Load seat list from API
  useState(() => {
    fetch("/api/seats")
      .then((res) => res.json())
      .then(setSeats)
  },)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, guestCount, selectedSeat }),
    })
    if (res.ok) {
      setSubmitted(true)
    } else {
      const data = await res.json()
      setError(data.error || "Error while confirming")
    }
    setLoading(false)
  }

  if (submitted)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        <Card className="bg-white/90 border-rose-200 p-8 shadow-xl">
          <CardContent className="text-center">
            <motion.div animate={{ scale: [0.8, 1.2, 1] }}>
              <Heart className="w-14 h-14 text-rose-500 fill-rose-200 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-3xl font-serif mb-2 text-gray-800">Thank you {name || "Guest"}!</h1>
            <p className="text-xl text-gray-600 mb-2">Your presence is confirmed 🎉</p>
            <div className="my-6 flex justify-center gap-8">
              <div className="flex items-center gap-2 text-gray-700">
                {guestCount === 1 ? <User /> : <Users />}
                {guestCount} {guestCount > 1 ? "guests" : "guest"}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin />
                {selectedSeat || "Not specified"}
              </div>
            </div>
            <a href="/" className="inline-block mt-4">
              <Button>Back to invitation</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Card className="bg-white/90 border-rose-200 p-8 shadow-xl w-full max-w-lg">
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-serif text-gray-800 text-center mb-4">
              Confirm your attendance
            </h1>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
              <input
                required
                className="w-full border rounded p-2"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Number of guests</label>
              <input
                type="number"
                min={1}
                max={10}
                className="w-full border rounded p-2"
                value={guestCount}
                onChange={e => setGuestCount(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">Seat (table/seat)</label>
              <select
                required
                className="w-full border rounded p-2"
                value={selectedSeat}
                onChange={e => setSelectedSeat(e.target.value)}
              >
                <option value="">Select a seat...</option>
                {seats.map(seat => (
                  <option value={seat.id} key={seat.id}>{seat.label}</option>
                ))}
              </select>
            </div>

            {error && <div className="text-red-600">{error}</div>}

            <Button
              className="w-full bg-rose-500 hover:bg-rose-600 text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Confirm"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
