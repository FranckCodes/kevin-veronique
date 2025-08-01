"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface MobileOptimizedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const MobileOptimizedInput = forwardRef<HTMLInputElement, MobileOptimizedInputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700 block">{label}</label>}
        <input
          type={type}
          className={cn(
            // Base styles
            "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            // Mobile optimizations
            "min-h-[44px] text-base md:text-sm", // 44px minimum pour iOS, 16px font pour éviter le zoom
            // iOS specific
            "appearance-none rounded-none", // Éviter les styles natifs iOS
            // Android specific
            "bg-transparent", // Éviter les backgrounds bizarres Android
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
MobileOptimizedInput.displayName = "MobileOptimizedInput"

export { MobileOptimizedInput }
