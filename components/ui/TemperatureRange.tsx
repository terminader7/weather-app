"use client";

import { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";
import React from "react";

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  minStepesBetweenThumbs?: number;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
};

const TemperatureRange = React.forwardRef(
  (
    {
      className,
      min,
      max,
      formatLabel,
      value,
      onValueChange,
      ...props
    }: SliderProps,
    ref
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max];
    const [localValues, setLocalValues] = useState(initialValue);

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues);
      if (onValueChange) {
        onValueChange(newValues);
      }
    };

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        value={localValues}
        onValueChange={handleValueChange}
        disabled={true}
        className={cn(
          "relative flex w-full max-w-[17rem] touch-none select-none items-center md:max-w-[8rem]"
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow select-none overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-1 fromg-green-300 to-blue-400" />
        </SliderPrimitive.Track>
      </SliderPrimitive.Root>
    );
  }
);
TemperatureRange.displayName = "TemperatureRange";
