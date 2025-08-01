"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowLeft, Heart, Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccess(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    setTimeout(() => setShowSuccess(false), 5000)
  }

  const handleWhatsAppClick = () => {
    const message = "Bonjour Sarah ! Je vous contacte concernant votre mariage."
    const phoneNumber = "33612345678" // Remplacer par le vrai numéro
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  const handleMessengerClick = () => {
    // Remplacer par le vrai lien Messenger
    window.open("https://m.me/sarah.kevin.wedding", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-rose-600 hover:text-rose-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
              <span className="text-xl font-serif text-gray-800">Contact</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-6xl">
        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-4">Contactez-nous</h1>
          <p className="text-lg md:text-xl text-gray-600">Nous sommes là pour répondre à vos questions</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-gray-800">Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Phone className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Téléphone</h4>
                    <p className="text-gray-600">Véronique: +33 6 12 34 56 78</p>
                    <p className="text-gray-600">Kevin: +33 6 87 65 43 21</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Mail className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">contact@veroniqueetkevin.fr</p>
                    <p className="text-gray-600">mariage2025@veroniqueetkevin.fr</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Adresse</h4>
                    <p className="text-gray-600">Texas, USA</p>
                    <p className="text-gray-600">Disponibles pour rendez-vous</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Contact Rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">Besoin d'une réponse immédiate ? Contactez Véronique directement :</p>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white h-12"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>

                  <Button
                    onClick={handleMessengerClick}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white h-12"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Messenger
                  </Button>
                </div>

                <p className="text-sm opacity-90">Véronique répond généralement dans l'heure qui suit !</p>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-gray-800">Suivez-nous</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Suivez nos préparatifs de mariage et nos moments de bonheur sur les réseaux sociaux !
                </p>

                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com/veroniqueetkevin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>

                  <a
                    href="https://instagram.com/veroniqueetkevin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>

                  <a
                    href="https://twitter.com/veroniqueetkevin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-gray-800">Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg text-green-800"
                  >
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Merci ! Votre message a été envoyé avec succès.
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="Ex: Question sur le lieu, RSVP, etc."
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      rows={6}
                      placeholder="Votre message..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </div>
                    ) : (
                      "Envoyer le message"
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">Nous nous engageons à répondre dans les 24 heures</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-gray-800 text-center">Questions Fréquentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Puis-je amener un accompagnateur ?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Oui, précisez-le lors de votre RSVP ou contactez-nous directement.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Y a-t-il un code vestimentaire ?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Tenue de soirée recommandée. Évitez le blanc (réservé à la mariée).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Le lieu est-il accessible ?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Oui, le château est entièrement accessible aux personnes à mobilité réduite.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Puis-je prendre des photos ?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Oui, mais nous demandons de respecter les moments de cérémonie.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Y a-t-il des options végétariennes ?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Absolument ! Précisez vos préférences alimentaires lors du RSVP.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Jusqu'à quelle heure dure la fête ?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      La soirée se termine à 2h du matin avec possibilité de navette.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">© 2025 franckCodes. Tous droits réservés.</p>
      </div>
    </div>
  )
}
