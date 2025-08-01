"use client"

import { motion } from "framer-motion"
import { Heart, ArrowLeft, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function StoryPage() {
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
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-600 fill-rose-600" />
              <span className="text-lg md:text-xl font-serif text-gray-800">Kevin & Véronique</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-4xl">
        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-4">Notre Histoire</h1>
          <p className="text-lg md:text-xl text-gray-600">L'amour qui nous unit</p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8 md:space-y-12">
          {/* First Meeting */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-rose-600 mr-2" />
                      <span className="text-rose-600 font-semibold text-sm md:text-base">Septembre 2020</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-4">Notre Première Rencontre</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      C'était un vendredi soir dans un café du centre-ville. Véronique lisait tranquillement quand
                      Kevin, attiré par son sourire radieux, a trouvé le courage de l'aborder. Une conversation qui
                      devait durer quelques minutes s'est transformée en une soirée entière de rires et de découvertes
                      mutuelles.
                    </p>
                  </div>
                  <div className="relative h-48 md:h-64 rounded-lg overflow-hidden order-1 md:order-2">
                    <Image src="/images/couple-photo-2.jpg" alt="Première rencontre" fill className="object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* First Date */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-64 rounded-lg overflow-hidden md:order-1">
                    <Image src="/images/couple-photo-1.jpg" alt="Premier rendez-vous" fill className="object-cover" />
                  </div>
                  <div className="md:order-2">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-5 h-5 text-rose-600 mr-2" />
                      <span className="text-rose-600 font-semibold">Octobre 2020</span>
                    </div>
                    <h3 className="text-2xl font-serif text-gray-800 mb-4">Notre Premier Rendez-vous</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Kevin avait préparé une surprise : un pique-nique au coucher du soleil sur les hauteurs de la
                      ville. Véronique était émerveillée par tant d'attention. Ce jour-là, nous avons su que quelque
                      chose de spécial était en train de naître entre nous.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Moving In Together */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <Calendar className="w-5 h-5 text-rose-600 mr-2" />
                      <span className="text-rose-600 font-semibold">Mars 2022</span>
                    </div>
                    <h3 className="text-2xl font-serif text-gray-800 mb-4">Nos Moments de Bonheur</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Après deux années merveilleuses, nous avons décidé de franchir le pas et d'emménager ensemble.
                      Notre petit appartement est rapidement devenu notre cocon d'amour, rempli de rires, de projets et
                      de rêves partagés. Nous aimons passer du temps en famille et entre amis.
                    </p>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image src="/images/couple-photo-4.jpg" alt="Moments familiaux" fill className="object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Proposal */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-64 rounded-lg overflow-hidden md:order-1">
                    <Image src="/images/couple-photo-5.jpg" alt="Demande en mariage" fill className="object-cover" />
                  </div>
                  <div className="md:order-2">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-5 h-5 text-rose-600 mr-2" />
                      <span className="text-rose-600 font-semibold">Décembre 2023</span>
                    </div>
                    <h3 className="text-2xl font-serif text-gray-800 mb-4">La Demande en Mariage</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Lors d'une promenade romantique dans notre parc préféré, Kevin s'est agenouillé et a sorti la
                      bague de ses rêves. Les larmes de joie de Véronique ont été sa plus belle réponse. Ce "Oui" a
                      scellé notre engagement pour la vie.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Wedding Day */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Card className="bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 fill-white mr-2" />
                  <Calendar className="w-6 h-6 mr-2" />
                  <span className="text-xl font-semibold">15 Juin 2025</span>
                </div>
                <h3 className="text-3xl font-serif mb-4">Notre Grand Jour</h3>
                <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                  Aujourd'hui, nous écrivons un nouveau chapitre de notre histoire d'amour. Entourés de nos proches,
                  nous nous promettons fidélité, amour et complicité pour la vie. Merci d'être là pour partager ce
                  moment magique avec nous !
                </p>
                <div className="flex items-center justify-center mt-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Chic Events DFW, Paris</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <blockquote className="text-2xl font-serif text-gray-700 italic max-w-2xl mx-auto">
            "L'amour ne se regarde pas l'un l'autre, mais regarde ensemble dans la même direction."
          </blockquote>
          <p className="text-gray-500 mt-4">- Antoine de Saint-Exupéry</p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">© 2025 franckCodes. Tous droits réservés.</p>
      </div>
    </div>
  )
}
