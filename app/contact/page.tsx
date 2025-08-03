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

    // Simulate send
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccess(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    setTimeout(() => setShowSuccess(false), 5000)
  }

  const handleWhatsAppClick = () => {
    const message = "Hello Véronique! I'm reaching out about your wedding."
    const phoneNumber = "33612345678"
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  const handleMessengerClick = () => {
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
              Back to Home
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-600">We are here to answer your questions</p>
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
                <CardTitle className="text-2xl font-serif text-gray-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Phone className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">Véronique: +33 6 12 34 56 78</p>
                    <p className="text-gray-600">Kevin: +33 6 87 65 43 21</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Mail className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">contact@veroniqueetkevin.fr</p>
                    <p className="text-gray-600">wedding2025@veroniqueetkevin.fr</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600">Texas, USA</p>
                    <p className="text-gray-600">Available for appointment</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">Need an immediate answer? Contact Véronique directly:</p>

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

                <p className="text-sm opacity-90">Véronique usually replies within the hour!</p>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-gray-800">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Follow our wedding preparations and happy moments on social media!
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
                <CardTitle className="text-2xl font-serif text-gray-800">Send us a message</CardTitle>
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
                      Thank you! Your message was sent successfully.
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
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
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="Ex: Venue, RSVP, question, etc."
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
                      placeholder="Your message..."
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
                        Sending...
                      </div>
                    ) : (
                      "Send message"
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">We commit to respond within 24 hours</p>
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
              <CardTitle className="text-2xl font-serif text-gray-800 text-center">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Can I bring a plus-one?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Yes, please specify this when you RSVP or contact us directly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Is there a dress code?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Evening attire recommended. Please avoid white (reserved for the bride).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Is the venue accessible?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Yes, the venue is fully accessible for guests with reduced mobility.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Can I take photos?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Yes, but we kindly ask you to respect the ceremony moments.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Are there vegetarian options?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Absolutely! Please let us know your dietary preferences when you RSVP.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                      Until what time does the party last?
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      The party goes until 2:00 AM with shuttle service available.
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
        <p className="text-gray-500 text-sm">© 2025 franckCodes. All rights reserved.</p>
      </div>
    </div>
  )
}
