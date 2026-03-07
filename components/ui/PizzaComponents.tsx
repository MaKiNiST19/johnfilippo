"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "./Button";

// Floating Chip
export function FloatingChip({
    children,
    delay = 0,
    className
}: {
    children: React.ReactNode,
    delay?: number,
    className?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: [0, -10, 0]
            }}
            transition={{
                opacity: { duration: 0.8, delay },
                y: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3,
                    ease: "easeInOut",
                    delay: delay + Math.random() * 2
                }
            }}
            className={cn(
                "absolute z-20 backdrop-blur-md bg-white/90 dark:bg-black/80 px-4 py-2 rounded-full shadow-xl border border-white/20 text-sm font-semibold flex items-center gap-2",
                className
            )}
        >
            {children}
        </motion.div>
    );
}

// Premium Feature Card
export function FeatureCard({
    icon: Icon,
    title,
    description,
    index
}: {
    icon: any,
    title: string,
    description: string,
    index: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
            className="group relative p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm transition-all duration-300"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-secondary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

// Premium Pizza Card (Bento Style Compatible)
export function PizzaCard({
    name,
    description,
    price,
    imageUrl,
    badges = [],
    isLarge = false,
    className
}: {
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    badges?: string[],
    isLarge?: boolean,
    className?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={cn(
                "group relative overflow-hidden bg-white rounded-3xl shadow-sm border border-[var(--color-secondary)]/10 flex flex-col h-full",
                isLarge ? "md:col-span-2 md:flex-row" : "col-span-1",
                className
            )}
        >
            {/* Image Section */}
            <div className={cn(
                "relative overflow-hidden",
                isLarge ? "h-64 md:h-full md:w-1/2" : "h-60 w-full"
            )}>
                <div className="absolute inset-0 bg-zinc-100 animate-pulse" /> {/* Placeholder */}
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {badges.map((badge, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-white/95 backdrop-blur text-xs font-bold uppercase tracking-wider text-black rounded-lg shadow-sm"
                        >
                            {badge}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <div className={cn(
                "p-6 flex flex-col justify-between",
                isLarge ? "md:w-1/2 md:p-8 lg:p-10" : "flex-1"
            )}>
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className={cn("font-bold text-[var(--color-text-primary)]", isLarge ? "text-3xl" : "text-xl")}>
                            {name}
                        </h3>
                        {/* Rating for effect */}
                        <div className="flex items-center gap-1 text-[var(--color-secondary)]">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium text-[var(--color-text-primary)]">4.9</span>
                        </div>
                    </div>
                    <p className={cn("text-[var(--color-text-secondary)]", isLarge ? "text-lg line-clamp-3" : "text-sm line-clamp-2")}>
                        {description}
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-bold text-[var(--color-primary)]">
                        {price} ₺
                    </span>
                    <Button
                        size="sm"
                        variant={isLarge ? "primary" : "secondary"}
                        className="group/btn"
                        rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />}
                    >
                        Sepete Ekle
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

// Testimonial Card
export function TestimonialCard({
    text,
    author,
    rating = 5,
    isActive
}: {
    text: string,
    author: string,
    rating?: number,
    isActive: boolean
}) {
    return (
        <motion.div
            animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1 : 0.95,
                filter: isActive ? "blur(0px)" : "blur(2px)"
            }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center px-4"
        >
            <div className="flex justify-center gap-1 mb-6 text-yellow-400">
                {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current" />
                ))}
            </div>
            <p className={cn(
                "font-serif italic text-white mb-6",
                isActive ? "text-2xl md:text-3xl leading-relaxed" : "text-xl"
            )}>
                &ldquo;{text}&rdquo;
            </p>
            <p className="text-white/80 font-medium tracking-wide">
                — {author}
            </p>
        </motion.div>
    );
}
