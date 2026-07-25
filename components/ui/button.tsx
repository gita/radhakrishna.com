import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Minimal Slot: merges the button's className onto a single child element so
 * `<Button asChild><Link .../></Button>` works without pulling in Radix.
 */
function Slot({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  if (!React.isValidElement(children)) return null;
  const child = children as React.ReactElement<{ className?: string }>;
  return React.cloneElement(child, {
    ...props,
    className: cn(className, child.props.className),
  });
}

/**
 * Custom-branded button. Devotional variants (divine, gold) on top of the shared
 * shadcn-style base. Reuse this before adding any new button. See docs/03 §3.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        divine: "bg-divine text-divine-foreground hover:bg-divine/90 shadow-sm",
        gold: "bg-gold text-gold-foreground hover:bg-gold/90 shadow-sm",
        outline:
          "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-divine underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3",
        default: "h-11 px-5",
        lg: "h-12 px-7 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
