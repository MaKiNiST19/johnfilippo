export interface MenuItem {
    id: string
    name: string
    description?: string
    price: number
    isNew?: boolean
}

export interface MenuCategory {
    id: string
    name: string
    slug: string
    items: MenuItem[]
}

export const MENU_CATEGORIES: MenuCategory[] = [
    {
        id: 'klasik-pizzalar',
        slug: 'klasik-pizzalar',
        name: 'Klasik Pizzalar',
        items: [
            { id: 'margarita', name: 'Margarita', description: 'Domates sos, rende mozarella, pesto sos', price: 279 },
            { id: 'vejeteryan', name: 'Vejeteryan', description: 'Domates sos, rende mozarella, közlenmiş patlıcan, ıspanak, kabak, mantar, parmesan', price: 279 },
            { id: 'ispanakli', name: 'Ispanaklı', description: 'Domates sos, rende mozarella, ıspanak, kırmızı soğan, çeri domates, sarımsak yağı', price: 279 },
            { id: 'margarita-originale', name: 'Margarita Originale', description: 'Domates sos, rende mozarella, suda mozarella, çeri domates, taze fesleğen', price: 339 },
            { id: 'lor-peynirli-kabakli', name: 'Lor Peynirli Kabaklı', description: 'Domates sos, rende mozarella, lor peyniri, taze kabak, çeri domates, file badem, pesto sos', price: 339 },
            { id: 'mantarli', name: 'Mantarlı', description: 'Domates sos, rende mozarella, mantar, ricotta, kekik, pesto sos', price: 399 },
            { id: 'sucuklu', name: 'Sucuklu', description: 'Domates sos, rende mozarella, dana sucuk, mısır', price: 499 },
            { id: 'salamli', name: 'Salamlı', description: 'Domates sos, rende mozarella, dana salam', price: 499 },
            { id: 'sosisli', name: 'Sosisli', description: 'Domates sos, rende mozarella, dana sosis, mısır', price: 499 },
            { id: 'ton-balikli', name: 'Ton Balıklı', description: 'Domates sos, rende mozarella, kapari, kırmızı soğan, 100 gr konserve ton balık', price: 499 },
            { id: '4-peynirli', name: 'Dört Peynirli', description: 'Pesto sos, rende mozarella, suda mozarella, rokfor, ricotta, parmesan', price: 529 },
            { id: 'karisik', name: 'Karışık', description: 'Domates sos, rende mozarella, dana sosis, dana salam, dana sucuk, mantar, köy biberi, kırmızı biber, dilimlenmiş siyah zeytin, mısır, çeri domates', price: 549 },
        ],
    },
    {
        id: 'ozel-pizzalar',
        slug: 'ozel-pizzalar',
        name: 'Özel Pizzalar',
        items: [
            { id: 'acili-tavuklu', name: 'Acılı Tavuklu', description: 'Domates sos, rende mozarella, acı sos, 100 gr tavuk göğsü parçaları, jalapone biberi, kapya biber, mısır', price: 459 },
            { id: 'bbq-tavuklu', name: 'BBQ Tavuklu', description: 'Domates sos, rende mozarella, BBQ sos, 100 gr tavuk göğsü parçaları, mısır, kırmızı soğan', price: 459 },
            { id: 'ricotta-funghi', name: 'Ricotta Funghi', description: 'Krema sos, rende mozarella, ricotta, kültür mantarı, istiridye mantarı, trüff yağı', price: 459 },
            { id: 'ricotta', name: 'Ricotta', description: 'Domates sos, rende mozarella, ricotta, kokteyl domates, kültür mantarı', price: 459 },
            { id: 'pesto', name: 'Pesto', description: 'Pesto sos, rende mozarella, suda mozarella, limon zest, file badem, mantar', price: 469 },
            { id: 'ege', name: 'Ege', description: 'Domates sos, rende mozarella, taze ıspanak, enginar kalbi, file badem, pesto sos', price: 499 },
            { id: 'anadolu-pizza', name: 'Anadolu Pizza', description: 'Domates sos, rende mozarella, 100 gr. yaprak döner, kırmızı soğan, kapya biber', price: 699, isNew: true },
            { id: 'dana-bacon', name: 'Dana Bacon', description: 'Domates sos, rende mozarella, dana bacon, roka yaprağı, toz parmesan, pesto sos', price: 709 },
            { id: 'pastirmali', name: 'Pastırmalı', description: 'Domates sos, rende mozarella, pastırma', price: 709 },
            { id: 'kasap-sucuk', name: 'Kasap Sucuklu', description: 'Domates sos, rende mozarella, kasap sucuk', price: 709 },
            { id: 'fume-kaburga', name: 'Füme Kaburga', description: 'Domates sos, rende mozarella, füme kaburga, roka, parmesan', price: 799 },
            { id: 'kavurmali', name: 'Kavurmalı', description: 'Domates sos, rende mozarella, kavurma, köz patlıcan, köy biberi, kırmızı soğan, kırmızı biber', price: 849 },
            { id: 'john-filippo', name: 'John Filippo', description: 'Domates sos, rende mozarella, dana sucuk, kavurma, pastırma, dana salam, köy biberi, kırmızı soğan', price: 859 },
            { id: 'paris-soslu', name: 'Paris Soslu', description: 'Paris sos, rende mozarella, 50 gr. dana nuar, kibrit patates, toz parmesan', price: 899 },
        ],
    },
    {
        id: 'atistirmaliklar',
        slug: 'atistirmaliklar',
        name: 'Atıştırmalıklar',
        items: [
            { id: 'patates', name: 'Patates Kızartması', description: '250 gr. patates, ketçap ve mayonez', price: 159 },
            { id: 'sogan-halkasi', name: 'Soğan Halkası', description: '6 parça soğan halkası, 250 gr. patates, kajun baharat', price: 259 },
            { id: 'citir-tavuk', name: 'Çıtır Tavuk', description: '4 parça tavuk göğsü, 250 gr. patates ile servis edilir', price: 259 },
            { id: 'bbq-citir-tavuk', name: 'BBQ Çıtır Tavuk', description: 'BBQ soslu 4 parça tavuk göğsü, 250 gr. patates, kajun baharat', price: 259 },
            { id: 'acili-citir-tavuk', name: 'Acılı Çıtır Tavuk', description: 'Acılı soslu 4 parça tavuk göğsü, 250 gr. patates, kajun baharat', price: 259 },
            { id: 'mogol-tavuk', name: 'Moğol Tavuk', description: 'Acılı 4 parça tavuk göğsü parçaları, 250 gr. patates, kajun baharat', price: 259 },
            { id: 'peynir-cubuklari', name: 'Peynir Çubukları', description: '5 adet peynir çubuğu, 250 gr. patates, kajun baharat', price: 289 },
            { id: 'citir-tavuk-kova', name: 'Çıtır Tavuk Kova', description: '8 adet tavuk göğsü, kajun baharat', price: 299 },
            { id: 'karisik-kova', name: 'Karışık Kova', description: '3 parça tavuk göğsü, 3 adet soğan halkası, 3 adet peynir çubuğu, 250 gr. patates, kajun baharat', price: 319 },
        ],
    },
    {
        id: 'tatli',
        slug: 'tatli',
        name: 'Tatlılar',
        items: [
            { id: 'tiramisu', name: 'Tiramisu', description: 'Mascarpone peyniri ile hazırlanmış klasik İtalyan tiramisu', price: 219 },
            { id: 'cikolatali-pizza', name: 'Çikolatalı Pizza', description: 'Çikolata, çilek, muz, pudra şekeri, file badem', price: 299 },
        ],
    },
    {
        id: 'soguk-icecekler',
        slug: 'soguk-icecekler',
        name: 'Soğuk İçecekler',
        items: [
            { id: 'coca-cola', name: 'Coca-Cola', description: '330 ml', price: 89 },
            { id: 'coca-cola-zero', name: 'Coca-Cola Zero', description: '330 ml', price: 89 },
            { id: 'fanta', name: 'Fanta', description: '330 ml', price: 89 },
            { id: 'sprite', name: 'Sprite', description: '330 ml', price: 89 },
            { id: 'fuse-tea-seftali', name: 'Fuse Tea Şeftali', description: '330 ml', price: 89 },
            { id: 'fuse-tea-limon', name: 'Fuse Tea Limon', description: '330 ml', price: 89 },
            { id: 'cappy-karisik', name: 'Cappy Karışık', description: '330 ml', price: 89 },
            { id: 'cappy-portakal', name: 'Cappy Portakal', description: '330 ml', price: 89 },
            { id: 'cappy-seftali', name: 'Cappy Şeftali', description: '330 ml', price: 89 },
            { id: 'cappy-visne', name: 'Cappy Vişne', description: '330 ml', price: 89 },
            { id: 'ozerhisar-ayran', name: 'Özerhisar Ayran', description: 'Pet şişede 250 ml', price: 75 },
            { id: 'soda', name: 'Soda', price: 60 },
            { id: 'su', name: 'Su', price: 30 },
        ],
    },
    {
        id: 'litrelik-icecekler',
        slug: 'litrelik-icecekler',
        name: 'Litrelik İçecekler',
        items: [
            { id: 'coca-cola-1l', name: 'Coca-Cola 1L', price: 129 },
            { id: 'coca-cola-zero-1l', name: 'Coca-Cola Zero 1L', price: 129 },
            { id: 'fanta-1l', name: 'Fanta 1L', price: 129 },
            { id: 'sprite-1l', name: 'Sprite 1L', price: 129 },
        ],
    },
]
