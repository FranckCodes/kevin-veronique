"use client"

import { motion } from "framer-motion"
import { ArrowLeft, MapPin, Clock, Calendar, Car, Utensils, Music, Camera, Gift, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function DetailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-rose-600 hover:text-rose-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <h1 className="text-lg md:text-xl font-serif text-gray-800">Wedding Details</h1>
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-4">Ceremony Details</h1>
          <p className="text-lg md:text-xl text-gray-600">Kevin & Véronique - 30 August 2025</p>
        </motion.div>

        {/* Date & Time */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-2xl">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="w-10 h-10 md:w-12 md:h-12 mb-4" />
                  <h3 className="text-xl md:text-2xl font-serif mb-2">Date</h3>
                  <p className="text-base md:text-lg">Saturday, 30 August 2025</p>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="w-10 h-10 md:w-12 md:h-12 mb-4" />
                  <h3 className="text-xl md:text-2xl font-serif mb-2">Time</h3>
                  <p className="text-base md:text-lg">Ceremony at 4:00 PM</p>
                  <p className="text-sm opacity-90">Cocktail at 5:30 PM</p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-10 h-10 md:w-12 md:h-12 mb-4" />
                  <h3 className="text-xl md:text-2xl font-serif mb-2">Venue</h3>
                  <p className="text-base md:text-lg">Chic Events DFW</p>
                  <p className="text-sm opacity-90">Texas, USA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Venue Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-gray-800 text-center">The Chic Events DFW</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">An Exceptional Venue</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The Chic Events DFW, a beautiful venue located in the heart of Texas, will host our celebration. With its elegant gardens and refined architecture, this historic place offers a romantic and unique setting for our big day.
                  </p>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-rose-600" />
                      <span>Hurst, TX</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-rose-600" />
                      <span>469-542-4716</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/images/salle/salle-3.jpg"
                    alt="Chic Events DFW exterior"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Venue Gallery */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-gray-800 text-center">Venue Gallery</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/salle/salle-8.jpg"
                    alt="Reception Hall"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                    <p className="text-xs md:text-sm font-medium">Reception Hall</p>
                  </div>
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/salle/salle-6.jpg"
                    alt="French Gardens"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                    <p className="text-sm font-medium">French Gardens</p>
                  </div>
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/salle/salle-7.jpg"
                    alt="Grand Lounge"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                    <p className="text-sm font-medium">Grand Lounge</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Program */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-gray-800 text-center">
                Evening Program
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Clock className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">7:00 PM - Start of the evening</h4>
                    <p className="text-gray-600">Guest welcome & seating</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Gift className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">8:00 PM - Couple Entrance</h4>
                    <p className="text-gray-600">Arrival and official presentation of the couple</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Utensils className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">10:00 PM - Dinner</h4>
                    <p className="text-gray-600">Festive meal & sharing around the table</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Music className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">After dinner - Party & Dance</h4>
                    <p className="text-gray-600">Let's party: dancing until 2:00 AM!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Practical Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-gray-800 flex items-center">
                  <Car className="w-5 h-5 mr-2 text-rose-600" />
                  Transportation & Parking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong>By car:</strong> Free parking available on site
                  </p>
                  <p>
                    <strong>By public transport:</strong> RER A - Rueil-Malmaison station (15 min walk)
                  </p>
                  <p>
                    <strong>Shuttle:</strong> Shuttle service from the station (contact us)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-gray-800 flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-rose-600" />
                  Wedding Gift List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-600">
                  <p>Your presence is the best gift!</p>
                  <p>
                    <strong>Gift list available at:</strong>
                  </p>
                  <p>• Galeries Lafayette</p>
                  <p>• La Redoute Wedding</p>
                  <p>• Or free participation</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">© 2025 franckCodes. All rights reserved.</p>
      </div>
    </div>
  )
}
