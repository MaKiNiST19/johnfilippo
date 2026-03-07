"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// FadeInUp Wrapper
interface FadeInUpProps extends HTMLMotionProps<"div"> {
    delay?: number;
    duration?: number;
    className?: string;
}

export function FadeInUp({
    children,
    delay = 0,
    duration = 0.5,
    className,
    ...props
}: FadeInUpProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Stagger Container
export function StaggerContainer({
    children,
    className,
    delay = 0,
    staggerDelay = 0.1,
    ...props
}: HTMLMotionProps<"div"> & { delay?: number, staggerDelay?: number }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        delayChildren: delay,
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Stagger Item
export function StaggerItem({ children, className, ...props }: HTMLMotionProps<"div">) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// ScaleIn Wrapper (for Cards)
export function ScaleIn({ children, className, delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Parallax Text/Element
export function ParallaxElement({ children, y, className }: { children: React.ReactNode, y: any, className?: string }) {
    return (
        <motion.div style={{ y }} className={className}>
            {children}
        </motion.div>
    )
}
