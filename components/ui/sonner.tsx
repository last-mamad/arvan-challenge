"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ position = "top-center", ...props }: ToasterProps) {
  return (
    <Sonner
      data-slot="toaster"
      position={position}
      className="toaster group"
      style={
        {
          "--width": "min(360px, calc(100vw - 2rem))",
          "--normal-bg": "var(--color-neutral-bg1)",
          "--normal-text": "var(--color-neutral-fg1)",
          "--normal-border": "var(--color-neutral-st2)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };
