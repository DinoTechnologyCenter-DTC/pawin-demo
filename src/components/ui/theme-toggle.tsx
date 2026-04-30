"use client"

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-16 h-8 bg-zinc-900/50 rounded-full animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark 
          ? "bg-zinc-950 border border-zinc-800" 
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setTheme(isDark ? "light" : "dark");
        }
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "transform translate-x-0 bg-zinc-800 shadow-inner" 
              : "transform translate-x-8 bg-gray-100 shadow-sm"
          )}
        >
          {isDark ? (
            <Moon 
              className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" 
              strokeWidth={2}
            />
          ) : (
            <Sun 
              className="w-3.5 h-3.5 text-orange-500 fill-orange-500/20" 
              strokeWidth={2}
            />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark 
              ? "bg-transparent" 
              : "transform -translate-x-8 opacity-0 pointer-events-none"
          )}
        >
          {isDark ? (
            <Sun 
              className="w-3.5 h-3.5 text-zinc-600" 
              strokeWidth={1.5}
            />
          ) : (
             null
          )}
        </div>
      </div>
    </div>
  )
}
