import * as React from "react";
import { FieldErrors } from "react-hook-form";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError: FieldErrors;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, id, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "peer flex h-10 w-full rounded-md border-2 border-input bg-background p-4 pt-6 text-sm ring-offset-background transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          { "border-rose-500": isError[id as string] },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
