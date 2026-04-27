"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const MENU_ITEMS_LEFT = [
    {
        name: "Margarita",
        price: "279 TL",
        description: "Domates sos, rende mozarella, pesto sos",
    },
    {
        name: "Mantarlı",
        price: "399 TL",
        description: "Domates sos, rende mozarella, mantar, ricotta, kekik, pesto sos",
    },
    {
        name: "Sucuklu",
        price: "499 TL",
        description: "Domates sos, rende mozarella, dana sucuk, mısır",
    },
    {
        name: "Karışık",
        price: "549 TL",
        description: "Domates sos, rende mozarella, dana sosis, dana salam, dana sucuk, mantar, köy biberi, kırmızı biber, dilimlenmiş siyah zeytin, mısır, çeri domates",
    },
    {
        name: "Vejeteryan",
        price: "279 TL",
        description: "Domates sos, rende mozarella, közlenmiş patlıcan, ıspanak, kabak, mantar, parmesan",
    },
];

const MENU_ITEMS_RIGHT = [
    {
        name: "Füme Kaburga",
        price: "799 TL",
        description: "Domates sos, rende mozarella, füme kaburga, roka, parmesan",
    },
    {
        name: "Ricotta Funghi",
        price: "459 TL",
        description: "Krema sos, rende mozarella, ricotta, kültür mantarı, istiridye mantarı, trüff yağı",
    },
    {
        name: "BBQ Tavuklu",
        price: "459 TL",
        description: "Domates sos, rende mozarella, BBQ sos, 100 gr tavuk göğsü parçaları, mısır, kırmızı soğan",
    },
    {
        name: "Pesto",
        price: "469 TL",
        description: "Pesto sos, rende mozarella, suda mozarella, limon zest, file badem, mantar",
    },
    {
        name: "Paris Soslu",
        price: "899 TL",
        description: "Paris sos, rende mozarella, 50 gr. dana nuar, kibrit patates, toz parmesan",
    },
];

function MenuItem({ item, index }: { item: typeof MENU_ITEMS_LEFT[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group py-4 border-b border-gray-200/50 last:border-none"
        >
            <div className="flex items-baseline gap-2">
                <h4 className="text-base md:text-lg font-bold text-[var(--color-text-primary)] whitespace-nowrap group-hover:text-[var(--color-secondary)] transition-colors">
                    {item.name}
                </h4>
                <div className="dotted-leader" />
                <span className="text-base md:text-lg font-bold text-[var(--color-text-primary)] whitespace-nowrap">
                    {item.price}
                </span>
            </div>
            <p className="text-xs md:text-sm text-[var(--color-text-muted)] mt-1 leading-relaxed">
                {item.description}
            </p>
        </motion.div>
    );
}

export function MenuList() {
    return (
        <section className="relative py-16 md:py-24 bg-[var(--color-warm-white)] overflow-hidden">
            {/* Left Orange Pattern (2 Kat Büyük & Limitli Tekrar) */}
            <div 
                className="absolute top-0 left-0 w-24 md:w-36 z-0 pointer-events-none"
                style={{
                    height: "800px", // Limits repeats visually
                    backgroundImage: "url('/images/pizza-pattern-turuncu.png')",
                    backgroundRepeat: "repeat-y",
                    backgroundSize: "100% auto", // Fills width, expands height proportionally (2x previous size basically since div is larger)
                    backgroundPosition: "top left"
                }}
            />

            {/* Right Blue Pattern (2 Kat Büyük & Limitli Tekrar) */}
            <div 
                className="absolute top-0 right-0 w-24 md:w-36 z-0 pointer-events-none"
                style={{
                    height: "800px",
                    backgroundImage: "url('/images/pizza-pattern-mavi.png')",
                    backgroundRepeat: "repeat-y",
                    backgroundSize: "100% auto",
                    backgroundPosition: "top right"
                }}
            />

            {/* Bottom Left Image (Slice on Peel) */}
            <div className="absolute bottom-10 left-8 md:left-[12%] w-32 h-32 md:w-36 md:h-36 z-0 pointer-events-none">
                <Image
                    src="/images/eryaman-en-iyi-pizzaci.png"
                    alt="Pizza Dilimi"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Bottom Right Image (Full Pizza) */}
            <div className="absolute -bottom-0 right-4 md:right-[10%] w-28 h-28 md:w-36 md:h-36 z-0 pointer-events-none">
                <Image
                    src="/images/eryaman-el-yapımı-pizza.png"
                    alt="Tam Pizza"
                    fill
                    className="object-contain"
                />
            </div>

            <Container className="relative z-10">
                <p className="mb-8 text-center text-sm md:text-base font-medium text-[var(--color-text-secondary)] italic">
                    Fiyatlar 01 Mayıs 2026 Tarihinden İtibaren Geçerlidir.
                </p>
                {/* Menu Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
                    {/* Left Column */}
                    <div>
                        {MENU_ITEMS_LEFT.map((item, index) => (
                            <MenuItem key={item.name} item={item} index={index} />
                        ))}
                    </div>
                    {/* Right Column */}
                    <div>
                        {MENU_ITEMS_RIGHT.map((item, index) => (
                            <MenuItem key={item.name} item={item} index={index + MENU_ITEMS_LEFT.length} />
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link href="/eryaman/menu">
                        <Button className="rounded-full px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold">
                            HEPSİNİ İNCELE
                        </Button>
                    </Link>
                    <p className="text-sm text-[var(--color-text-muted)] mt-3">
                        Tüm menüyü incelemek için tıklayınız
                    </p>
                </motion.div>
            </Container>
        </section>
    );
}
