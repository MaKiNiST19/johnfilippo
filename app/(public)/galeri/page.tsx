import { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Section, SectionTitle } from '@/components/ui/Section'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/FadeInUp'

// SEO Metadata
export const metadata: Metadata = {
    title: 'Galeri | John Filippo Pizza Eryaman',
    description:
        'John Filippo Eryaman fotoğraf galerisi. Mekanımız, pizzalarımız ve mutlu anlar.',
}

// Placeholder images - replace with real images later
const galleryImages = [
    { id: '1', src: '/images/gallery/1.jpg', alt: 'Pizza hazırlık', category: 'Mutfak' },
    { id: '2', src: '/images/gallery/2.jpg', alt: 'Taş fırın', category: 'Mutfak' },
    { id: '3', src: '/images/gallery/3.jpg', alt: 'Mekan iç görünüm', category: 'Mekan' },
    { id: '4', src: '/images/gallery/4.jpg', alt: 'Margherita pizza', category: 'Pizzalar' },
    { id: '5', src: '/images/gallery/5.jpg', alt: 'Pepperoni pizza', category: 'Pizzalar' },
    { id: '6', src: '/images/gallery/6.jpg', alt: 'Dış alan', category: 'Mekan' },
    { id: '7', src: '/images/gallery/7.jpg', alt: 'Ekibimiz', category: 'Ekip' },
    { id: '8', src: '/images/gallery/8.jpg', alt: 'Özel pizza', category: 'Pizzalar' },
    { id: '9', src: '/images/gallery/9.jpg', alt: 'Tatlılar', category: 'Lezzetler' },
]

export default function GalleryPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-[var(--color-dark)] text-white py-16 md:py-24">
                <Container>
                    <FadeInUp>
                        <div className="text-center max-w-2xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeri</h1>
                            <p className="text-lg text-white/70">
                                Mekanımız, pizzalarımız ve mutlu anlardan kareler.
                            </p>
                        </div>
                    </FadeInUp>
                </Container>
            </section>

            {/* Gallery Grid */}
            <Section>
                <Container>
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {galleryImages.map((image) => (
                            <StaggerItem key={image.id}>
                                <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 cursor-pointer">
                                    {/* Placeholder - replace with real Image component */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:bg-gray-300 transition-colors">
                                        <div className="text-center">
                                            <p className="font-medium">{image.alt}</p>
                                            <p className="text-sm mt-1">{image.category}</p>
                                        </div>
                                    </div>

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <div className="text-white">
                                            <p className="font-medium">{image.alt}</p>
                                            <p className="text-sm text-white/70">{image.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* CTA */}
            <Section dark>
                <Container>
                    <FadeInUp>
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Bizi Ziyaret Edin
                            </h2>
                            <p className="text-white/70 mb-8 max-w-xl mx-auto">
                                Fotoğraflardan daha güzeli yerinde deneyimlemek.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/eryaman">
                                    <Button size="lg">Şubemiz</Button>
                                </Link>
                                <Link href="/eryaman/menu">
                                    <Button variant="outline" size="lg">Menüyü Gör</Button>
                                </Link>
                            </div>
                        </div>
                    </FadeInUp>
                </Container>
            </Section>
        </>
    )
}
