"use client"

import { ComponentPropsWithoutRef, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  duration?: number
  decimalPlaces?: number
  onComplete?: () => void
  className?: string
}

export function NumberTicker({
  value,
  startValue = 0,
  duration = 1, // duração da animação em segundos
  decimalPlaces = 0,
  onComplete,
  className,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const animationFrame = useRef<number>()
  const startTime = useRef<number>()

  useEffect(() => {
    startTime.current = undefined

    const step = (timestamp: number) => {
      if (startTime.current === undefined) startTime.current = timestamp
      const elapsed = (timestamp - startTime.current) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const currentValue = startValue + (value - startValue) * progress

      if (ref.current) {
        ref.current.textContent = currentValue.toFixed(decimalPlaces)
      }

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(step)
      } else {
        // garante que finalize exatamente no valor final
        if (ref.current) ref.current.textContent = value.toFixed(decimalPlaces)
        if (onComplete) {
            onComplete()
            return
        }
      }
    }

    animationFrame.current = requestAnimationFrame(step)

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [startValue, value, duration, decimalPlaces, onComplete])

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-wider text-black tabular-nums dark:text-white",
        className
      )}
      {...props}
    >
      {startValue.toFixed(decimalPlaces)}
    </span>
  )
}
