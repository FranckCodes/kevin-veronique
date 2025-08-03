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
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-4">Our Story</h1>
          <p className="text-lg md:text-xl text-gray-600">The love that unites us</p>
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
                      <span className="text-rose-600 font-semibold text-sm md:text-base">September 2020</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-4">Our First Meeting</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      It was a Friday evening in a downtown café. Véronique was quietly reading when Kevin, drawn by her radiant smile, found the courage to approach her. What was supposed to be just a short chat turned into a whole evening of laughter and discovery.
                    </p>
                  </div>
                  <div className="relative h-48 md:h-64 rounded-lg overflow-hidden order-1 md:order-2">
                    <Image src="/images/couple-photo-2.jpg" alt="First meeting" fill className="object-cover" />
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
                    <Image src="/images/couple-photo-1.jpg" alt="First date" fill className="object-cover" />
                  </div>
                  <div className="md:order-2">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-5 h-5 text-rose-600 mr-2" />
                      <span className="text-rose-600 font-semibold">October 2020</span>
                    </div>
                    <h3 className="text-2xl font-serif text-gray-800 mb-4">Our First Date</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Kevin had planned a surprise: a picnic at sunset on the heights overlooking the city. Véronique was amazed by such thoughtfulness. That day, we both knew that something special was blossoming between us.
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
                      <span className="text-rose-600 font-semibold">March 2022</span>
                    </div>
                    <h3 className="text-2xl font-serif text-gray-800 mb-4">Our Happy Moments</h3>
                    <p className="text-gray-600 leading-relaxed">
                      After two wonderful years, we decided to take the next step and move in together. Our small apartment quickly became our cozy love nest, filled with laughter, plans, and shared dreams. We love spending time with family and friends.
                    </p>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image src="/images/couple-photo-4.jpg" alt="Family moments" fill className="object-cover" />
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
                    <Image src="/images/couple-photo-5.jpg" alt="Proposal" fill className="object-cover" />
                  </div>
                  <div className="md:order-2">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-5 h-5 text-rose-600 mr-2" />
                      <span className="text-rose-600 font-semibold">December 2023</span>
                    </div>
                    <h3 className="text-2xl font-serif text-gray-800 mb-4">The Proposal</h3>
                    <p className="text-gray-600 leading-relaxed">
                      During a romantic walk in our favorite park, Kevin got down on one knee and presented the ring of her dreams. Véronique’s tears of joy were the most beautiful answer. That “Yes” sealed our commitment for life.
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
                  <span className="text-xl font-semibold">30 August 2025 at 5:00 PM</span>
                </div>
                <h3 className="text-3xl font-serif mb-4">Our Big Day</h3>
                <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                  Today, we are writing a new chapter in our love story. Surrounded by our loved ones, we pledge fidelity, love, and togetherness for life. Thank you for being here to share this magical moment with us!
                </p>
                <div className="flex items-center justify-center mt-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Chic Events DFW, Texas</span>
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
            "Love does not consist in gazing at each other, but in looking outward together in the same direction."
          </blockquote>
          <p className="text-gray-500 mt-4">- Antoine de Saint-Exupéry</p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">© 2025 franckCodes. All rights reserved.</p>
      </div>
    </div>
  )
}
