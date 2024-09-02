"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";

export function Slider({ value, onValueChange, min, max, step }: { value: number[], onValueChange: (value: number[]) => void, min: number, max: number, step: number }) {
  return (
    <SliderPrimitive.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
    >
      <SliderPrimitive.Track className="bg-gray-200 relative flex-1 rounded-full h-1">
        <SliderPrimitive.Range className="absolute bg-blue-500 rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block w-5 h-5 bg-white border border-gray-300 rounded-full shadow" />
    </SliderPrimitive.Root>
  );
}
