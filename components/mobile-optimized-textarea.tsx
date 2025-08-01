"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface MobileOptimizedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

const MobileOptimizedTextarea = forwardRef<HTMLTextAreaElement, MobileOptimizedTextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700 block">{label}</label>}
        <textarea
          className={cn(
            // Base styles
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            // Mobile optimizations
            "min-h-[88px] text-base md:text-sm resize-none", // Plus haut sur mobile, pas de resize
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
MobileOptimizedTextarea.displayName = "MobileOptimizedTextarea"

export { MobileOptimizedTextarea }
