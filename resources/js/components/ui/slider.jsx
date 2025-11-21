"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, value, defaultValue, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
  const _values = React.useMemo(() => {
    return Array.isArray(value) ? value : [value || 0]
  }, [value])

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      min={min}
      max={max}
      step={step}
      value={_values}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>

      {_values.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
})

Slider.displayName = "Slider"

export { Slider }