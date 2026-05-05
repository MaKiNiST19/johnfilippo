
-- ============================================================================
-- Seed Data for John Filippo Menu
-- ============================================================================

DO $$
DECLARE
    v_business_id UUID;
    v_branch_id UUID;
    v_menu_id UUID;
    v_cat_klasik UUID;
    v_cat_ozel UUID;
    v_cat_atistirmalik UUID;
    v_cat_tatli UUID;
    v_cat_icecek UUID;
BEGIN
    -- 1. Get or Create Business
    SELECT id INTO v_business_id FROM businesses WHERE slug = 'john-filippo';
    
    IF v_business_id IS NULL THEN
        INSERT INTO businesses (name, slug, description)
        VALUES ('John Filippo', 'john-filippo', 'Gerçek İtalyan Pizza Deneyimi')
        RETURNING id INTO v_business_id;
    END IF;

    -- 2. Get or Create Branch (Eryaman)
    SELECT id INTO v_branch_id FROM branches WHERE slug = 'eryaman' AND business_id = v_business_id;
    
    IF v_branch_id IS NULL THEN
        INSERT INTO branches (business_id, name, slug, address, city, district, phone)
        VALUES (v_business_id, 'Eryaman Şubesi', 'eryaman', 'Şehit Osman Avcı, Malazgirt 1071. Cd. No:46/C-10', 'Ankara', 'Etimesgut', '+90 312 577 39 99')
        RETURNING id INTO v_branch_id;
    END IF;

    -- 3. Get or Create Default Menu
    SELECT id INTO v_menu_id FROM menus WHERE branch_id = v_branch_id AND is_default = true;
    
    IF v_menu_id IS NULL THEN
        INSERT INTO menus (branch_id, name, slug, description, is_default)
        VALUES (v_branch_id, 'Ana Menü', 'ana-menu', 'Genel Restoran Menüsü', true)
        RETURNING id INTO v_menu_id;
    END IF;

    -- 4. Create Categories
    
    -- Klasik Pizzalar
    INSERT INTO categories (menu_id, name, slug, sort_order)
    VALUES (v_menu_id, 'Klasik Pizzalar', 'klasik-pizzalar', 10)
    ON CONFLICT (menu_id, slug) DO UPDATE SET sort_order = 10
    RETURNING id INTO v_cat_klasik;

    -- Özel Pizzalar
    INSERT INTO categories (menu_id, name, slug, sort_order)
    VALUES (v_menu_id, 'Özel Pizzalar', 'ozel-pizzalar', 20)
    ON CONFLICT (menu_id, slug) DO UPDATE SET sort_order = 20
    RETURNING id INTO v_cat_ozel;

    -- Atıştırmalıklar
    INSERT INTO categories (menu_id, name, slug, sort_order)
    VALUES (v_menu_id, 'Atıştırmalıklar', 'atistirmaliklar', 30)
    ON CONFLICT (menu_id, slug) DO UPDATE SET sort_order = 30
    RETURNING id INTO v_cat_atistirmalik;

    -- Tatlılar
    INSERT INTO categories (menu_id, name, slug, sort_order)
    VALUES (v_menu_id, 'Tatlılar', 'tatlilar', 40)
    ON CONFLICT (menu_id, slug) DO UPDATE SET sort_order = 40
    RETURNING id INTO v_cat_tatli;

    -- İçecekler
    INSERT INTO categories (menu_id, name, slug, sort_order)
    VALUES (v_menu_id, 'İçecekler', 'icecekler', 50)
    ON CONFLICT (menu_id, slug) DO UPDATE SET sort_order = 50
    RETURNING id INTO v_cat_icecek;

    -- 5. Insert Products and Menu Items (Helper function logic inline)
    
    -- Helper variable for product id
    DECLARE
        v_prod_id UUID;
    BEGIN
        -- ==================== KLASİK PİZZALAR ====================
        
        -- Margherita
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Margherita', 'margherita', 'Rende mozzarella, domates sos, pesto sos', 249)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 249
        RETURNING id INTO v_prod_id;
        
        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 10)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Mantarlı Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Mantarlı Pizza', 'mantarli-pizza', 'Rende mozzarella, domates sos, mantar, ricotta, kekik, pesto sos', 349)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 349
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 20)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Vejeteryan Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Vejeteryan Pizza', 'vejeteryan-pizza', 'Rende mozzarella, domates sos, patlıcan, ıspanak, kabak, mantar, parmesan', 249)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 249
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 30)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Dört Peynirli Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Dört Peynirli Pizza', 'dort-peynirli-pizza', 'Suda mozzarella, rokfor, parmesan, ricotta, pesto sos', 449)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 449
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 40)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Ispanaklı Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Ispanaklı Pizza', 'ispanakli-pizza', 'Rende mozzarella, domates sos, lor peyniri, ıspanak, kırmızı soğan, sarımsak yağı', 249)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 249
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 50)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Sucuklu Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Sucuklu Pizza', 'sucuklu-pizza', 'Rende mozzarella, domates sos, dana sucuk, mısır', 449)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 449
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 60)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Margherita Originale
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Margherita Originale', 'margherita-originale', 'Suda mozzarella, domates sos, fesleğen, kokteyl domates', 299)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 299
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 70)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Salamlı Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Salamlı Pizza', 'salamli-pizza', 'Rende mozzarella, domates sos, dana salam', 449)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 449
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 80)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Lor Peynirli Kabaklı
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Lor Peynirli Kabaklı', 'lor-peynirli-kabakli', 'Lor peyniri, domates sos, taze kabak, kokteyl domates, badem, roka yaprakları, pesto sos', 299)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 299
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 90)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Sosisli Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Sosisli Pizza', 'sosisli-pizza', 'Rende mozzarella, domates sos, dana sosis, mısır', 449)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 449
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 100)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Ton Balıklı Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Ton Balıklı Pizza', 'ton-balikli-pizza', 'Rende mozzarella, domates sos, kapari, kırmızı soğan, ton balığı', 499)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 499
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 110)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Karışık Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Karışık Pizza', 'karisik-pizza', 'Rende mozzarella, domates sos, salam, sosis, sucuk, mantar, köy biberi, kırmızı biber, dilim zeytin, kekik, mısır, cherry domates', 499)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 499
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_klasik, v_prod_id, 120)
        ON CONFLICT (category_id, product_id) DO NOTHING;


        -- ==================== ÖZEL PİZZALAR ====================

        -- Acılı Tavuklu Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Acılı Tavuklu Pizza', 'acili-tavuklu-pizza', 'Rende mozzarella, domates sos, acı sos, tavuk parçaları, jalapeno biberi, kapya biber, mısır', 419)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 419
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 130)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Bresaola Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Bresaola Pizza', 'bresaola-pizza', 'Rende mozzarella, domates sos, bresaola, roka yaprakları, parmesan', 649)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 649
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 140)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- BBQ Tavuklu Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'BBQ Tavuklu Pizza', 'bbq-tavuklu-pizza', 'Rende mozzarella, domates sos, mısır, BBQ soslu tavuk dilimleri, kırmızı soğan', 419)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 419
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 150)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Pastırmalı Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Pastırmalı Pizza', 'pastirmali-pizza', 'Rende mozzarella, domates sos, pastırma', 649)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 649
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 160)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Ricotta Funghi Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Ricotta Funghi Pizza', 'ricotta-funghi-pizza', 'Rende mozzarella, krema sos, mantar, ricotta, taze kekik', 419)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 419
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 170)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Pizza Kebap
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Pizza Kebap', 'pizza-kebap', 'Rende mozzarella, domates sos, sumak, satır kıyma, köy biberi, mor soğan', 649)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 649
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 180)
        ON CONFLICT (category_id, product_id) DO NOTHING;
        
        -- Pesto Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Pesto Pizza', 'pesto-pizza', 'Pesto sos, suda mozzarella, limon zest, file badem, mantar', 419)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 419
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 190)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Kasap Sucuklu Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Kasap Sucuklu Pizza', 'kasap-sucuklu-pizza', 'Rende mozzarella, domates sos, kasap sucuk, köy biberi', 649)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 649
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 200)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Ege Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Ege Pizza', 'ege-pizza', 'Rende mozzarella, domates sos, taze ıspanak, enginar kalbi, file badem, pesto sos', 449)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 449
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 210)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Füme Kaburga Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Füme Kaburga Pizza', 'fume-kaburga-pizza', 'Rende mozzarella, domates sos, füme kaburga, roka, parmesan', 749)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 749
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 220)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Dana Bacon Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Dana Bacon Pizza', 'dana-bacon-pizza', 'Rende mozzarella, domates sos, dana bacon, pestolu roka yaprakları, parmesan', 649)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 649
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 230)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Paris Soslu Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Paris Soslu Pizza', 'paris-soslu-pizza', 'Rende mozzarella, paris sos, dana nuar, kibrit patates, parmesan', 749)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 749
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 240)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- John Filippo Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'John Filippo Pizza', 'john-filippo-pizza', 'Rende mozzarella, domates sos, sucuk, kavurma, pastırma, salam, köy biberi, taze kekik, kırmızı soğan', 799)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 799
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 250)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Kavurmalı Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Kavurmalı Pizza', 'kavurmali-pizza', 'Rende mozzarella, domates sos, dana kavurma, köz patlıcan, taze kekik, mısır, sarımsaklı yağ, köy biberi, kırmızı soğan', 799)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 799
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_ozel, v_prod_id, 260)
        ON CONFLICT (category_id, product_id) DO NOTHING;


        -- ==================== ATIŞTIRMALIKLAR ====================

        -- Domates Çorbası
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Domates Çorbası', 'domates-corbasi', 'Fırınlanmış domates, salça, kereviz, soğan, sarımsak, kapya biber, et suyu, havuç, mozzarella, kruton', 119)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 119
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_atistirmalik, v_prod_id, 270)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Moğol Tavuk
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Moğol Tavuk', 'mogol-tavuk', 'Acılı çıtır tavuk parçaları patates kızartması ile servis edilir', 229)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 229
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_atistirmalik, v_prod_id, 280)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Patates Kızartması
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Patates Kızartması', 'patates-kizartmasi', 'Patates kızartması, mayonez ve ketçap sos', 149)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 149
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_atistirmalik, v_prod_id, 290)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Mozzarella Stick
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Mozzarella Stick', 'mozzarella-stick', 'Patates tava, kızarmış mozzarella stick', 249)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 249
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_atistirmalik, v_prod_id, 300)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Soğan Halkası
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Soğan Halkası', 'sogan-halkasi', 'Patates tava, kızartılmış soğan halkaları', 229)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 229
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_atistirmalik, v_prod_id, 310)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Çıtır Mix Kova
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Çıtır Mix Kova', 'citir-mix-kova', 'patates kızartması, çıtır tavuk', 279)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 279
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_atistirmalik, v_prod_id, 320)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Çıtır Tavuk
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Çıtır Tavuk', 'citir-tavuk', 'Çıtır tavuk, patates kızartması', 229)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 229
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_atistirmalik, v_prod_id, 330)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Roka Tulum Bowl
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Roka Tulum Bowl', 'roka-tulum-bowl', 'Roka, tulum peyniri, cherry domates, incir, ceviz', 179)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 179
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_atistirmalik, v_prod_id, 340)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- BBQ Çıtır Tavuk
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'BBQ Çıtır Tavuk', 'bbq-citir-tavuk', 'Çıtır tavuk, BBQ sos, patates kızartması', 228)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 228
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_atistirmalik, v_prod_id, 350)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Acılı Çıtır Tavuk
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Acılı Çıtır Tavuk', 'acili-citir-tavuk', 'Çıtır tavuk, acı sos, patates kızartması', 228)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 228
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_atistirmalik, v_prod_id, 360)
        ON CONFLICT (category_id, product_id) DO NOTHING;


        -- ==================== TATLILAR ====================

        -- Tiramisu
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Tiramisu', 'tiramisu', 'Mascarpone peyniri ile hazırlanmış klasik İtalyan tiramisu', 149)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 149
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_tatli, v_prod_id, 370)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Çikolatalı Pizza
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Çikolatalı Pizza', 'cikolatali-pizza', 'Nutella, çilek, muz, pudra şekeri, badem', 249)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 249
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_tatli, v_prod_id, 380)
        ON CONFLICT (category_id, product_id) DO NOTHING;


        -- ==================== İÇECEKLER ====================

        -- Coca Cola
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Coca Cola', 'coca-cola', '', 80)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 80
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 390)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Coca Cola Zero
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Coca Cola Zero', 'coca-cola-zero', '', 80)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 80
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 400)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Sprite
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Sprite', 'sprite', '', 80)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 80
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 410)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Fanta
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Fanta', 'fanta', '', 80)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 80
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 420)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Ice Tea Limon
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Ice Tea Limon', 'ice-tea-limon', '', 80)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 80
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 430)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Ice Tea Şeftali
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Ice Tea Şeftali', 'ice-tea-seftali', '', 80)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 80
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 440)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Gazoz
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Gazoz', 'gazoz', '', 60)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 60
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 450)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Özerhisar Ayran
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Özerhisar Ayran', 'ozerhisar-ayran', '', 70)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 70
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 460)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Cappy Karışık
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Cappy Karışık', 'cappy-karisik', '', 80)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 80
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 470)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Cappy Portakal
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Cappy Portakal', 'cappy-portakal', '', 80)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 80
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 480)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Cappy Şeftali
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Cappy Şeftali', 'cappy-seftali', '', 80)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 80
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 490)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Cappy Vişne
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Cappy Vişne', 'cappy-visne', '', 80)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 80
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 500)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Soda
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Soda', 'soda', '', 60)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 60
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 510)
        ON CONFLICT (category_id, product_id) DO NOTHING;

        -- Su
        INSERT INTO products (business_id, name, slug, description, base_price)
        VALUES (v_business_id, 'Su', 'su', '', 30)
        ON CONFLICT (business_id, slug) DO UPDATE SET base_price = 30
        RETURNING id INTO v_prod_id;

        INSERT INTO menu_items (category_id, product_id, sort_order)
        VALUES (v_cat_icecek, v_prod_id, 520)
        ON CONFLICT (category_id, product_id) DO NOTHING;

    END;
END $$;
