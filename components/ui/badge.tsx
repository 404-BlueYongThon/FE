import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        critical:
          'border-transparent bg-[var(--color-critical)] text-[var(--color-critical-foreground)] shadow hover:bg-[var(--color-critical)]/80',
        urgent:
          'border-transparent bg-[var(--color-urgent)] text-[var(--color-urgent-foreground)] shadow hover:bg-[var(--color-urgent)]/80',
        success:
          'border-transparent bg-[var(--color-success)] text-[var(--color-success-foreground)] shadow hover:bg-[var(--color-success)]/80',
        info:
          'border-transparent bg-[var(--color-info)] text-[var(--color-info-foreground)] shadow hover:bg-[var(--color-info)]/80',
        warning:
          'border-transparent bg-[var(--color-warning)] text-[var(--color-warning-foreground)] shadow hover:bg-[var(--color-warning)]/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
