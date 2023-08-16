"use client";

import * as React from "react";

import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "absolute left-4 top-3 z-10 origin-[0] -translate-y-3 text-base font-light duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 [&:not(peer-empty)]:scale-75 [&:not(peer-empty)]:-translate-y-3 peer-focus:-translate-y-3 peer-focus:scale-75"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
