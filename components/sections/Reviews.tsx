"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { TestimonialCard } from "@/components/ui/PizzaComponents";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
    {
        id: 1,
        text: "Eryaman&apos;da yediğim tartışmasız en iyi pizza. Hamuru o kadar ince ve çıtır ki, her ısırıkta İtalya&apos;daymış gibi hissediyorsunuz. Servis de çok hızlıydı.",
        author: "Ahmet Yılmaz",
        rating: 5
    },
    {
        id: 2,
        text: "Ailece geldik ve bayıldık. Çocuklar margarita pizzaya bayıldı, biz ise şefin spesiyaline. Çalışanlar çok güler yüzlü ve ilgili.",
        author: "Ayşe Demir",
        rating: 5
    },
    {
        id: 3,
        text: "Malzeme kalitesi kendini belli ediyor. Dondurulmuş ürün kullanmadıkları çok açık. Fiyat/performans olarak Ankara&apos;nın en iyilerinden.",
        author: "Mehmet Kaya",
        rating: 5
    }
];

export function Reviews() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextReview = () => {
        setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    };

    const prevReview = () => {
        setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            nextReview();
        }, 5000);
        return () => clearInterval(timer);
    }, [activeIndex]);

    return (
        <section className="relative py-24 bg-zinc-900 overflow-hidden text-white">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

            <div className="absolute top-0 right-0 p-32 bg-[var(--color-primary)] opacity-10 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 left-0 p-32 bg-orange-600 opacity-10 blur-[150px] rounded-full" />

            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Mutlu Misafirlerimiz</h2>
                    <p className="text-white/60">Google&apos;da 4.8/5.0 Puan</p>
                </div>

                <div className="relative min-h-[300px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center p-4"
                        >
                            <TestimonialCard
                                text={REVIEWS[activeIndex].text}
                                author={REVIEWS[activeIndex].author}
                                rating={REVIEWS[activeIndex].rating}
                                isActive={true}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={(e) => { e.stopPropagation(); prevReview(); }}
                        className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div className="flex gap-2 items-center">
                        {REVIEWS.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-white w-6" : "bg-white/30"}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextReview(); }}
                        className="p-2 rounded-full border-white/20 border hover:bg-white/10 transition-colors"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>
            </Container>
        </section>
    );
}
