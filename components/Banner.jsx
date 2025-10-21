'use client'
import React from 'react'
import toast from 'react-hot-toast'

export default function Banner() {
  const [isOpen, setIsOpen] = React.useState(true)

  const handleClaim = () => {
    toast.success('Coupon copied to clipboard!')
    try {
      navigator.clipboard.writeText('NEW10')
    } catch (e) {}
  }

  if (!isOpen) return null

  return (
    <div className="w-full bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] text-white text-sm sm:text-base font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 gap-2">
        <p className="truncate text-xs sm:text-sm whitespace-nowrap">
          🎉 Get 10% OFF on Your First Order!
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleClaim}
            className="bg-white text-violet-700 px-4 sm:px-6 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-normal hover:scale-105 transition"
          >
            Claim Offer
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:opacity-80 transition"
            aria-label="Close banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
