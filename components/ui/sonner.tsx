"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ position = "bottom-right", ...props }: ToasterProps) {
  return (
    <Sonner
      data-slot="toaster"
      position={position}
      className="toaster group"
      style={
        {
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
