import type { Metadata } from 'next'
import { Phone, MapPin } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeInUp } from '@/components/ui/FadeInUp'
import { MenuCategoryNav } from '@/components/ui/MenuCategoryNav'
import { MenuItemCard } from '@/components/ui/MenuItemCard'
import { MENU_CATEGORIES } from '@/lib/menuData'

export const metadata: Metadata = {
    title: 'Menü | John Filippo Pizza Eryaman',
    description:
        'John Filippo Eryaman menüsü - Pizzalar, salatalar, atıştırmalıklar, içecekler ve tatlılar. Güncel fiyatlar ve online menü.',
    keywords: [
        'John Filippo menü',
        'Eryaman pizza menü',
        'pizza fiyatları',
        'Ankara pizza menü',
    ],
}

const PHONE_LINK = 'tel:+903121234567'
const MAPS_LINK = 'https://maps.google.com/?q=John+Filippo+Eryaman+Ankara'

export default function MenuPage() {
    const categories = MENU_CATEGORIES.filter((c) => c.items.length > 0)

    return (
        <>
            <div className="bg-[var(--color-dark)] text-white pt-4 pb-2">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Menü</h1>
                            <p className="text-white/60 text-sm">John Filippo Eryaman</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <a href={PHONE_LINK}>
                                <Button size="sm" leftIcon={<Phone className="h-4 w-4" />}>
                                    Ara
                                </Button>
                            </a>
                            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
                                <Button variant="outline" size="sm" leftIcon={<MapPin className="h-4 w-4" />}>
                                    Yol Tarifi
                                </Button>
                            </a>
                        </div>
                    </div>
                </Container>
            </div>

            <MenuCategoryNav
                categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
            />

            <div className="bg-[var(--color-cream)] min-h-screen pb-20">
                <Container className="py-8">
                    {categories.map((category, catIndex) => (
                        <section
                            key={category.id}
                            id={`category-${category.slug}`}
                            className={catIndex > 0 ? 'mt-12' : ''}
                        >
                            <FadeInUp>
                                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-6">
                                    {category.name}
                                </h2>
                            </FadeInUp>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {category.items.map((item, itemIndex) => (
                                    <FadeInUp key={item.id} delay={itemIndex * 0.05}>
                                        <MenuItemCard
                                            name={item.name}
                                            description={item.description ?? null}
                                            price={item.price}
                                        />
                                    </FadeInUp>
                                ))}
                            </div>
                        </section>
                    ))}
                </Container>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50">
                <div className="flex gap-3">
                    <a href={PHONE_LINK} className="flex-1">
                        <Button className="w-full" leftIcon={<Phone className="h-4 w-4" />}>
                            Sipariş Ver
                        </Button>
                    </a>
                    <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon">
                            <MapPin className="h-5 w-5" />
                        </Button>
                    </a>
                </div>
            </div>
        </>
    )
}
