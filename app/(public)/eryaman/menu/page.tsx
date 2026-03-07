import { Metadata } from 'next'
import { Phone, MapPin } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeInUp } from '@/components/ui/FadeInUp'
import { MenuCategoryNav } from '@/components/ui/MenuCategoryNav'
import { MenuItemCard } from '@/components/ui/MenuItemCard'
import { createClient } from '@/lib/supabase/server'

// SEO Metadata
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

// Contact info
const PHONE_LINK = 'tel:+903121234567'
const MAPS_LINK = 'https://maps.google.com/?q=John+Filippo+Eryaman+Ankara'

// Fallback data when database is empty
const FALLBACK_CATEGORIES = [
    { id: '1', name: 'Klasik Pizzalar', slug: 'klasik_pizzalar' },
    { id: '2', name: 'Özel Pizzalar', slug: 'ozel_pizzalar' },
    { id: '3', name: 'Atıştırmalıklar', slug: 'atistirmaliklar' },
    { id: '4', name: 'Tatlılar', slug: 'tatlilar' },
    { id: '5', name: 'İçecekler', slug: 'icecekler' },
]

const FALLBACK_MENU_DATA = {
    klasik_pizzalar: [
        { id: 'k1', name: 'Margherita', description: 'Rende mozzarella, domates sos, pesto sos, fesleğen', price: 249 },
        { id: 'k2', name: 'Vejeteryan Pizza', description: 'Rende mozzarella, domates sos, patlıcan, ıspanak, kabak, mantar, parmesan', price: 249 },
        { id: 'k3', name: 'Ispanaklı Pizza', description: 'Rende mozzarella, domates sos, lor peyniri, ıspanak, kırmızı soğan, sarımsak yağı', price: 249 },
        { id: 'k4', name: 'Margherita Originale', description: 'Suda mozzarella, domates sos, fesleğen, kokteyl domates', price: 299 },
        { id: 'k5', name: 'Lor Peynirli Kabaklı', description: 'Lor peyniri, domates sos, taze kabak, kokteyl domates, badem, roka yaprakları, pesto sos', price: 299 },
        { id: 'k6', name: 'Ton Balıklı Pizza', description: 'Rende mozzarella, domates sos, kapari, kırmızı soğan, ton balığı', price: 499 },
        { id: 'k7', name: 'Mantarlı Pizza', description: 'Rende mozzarella, domates sos, mantar, ricotta, kekik, pesto sos', price: 349 },
        { id: 'k8', name: 'Dört Peynirli Pizza', description: 'Suda mozzarella, rokfor, parmesan, ricotta, pesto sos', price: 449 },
        { id: 'k9', name: 'Sucuklu Pizza', description: 'Rende mozzarella, domates sos, dana sucuk, mısır', price: 449 },
        { id: 'k10', name: 'Salamlı Pizza', description: 'Rende mozzarella, domates sos, dana salam', price: 449 },
        { id: 'k11', name: 'Sosisli Pizza', description: 'Rende mozzarella, domates sos, dana sosis, mısır', price: 449 },
        { id: 'k12', name: 'Karışık Pizza', description: 'Rende mozzarella, domates sos, salam, sosis, sucuk, mantar, köy biberi, kırmızı biber, dilim zeytin, kekik, mısır, cherry domates', price: 499 },
    ],
    ozel_pizzalar: [
        { id: 'o1', name: 'Acılı Tavuklu Pizza', description: 'Rende mozzarella, domates sos, acı sos, tavuk parçaları, jalapeno biberi, kapya biber, mısır', price: 419 },
        { id: 'o2', name: 'BBQ Tavuklu Pizza', description: 'Rende mozzarella, domates sos, mısır, BBQ soslu tavuk dilimleri, kırmızı soğan', price: 419 },
        { id: 'o3', name: 'Ricotta Funghi Pizza', description: 'Rende mozzarella, krema sos, mantar, ricotta, taze kekik', price: 419 },
        { id: 'o4', name: 'Pesto Pizza', description: 'Pesto sos, suda mozzarella, limon zest, file badem, mantar', price: 419 },
        { id: 'o5', name: 'Ege Pizza', description: 'Rende mozzarella, domates sos, taze ıspanak, enginar kalbi, file badem, pesto sos', price: 449 },
        { id: 'o6', name: 'Dana Bacon Pizza', description: 'Rende mozzarella, domates sos, dana bacon, pestolu roka yaprakları, parmesan', price: 649 },
        { id: 'o7', name: 'John Filippo Pizza', description: 'Rende mozzarella, domates sos, sucuk, kavurma, pastırma, salam, köy biberi, taze kekik, kırmızı soğan', price: 799 },
        { id: 'o8', name: 'Bresaola Pizza', description: 'Rende mozzarella, domates sos, bresaola, roka yaprakları, parmesan', price: 649 },
        { id: 'o9', name: 'Pastırmalı Pizza', description: 'Rende mozzarella, domates sos, pastırma', price: 649 },
        { id: 'o10', name: 'Pizza Kebap', description: 'Rende mozzarella, domates sos, sumak, satır kıyma, köy biberi, mor soğan', price: 649 },
        { id: 'o11', name: 'Kasap Sucuklu Pizza', description: 'Rende mozzarella, domates sos, kasap sucuk, köy biberi', price: 649 },
        { id: 'o12', name: 'Füme Kaburga Pizza', description: 'Rende mozzarella, domates sos, füme kaburga, roka, parmesan', price: 749 },
        { id: 'o13', name: 'Paris Soslu Pizza', description: 'Rende mozzarella, paris sos, dana nuar, kibrit patates, parmesan', price: 749 },
        { id: 'o14', name: 'Kavurmalı Pizza', description: 'Rende mozzarella, domates sos, dana kavurma, köz patlıcan, taze kekik, mısır, sarımsaklı yağ, köy biberi, kırmızı soğan', price: 799 },
    ],
    atistirmaliklar: [
        { id: 'a1', name: 'Domates Çorbası', description: 'Fırınlanmış domates, salça, kereviz, soğan, sarımsak, kapya biber, et suyu, havuç, mozzarella, kruton', price: 119 },
        { id: 'a2', name: 'Patates Kızartması', description: 'Patates kızartması, mayonez ve ketçap sos', price: 149 },
        { id: 'a3', name: 'Soğan Halkası', description: 'Patates tava, kızartılmış soğan halkaları', price: 229 },
        { id: 'a4', name: 'Çıtır Tavuk', description: 'Çıtır tavuk, patates kızartması', price: 229 },
        { id: 'a5', name: 'BBQ Çıtır Tavuk', description: 'Çıtır tavuk, BBQ sos, patates kızartması', price: 228 },
        { id: 'a6', name: 'Moğol Tavuk', description: 'Acılı çıtır tavuk parçaları patates kızartması ile servis edilir', price: 229 },
        { id: 'a7', name: 'Mozzarella Stick', description: 'Patates tava, kızarmış mozzarella stick', price: 249 },
        { id: 'a8', name: 'Çıtır Mix Kova', description: 'Patates kızartması, çıtır tavuk', price: 279 },
        { id: 'a9', name: 'Roka Tulum Bowl', description: 'Roka, tulum peyniri, cherry domates, incir, ceviz', price: 179 },
        { id: 'a10', name: 'Acılı Çıtır Tavuk', description: 'Çıtır tavuk, acı sos, patates kızartması', price: 228 },
    ],
    tatlilar: [
        { id: 't1', name: 'Tiramisu', description: 'Mascarpone peyniri ile hazırlanmış klasik İtalyan tiramisu', price: 149 },
        { id: 't2', name: 'Çikolatalı Pizza', description: 'Nutella, çilek, muz, pudra şekeri, badem', price: 249 },
    ],
    icecekler: [
        { id: 'i1', name: 'Coca Cola', description: '', price: 80 },
        { id: 'i2', name: 'Coca Cola Zero', description: '', price: 80 },
        { id: 'i3', name: 'Sprite', description: '', price: 80 },
        { id: 'i4', name: 'Fanta', description: '', price: 80 },
        { id: 'i5', name: 'Ice Tea Limon', description: '', price: 80 },
        { id: 'i6', name: 'Ice Tea Şeftali', description: '', price: 80 },
        { id: 'i7', name: 'Gazoz', description: '', price: 60 },
        { id: 'i8', name: 'Özerhisar Ayran', description: '', price: 70 },
        { id: 'i9', name: 'Cappy Karışık', description: '', price: 80 },
        { id: 'i10', name: 'Cappy Portakal', description: '', price: 80 },
        { id: 'i11', name: 'Cappy Şeftali', description: '', price: 80 },
        { id: 'i12', name: 'Cappy Vişne', description: '', price: 80 },
        { id: 'i13', name: 'Soda', description: '', price: 60 },
        { id: 'i14', name: 'Su', description: '', price: 30 },
    ],
}

