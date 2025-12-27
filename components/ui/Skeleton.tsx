// components/ui/Skeleton.tsx
"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rectangular" | "circular";
  animation?: "pulse" | "wave" | "none";
}

export default function Skeleton({
  className,
  variant = "rectangular",
  animation = "pulse",
  ...props
}: SkeletonProps) {
  const variants = {
    text: "h-4",
    rectangular: "w-full h-full",
    circular: "rounded-full",
  };

  const animations = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  return (
    <div
      className={cn(
        "bg-gray-200",
        variants[variant],
        animations[animation],
        className
      )}
      {...props}
    />
  );
}

// Skeleton presets comunes
export function SkeletonProduct() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-product w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/4 mt-4" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="border border-gray-200 p-6 space-y-4">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-10 w-full mt-4" />
    </div>
  );
}
