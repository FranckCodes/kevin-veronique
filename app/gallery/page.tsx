"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Heart, Download, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

const galleryImages = Array.from({ length: 21 }, (_, index) => {
  const id = index + 1
  const category = id % 3 === 0 ? "lifestyle" : id % 2 === 0 ? "engagement" : "couple"
  const src = `/images/couple-photo-${id}.jpg` // Assure-toi que ces fichiers existent oui oui 
  return {
    id,
    src,
    alt: `Véronique et Kevin - Photo ${id}`,
    category,
  }
})

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const categories = [
    { id: "all", label: "Toutes" },
    { id: "couple", label: "En Couple" },
    { id: "engagement", label: "Fiançailles" },
    { id: "lifestyle", label: "Lifestyle" },
  ]

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory)

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
              <span className="text-xl font-serif text-gray-800">Galerie</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-serif text-gray-800 mb-4">Notre Galerie</h1>
          <p className="text-xl text-gray-600">Nos plus beaux moments ensemble</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8 md:mb-12 px-4"
        >
          <div className="flex flex-wrap justify-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 border border-rose-200">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-rose-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-rose-600 hover:bg-rose-50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-rose-200 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-0 relative">
                  <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <a
                          href={image.src}
                          download
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-white/90 rounded-md p-2 hover:bg-white"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Love Quote */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-2xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Heart className="w-12 h-12 mx-auto mb-4 fill-white" />
              <blockquote className="text-2xl font-serif italic mb-4">
                "Chaque photo raconte une partie de notre histoire d'amour"
              </blockquote>
              <p className="text-lg">Kevin & Véronique</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Download All Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Card className="bg-white/90 backdrop-blur-sm border-rose-200 shadow-xl max-w-md mx-auto">
            <CardContent className="p-6">
              <Download className="w-8 h-8 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-gray-800 mb-2">Télécharger nos photos</h3>
              <p className="text-gray-600 mb-4">Gardez nos plus beaux souvenirs avec vous</p>
              <a
                href="/downloads/album-veronique-kevin.zip"
                download
                className="bg-rose-500 hover:bg-rose-600 text-white inline-block px-6 py-2 rounded-md font-medium"
              >
                Télécharger l'album complet
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={galleryImages.find((img) => img.id === selectedImage)?.src || ""}
              alt={galleryImages.find((img) => img.id === selectedImage)?.alt || ""}
              width={800}
              height={600}
              className="object-contain max-h-[90vh] rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">© 2025 franckCodes. Tous droits réservés.</p>
      </div>
    </div>
  )
}
