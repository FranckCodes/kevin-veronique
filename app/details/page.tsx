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
              <span className="hidden sm:inline">Retour à l'accueil</span>
              <span className="sm:hidden">Retour</span>
            </Link>
            <h1 className="text-lg md:text-xl font-serif text-gray-800">Détails du Mariage</h1>
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-4">Détails de la Cérémonie</h1>
          <p className="text-lg md:text-xl text-gray-600">Kevin & Véronique - 07 Août 2025</p>
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
                  <p className="text-base md:text-lg">Jeudi 07 Août 2025</p>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="w-10 h-10 md:w-12 md:h-12 mb-4" />
                  <h3 className="text-xl md:text-2xl font-serif mb-2">Heure</h3>
                  <p className="text-base md:text-lg">Cérémonie à 16h00</p>
                  <p className="text-sm opacity-90">Cocktail à 17h30</p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-10 h-10 md:w-12 md:h-12 mb-4" />
                  <h3 className="text-xl md:text-2xl font-serif mb-2">Lieu</h3>
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
              <CardTitle className="text-3xl font-serif text-gray-800 text-center">Le Chic Events DFW</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Un lieu d'exception</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Le Chic Events DFW, joyau historique situé au cœur de Paris, nous accueillera pour célébrer
                    notre union. Avec ses jardins à la française et son architecture élégante, ce lieu chargé d'histoire
                    offre un cadre romantique et raffiné pour notre grand jour.
                  </p>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-rose-600" />
                      <span>Hurst,TX</span>
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
                    alt="Chic Events DFW extérieur"
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
              <CardTitle className="text-2xl font-serif text-gray-800 text-center">Galerie du Lieu</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/salle/salle-8.jpg"
                    alt="Salle de réception"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                    <p className="text-xs md:text-sm font-medium">Salle de Réception</p>
                  </div>
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/salle/salle-6.jpg"
                    alt="Jardins du château"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                    <p className="text-sm font-medium">Jardins à la Française</p>
                  </div>
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/salle/salle-7.jpg"
                    alt="Salon d'honneur"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                    <p className="text-sm font-medium">Salon d'Honneur</p>
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
              <CardTitle className="text-2xl font-serif text-gray-800 text-center">Programme de la Journée</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Clock className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">16h00 - Cérémonie</h4>
                    <p className="text-gray-600">Échange des vœux dans les jardins du château</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Camera className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">17h00 - Photos</h4>
                    <p className="text-gray-600">Séance photo avec les familles et amis</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Utensils className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">17h30 - Cocktail</h4>
                    <p className="text-gray-600">Apéritif et amuse-bouches dans les jardins</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Utensils className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">19h30 - Dîner</h4>
                    <p className="text-gray-600">Repas gastronomique dans la salle de réception</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-rose-50 rounded-lg">
                  <Music className="w-6 h-6 text-rose-600" />
                  <div>
                    <h4 className="font-semibold text-gray-800">22h00 - Soirée dansante</h4>
                    <p className="text-gray-600">Musique et danse jusqu'au bout de la nuit</p>
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
                  Transport & Parking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong>En voiture :</strong> Parking gratuit disponible sur place
                  </p>
                  <p>
                    <strong>En transport :</strong> RER A - Station Rueil-Malmaison (15min à pied)
                  </p>
                  <p>
                    <strong>Navette :</strong> Service de navette depuis la gare (nous contacter)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-gray-800 flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-rose-600" />
                  Liste de Mariage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-600">
                  <p>Votre présence est le plus beau des cadeaux !</p>
                  <p>
                    <strong>Liste disponible chez :</strong>
                  </p>
                  <p>• Galeries Lafayette</p>
                  <p>• La Redoute Mariage</p>
                  <p>• Ou participation libre</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">© 2025 franckCodes. Tous droits réservés.</p>
      </div>
    </div>
  )
}
