import { Metadata } from 'next'
import Link from 'next/link'
import { ChefHat, Heart, Flame, Users } from 'lucide-react'

import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import { Section, SectionTitle } from '@/components/ui/Section'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/FadeInUp'

// SEO Metadata
export const metadata: Metadata = {
    title: 'Hakkımızda | John Filippo Pizza',
    description:
        'John Filippo hikayesi - 20 yıllık pizza tutkusu, taş fırın geleneği ve Eryaman\'ın en sevilen pizzacısının hikayesi.',
    keywords: [
        'John Filippo hakkında',
        'John Filippo hikayesi',
        'Eryaman pizzacı hikayesi',
    ],
}

const values = [
    {
        icon: Flame,
        title: 'Taş Fırın Geleneği',
        description: 'Her pizza, geleneksel taş fırında 400°C\'de pişirilerek mükemmel çıtırlığa ulaşır.',
    },
    {
        icon: Heart,
        title: 'Tutku ve Özen',
        description: 'Her malzeme özenle seçilir, her hamur sevgiyle yoğrulur.',
    },
    {
        icon: ChefHat,
        title: '20 Yıllık Tecrübe',
        description: 'İtalya\'da eğitim almış ustalarımızın elleriyle hazırlanan pizzalar.',
    },
    {
        icon: Users,
        title: 'Aile Ortamı',
        description: 'Misafirlerimizi ailemizin bir parçası olarak görüyoruz.',
    },
]

const timeline = [
    { year: '2004', title: 'Başlangıç', description: 'İlk pizzacımız İstanbul\'da açıldı.' },
    { year: '2012', title: 'Büyüme', description: 'Ankara\'ya ilk şubemizi açtık.' },
    { year: '2018', title: 'Eryaman', description: 'Eryaman şubemiz kapılarını açtı.' },
    { year: '2024', title: 'Bugün', description: 'Binlerce mutlu müşteri, aynı tutku.' },
]

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative bg-[var(--color-dark)] text-white py-20 md:py-32 overflow-hidden">
                <Image
                    src="/images/about-hero.jpg"
                    alt="John Filippo Jesus Pizza Hakkımızda - Taş Fırın ve İtalyan Geleneği"
                    fill
                    className="object-cover object-center opacity-20"
                    priority
                    sizes="100vw"
                />
                <Container className="relative z-10">
                    <FadeInUp>
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Pizza Tutkusuyla <br />
                                <span className="text-[var(--color-primary)]">20 Yıl</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/80">
                                John Filippo, gerçek İtalyan pizzasını Türkiye&apos;ye taşıma hayaliyle başladı.
                                Bugün binlerce misafirimize aynı tutku ve kaliteyle hizmet veriyoruz.
                            </p>
                        </div>
                    </FadeInUp>
                </Container>
            </section>

            {/* Story Section */}
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
                
                {/* Decorative Small Images */}
                <div className="absolute top-10 right-[5%] w-12 h-12 md:w-16 md:h-16 z-0 pointer-events-none opacity-50">
                    <Image src="/images/tomato.png" alt="Domates" fill className="object-contain" />
                </div>
                <div className="absolute bottom-10 left-[5%] w-10 h-10 md:w-16 md:h-16 z-0 pointer-events-none opacity-50">
                    <Image src="/images/peynir.png" alt="Peynir" fill className="object-contain" />
                </div>

                <Container className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <FadeInUp>
                            <div>
                                <SectionTitle title="Hikayemiz" centered={false} />
                                <div className="space-y-4 text-[var(--color-text-secondary)]">
                                    <p>
                                        2004 yılında İstanbul&apos;da küçük bir pizzacı olarak başlayan yolculuğumuz,
                                        bugün Türkiye&apos;nin farklı şehirlerinde devam ediyor.
                                    </p>
                                    <p>
                                        Kurucumuz, İtalya Napoli&apos;de aldığı eğitimin ardından,
                                        gerçek İtalyan pizzasını Türk damak tadına uygun şekilde
                                        sunma hayaliyle yola çıktı.
                                    </p>
                                    <p>
                                        <strong className="text-[var(--color-text-primary)]">Farkımız ne mi?</strong>
                                        {' '}Her şey detaylarda gizli. Özel olarak hazırlanan hamurumuz,
                                        İtalya&apos;dan getirdiğimiz mozzarella, taze yerel malzemeler
                                        ve 400°C&apos;de pişiren taş fırınımız.
                                    </p>
                                </div>
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={0.2}>
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-cream)] border-2 border-[var(--color-primary)]/20 group">
                                <Image 
                                    src="/images/eryaman-el-yapımı-pizza.png"
                                    alt="John Filippo El Yapımı Pizza"
                                    fill
                                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </FadeInUp>
                    </div>
                </Container>
            </Section>

            {/* Values */}
            <Section dark>
                <Container>
                    <FadeInUp>
                        <SectionTitle
                            title="Değerlerimiz"
                            subtitle="Her pizzanın arkasındaki felsefe"
                            light
                        />
                    </FadeInUp>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        {values.map((value) => (
                            <StaggerItem key={value.title}>
                                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 text-center">
                                    <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center mx-auto mb-4">
                                        <value.icon className="h-7 w-7 text-[var(--color-primary)]" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-white/70 text-sm">{value.description}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </Container>
            </Section>

            {/* Timeline */}
            <Section className="relative overflow-hidden">
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
                <div className="absolute top-10 left-[10%] w-12 h-12 md:w-16 md:h-16 z-0 pointer-events-none opacity-50">
                    <Image src="/images/yaprak.png" alt="Fesleğen" fill className="object-contain" />
                </div>
                <div className="absolute bottom-20 left-[5%] w-24 h-24 md:w-32 md:h-32 z-0 pointer-events-none opacity-40">
                    <Image src="/images/slice-pizza.png" alt="Pizza Dilimi" fill className="object-contain" />
                </div>

                <Container className="relative z-10">
                    <FadeInUp>
                        <SectionTitle title="Yolculuğumuz" subtitle="Önemli kilometre taşları" />
                    </FadeInUp>

                    <div className="max-w-2xl mx-auto mt-12">
                        {timeline.map((item, index) => (
                            <FadeInUp key={item.year} delay={index * 0.1}>
                                <div className="flex gap-6 pb-8 last:pb-0">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">
                                            {item.year.slice(-2)}
                                        </div>
                                        {index < timeline.length - 1 && (
                                            <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
                                        )}
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-sm text-[var(--color-primary)] font-medium">{item.year}</p>
                                        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{item.title}</h3>
                                        <p className="text-[var(--color-text-secondary)] mt-1">{item.description}</p>
                                    </div>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section dark>
                <Container>
                    <FadeInUp>
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Lezzetimizi Keşfedin
                            </h2>
                            <p className="text-white/70 mb-8 max-w-xl mx-auto">
                                20 yıllık tecrübemizi sofranıza taşıyalım.
                            </p>
                            <Link href="/eryaman/menu">
                                <Button size="lg">Menüyü İncele</Button>
                            </Link>
                        </div>
                    </FadeInUp>
                </Container>
            </Section>
        </>
    )
}
