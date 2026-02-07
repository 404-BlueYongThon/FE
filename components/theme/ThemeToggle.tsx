'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = theme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    const supportsViewTransition =
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    await transition.ready;

    const clipPathFrames = isDark
      ? [
          `circle(${endRadius}px at ${x}px ${y}px)`,
          `circle(0px at ${x}px ${y}px)`,
        ]
      : [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

    document.documentElement.animate(
      { clipPath: clipPathFrames },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      }
    );
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          'inline-flex items-center justify-center rounded-lg border border-border bg-background p-2 transition-colors hover:bg-accent',
          className
        )}
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-lg border border-border bg-background p-2 transition-colors hover:bg-accent',
        className
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
    </button>
  );
}
