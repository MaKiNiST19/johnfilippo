import { Metadata } from 'next'
import Image from 'next/image'
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Section, SectionTitle } from '@/components/ui/Section'
import { FadeInUp } from '@/components/ui/FadeInUp'

// SEO Metadata
export const metadata: Metadata = {
    title: 'İletişim | John Filippo Pizza Eryaman',
    description:
        'John Filippo Eryaman iletişim bilgileri. Adres, telefon, çalışma saatleri ve WhatsApp ile bize ulaşın.',
    keywords: [
        'John Filippo iletişim',
        'Eryaman pizza telefon',
        'John Filippo adres',
    ],
}

// Contact info
const CONTACT_INFO = {
    address: 'Eryaman Mah. Gazi Mustafa Kemal Blv. No:123',
    city: 'Etimesgut, Ankara',
    phone: '+90 312 123 4567',
    phoneLink: 'tel:+903121234567',
    whatsapp: '+90 532 123 4567',
    whatsappLink: 'https://wa.me/905321234567',
    email: 'info@johnfilippo.com',
    mapsLink: 'https://maps.google.com/?q=John+Filippo+Eryaman+Ankara',
    hours: {
        weekdays: '11:00 - 23:00',
        weekend: '11:00 - 24:00',
    },
}

const contactMethods = [
    {
        icon: Phone,
        title: 'Telefon',
        description: 'Sipariş ve rezervasyon',
        value: CONTACT_INFO.phone,
        link: CONTACT_INFO.phoneLink,
        linkText: 'Hemen Ara',
    },
    {
        icon: MessageCircle,
        title: 'WhatsApp',
        description: 'Hızlı mesajlaşma',
        value: CONTACT_INFO.whatsapp,
        link: CONTACT_INFO.whatsappLink,
        linkText: 'WhatsApp&apos;tan Yaz',
        external: true,
    },
    {
        icon: MapPin,
        title: 'Adres',
        description: CONTACT_INFO.address,
        value: CONTACT_INFO.city,
        link: CONTACT_INFO.mapsLink,
        linkText: 'Yol Tarifi Al',
        external: true,
    },
    {
        icon: Clock,
        title: 'Çalışma Saatleri',
        description: `Hafta içi: ${CONTACT_INFO.hours.weekdays}`,
        value: `Hafta sonu: ${CONTACT_INFO.hours.weekend}`,
    },
]

export default function ContactPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-[var(--color-dark)] text-white py-16 md:py-24">
                <Container>
                    <FadeInUp>
                        <div className="text-center max-w-2xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
                            <p className="text-lg text-white/70">
                                Sipariş, rezervasyon veya sorularınız için bize ulaşın.
                            </p>
                        </div>
                    </FadeInUp>
                </Container>
            </section>

            {/* Contact Methods */}
            <Section className="relative overflow-hidden">
                {/* Left Orange Pattern */}
                <div 
                    className="absolute top-0 left-0 w-24 md:w-36 z-0 pointer-events-none opacity-40"
                    style={{
                        height: "800px",
                        backgroundImage: "url('/images/pizza-pattern-turuncu.png')",
                        backgroundRepeat: "repeat-y",
                        backgroundSize: "100% auto",
                        backgroundPosition: "top left"
                    }}
                />

                {/* Right Blue Pattern */}
                <div 
                    className="absolute top-0 right-0 w-24 md:w-36 z-0 pointer-events-none opacity-40"
                    style={{
                        height: "800px",
                        backgroundImage: "url('/images/pizza-pattern-mavi.png')",
                        backgroundRepeat: "repeat-y",
                        backgroundSize: "100% auto",
                        backgroundPosition: "top right"
                    }}
                />

                {/* Decorative Small Images */}
                <div className="absolute top-20 right-[15%] w-12 h-12 md:w-16 md:h-16 z-0 pointer-events-none opacity-50">
                    <Image src="/images/tomato.png" alt="Domates" fill className="object-contain" />
                </div>
                <div className="absolute bottom-10 left-[15%] w-14 h-14 md:w-20 md:h-20 z-0 pointer-events-none opacity-40">
                    <Image src="/images/eryaman-en-iyi-pizzaci.png" alt="Pizza" fill className="object-contain" />
                </div>

                <Container className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {contactMethods.map((method, index) => (
                            <FadeInUp key={method.title} delay={index * 0.1}>
                                <div className="p-6 md:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                                            <method.icon className="h-6 w-6 text-[var(--color-primary)]" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                                                {method.title}
                                            </h3>
                                            <p className="text-[var(--color-text-secondary)] mt-1">
                                                {method.description}
                                            </p>
                                            <p className="text-[var(--color-text-primary)] font-medium mt-2">
                                                {method.value}
                                            </p>
                                            {method.link && (
                                                <a
                                                    href={method.link}
                                                    target={method.external ? '_blank' : undefined}
                                                    rel={method.external ? 'noopener noreferrer' : undefined}
                                                    className="inline-flex items-center gap-2 mt-4 text-[var(--color-primary)] font-medium hover:underline"
                                                >
                                                    {method.linkText}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Map */}
            <Section dark>
                <Container>
                    <FadeInUp>
                        <SectionTitle title="Konum" subtitle="Bizi ziyaret edin" light />
                    </FadeInUp>
                    <FadeInUp delay={0.2}>
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
            <Section className="relative overflow-hidden">
                <div className="absolute bottom-10 left-[10%] w-16 h-16 md:w-24 md:h-24 z-0 pointer-events-none opacity-40">
                    <Image src="/images/yaprak.png" alt="Yaprak" fill className="object-contain drop-shadow" />
                </div>
                
                <Container className="relative z-10">
                    <FadeInUp>
                        <div className="text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-6">
                                Hemen Sipariş Verin
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a href={CONTACT_INFO.phoneLink}>
                                    <Button size="lg" leftIcon={<Phone className="h-5 w-5" />}>
                                        {CONTACT_INFO.phone}
                                    </Button>
                                </a>
                                <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="lg" leftIcon={<MessageCircle className="h-5 w-5" />}>
                                        WhatsApp
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </FadeInUp>
                </Container>
            </Section>
        </>
    )
}
