import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover hover:shadow-elevated shadow-soft",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft hover:shadow-elevated",
        outline:
          "border-2 border-input bg-background-elevated hover:bg-accent hover:text-accent-foreground shadow-soft hover:shadow-card",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-soft hover:shadow-card",
        ghost: "hover:bg-accent/10 hover:text-foreground hover:shadow-soft text-foreground",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-hover",
        hero: "bg-primary text-primary-foreground hover:bg-primary-hover hover:scale-105 shadow-hero text-base font-semibold hover:shadow-glow transition-all duration-300",
        council: "bg-primary text-primary-foreground hover:bg-primary-hover hover:shadow-elevated border-2 border-primary/20 shadow-card",
        accent: "bg-accent text-accent-foreground hover:bg-accent-hover hover:shadow-accent shadow-soft",
        modern: "bg-card text-card-foreground border-2 border-border hover:border-primary shadow-card hover:shadow-elevated",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
