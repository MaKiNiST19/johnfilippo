import { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { PopularPizzas } from '@/components/sections/PopularPizzas'
import { PromoBanner } from '@/components/sections/PromoBanner'
import { MenuList } from '@/components/sections/MenuList'
import { AdvantageMenu } from '@/components/sections/AdvantageMenu'
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'

// SEO Metadata
export const metadata: Metadata = {
    title: 'John Filippo Pizza Eryaman | Ankara\'nın En İyi Napoli Pizzası',
    description: 'Eryaman\'ın en lezzetli pizzacısı John Filippo! Taş fırınında pişen gerçek Napoli pizzası. Hafta içi %10 indirim. 23:00\'e kadar paket servis.',
}

export default function HomePage() {
    return (
        <main className="flex flex-col min-h-screen">
            {/* 1. HERO SECTION */}
            <Hero />

            {/* 2. FEATURES SECTION - Pizza + 4 Feature Cards */}
            <Features />

            {/* 3. POPULAR PIZZAS - Circular Pizza Showcase */}
            <PopularPizzas />

            {/* 4. PROMO BANNER - Hafta İçi %10 İndirim */}
            <PromoBanner />

            {/* 5. MENU LIST - Two Column Price List */}
            <MenuList />

            {/* 6. AVANTAJLI MENÜ - Deal Cards */}
            <AdvantageMenu />

            {/* 7. MARQUEE BANNER - Napoli'den Sevgilerle */}
            <MarqueeBanner />
        </main>
    )
}
