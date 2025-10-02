'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

export function Loading() {
  const [isVisible, setIsVisible] = useState(true)      // ainda no DOM
  const [isAnimating, setIsAnimating] = useState(false) // controla o slide-up
  const [progress, setProgress] = useState(0)

  const handleComplete = () => {
    setIsAnimating(true)
  }

  useEffect(() => {
    setProgress(100)
    handleComplete()
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center bg-background backdrop-blur-sm
        transition-transform duration-1000
        ${isAnimating ? '-translate-y-full' : 'translate-y-0'}
      `}
      // quando a animação terminar, removemos do DOM
      onTransitionEnd={() => {
        if (isAnimating) {
          setIsVisible(false)
          setProgress(100)
        }
      }}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="loading-page">
          <div className="flex flex-col items-center">
            <p>loading</p>
            {!progress && <div className="loader w-[160px]  text-center ">%</div>}
            {!!progress && <div className=" w-[160px]  text-center "
              style={{
                font: "800 40px system-ui",
                padding: "2rem"
              }}
            >100%</div>}
            <div className="h-2 bg-primary loader-bar" />
          </div>
        </div>
      </div>
    </div>
  )
}
