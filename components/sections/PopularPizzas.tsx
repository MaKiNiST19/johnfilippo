"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import Image from "next/image";

const PIZZA_DATA = [
    {
        id: 1,
        name: "Dana Bacon",
        description: "Rende mozzarella, domates sos, dana bacon, pestolu roka yaprakları, yaprak parmesan",
        imageUrl: "/images/pizzalar/dana bacon.png",
    },
    {
        id: 2,
        name: "Margherita Originale",
        description: "Suda mozzarella, domates sos, fesleğen, kokteyl domates",
        imageUrl: "/images/pizzalar/margheritaorginal.png",
    },
    {
        id: 3,
        name: "Margherita",
        description: "Rende mozzarella, domates sos, pesto sos, fesleğen",
        imageUrl: "/images/pizzalar/margarita.png",
    },
    {
        id: 4,
        name: "Funghi Pizza",
        description: "Rende mozzarella, domates sos, mantar, ricotta, kekik, pesto sos",
        imageUrl: "/images/pizzalar/funghi pizza.png",
    },
    {
        id: 5,
        name: "Pepp",
        description: "Rende mozzarella, domates sos, dana pepperoni, fesleğen",
        imageUrl: "/images/pizzalar/pepp.png",
    },
    {
        id: 6,
        name: "Pesto Pizza",
        description: "Pesto sos, suda mozzarella, limon zest, file badem, mantar",
        imageUrl: "/images/pizzalar/pesto.png",
    },
    {
        id: 7,
        name: "Quattro Stagion (Karışık)",
        description: "Rende mozzarella, domates sos, salam, sucuk, mantar, köy biberi, kırmızı biber, dilim zeytin, kekik, mısır, cherry domates",
        imageUrl: "/images/pizzalar/karışık.png",
    },
    {
        id: 8,
        name: "BBQ Tavuklu",
        description: "Rende mozzarella, domates sos, BBQ soslu tavuk parçaları, mısır, köy biberi",
        imageUrl: "/images/pizzalar/bbqtavuklu.png",
    },
    {
        id: 9,
        name: "Kabaklı Pizza",
        description: "Rende mozzarella, domates sos, ince kıyılmış kabak, dereotu, taze lor peyniri",
        imageUrl: "/images/pizzalar/kabaklı.png",
    },
    {
        id: 10,
        name: "Çikolatalı Pizza",
        description: "Nutella, Çilek, Muz, Pudra Şekeri, Badem",
        imageUrl: "/images/pizzalar/çikolatalıpiizaa.png",
    },
];

export function PopularPizzas() {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const firstItem = container.querySelector(':first-child') as HTMLElement;
            if (firstItem) {
                const itemWidth = firstItem.offsetWidth;
                const gap = 32; // gap-8 = 32px
                const scrollAmount = itemWidth + gap;
                
                container.scrollBy({
                    left: direction === "left" ? -scrollAmount : scrollAmount,
                    behavior: "smooth",
                });
            }
        }
    };

    return (
        <section className="py-8 md:py-10 bg-[var(--color-cream)]">
            {/* Section Header - Stays centered in container */}
            <Container>
                <div className="flex justify-end -mr-4 md:-mr-8 mb-2 relative">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 30 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src="/images/sevgilerle-laci.png"
                                alt="Napoli'den Sevgilerle"
                                width={700}
                                height={200}
                                className="h-auto w-[400px] md:w-[650px]"
                            />
                        </motion.div>

                        {/* Curved Arrow Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, rotate: -20 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute -right-8 md:-right-12 -top-4 md:-top-8 w-16 md:w-24 h-16 md:h-24"
                        >
                            <Image
                                src="/images/curved.png"
                                alt="Curved Arrow"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </div>
                </div>
            </Container>

            {/* Carousel Area - Full Width Stretch */}
            <div className="w-full relative">
                <div className="flex flex-col lg:flex-row items-stretch">
                    
                    {/* Left: Title + Nav (Stretched from the very left) */}
                    <div className="w-full lg:w-[28%] bg-[var(--color-cream)] z-10 py-4 px-6 md:px-12 lg:pl-16 lg:pr-8 flex flex-col pt-12">
                        <h3 className="text-3xl md:text-5xl font-black text-[var(--color-secondary)] leading-[1.1] mb-6">
                            BU TADLARI<br />
                            DENEDİNİZ Mİ?
                        </h3>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => scroll("left")}
                                className="w-12 h-12 rounded-full border-2 border-[var(--color-secondary)]/30 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                                aria-label="Önceki"
                            >
                                <span className="text-xl">←</span>
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="w-12 h-12 rounded-full border-2 border-[var(--color-secondary)]/30 bg-white flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white shadow-md transition-all cursor-pointer active:scale-95"
                                aria-label="Sonraki"
                            >
                                <span className="text-xl">→</span>
                            </button>
                        </div>
                    </div>

                    {/* Right: Responsive Carousel */}
                    <div className="w-full lg:flex-1 relative overflow-hidden py-4">
                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto gap-4 md:gap-8 pb-10 px-4 md:px-0 lg:pr-12 scrollbar-hide snap-x snap-mandatory"
                            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                        >
                            {PIZZA_DATA.map((pizza) => (
                                <div
                                    key={pizza.id}
                                    className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] flex-shrink-0 snap-start"
                                >
                                    <div className="text-center group px-2">
                                        {/* Board Image Wrapper */}
                                        <div className="relative w-full aspect-square mb-4">
                                            <Image
                                                src={pizza.imageUrl}
                                                alt={pizza.name}
                                                fill
                                                className="object-contain transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            />
                                        </div>
                                        {/* Name */}
                                        <h4 className="text-lg md:text-xl font-black text-[var(--color-secondary)] mb-2">
                                            {pizza.name}
                                        </h4>
                                        {/* Description */}
                                        <p className="text-[10px] md:text-xs text-[var(--color-text-muted)] max-w-full mx-auto leading-relaxed">
                                            {pizza.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {/* Minor end padding to show it's a carousel */}
                            <div className="min-w-[20px] md:min-w-[40px] flex-shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
