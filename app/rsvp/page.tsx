"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Users, User, MapPin, Calendar, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const SEATS = [
  { id: "A1", label: "Table A - Place 1", available: true },
  { id: "A2", label: "Table A - Place 2", available: true },
  { id: "A3", label: "Table A - Place 3", available: false },
  { id: "A4", label: "Table A - Place 4", available: true },
  { id: "B1", label: "Table B - Place 1", available: true },
  { id: "B2", label: "Table B - Place 2", available: true },
  { id: "B3", label: "Table B - Place 3", available: true },
  { id: "B4", label: "Table B - Place 4", available: false },
  { id: "C1", label: "Table C - Place 1", available: true },
  { id: "C2", label: "Table C - Place 2", available: true },
]

export default function RSVPPage() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: searchParams?.get("name") || "",
    phone: searchParams?.get("phone") || "",
    message: searchParams?.get("message") || "",
    attendanceType: "",
    partnerName: "",
    selectedSeat: "",
    dietaryRestrictions: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAttendanceChange = (value: string) => {
    setFormData({
      ...formData,
      attendanceType: value,
      partnerName: value === "solo" ? "" : formData.partnerName,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Sauvegarder dans localStorage pour simulation
    const guestData = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      guestCount: formData.attendanceType === "couple" ? 2 : 1,
    }

    const existingGuests = JSON.parse(localStorage.getItem("wedding-guests") || "[]")
    existingGuests.push(guestData)
    localStorage.setItem("wedding-guests", JSON.stringify(existingGuests))

    setIsSubmitting(false)
    setShowSuccess(true)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600 fill-green-600" />
              </div>
              <h2 className="text-2xl font-serif text-gray-800 mb-4">Merci !</h2>
              <p className="text-gray-600 mb-6">
                Votre confirmation a été reçue. Nous avons hâte de vous voir le 15 juin !
              </p>
              <Link href="/">
                <Button className="bg-rose-500 hover:bg-rose-600 text-white">Retour à l'accueil</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-4 md:py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <Link href="/" className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Retour à l'accueil</span>
            <span className="sm:hidden">Retour</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-800 mb-2">Confirmation de présence</h1>
          <p className="text-gray-600 text-sm md:text-base">Kevin & Véronique - 07 Août 2025</p>
        </motion.div>

        {/* Wedding Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-rose-200">
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-rose-600 mb-2" />
                  <p className="font-semibold text-gray-800 text-sm md:text-base">07 Août 2025</p>
                  <p className="text-xs md:text-sm text-gray-600">Jeudi</p>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-rose-600 mb-2" />
                  <p className="font-semibold text-gray-800 text-sm md:text-base">13h00</p>
                  <p className="text-xs md:text-sm text-gray-600">Cérémonie</p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-rose-600 mb-2" />
                  <p className="font-semibold text-gray-800 text-sm md:text-base text-center">Chic Events DFW</p>
                  <p className="text-xs md:text-sm text-gray-600">Texas, USA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RSVP Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-gray-800 text-center">Vos informations</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm md:text-base">
                      Nom complet *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-11 md:h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm md:text-base">
                      Téléphone *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-11 md:h-12"
                    />
                  </div>
                </div>



                {/* Type de participation */}
                <div>
                  <Label className="text-base font-medium">Je viens *</Label>
                  <RadioGroup value={formData.attendanceType} onValueChange={handleAttendanceChange} className="mt-2">
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-rose-50 transition-colors">
                      <RadioGroupItem value="solo" id="solo" />
                      <Label htmlFor="solo" className="flex items-center cursor-pointer text-sm md:text-base">
                        <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-rose-600" />
                        Seul(e)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-rose-50 transition-colors">
                      <RadioGroupItem value="couple" id="couple" />
                      <Label htmlFor="couple" className="flex items-center cursor-pointer">
                        <Users className="w-5 h-5 mr-2 text-rose-600" />
                        En couple
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Nom du partenaire si couple */}
                {formData.attendanceType === "couple" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="partnerName">Nom de votre partenaire *</Label>
                    <Input
                      id="partnerName"
                      name="partnerName"
                      value={formData.partnerName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="Nom complet de votre partenaire"
                    />
                  </motion.div>
                )}

                {/* Choix de place */}
                {formData.attendanceType && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="selectedSeat">Choix de place *</Label>
                    <select
                      id="selectedSeat"
                      name="selectedSeat"
                      value={formData.selectedSeat}
                      onChange={(e) => setFormData({ ...formData, selectedSeat: e.target.value })}
                      required
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    >
                      <option value="">Sélectionnez votre place</option>
                      {SEATS.filter((seat) => seat.available).map((seat) => (
                        <option key={seat.id} value={seat.id}>
                          {seat.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}

                {/* Restrictions alimentaires */}
                <div>
                  <Label htmlFor="dietaryRestrictions">Restrictions alimentaires</Label>
                  <Textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={2}
                    placeholder="Allergies, régimes spéciaux..."
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">Message pour les mariés</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1"
                    rows={3}
                    placeholder="Un petit mot pour Véronique et Kevin..."
                  />
                </div>

                <Alert>
                  <Heart className="h-4 w-4" />
                  <AlertDescription>
                    Vos informations sont sécurisées et ne seront utilisées que pour l'organisation du mariage.
                  </AlertDescription>
                </Alert>

                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.name ||
                    !formData.phone ||
                    !formData.attendanceType ||
                    !formData.selectedSeat
                  }
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    "Confirmer ma présence"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
