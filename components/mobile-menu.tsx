"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, Home, Heart, Calendar, Users, Camera, Phone } from "lucide-react"
import Link from "next/link"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuItems = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/story", label: "Notre Histoire", icon: Heart },
    { href: "/details", label: "Détails", icon: Calendar },
    { href: "/rsvp", label: "RSVP", icon: Users },
    { href: "/gallery", label: "Galerie", icon: Camera },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden safe-area-top safe-area-bottom"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
                  <span className="text-xl font-serif text-gray-800">Kevin & Véronique</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 py-6">
                <nav className="space-y-2 px-6">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center space-x-3 p-4 rounded-lg hover:bg-rose-50 transition-colors group min-h-[44px]"
                      >
                        <item.icon className="w-5 h-5 text-gray-600 group-hover:text-rose-600" />
                        <span className="text-gray-800 group-hover:text-rose-600 font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-3">Suivez-nous</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <span className="text-sm font-bold">f</span>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                    >
                      <span className="text-sm font-bold">@</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
