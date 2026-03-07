'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Category {
    id: string
    name: string
    slug: string
}

interface MenuCategoryNavProps {
    categories: Category[]
    activeCategory?: string
    onSelect?: (slug: string) => void
}

/**
 * Horizontal scrollable category navigation for menu page
 * Sticky on mobile with smooth scroll to category sections
 */
export function MenuCategoryNav({
    categories,
    activeCategory,
    onSelect,
}: MenuCategoryNavProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [showLeftShadow, setShowLeftShadow] = useState(false)
    const [showRightShadow, setShowRightShadow] = useState(false)

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const updateShadows = () => {
            setShowLeftShadow(el.scrollLeft > 0)
            setShowRightShadow(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
        }

        updateShadows()
        el.addEventListener('scroll', updateShadows)
        window.addEventListener('resize', updateShadows)

        return () => {
            el.removeEventListener('scroll', updateShadows)
            window.removeEventListener('resize', updateShadows)
        }
    }, [categories])

    const handleClick = (slug: string) => {
        onSelect?.(slug)
        // Smooth scroll to category section
        const section = document.getElementById(`category-${slug}`)
        if (section) {
            const offset = 140 // Account for sticky nav
            const top = section.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }

    return (
        <nav className="sticky top-16 z-40 bg-[var(--color-cream)]/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
            <div className="relative">
                {/* Left shadow gradient */}
                <div
                    className={cn(
                        'absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--color-cream)] to-transparent z-10 pointer-events-none transition-opacity',
                        showLeftShadow ? 'opacity-100' : 'opacity-0'
                    )}
                />

                {/* Scrollable container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2"
                >
                    {categories.map((category) => {
                        const isActive = activeCategory === category.slug
                        return (
                            <motion.button
                                key={category.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleClick(category.slug)}
                                className={cn(
                                    'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all',
                                    isActive
                                        ? 'bg-[var(--color-primary)] text-white shadow-lg'
                                        : 'bg-gray-100 text-[var(--color-text-secondary)] hover:bg-gray-200'
                                )}
                            >
                                {category.name}
                            </motion.button>
                        )
                    })}
                </div>

                {/* Right shadow gradient */}
                <div
                    className={cn(
                        'absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--color-cream)] to-transparent z-10 pointer-events-none transition-opacity',
                        showRightShadow ? 'opacity-100' : 'opacity-0'
                    )}
                />
            </div>
        </nav>
    )
}
