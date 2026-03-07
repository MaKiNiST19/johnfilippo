"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacityOverlay = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

    return (
        <section ref={ref} className="relative min-h-[60vh] md:min-h-[85vh] overflow-hidden">
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: yBackground }}
            >
                <Image
                    src="/images/slider_1.png"
                    alt="John Filippo Gerçek Napoli Pizzası"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="100vw"
                />
            </motion.div>
        </section>
    );
}
