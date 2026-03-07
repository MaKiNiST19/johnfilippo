"use client";

import Image from "next/image";

export function MarqueeBanner() {
    return (
        <section className="bg-[var(--color-primary)] py-4 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee items-center">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="relative w-40 h-8 md:w-56 md:h-12 shrink-0 mx-6 md:mx-10"
                    >
                        <Image
                            src="/images/sevgilerle-beyaz.png"
                            alt="Sevgilerle"
                            fill
                            className="object-contain"
                            priority={i < 3}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
