import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionProps {
    children: ReactNode
    className?: string
    id?: string
    dark?: boolean
}

/**
 * Section wrapper with consistent padding and optional dark background
 */
export function Section({ children, className, id, dark }: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                'section-padding',
                dark ? 'bg-gradient-dark text-white' : 'bg-[var(--color-cream)]',
                className
            )}
        >
            {children}
        </section>
    )
}

interface SectionTitleProps {
    title: string
    subtitle?: string
    centered?: boolean
    className?: string
    light?: boolean
}

/**
 * Semantic section title with optional subtitle
 */
export function SectionTitle({
    title,
    subtitle,
    centered = true,
    className,
    light,
}: SectionTitleProps) {
    return (
        <div className={cn(centered && 'text-center', 'mb-12', className)}>
            <h2
                className={cn(
                    'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
                    light ? 'text-white' : 'text-[var(--color-text-primary)]'
                )}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={cn(
                        'mt-4 text-lg md:text-xl max-w-2xl',
                        centered && 'mx-auto',
                        light ? 'text-white/80' : 'text-[var(--color-text-secondary)]'
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    )
}
