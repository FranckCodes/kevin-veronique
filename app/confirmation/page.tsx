"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, Calendar, MapPin, Clock, Users, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "Invité"
  const guests = searchParams.get("guests") || "1"
  const seat = searchParams.get("seat") || "Non spécifiée"

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [-20, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <Card className="backdrop-blur-sm bg-white/90 border-rose-200 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              {/* Success animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  🎉
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-3xl md:text-4xl font-serif text-gray-800 mb-4"
              >
                Merci {name} !
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl text-gray-600 mb-8"
              >
                Votre présence est confirmée ! Nous avons hâte de célébrer avec vous ❤️
              </motion.p>

              {/* Confirmation details */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="bg-rose-50 rounded-lg p-6 mb-8"
              >
                <h3 className="font-semibold text-gray-800 mb-4">Récapitulatif de votre confirmation :</h3>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    {guests === "1" ? (
                      <User className="w-5 h-5 text-rose-600" />
                    ) : (
                      <Users className="w-5 h-5 text-rose-600" />
                    )}
                    <span className="text-gray-700">{guests === "1" ? "1 personne" : `${guests} personnes`}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-rose-600" />
                    <span className="text-gray-700">{seat}</span>
                  </div>
                </div>
              </motion.div>

              {/* Wedding details reminder */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="grid md:grid-cols-3 gap-4 mb-8"
              >
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-gray-600 mb-2" />
                  <p className="font-semibold text-gray-800">15 Juin 2025</p>
                  <p className="text-sm text-gray-600">Samedi</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-gray-600 mb-2" />
                  <p className="font-semibold text-gray-800">16h00</p>
                  <p className="text-sm text-gray-600">Cérémonie</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-gray-600 mb-2" />
                  <p className="font-semibold text-gray-800">Chic Events DFW</p>
                  <p className="text-sm text-gray-600">Texas, USA</p>
                </div>
              </motion.div>

              {/* Important note */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
              >
                <p className="text-blue-800 text-sm">
                  <strong>Note importante :</strong> Si les mariés modifient votre place, vous recevrez un email de
                  notification. Vous pourrez toujours faire une demande de changement si nécessaire.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <Link href="/">
                  <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700">
                    Retour à l'invitation
                  </Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
