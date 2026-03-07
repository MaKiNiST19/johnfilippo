'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const links = [
    { href: '/', label: 'Anasayfa' },
    { href: '/hakkimizda', label: 'Hakkımızda' },
    { href: '/eryaman/menu', label: 'Menü' },
    { href: '/iletisim', label: 'İletişim' },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Main Nav Bar */}
            <div
                className={cn(
                    'transition-all duration-300',
                    scrolled
                        ? 'bg-white/95 backdrop-blur-lg shadow-sm'
                        : 'bg-[var(--color-cream)]'
                )}
            >
                <Container>
                    <div className="flex h-16 md:h-20 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center h-full" onClick={handleLogoClick}>
                            <div className="relative h-[70%] w-auto">
                                <Image
                                    src="/images/logo.png"
                                    alt="John Filippo Logo"
                                    width={0}
                                    height={0}
                                    sizes="50vw"
                                    className="h-full w-auto object-contain"
                                    style={{ width: "auto", height: "100%" }}
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-10">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'text-base font-medium transition-colors hover:text-[var(--color-secondary)] relative py-2',
                                        pathname === link.href
                                            ? 'text-[var(--color-secondary)]'
                                            : 'text-[var(--color-text-secondary)]'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 text-[var(--color-text-secondary)]"
                            aria-label="Menüyü aç"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </Container>
            </div>

            {/* Orange Stripe under navbar */}
            <div className="navbar-stripe" />

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white overflow-hidden shadow-lg"
                    >
                        <Container className="py-4 flex flex-col gap-2">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'text-base font-medium py-3 px-4 rounded-lg transition-colors',
                                        pathname === link.href
                                            ? 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]'
                                            : 'text-[var(--color-text-secondary)] hover:bg-gray-50'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
