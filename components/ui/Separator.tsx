"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import * as SeparatorPrimitve from "@radix-ui/react-separator";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitve.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitve.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitve.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className-={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export default Separator;
