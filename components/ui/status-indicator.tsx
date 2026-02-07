import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckCircle, XCircle, Clock, AlertCircle, Phone } from 'lucide-react';

import { cn } from '@/lib/utils';

const statusIndicatorVariants = cva(
  'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
  {
    variants: {
      status: {
        pending: 'bg-muted text-muted-foreground',
        calling: 'bg-[var(--color-info)] text-[var(--color-info-foreground)]',
        approved: 'bg-[var(--color-success)] text-[var(--color-success-foreground)]',
        rejected: 'bg-[var(--color-critical)] text-[var(--color-critical-foreground)]',
        timeout: 'bg-[var(--color-warning)] text-[var(--color-warning-foreground)]',
      },
      size: {
        default: 'h-10',
        sm: 'h-8 text-xs',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      status: 'pending',
      size: 'default',
    },
  }
);

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> {
  label?: string;
  showIcon?: boolean;
}

const statusIcons = {
  pending: Clock,
  calling: Phone,
  approved: CheckCircle,
  rejected: XCircle,
  timeout: AlertCircle,
};

function StatusIndicator({
  className,
  status,
  size,
  label,
  showIcon = true,
  ...props
}: StatusIndicatorProps) {
  const Icon = statusIcons[status as keyof typeof statusIcons];

  return (
    <div
      className={cn(statusIndicatorVariants({ status, size }), className)}
      {...props}
    >
      {showIcon && Icon && <Icon className="h-4 w-4 animate-pulse" />}
      <span>{label || status}</span>
    </div>
  );
}

export { StatusIndicator, statusIndicatorVariants };
