"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MenuOffer {
    title: string;
    description: string;
    price: string;
}

const MENU_OFFERS: MenuOffer[] = [
    {
        title: "Menü 1",
        description: "1 ADET MARGARİTA + 1 ADET KUTU İÇECEK",
        price: "309.9 ₺",
    },
    {
        title: "Menü 2",
        description: "1 ADET 4 PEYNİRLİ + 1 ADET KUTU İÇECEK",
        price: "509.9 ₺",
    },
    {
        title: "Menü 3",
        description: "1 ADET KARIŞIK PİZZA + 1 ADET KUTU İÇECEK",
        price: "549.9 ₺",
    },
    {
        title: "Menü 4",
        description: "1 ADET SUCUKLU PİZZA + 1 ADET KUTU İÇECEK",
        price: "499.9 ₺",
    },
    {
        title: "Menü 5",
        description: "1 ADET FÜME KABURGA PİZZA + 1 ADET KUTU İÇECEK",
        price: "799.9 ₺",
    },
    {
        title: "Menü 6 (İki Kişilik)",
        description:
            "1 ADET KARIŞIK PİZZA, 1 ADET SEÇİLECEK KLASİK PİZZA, 1 ADET ÇITIR TAVUK, 2 ADET TİRAMİSU, 1 ADET LİTRELİK İÇECEK",
        price: "1399.9 ₺",
    },
];

export function PromoBanner() {
    return (
        <section className="relative overflow-visible bg-[var(--color-cream)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] min-h-[500px]">
                {/* Left - Pizza Image */}
                <div className="relative h-80 lg:h-auto z-10">
                    <Image
                        src="/images/haftaiçiindirim_sol.png"
                        alt="Hafta içi indirim pizza"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                </div>

                {/* Center - 6 Menu Offers */}
                <div className="relative flex flex-col items-center justify-center py-10 px-4 md:px-8 z-20">
                    <p className="mb-4 text-center text-xs md:text-sm font-medium text-[var(--color-text-secondary)] italic">
                        Fiyatlar 01 Mayıs 2026 Tarihinden İtibaren Geçerlidir.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {MENU_OFFERS.map((offer, i) => (
                            <motion.div
                                key={offer.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-between text-center border border-[var(--color-secondary)]/10"
                            >
                                <div>
                                    <h3 className="text-base md:text-lg font-black text-[var(--color-secondary)] mb-2 uppercase">
                                        {offer.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-snug mb-3">
                                        {offer.description}
                                    </p>
                                </div>
                                <p className="text-lg md:text-xl font-black text-[var(--color-dark)]">
                                    {offer.price}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right - Restaurant Interior Image */}
                <div className="relative h-80 lg:h-auto z-10">
                    <Image
                        src="/images/haftaiçiindirim_sağ.png"
                        alt="Restaurant atmosferi"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                    />
                </div>
            </div>
        </section>
    );
}
