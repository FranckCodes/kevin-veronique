"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, MapPin, Mail, Phone, Edit2, Check, X, Heart, UserCheck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Guest {
  id: number
  name: string
  phone: string
  email: string
  attendanceType: "solo" | "couple"
  partnerName?: string
  selectedSeat: string
  dietaryRestrictions?: string
  message?: string
  submittedAt: string
  guestCount: number
}

const SEATS = [
  { id: "A1", label: "Table A - Place 1" },
  { id: "A2", label: "Table A - Place 2" },
  { id: "A3", label: "Table A - Place 3" },
  { id: "A4", label: "Table A - Place 4" },
  { id: "B1", label: "Table B - Place 1" },
  { id: "B2", label: "Table B - Place 2" },
  { id: "B3", label: "Table B - Place 3" },
  { id: "B4", label: "Table B - Place 4" },
  { id: "C1", label: "Table C - Place 1" },
  { id: "C2", label: "Table C - Place 2" },
]

export default function AdminPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [editingSeat, setEditingSeat] = useState<number | null>(null)
  const [newSeat, setNewSeat] = useState("")
  const [stats, setStats] = useState({
    totalGuests: 0,
    totalPeople: 0,
    soloGuests: 0,
    coupleGuests: 0,
    newResponses: 0,
  })

  useEffect(() => {
    loadGuests()
  }, [])

  const loadGuests = () => {
    const savedGuests = JSON.parse(localStorage.getItem("wedding-guests") || "[]")
    setGuests(savedGuests)

    // Calculer les statistiques
    const totalGuests = savedGuests.length
    const totalPeople = savedGuests.reduce((sum: number, guest: Guest) => sum + guest.guestCount, 0)
    const soloGuests = savedGuests.filter((guest: Guest) => guest.attendanceType === "solo").length
    const coupleGuests = savedGuests.filter((guest: Guest) => guest.attendanceType === "couple").length

    // Nouvelles réponses (dernières 24h)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const newResponses = savedGuests.filter((guest: Guest) => new Date(guest.submittedAt) > yesterday).length

    setStats({
      totalGuests,
      totalPeople,
      soloGuests,
      coupleGuests,
      newResponses,
    })
  }

  const handleSeatChange = async (guestId: number, newSeatId: string) => {
    const updatedGuests = guests.map((guest) => (guest.id === guestId ? { ...guest, selectedSeat: newSeatId } : guest))

    setGuests(updatedGuests)
    localStorage.setItem("wedding-guests", JSON.stringify(updatedGuests))

    // Simuler l'envoi d'email de notification
    const guest = guests.find((g) => g.id === guestId)
    if (guest) {
      try {
        await fetch("/api/notify-seat-change", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guestEmail: guest.email,
            guestName: guest.name,
            oldSeat: guest.selectedSeat,
            newSeat: newSeatId,
          }),
        })
      } catch (error) {
        console.error("Erreur envoi email:", error)
      }
    }

    setEditingSeat(null)
    setNewSeat("")
  }

  const getSeatLabel = (seatId: string) => {
    const seat = SEATS.find((s) => s.id === seatId)
    return seat ? seat.label : seatId
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-serif text-gray-800 mb-2">Dashboard Mariage</h1>
          <p className="text-gray-600">Kevin & Véronique - 15 Juin 2025</p>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-rose-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.totalGuests}</div>
              <div className="text-sm text-gray-600">Invités</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.totalPeople}</div>
              <div className="text-sm text-gray-600">Personnes</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
            <CardContent className="p-4 text-center">
              <UserCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.soloGuests}</div>
              <div className="text-sm text-gray-600">Solo</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.coupleGuests}</div>
              <div className="text-sm text-gray-600">Couples</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.newResponses}</div>
              <div className="text-sm text-gray-600">Nouvelles</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contenu principal */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs defaultValue="guests" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guests">Liste des invités</TabsTrigger>
              <TabsTrigger value="seating">Plan de table</TabsTrigger>
            </TabsList>

            <TabsContent value="guests" className="mt-6">
              <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Invités confirmés ({guests.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {guests.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Aucun invité confirmé pour le moment</div>
                  ) : (
                    <div className="space-y-4">
                      {guests.map((guest) => (
                        <div key={guest.id} className="border rounded-lg p-4 hover:bg-rose-50 transition-colors">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-gray-800">{guest.name}</h3>
                                <Badge variant={guest.attendanceType === "couple" ? "default" : "secondary"}>
                                  {guest.attendanceType === "couple" ? "Couple" : "Solo"}
                                </Badge>
                                {guest.partnerName && (
                                  <span className="text-sm text-gray-600">+ {guest.partnerName}</span>
                                )}
                              </div>

                              <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 mr-1" />
                                  {guest.phone}
                                </div>
                                <div className="flex items-center">
                                  <Mail className="w-4 h-4 mr-1" />
                                  {guest.email}
                                </div>
                              </div>

                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1 text-rose-600" />
                                  {editingSeat === guest.id ? (
                                    <div className="flex items-center space-x-2">
                                      <select
                                        value={newSeat}
                                        onChange={(e) => setNewSeat(e.target.value)}
                                        className="text-sm border rounded px-2 py-1"
                                      >
                                        <option value="">Choisir...</option>
                                        {SEATS.map((seat) => (
                                          <option key={seat.id} value={seat.id}>
                                            {seat.label}
                                          </option>
                                        ))}
                                      </select>
                                      <Button
                                        size="sm"
                                        onClick={() => handleSeatChange(guest.id, newSeat)}
                                        disabled={!newSeat}
                                        className="h-6 w-6 p-0"
                                      >
                                        <Check className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setEditingSeat(null)
                                          setNewSeat("")
                                        }}
                                        className="h-6 w-6 p-0"
                                      >
                                        <X className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center space-x-2">
                                      <span>{getSeatLabel(guest.selectedSeat)}</span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                          setEditingSeat(guest.id)
                                          setNewSeat(guest.selectedSeat)
                                        }}
                                        className="h-6 w-6 p-0"
                                      >
                                        <Edit2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                                <div className="text-gray-500">{formatDate(guest.submittedAt)}</div>
                              </div>

                              {guest.dietaryRestrictions && (
                                <div className="mt-2 text-sm">
                                  <span className="font-medium text-orange-600">Restrictions:</span>{" "}
                                  {guest.dietaryRestrictions}
                                </div>
                              )}

                              {guest.message && (
                                <div className="mt-2 text-sm italic text-gray-600">"{guest.message}"</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seating" className="mt-6">
              <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Plan de table
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {["A", "B", "C"].map((table) => (
                      <div key={table} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-center mb-4 text-gray-800">Table {table}</h3>
                        <div className="space-y-2">
                          {SEATS.filter((seat) => seat.id.startsWith(table)).map((seat) => {
                            const guest = guests.find((g) => g.selectedSeat === seat.id)
                            return (
                              <div
                                key={seat.id}
                                className={`p-2 rounded text-sm ${
                                  guest ? "bg-rose-100 border-rose-200 border" : "bg-gray-50 border-gray-200 border"
                                }`}
                              >
                                <div className="font-medium">{seat.label}</div>
                                {guest ? (
                                  <div className="text-gray-600">
                                    {guest.name}
                                    {guest.partnerName && ` + ${guest.partnerName}`}
                                  </div>
                                ) : (
                                  <div className="text-gray-400">Libre</div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <Alert>
            <Heart className="h-4 w-4" />
            <AlertDescription>
              Les invités sont automatiquement notifiés par email lorsque vous modifiez leur place.
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
    </div>
  )
}
