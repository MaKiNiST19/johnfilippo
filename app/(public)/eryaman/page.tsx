import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MapPin, Clock, Navigation, Star } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { Section, SectionTitle } from '@/components/ui/Section'
import { FadeInUp } from '@/components/ui/FadeInUp'

// Local SEO Metadata for Eryaman branch
export const metadata: Metadata = {
    title: 'John Filippo Eryaman Şubesi | Pizza Ankara Etimesgut',
    description:
        'John Filippo Eryaman şubesi - Ankara Etimesgut\'un en sevilen pizzacısı. Taş fırında İtalyan pizzası, paket servis ve restorant. Adres, telefon ve çalışma saatleri.',
    keywords: [
        'John Filippo Eryaman',
        'Eryaman pizza',
        'Eryaman pizzacı',
        'Etimesgut pizza',
        'Ankara pizza',
        'pizza Eryaman',
        'pizzacı Eryaman',
    ],
    openGraph: {
        title: 'John Filippo Eryaman Şubesi',
        description: 'Eryaman\'ın favori pizzacısı. Taş fırında gerçek İtalyan lezzeti.',
        locale: 'tr_TR',
        type: 'website',
    },
}

// Restaurant info
const BRANCH_INFO = {
    name: 'John Filippo Eryaman',
    address: 'Eryaman Mah. Gazi Mustafa Kemal Blv. No:123',
    city: 'Etimesgut, Ankara',
    phone: '+90 312 123 4567',
    phoneLink: 'tel:+903121234567',
    whatsapp: '+90 532 123 4567',
    whatsappLink: 'https://wa.me/905321234567',
    mapsLink: 'https://maps.google.com/?q=John+Filippo+Eryaman+Ankara',
    hours: {
        weekdays: '11:00 - 23:00',
        weekend: '11:00 - 24:00',
    },
}

const highlights = [
    { stat: '20+', label: 'Yıllık Tecrübe' },
    { stat: '50+', label: 'Çeşit Pizza' },
    { stat: '4.8', label: 'Google Puan' },
    { stat: '500+', label: 'Değerlendirme' },
]

