'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface MenuItemCardProps {
    name: string
    description?: string | null
    price: number
    imageUrl?: string | null
    badges?: string[]
    isAvailable?: boolean
}

/**
 * Menu item card for displaying pizza/food products
 */
export function MenuItemCard({
    name,
    description,
    price,
    imageUrl,
    badges = [],
    isAvailable = true,
}: MenuItemCardProps) {
    return (
        <motion.article
            whileHover={{ y: -4 }}
            className={cn(
                'group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300',
                !isAvailable && 'opacity-60'
            )}
        >
            {/* Image */}
            {imageUrl && (
                <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-5">
                {/* Badges */}
                {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {badges.map((badge) => (
                            <span
                                key={badge}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                )}

                {/* Name & Price */}
                <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">
                        {name}
                    </h3>
                    <span className="shrink-0 text-lg font-bold text-[var(--color-primary)]">
                        ₺{Number(price).toFixed(0)}
                    </span>
                </div>

                {/* Description */}
                {description && (
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)] line-clamp-2">
                        {description}
                    </p>
                )}

                {/* Unavailable overlay */}
                {!isAvailable && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-full">
                            Şu an mevcut değil
                        </span>
                    </div>
                )}
            </div>
        </motion.article>
    )
}
