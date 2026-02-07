import { cn } from '@/lib/utils';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface PageContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
}

const SIZE_MAP: Record<ContainerSize, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export default function PageContainer({
  children,
  size = 'lg',
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        SIZE_MAP[size],
        className
      )}
    >
      {children}
    </div>
  );
}
