// components/SmoothScroll.tsx
"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

const LenisWrapper = ReactLenis as unknown as React.FC<{
    root?: boolean;
    options?: Record<string, unknown>;
    children?: React.ReactNode;
}>;

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // 'lerp' controls the smoothness (lower = smoother/slower)
        <LenisWrapper
            root
            options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}
        >
            {children}
        </LenisWrapper>
    );
}
