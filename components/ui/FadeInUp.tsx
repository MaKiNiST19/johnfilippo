'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInUpProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children: ReactNode
    delay?: number
    duration?: number
    className?: string
}

/**
 * Reusable fade-in-up animation wrapper using Framer Motion.
 * Use for entrance animations on sections and cards.
 */
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
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    )
}

/**
 * Staggered children animation - wrap parent and use with FadeInUp children
 */
export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
}: {
    children: ReactNode
    className?: string
    staggerDelay?: number
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

/**
 * Use as child of StaggerContainer for staggered animations
 */
export function StaggerItem({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
