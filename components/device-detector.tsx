"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface DeviceInfo {
  isIOS: boolean
  isAndroid: boolean
  isIPad: boolean
  isIPhone: boolean
  isSafari: boolean
  isChrome: boolean
  isMobile: boolean
  isTablet: boolean
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isIOS: false,
    isAndroid: false,
    isIPad: false,
    isIPhone: false,
    isSafari: false,
    isChrome: false,
    isMobile: false,
    isTablet: false,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent
      const platform = window.navigator.platform

      const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1)
      const isAndroid = /Android/.test(userAgent)
      const isIPad = /iPad/.test(userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1)
      const isIPhone = /iPhone/.test(userAgent)
      const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
      const isChrome = /Chrome/.test(userAgent)
      const isMobile = /Mobi|Android/i.test(userAgent)
      const isTablet = isIPad || (/Android/.test(userAgent) && !/Mobile/.test(userAgent))

      setDeviceInfo({
        isIOS,
        isAndroid,
        isIPad,
        isIPhone,
        isSafari,
        isChrome,
        isMobile,
        isTablet,
      })
    }
  }, [])

  return deviceInfo
}

export function DeviceOptimizer({ children }: { children: React.ReactNode }) {
  const device = useDeviceDetection()

  useEffect(() => {
    // Optimisations spécifiques iOS
    if (device.isIOS) {
      document.body.classList.add("ios-device")

      // Éviter le bounce scroll sur iOS
      document.addEventListener(
        "touchmove",
        (e) => {
          if (e.target === document.body) {
            e.preventDefault()
          }
        },
        { passive: false },
      )
    }

    // Optimisations spécifiques Android
    if (device.isAndroid) {
      document.body.classList.add("android-device")
    }

    // Optimisations spécifiques iPad
    if (device.isIPad) {
      document.body.classList.add("ipad-device")
    }

    // Optimisations spécifiques iPhone
    if (device.isIPhone) {
      document.body.classList.add("iphone-device")
    }

    return () => {
      document.body.classList.remove("ios-device", "android-device", "ipad-device", "iphone-device")
    }
  }, [device])

  return <>{children}</>
}
