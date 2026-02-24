// components/SmoothScroll.tsx
"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    // 'lerp' controls the smoothness (lower = smoother/slower)
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}