import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_0_20px_rgba(76,175,80,0.22)] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(76,175,80,0.3)] focus-visible:ring-[color:var(--accent)]",
        secondary:
          "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[color:color-mix(in_srgb,var(--secondary)_80%,var(--accent)_20%)] hover:shadow-[0_0_18px_rgba(76,175,80,0.22)] focus-visible:ring-[color:var(--accent)]",
        outline:
          "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[color:color-mix(in_srgb,var(--card)_70%,var(--secondary)_30%)] hover:shadow-[0_0_16px_rgba(76,175,80,0.2)] focus-visible:ring-[color:var(--accent)]",
        ghost:
          "text-[var(--foreground)] hover:bg-[color:color-mix(in_srgb,var(--secondary)_80%,transparent)] focus-visible:ring-[color:var(--accent)]",
        destructive:
          "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[color:color-mix(in_srgb,var(--destructive)_85%,var(--foreground)_15%)]"
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2",
        lg: "px-8 py-4 text-base",
        icon: "h-10 w-10 rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
