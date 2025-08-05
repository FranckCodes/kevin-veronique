"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Calendar, MapPin, Clock, Facebook, Instagram, Mail, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MobileMenu } from "@/components/mobile-menu"
import { MobileOptimizedInput } from "@/components/mobile-optimized-input"
import { MobileOptimizedTextarea } from "@/components/mobile-optimized-textarea"
import { ImageCarousel } from "@/components/image-carousel"
import { useDeviceDetection } from "@/components/device-detector"

const carouselImages = [
  {
    src: "/images/couple-photo-1.jpg",
    alt: "Kevin and Véronique  - Romantic moment",
    title: "Our Love",
    description: "A tender moment in front of our house",
  },
  {
    src: "/images/couple-photo-2.jpg",
    alt: "Kevin and Véronique  - Artistic photo",
    title: "Elegance",
    description: "Our style in black and white",
  },
  {
    src: "/images/couple-photo-3.jpg",
    alt: "Kevin and Véronique  - Togetherness",
    title: "Togetherness",
    description: "Love in our eyes",
  },
  {
    src: "/images/couple-photo-4.jpg",
    alt: "Kevin and Véronique  - Family moments",
    title: "Family",
    description: "Our shared moments of happiness",
  },
  {
    src: "/images/couple-photo-5.jpg",
    alt: "Kevin and Véronique  - Tenderness",
    title: "Tenderness",
    description: "A kiss full of love",
  },
]

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showMobileForm, setShowMobileForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const device = useDeviceDetection()

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to RSVP page with pre-filled data
    const params = new URLSearchParams(formData)
    window.location.href = `/rsvp?${params.toString()}`
  }

  const handleMobileFormToggle = () => {
    setShowMobileForm(!showMobileForm)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
            </div>
            <div className="text-white">
              <div className="text-xl md:text-2xl font-serif font-bold">K&V</div>
              <div className="text-xs tracking-widest opacity-80">OUR UNION</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 text-white/90 text-sm tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <Link href="/story" className="hover:text-white transition-colors">
              OUR STORY
            </Link>
            <Link href="/details" className="hover:text-white transition-colors">
              DETAILS
            </Link>
            <Link href="/rsvp" className="hover:text-white transition-colors">
              RSVP
            </Link>
            <Link href="/gallery" className="hover:text-white transition-colors">
              GALLERY
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              CONTACT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <div className="w-4 h-4 flex flex-col justify-center space-y-1">
                <div className="w-4 h-0.5 bg-white"></div>
                <div className="w-4 h-0.5 bg-white"></div>
                <div className="w-4 h-0.5 bg-white"></div>
              </div>
            </button>
          </div>

          {/* Social Desktop */}
          <div className="hidden md:flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Facebook className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Background Carousel */}
      <div className="absolute inset-0">
        <ImageCarousel
          images={carouselImages}
          autoPlay={true}
          interval={6000}
          showControls={true}
          showIndicators={true}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center safe-area-top safe-area-bottom">
        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-20 lg:pt-0">
          {/* Left Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: showContent ? 0 : -100, opacity: showContent ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white text-center lg:text-left"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-6 md:mb-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-light mb-2 md:mb-4 leading-tight">
                Kevin & Véronique
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide opacity-90">
                Let's celebrate our union
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="space-y-3 md:space-y-4 mb-6 md:mb-8"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-3 md:space-x-4">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 opacity-80" />
                <span className="text-base md:text-lg">30 August 2025</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 md:space-x-4">
                <Clock className="w-4 h-4 md:w-5 md:h-5 opacity-80" />
                <span className="text-base md:text-lg">5:00 PM</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 md:space-x-4">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 opacity-80" />
                <span className="text-base md:text-lg text-center lg:text-left">Chic Events DFW, 514 Harwood rd Hurst, Hurst, TX</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-base md:text-lg font-light leading-relaxed opacity-90 max-w-md mx-auto lg:mx-0 text-center lg:text-left px-4 lg:px-0"
            >
              "We can't wait to share this magical moment with you. Your presence will make our day even more special."
            </motion.p>

            {/* Mobile CTA Button - Visible only on mobile when form is hidden */}
            {device.isMobile && !showMobileForm && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="mt-8 lg:hidden"
              >
                <Button
                  onClick={handleMobileFormToggle}
                  className="w-full max-w-sm mx-auto bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-4 h-14 text-lg font-medium shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="w-5 h-5 mr-2 fill-white" />
                  CONFIRM MY ATTENDANCE
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Right Form - Desktop always visible, Mobile conditional */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: showContent ? 0 : 100, opacity: showContent ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`lg:justify-self-end w-full max-w-md mx-auto lg:mx-0 ${device.isMobile ? "hidden lg:block" : ""}`}
          >
            <Card className="w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-2">Confirm your attendance</h3>
                  <p className="text-gray-600 text-sm">We can't wait to see you</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <MobileOptimizedInput
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                    />
                  </div>

                  <div>
                    <MobileOptimizedInput
                      name="phone"
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                    />
                  </div>

                  <div>
                    <MobileOptimizedTextarea
                      name="message"
                      placeholder="A little note for us..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 h-12 text-base md:text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    CONFIRM MY ATTENDANCE
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-500 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>contact@kevinveronique.wedding.com</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Mobile Form Modal */}
      <AnimatePresence>
        {device.isMobile && showMobileForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={handleMobileFormToggle}
            />

            {/* Modal Form */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden safe-area-bottom"
            >
              <Card className="w-full bg-white border-0 shadow-2xl rounded-t-3xl">
                <CardContent className="p-6">
                  {/* Header with close button */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center flex-1">
                      <h3 className="text-xl font-serif text-gray-800 mb-1">Confirm your attendance</h3>
                      <p className="text-gray-600 text-sm">We can't wait to see you</p>
                    </div>
                    <button
                      onClick={handleMobileFormToggle}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors ml-4"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <MobileOptimizedInput
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                      />
                    </div>

                    <div>
                      <MobileOptimizedInput
                        name="phone"
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                      />
                    </div>

                    <div>
                      <MobileOptimizedTextarea
                        name="message"
                        placeholder="A little note for us..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-4 h-14 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Heart className="w-5 h-5 mr-2 fill-white" />
                      CONFIRM MY ATTENDANCE
                    </Button>
                  </form>

                  {/* Contact info */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex flex-col items-center space-y-2 text-gray-500 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>06 12 34 56 78</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>contact@veroniqueetkevin.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 text-white/20"
            animate={{
              y: [-20, -100],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Heart className="w-full h-full fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Footer Copyright */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 z-40 px-4">
        <p className="text-white/60 text-xs md:text-sm text-center">© 2025 franckCodes. All rights reserved.</p>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </div>
  )
}
