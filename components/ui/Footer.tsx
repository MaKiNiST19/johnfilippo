"use client";

import { Container } from './Container'
import Image from 'next/image'

export function Footer() {
    return (
        <footer 
            className="text-white relative overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/images/footer-bg.png')" }}
        >
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[350px] md:min-h-[450px]">
                    {/* Left Side - Logo & Info */}
                    <div className="flex flex-col justify-between items-center sm:items-start h-full pt-16 pb-12 md:pt-24 md:pb-16 z-20">
                        {/* Logo */}
                        <div className="mb-0 px-4 md:px-0">
                            <Image
                                src="/images/logo.png"
                                alt="John Filippo Logo"
                                width={280}
                                height={120}
                                className="h-24 md:h-32 w-auto brightness-0 invert"
                            />
                        </div>

                        {/* Payment Methods */}
                        <div className="relative w-full max-w-[280px] h-12 md:max-w-[360px] md:h-16 mt-20 md:mt-0">
                            <Image
                                src="/images/kartlar.png"
                                alt="Ödeme Yöntemleri"
                                fill
                                className="object-contain object-center sm:object-left"
                            />
                        </div>
                    </div>

                    {/* Right Side - Chef Mascot (Shifted Right & Down) */}
                    <div className="relative w-full h-[350px] sm:h-[400px] lg:h-auto pointer-events-none z-10 flex overflow-visible">
                        <div className="absolute -bottom-8 md:-bottom-20 -right-8 md:-right-24 lg:-right-32 w-[110%] h-[110%] md:w-[120%] md:h-[120%] lg:w-[140%] lg:h-[140%] min-h-[400px]">
                            <Image
                                src="/images/maskot.png"
                                alt="John Filippo Şef Maskotu"
                                fill
                                className="object-contain object-right-bottom"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </Container>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 relative z-20 bg-black/10 backdrop-blur-[2px]">
                <Container className="py-4">
                    <p className="text-center text-sm text-white/80 font-medium">
                        © {new Date().getFullYear()} John Filippo Pizza Eryaman. Tüm hakları saklıdır.
                    </p>
                </Container>
            </div>
        </footer>
    )
}
