export interface MenuItem {
    id: string
    name: string
    description?: string
    price: number
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
            { id: 'margherita', name: 'Margherita', description: 'Rende mozzarella, domates sos, pesto sos', price: 249 },
            { id: 'margherita-originale', name: 'Margherita Originale', description: 'Suda mozzarella, domates sos, fesleğen, kokteyl domates', price: 299 },
            { id: '4-peynirli', name: '4 Peynirli Pizza', description: 'Suda mozzarella, rokfor, parmesan, ricotta, pesto sos', price: 449 },
            { id: 'mantarli', name: 'Mantarlı Pizza', description: 'Rende mozzarella, domates sos, mantar, ricotta, kekik, pesto sos', price: 349 },
            { id: 'sucuklu', name: 'Sucuklu Pizza', description: 'Rende mozzarella, domates sos, dana sucuk, mısır', price: 449 },
            { id: 'salamli', name: 'Salamlı Pizza', description: 'Rende mozzarella, domates sos, dana salam', price: 449 },
            { id: 'karisik', name: 'Karışık Pizza', description: 'Rende mozzarella, domates sos, salam, sosis, sucuk, mantar, köy biberi, kırmızı biber, dilim zeytin, kekik, mısır, kokteyl domates', price: 499 },
            { id: 'ton-balikli', name: 'Ton Balıklı Pizza', description: 'Rende mozzarella, domates sos, kapari, kırmızı soğan, roka yaprakları, fesleğen, balzamik glaze', price: 459 },
            { id: 'sosisli', name: 'Sosisli Pizza', description: 'Rende mozzarella, domates sos, sosis, mısır', price: 449 },
            { id: 'lor-peynirli-kabakli', name: 'Lor Peynirli Kabaklı Pizza', description: 'Lor peyniri, domates sos, taze kabak, kokteyl domates, badem, roka yaprakları, pesto sos', price: 299 },
            { id: 'vejetaryan', name: 'Vejetaryan Pizza', description: 'Rende mozzarella, domates sos, patlıcan, ıspanak, kabak, mantar, parmesan', price: 249 },
            { id: 'ispanakli', name: 'Ispanaklı Pizza', description: 'Rende mozzarella, domates sos, lor peyniri, ıspanak, kırmızı soğan, sarımsak yağı', price: 249 },
        ],
    },
    {
        id: 'ozel-pizzalar',
        slug: 'ozel-pizzalar',
        name: 'Özel Pizzalar',
        items: [
            { id: 'pesto', name: 'Pesto Pizza', description: 'Pesto sos, suda mozzarella, limon zest, file badem, mantar', price: 419 },
            { id: 'fume-kaburga', name: 'Füme Kaburga Pizza', description: 'Rende mozzarella, domates sos, füme kaburga, roka, parmesan', price: 749 },
            { id: 'kasap-sucuk', name: 'Kasap Sucuk Pizza', description: 'Rende mozzarella, domates sos, kasap sucuk, köy biberi', price: 649 },
            { id: 'kavurmali', name: 'Kavurmalı Pizza', description: 'Rende mozzarella, domates sos, dana kavurma, köz patlıcan, taze kekik, sarımsaklı yağ, köy biberi', price: 799 },
            { id: 'acili-tavuklu', name: 'Acılı Tavuklu Pizza', description: 'Rende mozzarella, domates sos, acı sos, tavuk parçaları, jalapeno biberi, kapya biber, meksika fasülyesi, mısır', price: 419 },
            { id: 'ege', name: 'Ege Pizza', description: 'Rende mozzarella, domates sos, enginar kalbi, taze ıspanak, file badem, pesto sos', price: 449 },
            { id: 'dana-bacon', name: 'Dana Bacon', description: 'Rende mozzarella, domates sos, dana bacon, pestolu roka yaprakları, parmesan', price: 649 },
            { id: 'ricotta-funghi', name: 'Ricotta Funghi Pizza', description: 'Rende mozzarella, domates sos, ricotta, kokteyl domates, taze kekik', price: 419 },
            { id: 'bbq-tavuklu', name: 'Bbq Tavuklu Pizza', description: 'Rende mozzarella, domates sos, mısır, BBQ soslu tavuk dilimleri, kırmızı soğan', price: 419 },
            { id: 'pastirmali', name: 'Pastırmalı Pizza', description: 'Rende mozzarella, domates sos, pastırma', price: 649 },
            { id: 'john-filippo', name: 'John Filippo Pizza', description: 'Rende mozzarella, domates sos, sucuk, kavurma, pastırma, salam, köy biber, taze kekik, kırmızı soğan', price: 799 },
            { id: 'pizza-kebap', name: 'Pizza Kebap', description: 'Rende mozzarella, domates sos, sumak, satır kıyma, köy biberi, mor soğan', price: 649 },
            { id: 'paris-soslu', name: 'Paris Soslu Pizza', description: 'Rende mozzarella, paris sos, dana nuar, kibrit patates, parmesan', price: 749 },
        ],
    },
    {
        id: 'atistirmaliklar',
        slug: 'atistirmaliklar',
        name: 'Atıştırmalıklar',
        items: [
            { id: 'citir-tavuk', name: 'Çıtır Tavuk', description: 'Çıtır tavuk, patates kızartması', price: 229 },
            { id: 'bbq-citir-tavuk', name: 'Bbq Çıtır Tavuk', description: 'Çıtır tavuk, BBQ sos, patates kızartması', price: 229 },
            { id: 'acili-citir-tavuk', name: 'Acılı Çıtır Tavuk', description: 'Çıtır tavuk, acı sos, patates kızartması', price: 229 },
            { id: 'patates', name: 'Patates Kızartması', price: 149 },
            { id: 'sogan-halkasi', name: 'Soğan Halkası', description: 'Soğan halkası, patates kızartması', price: 229 },
            { id: 'mozzarella-stick', name: 'Mozzarella Stick', description: 'Mozzarella stick, patates kızartması', price: 249 },
            { id: 'citir-mix-kova', name: 'Çıtır Mix Kova', description: 'Mozzarella stick, soğan halkası, çıtır tavuk, patates kızartması', price: 279 },
            { id: 'domates-corbasi', name: 'Domates Çorbası', description: 'Fırınlanmış domates, kereviz, soğan, kapya biber, et suyu, havuç, maydanoz, mozzarella, kruton', price: 119 },
            { id: 'mogol-tavuk', name: 'Moğol Tavuk', description: 'Acılı çıtır tavuk parçaları, zencefilli patates sos, kaşık patates kızartması ile servis edilir', price: 229 },
        ],
    },
    {
        id: 'salata-bowl',
        slug: 'salata-bowl',
        name: 'Salata & Bowl',
        items: [
            { id: 'roka-tulum-salata', name: 'Roka Tulum Salata', description: 'Roka, tulum peyniri, cherry domates, incir, ceviz', price: 179 },
        ],
    },
    {
        id: 'tatli',
        slug: 'tatli',
        name: 'Tatlı',
        items: [
            { id: 'cikolatali-pizza', name: 'Çikolatalı Pizza', description: 'Çikolata sos, çilek, muz, pudra şekeri, badem', price: 249 },
            { id: 'tiramisu', name: 'Tiramisu', description: 'Mascarpone peyniri ile hazırlanmış klasik İtalyan tiramisu', price: 149 },
            { id: 'kap-dondurma', name: 'Sade Veya Çikolatalı Kap Dondurma', description: '100 ml', price: 80 },
            { id: 'keci-dondurma', name: 'Sade Keçi Dondurma', description: '100 ml', price: 90 },
        ],
    },
    {
        id: 'soguk-icecekler',
        slug: 'soguk-icecekler',
        name: 'Soğuk İçecekler',
        items: [
            { id: 'coca-cola', name: 'Coca-Cola', price: 80 },
            { id: 'coca-cola-zero', name: 'Coca-Cola Zero', price: 80 },
            { id: 'fanta', name: 'Fanta', price: 80 },
            { id: 'fuse-tea-limon', name: 'Fuse Tea Limon', price: 80 },
            { id: 'fuse-tea-seftali', name: 'Fuse Tea Şeftali', price: 80 },
            { id: 'fuse-tea-mango', name: 'Fuse Tea Mango', price: 80 },
            { id: 'sprite', name: 'Sprite', price: 80 },
            { id: 'ozerhisar-ayran', name: 'Özerhisar Şişe Ayran', price: 70 },
            { id: 'cappy-karisik', name: 'Cappy Karışık', price: 80 },
            { id: 'cappy-portakal', name: 'Cappy Portakal', price: 80 },
            { id: 'cappy-seftali', name: 'Cappy Şeftali', price: 80 },
            { id: 'cappy-visne', name: 'Cappy Vişne', price: 80 },
            { id: 'soda', name: 'Soda', price: 60 },
            { id: 'limonata', name: 'Limonata', price: 80 },
            { id: 'su', name: 'Su', price: 30 },
            { id: 'nigde-gazozu', name: 'Niğde Gazozu', description: '250 ml', price: 70 },
        ],
    },
    {
        id: 'litrelik-icecekler',
        slug: 'litrelik-icecekler',
        name: 'Litrelik İçecekler',
        items: [
            { id: 'coca-cola-1l', name: 'Coca-Cola 1L', price: 125 },
            { id: 'coca-cola-zero-1l', name: 'Coca-Cola Zero 1L', price: 125 },
            { id: 'fanta-1l', name: 'Fanta 1L', price: 125 },
            { id: 'sprite-1l', name: 'Sprite 1L', price: 125 },
        ],
    },
]