interface MenuItem {
    id: string
    name: string
    description: string | null
    price: number
    imageUrl?: string | null
    badges?: string[]
    isAvailable?: boolean
}

interface Category {
    id: string
    name: string
    slug: string
    items: MenuItem[]
}

export default async function MenuPage() {
    const supabase = await createClient()

    // Try to fetch menu data from Supabase
    let categories: Category[] = []
    let hasRealData = false

    try {
        // Get menu items view from Supabase
        const { data: menuData, error } = await supabase
            .from('v_menu_items_with_details')
            .select('*')
            .order('category_sort_order')
            .order('sort_order')

        if (!error && menuData && menuData.length > 0) {
            hasRealData = true

            // Group by category
            const categoryMap = new Map<string, Category>()

            for (const item of menuData as any[]) {
                if (!categoryMap.has(item.category_id)) {
                    categoryMap.set(item.category_id, {
                        id: item.category_id,
                        name: item.category_name,
                        slug: item.category_slug,
                        items: [],
                    })
                }

                categoryMap.get(item.category_id)!.items.push({
                    id: item.menu_item_id,
                    name: item.product_name,
                    description: item.product_description,
                    price: item.effective_price,
                    imageUrl: item.product_image_url,
                    isAvailable: item.is_available,
                })
            }

            categories = Array.from(categoryMap.values())
        }
    } catch (e) {
        console.error('Error fetching menu:', e)
    }

    // Use fallback data if no real data
    if (!hasRealData) {
        categories = FALLBACK_CATEGORIES.map((cat) => ({
            ...cat,
            items: FALLBACK_MENU_DATA[cat.slug as keyof typeof FALLBACK_MENU_DATA] || [],
        }))
    }

    return (
        <>
            {/* Header */}
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

            {/* Category Navigation */}
            <MenuCategoryNav
                categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
            />

            {/* Menu Content */}
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
                                            description={item.description}
                                            price={item.price}
                                            imageUrl={item.imageUrl}
                                            badges={item.badges}
                                            isAvailable={item.isAvailable}
                                        />
                                    </FadeInUp>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* No data message */}
                    {categories.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-[var(--color-text-secondary)] text-lg">
                                Menü bilgisi yükleniyor...
                            </p>
                        </div>
                    )}
                </Container>
            </div>

            {/* Sticky Bottom CTA (Mobile) */}
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
