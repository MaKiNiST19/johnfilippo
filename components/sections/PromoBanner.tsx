"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function PromoBanner() {
    return (
        <section className="relative overflow-visible bg-[var(--color-cream)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[500px] lg:h-[600px]">
                {/* Left - Pizza Image */}
                <div className="relative h-80 lg:h-auto z-10">
                    <Image
                        src="/images/haftaiçiindirim_sol.png"
                        alt="Hafta içi indirim pizza"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    {/* Floating Cheese Image on the right edge (Shrunk by 45% + Moved 2rem Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="absolute top-1/2 right-4 md:right-6 transform -translate-y-1/2 z-30 w-16 h-16 md:w-20 md:h-20"
                    >
                        <Image
                            src="/images/peynir.png"
                            alt="Eriyen Peynir"
                            fill
                            className="object-contain"
                        />
                    </motion.div>
                </div>

                {/* Center - Promo Text */}
                <div className="relative flex flex-col items-center justify-center py-12 px-6 text-center h-full z-20">
                    {/* Right side leaf image (10% Smaller and 2rem Down) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, rotate: 15 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        className="absolute top-[25%] right-24 md:right-36 w-9 h-9 md:w-12 md:h-12 z-20 pointer-events-none"
                    >
                        <Image
                            src="/images/yaprak.png"
                            alt="Yaprak"
                            fill
                            className="object-contain"
                        />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl lg:text-3xl font-black text-[var(--color-secondary)] leading-tight mb-2"
                    >
                        HAFTA İÇİ SAAT
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-3xl lg:text-3xl font-black text-[var(--color-secondary)] leading-tight mb-4"
                    >
                        12:00 -17:00 ARASI
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--color-secondary)] mb-8"
                    >
                        %10 İNDİRİM
                    </motion.p>

                    {/* Pizza slice illustration (Enlarged and Overflowing) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30, rotate: -15 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="absolute -bottom-10 -left-10 md:-bottom-16 md:-left-16 z-30 w-32 h-32 md:w-44 md:h-44"
                    >
                        <Image
                            src="/images/slice-pizza.png"
                            alt="Pizza Slice Element"
                            fill
                            className="object-contain"
                        />
                    </motion.div>

                    <Link href="/eryaman/menu">
                        <Button className="rounded-2xl px-12 py-6 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-bold text-lg shadow-xl uppercase transition-all hover:scale-105 active:scale-95 group relative overflow-hidden">
                            <span className="relative z-10">MENÜYÜ İNCELE</span>
                            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        </Button>
                    </Link>
                </div>

                {/* Right - Restaurant Interior Image */}
                <div className="relative h-80 lg:h-auto z-10">
                    <Image
                        src="/images/haftaiçiindirim_sağ.png"
                        alt="Restaurant atmosferi"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                </div>
            </div>
        </section>
    );
}
