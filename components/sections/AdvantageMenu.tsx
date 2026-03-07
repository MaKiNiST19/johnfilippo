"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AdvantageMenu() {
    return (
        <section className="w-full">
            {/* First Row: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image Side */}
                <div className="relative w-full min-h-[300px] md:min-h-[500px] lg:min-h-[700px]">
                    <Image
                        src="/images/menü-1.png"
                        alt="Avantajlı Menü 1"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>

                {/* Text Side */}
                <div className="bg-[var(--color-warm-white)] flex flex-col justify-center items-start p-10 md:p-16 lg:p-32 relative overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl relative"
                    >
                        {/* Title Container with Arrow */}
                        <div className="relative inline-block mb-8 mt-12">
                            {/* Curve Arrow Absolute Positioned relative to title */}
                            <div className="absolute -top-16 -right-20 md:-top-24 md:-right-36 w-32 h-32 md:w-48 md:h-48 pointer-events-none z-10">
                                <Image
                                    src="/images/curve-arrow.png"
                                    alt="Arrow"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h2 className="text-3xl md:text-[2.75rem] lg:text-[3.25rem] font-black italic text-[var(--color-secondary)] uppercase tracking-tight leading-none">
                                BU FIRSAT KAÇMAZ!
                            </h2>
                        </div>

                        <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
                            ORİJİNAL TARİFLER
                        </h3>
                        <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed font-medium max-w-sm">
                            Bizim için her pizza, özenle hazırladığımız orijinal tariflerle bir sanat eseridir.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Second Row: Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Text Side */}
                <div className="bg-[var(--color-warm-white)] flex flex-col justify-center items-start border-t lg:border-t-0 border-gray-100 p-10 md:p-16 lg:p-32 relative overflow-visible order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl w-full relative"
                    >
                        <h2 className="text-3xl md:text-[2.75rem] lg:text-[3.25rem] font-black italic text-[var(--color-secondary)] uppercase tracking-tight leading-none mb-8">
                            BU FIRSAT KAÇMAZ!
                        </h2>

                        <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
                            KALİTELİ MALZEME
                        </h3>
                        <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed font-medium mb-12 max-w-sm">
                            Yalnızca en taze ve en kaliteli malzemeleri kullanarak lezzetlerimizi hazırlıyoruz.
                        </p>

                        {/* Tomato Image */}
                        <div className="absolute right-0 md:right-0 bottom-[-20px] md:bottom-[-40px] transform translate-y-1/2 w-32 h-32 md:w-56 md:h-56 pointer-events-none z-10">
                            <Image
                                src="/images/tomato.png"
                                alt="Tomato"
                                fill
                                className="object-contain object-right-bottom"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Image Side */}
                <div className="relative w-full min-h-[300px] md:min-h-[500px] lg:min-h-[700px] order-1 lg:order-2">
                    <Image
                        src="/images/menü-2.png"
                        alt="Avantajlı Menü 2"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>
            </div>
        </section>
    );
}
