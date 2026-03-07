"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
    {
        image: "/images/eryaman-el-yapımı-pizza.png",
        title: "El Yapımı Lezzet",
        description: "Pizzalarımız, Napoli geleneğine sadık kalarak, her biri ustalıkla elde açılır ve özenle hazırlanır. Donuk veya hazır ürünler yerine, gerçek İtalyan dokunuşunu hissedeceksiniz.",
    },
    {
        image: "/images/eryaman-en-iyi-pizzaci.png",
        title: "Gözünüzün Önünde Pişer",
        description: "Fırınımızın taze taze, siparişinize özel olarak piştiğini görebilirsiniz. Bu şeffaf süreç, lezzetin ve kalitenin garantisidir.",
    },
    {
        image: "/images/eryaman-pizza-siparisi-malzemeleri.png",
        title: "En Taze Malzemeler",
        description: "Her bir pizzamızda, yerel ve mevsimlik tedarikçilerden gelen en taze sebzeleri ve kaliteli ürünleri kullanıyoruz. Doğanın sunduğu en iyiyle hazırlanan eşsiz tatlar.",
    },
    {
        image: "/images/eryaman-napoli-pizza.png",
        title: "Gerçek Napoli Deneyimi",
        description: "İtalya'nın kalbinden gelen otantik Napoli pizza tarifleriyle, her dilimde Akdeniz esintisini ve geleneksel İtalyan mutfağının zenginliğini yaşayın.",
    },
];

export function Features() {
    return (
        <section className="relative py-10 md:py-14 bg-[var(--color-cream)] overflow-hidden">
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Main Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square">
                            <Image
                                src="/images/john-filippo-avantajlari.png"
                                alt="John Filippo Avantajları"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </motion.div>

                    {/* Right Side - Feature Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group flex flex-col items-start"
                            >
                                <div className="relative w-[95%] aspect-video mb-4">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-contain object-left"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-secondary)] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
