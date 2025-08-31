import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const neonButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "btn-neon text-white",
        secondary: "btn-neon-secondary text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground border border-neon-purple/30 hover:border-neon-purple/60",
        outline: "border border-neon-cyan/50 bg-transparent hover:bg-neon-cyan/10 text-neon-cyan hover:text-white",
        wallet: "bg-gradient-to-r from-neon-purple to-neon-cyan hover:from-neon-cyan hover:to-neon-purple text-white shadow-lg hover:shadow-neon-purple/50",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  asChild?: boolean;
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(neonButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
NeonButton.displayName = "NeonButton";

export { NeonButton, neonButtonVariants };