export default function EryamanBranchPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center bg-gradient-dark overflow-hidden">
                <Image
                    src="/images/branch-eryaman.jpg"
                    alt="John Filippo Jesus Pizza Eryaman Şubesi"
                    fill
                    className="object-cover object-center opacity-20"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/50" />

                <Container className="relative z-10 py-20">
                    <FadeInUp>
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--color-primary)]/20 text-[var(--color-primary)] mb-6">
                                <MapPin className="h-4 w-4 mr-2" />
                                Eryaman, Etimesgut, Ankara
                            </span>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                                John Filippo <br />
                                <span className="text-[var(--color-primary)]">Eryaman Şubesi</span>
                            </h1>

                            <p className="mt-6 text-lg text-white/80 max-w-xl">
                                Ankara Eryaman&apos;da taş fırınında pişen gerçek İtalyan pizzası.
                                Sıcak atmosfer, taze malzemeler ve unutulmaz lezzet.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link href="/eryaman/menu">
                                    <Button size="lg">
                                        Menüyü Gör
                                    </Button>
                                </Link>
                                <a href={BRANCH_INFO.phoneLink}>
                                    <Button variant="outline" size="lg" leftIcon={<Phone className="h-5 w-5" />}>
                                        Ara
                                    </Button>
                                </a>
                                <a href={BRANCH_INFO.mapsLink} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="lg" leftIcon={<Navigation className="h-5 w-5" />}>
                                        Yol Tarifi
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </FadeInUp>
                </Container>
            </section>

            {/* Stats Section */}
            <Section>
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {highlights.map((item, index) => (
                            <FadeInUp key={item.label} delay={index * 0.1}>
                                <div className="text-center">
                                    <p className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
                                        {item.stat}
                                    </p>
                                    <p className="mt-2 text-[var(--color-text-secondary)]">
                                        {item.label}
                                    </p>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* About Eryaman Branch */}
            <Section dark>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <FadeInUp>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    Eryaman&apos;ın Favorisi
                                </h2>
                                <div className="space-y-4 text-white/80">
                                    <p>
                                        2018 yılından bu yana Eryaman&apos;da hizmet veren şubemiz,
                                        bölgenin en sevilen pizzacılarından biri haline geldi.
                                    </p>
                                    <p>
                                        Geniş ve ferah mekanımızda ailece yemek yiyebilir,
                                        özel günlerinizi kutlayabilir veya paket servis ile
                                        evinizde John Filippo lezzetinin tadını çıkarabilirsiniz.
                                    </p>
                                    <p>
                                        <strong className="text-white">Neden Eryaman bizi seviyor?</strong><br />
                                        Çünkü her pizzamız taş fırında, taze malzemelerle,
                                        aynı tutku ve özenle hazırlanıyor.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 mt-6">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="h-5 w-5 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-white font-medium">4.8</span>
                                    <span className="text-white/60">· 500+ değerlendirme</span>
                                </div>
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={0.2}>
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/10">
                                <div className="w-full h-full flex items-center justify-center text-white/30">
                                    <span>Fotoğraf alanı</span>
                                </div>
                            </div>
                        </FadeInUp>
                    </div>
                </Container>
            </Section>

            {/* Contact Info Section */}
            <Section>
                <Container>
                    <FadeInUp>
                        <SectionTitle
                            title="İletişim Bilgileri"
                            subtitle="Eryaman şubemize ulaşmak için"
                        />
                    </FadeInUp>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {/* Address */}
                        <FadeInUp delay={0.1}>
                            <div className="p-6 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                                    <MapPin className="h-6 w-6 text-[var(--color-primary)]" />
                                </div>
                                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Adres</h3>
                                <address className="not-italic text-[var(--color-text-secondary)]">
                                    {BRANCH_INFO.address}<br />
                                    {BRANCH_INFO.city}
                                </address>
                                <a
                                    href={BRANCH_INFO.mapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 text-[var(--color-primary)] font-medium hover:underline"
                                >
                                    Yol Tarifi Al
                                    <Navigation className="h-4 w-4" />
                                </a>
                            </div>
                        </FadeInUp>

                        {/* Phone */}
                        <FadeInUp delay={0.2}>
                            <div className="p-6 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                                    <Phone className="h-6 w-6 text-[var(--color-primary)]" />
                                </div>
                                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Telefon</h3>
                                <p className="text-[var(--color-text-secondary)]">
                                    Sipariş ve rezervasyon için
                                </p>
                                <a
                                    href={BRANCH_INFO.phoneLink}
                                    className="inline-flex items-center gap-2 mt-4 text-[var(--color-primary)] font-medium hover:underline text-lg"
                                >
                                    {BRANCH_INFO.phone}
                                </a>
                            </div>
                        </FadeInUp>

                        {/* Hours */}
                        <FadeInUp delay={0.3}>
                            <div className="p-6 rounded-2xl bg-white shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                                    <Clock className="h-6 w-6 text-[var(--color-primary)]" />
                                </div>
                                <h3 className="font-bold text-[var(--color-text-primary)] mb-2">Çalışma Saatleri</h3>
                                <div className="text-[var(--color-text-secondary)] space-y-1">
                                    <p>Hafta içi: {BRANCH_INFO.hours.weekdays}</p>
                                    <p>Hafta sonu: {BRANCH_INFO.hours.weekend}</p>
                                </div>
                            </div>
                        </FadeInUp>
                    </div>
                </Container>
            </Section>

            {/* Map Section */}
            <Section dark>
                <Container>
                    <FadeInUp>
                        <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.4!2d32.6!3d39.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU3JzAwLjAiTiAzMsKwMzYnMDAuMCJF!5e0!3m2!1str!2str!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="John Filippo Eryaman Konum"
                            />
                        </div>
                    </FadeInUp>
                </Container>
            </Section>

            {/* CTA */}
            <Section>
                <Container>
                    <FadeInUp>
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                                Menümüzü Keşfedin
                            </h2>
                            <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto">
                                50&apos;den fazla pizza çeşidi, taze salatalar, atıştırmalıklar ve daha fazlası.
                            </p>
                            <Link href="/eryaman/menu">
                                <Button size="lg">
                                    Menüyü Gör
                                </Button>
                            </Link>
                        </div>
                    </FadeInUp>
                </Container>
            </Section>
        </>
    )
}
