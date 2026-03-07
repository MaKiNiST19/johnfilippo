"use client";

import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
    {
        icon: "/images/tarif.svg",
        text: "Orjinal Tarifle Hazırlanır",
    },
    {
        icon: "/images/firin.svg",
        text: "350 °C Sıcaklıkta Pişer",
    },
    {
        icon: "/images/paket.svg",
        text: "Özenle Paketlenir",
    },
    {
        icon: "/images/kurye.svg",
        text: "Sıcak Sıcak Teslim Edilir",
    },
];

export function FeatureBar() {
    return (
        <section className="bg-white border-y border-gray-100 py-4 lg:py-5">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center gap-5 lg:justify-center group"
                        >
                            <div className="relative w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                <Image
                                    src={feature.icon}
                                    alt={feature.text}
                                    fill
                                    className="object-contain"
                                    sizes="48px"
                                />
                            </div>
                            <span className="text-base md:text-lg font-black text-zinc-900 tracking-tight">
                                {feature.text}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
