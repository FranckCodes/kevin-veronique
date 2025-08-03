"use client"

import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { useRef } from "react"

type Guest = {
  id: number
  name: string
  phone: string
  guestCount: number
  attendanceType?: string
  partnerName?: string
  dietaryRestrictions?: string
  message?: string
  seatId?: number | null
  seat?: { id: number; label: string; table: { name: string } }
}

type PDFGeneratorProps = {
  guest: Guest
  onGenerated?: () => void
}

export function PDFGenerator({ guest, onGenerated }: PDFGeneratorProps) {
  const invitationRef = useRef<HTMLDivElement>(null)

  const generatePDF = async () => {
    if (!invitationRef.current) return

    try {
      const canvas = await html2canvas(invitationRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`invitation-${guest.name.replace(/\s+/g, "-").toLowerCase()}.pdf`)
      onGenerated?.()
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const getGuestNames = () => {
    if (guest.attendanceType === "couple" && guest.partnerName) {
      return `${guest.name} & ${guest.partnerName}`
    }
    return guest.name
  }

  const getSeatInfo = () => {
    if (guest.seat) {
      return `Table: ${guest.seat.table.name} - Seat: ${guest.seat.label}`
    }
    return "Seat assignment will be provided at the venue"
  }

  return (
    <div className="space-y-4">
      {/* Hidden invitation template for PDF generation */}
      <div ref={invitationRef} className="fixed -left-[9999px] w-[794px] h-[1123px] bg-white">
        <div className="relative w-full h-full p-12 font-serif">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-light text-gray-600 tracking-widest mb-2">WEDDING INVITATION</h1>
            <div className="w-24 h-px bg-rose-300 mx-auto"></div>
          </div>

          {/* Main content area with background pattern */}
          <div className="relative bg-gradient-to-b from-rose-50 to-white rounded-lg p-8 mb-8 border border-rose-100">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-rose-200"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-rose-200"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-rose-200"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-rose-200"></div>

            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-4 font-light tracking-wide">The Wedding Celebration Of</p>
              <h2 className="text-5xl font-light text-gray-800 mb-6 tracking-wide">Kevin & Véronique</h2>
              <div className="flex items-center justify-center space-x-4 mb-2">
                <div className="w-12 h-px bg-rose-300"></div>
                <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
                <div className="w-12 h-px bg-rose-300"></div>
              </div>
              <p className="text-xl text-gray-700 font-light">30th of August, Saturday</p>
              <p className="text-lg text-gray-600 mt-2">Chic Events DFW, Texas</p>
            </div>

            {/* Guest specific information */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-rose-100 mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-4 text-center">Personal Invitation for</h3>
              <p className="text-2xl text-rose-600 font-light text-center mb-4">{getGuestNames()}</p>
              <div className="text-center text-gray-600 space-y-2">
                <p>Number of guests: {guest.guestCount}</p>
                <p className="text-sm">{getSeatInfo()}</p>
                {guest.dietaryRestrictions && (
                  <p className="text-sm">Dietary restrictions: {guest.dietaryRestrictions}</p>
                )}
              </div>
            </div>
          </div>

          {/* Timeline section */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 text-center mb-6">Timeline / What Will Happen</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">5:00 PM / Ceremony</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Join us as we exchange vows in an intimate ceremony surrounded by our loved ones.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">6:30 PM / Cocktail</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Celebrate with cocktails, hors d'oeuvres, and mingling with family and friends.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">8:00 PM / Reception</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Dance the night away with dinner, music, and unforgettable memories.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center space-y-2 text-gray-500 text-sm">
            <div className="flex items-center justify-center space-x-8">
              <span>📞 +1 (555) 123-4567</span>
              <span>✉️ contact@kevinveronique.wedding.com</span>
              <span>🌐 www.kevinveronique.wedding.com</span>
            </div>
            <p className="italic mt-4 text-gray-600">
              "We can't wait to share this magical moment with you. Your presence will make our day even more special."
            </p>
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generatePDF}
        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span>Generate PDF Invitation</span>
      </button>
    </div>
  )
}
