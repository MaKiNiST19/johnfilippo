-- ============================================================================
-- John Filippo QR Menu System - Database Schema
-- ============================================================================
-- This schema supports a multi-tenant QR-based digital menu system with:
-- - Multiple brands/businesses
-- - Multiple branches per business
-- - Reusable products at business level
-- - Branch/menu-specific menu items with price overrides
-- - QR code based table identification
-- - Role-based access with RLS
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

-- User roles enum
CREATE TYPE user_role AS ENUM ('super_admin', 'business_admin', 'branch_admin');

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. BUSINESSES (Brands/Companies)
-- ----------------------------------------------------------------------------
-- Top-level entity representing a brand like "John Filippo"
-- All data flows down from this entity

CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for slug lookups (used in URLs)
CREATE INDEX idx_businesses_slug ON businesses(slug);
CREATE INDEX idx_businesses_is_active ON businesses(is_active) WHERE is_active = true;

COMMENT ON TABLE businesses IS 'Top-level brands/companies in the system';
COMMENT ON COLUMN businesses.slug IS 'URL-friendly unique identifier for the business';

-- ----------------------------------------------------------------------------
-- 2. BRANCHES (Locations)
-- ----------------------------------------------------------------------------
-- Physical locations belonging to a business
-- Example: "Eryaman Şubesi" under John Filippo

CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    address TEXT,
    city TEXT,
    district TEXT,
    phone TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Ensure slug is unique within a business
    CONSTRAINT uq_branches_business_slug UNIQUE (business_id, slug)
);

-- Indexes for common queries
CREATE INDEX idx_branches_business_id ON branches(business_id);
CREATE INDEX idx_branches_slug ON branches(slug);
CREATE INDEX idx_branches_city ON branches(city);
CREATE INDEX idx_branches_is_active ON branches(is_active) WHERE is_active = true;
CREATE INDEX idx_branches_location ON branches(latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

COMMENT ON TABLE branches IS 'Physical locations/branches of a business';
COMMENT ON COLUMN branches.slug IS 'URL-friendly identifier, unique per business';

-- ----------------------------------------------------------------------------
-- 3. MENUS
-- ----------------------------------------------------------------------------
-- Menus belong to a branch (e.g., "Main Menu", "Summer Menu")
-- One menu per branch can be marked as default

CREATE TABLE menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    is_default BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Ensure slug is unique within a branch
    CONSTRAINT uq_menus_branch_slug UNIQUE (branch_id, slug)
);

-- Indexes
CREATE INDEX idx_menus_branch_id ON menus(branch_id);
CREATE INDEX idx_menus_is_default ON menus(branch_id, is_default) WHERE is_default = true;
CREATE INDEX idx_menus_is_active ON menus(is_active) WHERE is_active = true;

-- Partial unique index to ensure only one default menu per branch
CREATE UNIQUE INDEX idx_menus_single_default 
    ON menus(branch_id) 
    WHERE is_default = true;

COMMENT ON TABLE menus IS 'Menus belonging to a branch';
COMMENT ON COLUMN menus.is_default IS 'Only one menu per branch can be default (enforced by partial unique index)';

-- ----------------------------------------------------------------------------
-- 4. CATEGORIES
-- ----------------------------------------------------------------------------
-- Categories within a menu (e.g., "Pizzas", "Pastas", "Desserts")
-- Sort order determines display sequence

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_id UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Ensure slug is unique within a menu
    CONSTRAINT uq_categories_menu_slug UNIQUE (menu_id, slug)
);

-- Indexes
CREATE INDEX idx_categories_menu_id ON categories(menu_id);
CREATE INDEX idx_categories_sort_order ON categories(menu_id, sort_order);
CREATE INDEX idx_categories_is_active ON categories(is_active) WHERE is_active = true;

COMMENT ON TABLE categories IS 'Categories within a menu, ordered by sort_order';

-- ----------------------------------------------------------------------------
-- 5. PRODUCTS
-- ----------------------------------------------------------------------------
-- Products are defined at the BUSINESS level for reusability
-- They can be added to multiple menus/categories via menu_items

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Ensure slug is unique within a business
    CONSTRAINT uq_products_business_slug UNIQUE (business_id, slug)
);

-- Indexes
CREATE INDEX idx_products_business_id ON products(business_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active) WHERE is_active = true;

COMMENT ON TABLE products IS 'Products defined at business level, reusable across branches/menus';
COMMENT ON COLUMN products.base_price IS 'Default price, can be overridden in menu_items';

-- ----------------------------------------------------------------------------
-- 6. MENU ITEMS
-- ----------------------------------------------------------------------------
-- Junction table connecting products to categories
-- Supports branch/menu-specific pricing and availability

CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    custom_price DECIMAL(10, 2),  -- NULL means use product.base_price
    is_available BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    -- Prevent duplicate product in same category
    CONSTRAINT uq_menu_items_category_product UNIQUE (category_id, product_id)
);

-- Indexes
CREATE INDEX idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX idx_menu_items_product_id ON menu_items(product_id);
CREATE INDEX idx_menu_items_sort_order ON menu_items(category_id, sort_order);
CREATE INDEX idx_menu_items_is_available ON menu_items(is_available) WHERE is_available = true;

COMMENT ON TABLE menu_items IS 'Products placed in categories with optional price overrides';
COMMENT ON COLUMN menu_items.custom_price IS 'Override price for this specific menu item, NULL uses product base_price';

-- ----------------------------------------------------------------------------
-- 7. QR CODES (Tables)
-- ----------------------------------------------------------------------------
-- QR codes belong to branches, used for table identification
-- url_slug is globally unique for direct QR scans

CREATE TABLE qr_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    table_label TEXT NOT NULL,
    url_slug TEXT NOT NULL UNIQUE,  -- Globally unique for QR resolution
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_qr_codes_branch_id ON qr_codes(branch_id);
CREATE INDEX idx_qr_codes_url_slug ON qr_codes(url_slug);
CREATE INDEX idx_qr_codes_is_active ON qr_codes(is_active) WHERE is_active = true;

COMMENT ON TABLE qr_codes IS 'QR codes for tables, used to identify branch and table from scanned URL';
COMMENT ON COLUMN qr_codes.url_slug IS 'Unique slug for QR URL (e.g., q/abcd123)';
COMMENT ON COLUMN qr_codes.table_label IS 'Human-readable label (e.g., Table 1, Terrace 3)';

-- ----------------------------------------------------------------------------
-- 8. PROFILES
-- ----------------------------------------------------------------------------
-- User profiles linked to Supabase auth.users
-- Controls access based on role and business/branch assignment

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    role user_role NOT NULL DEFAULT 'branch_admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_profiles_business_id ON profiles(business_id);
CREATE INDEX idx_profiles_branch_id ON profiles(branch_id);
CREATE INDEX idx_profiles_role ON profiles(role);

COMMENT ON TABLE profiles IS 'User profiles extending auth.users with business/branch assignment';
COMMENT ON COLUMN profiles.business_id IS 'NULL for super_admin, set for business_admin and branch_admin';
COMMENT ON COLUMN profiles.branch_id IS 'NULL for super_admin and business_admin, set for branch_admin';

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get current user's profile
CREATE OR REPLACE FUNCTION get_current_user_profile()
RETURNS profiles
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT * FROM profiles WHERE id = auth.uid();
$$;

-- Function to check if current user is super_admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'super_admin'
    );
$$;

-- Function to check if current user can access a business
CREATE OR REPLACE FUNCTION can_access_business(target_business_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND (
            role = 'super_admin'
            OR business_id = target_business_id
        )
    );
$$;

-- Function to check if current user can access a branch
CREATE OR REPLACE FUNCTION can_access_branch(target_branch_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM profiles p
        WHERE p.id = auth.uid() 
        AND (
            p.role = 'super_admin'
            OR (
                p.role = 'business_admin' 
                AND p.business_id = (SELECT business_id FROM branches WHERE id = target_branch_id)
            )
            OR (
                p.role = 'branch_admin' 
                AND p.branch_id = target_branch_id
            )
        )
    );
$$;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- BUSINESSES Policies
-- ----------------------------------------------------------------------------

-- Super admins can do everything
CREATE POLICY "super_admin_all_businesses" ON businesses
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- Business and branch admins can view their own business
CREATE POLICY "admins_view_own_business" ON businesses
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND business_id = businesses.id
        )
    );

-- Public can view active businesses (for public menu access)
CREATE POLICY "public_view_active_businesses" ON businesses
    FOR SELECT
    USING (is_active = true);

-- ----------------------------------------------------------------------------
-- BRANCHES Policies
-- ----------------------------------------------------------------------------

-- Super admins can do everything
CREATE POLICY "super_admin_all_branches" ON branches
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- Business admins can manage branches in their business
CREATE POLICY "business_admin_manage_branches" ON branches
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'business_admin'
            AND business_id = branches.business_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'business_admin'
            AND business_id = branches.business_id
        )
    );

-- Branch admins can view/update their own branch
CREATE POLICY "branch_admin_view_own_branch" ON branches
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'branch_admin'
            AND branch_id = branches.id
        )
    );

CREATE POLICY "branch_admin_update_own_branch" ON branches
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'branch_admin'
            AND branch_id = branches.id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'branch_admin'
            AND branch_id = branches.id
        )
    );

-- Public can view active branches
CREATE POLICY "public_view_active_branches" ON branches
    FOR SELECT
    USING (is_active = true);

-- ----------------------------------------------------------------------------
-- MENUS Policies
-- ----------------------------------------------------------------------------

-- Super admins can do everything
CREATE POLICY "super_admin_all_menus" ON menus
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- Business admins can manage menus in their business
CREATE POLICY "business_admin_manage_menus" ON menus
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN branches b ON b.id = menus.branch_id
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = b.business_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN branches b ON b.id = menus.branch_id
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = b.business_id
        )
    );

-- Branch admins can manage menus in their branch
CREATE POLICY "branch_admin_manage_menus" ON menus
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'branch_admin'
            AND branch_id = menus.branch_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'branch_admin'
            AND branch_id = menus.branch_id
        )
    );

-- Public can view active menus
CREATE POLICY "public_view_active_menus" ON menus
    FOR SELECT
    USING (is_active = true);

-- ----------------------------------------------------------------------------
-- CATEGORIES Policies
-- ----------------------------------------------------------------------------

-- Super admins can do everything
CREATE POLICY "super_admin_all_categories" ON categories
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- Business admins can manage categories in their business
CREATE POLICY "business_admin_manage_categories" ON categories
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN menus m ON m.id = categories.menu_id
            JOIN branches b ON b.id = m.branch_id
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = b.business_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN menus m ON m.id = categories.menu_id
            JOIN branches b ON b.id = m.branch_id
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = b.business_id
        )
    );

-- Branch admins can manage categories in their branch's menus
CREATE POLICY "branch_admin_manage_categories" ON categories
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN menus m ON m.id = categories.menu_id
            WHERE p.id = auth.uid() 
            AND p.role = 'branch_admin'
            AND p.branch_id = m.branch_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN menus m ON m.id = categories.menu_id
            WHERE p.id = auth.uid() 
            AND p.role = 'branch_admin'
            AND p.branch_id = m.branch_id
        )
    );

-- Public can view active categories
CREATE POLICY "public_view_active_categories" ON categories
    FOR SELECT
    USING (is_active = true);

-- ----------------------------------------------------------------------------
-- PRODUCTS Policies
-- ----------------------------------------------------------------------------

-- Super admins can do everything
CREATE POLICY "super_admin_all_products" ON products
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- Business admins can manage products in their business
CREATE POLICY "business_admin_manage_products" ON products
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'business_admin'
            AND business_id = products.business_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'business_admin'
            AND business_id = products.business_id
        )
    );

-- Branch admins can view products in their business (read-only)
CREATE POLICY "branch_admin_view_products" ON products
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN branches b ON b.id = p.branch_id
            WHERE p.id = auth.uid() 
            AND p.role = 'branch_admin'
            AND b.business_id = products.business_id
        )
    );

-- Public can view active products
CREATE POLICY "public_view_active_products" ON products
    FOR SELECT
    USING (is_active = true);

-- ----------------------------------------------------------------------------
-- MENU_ITEMS Policies
-- ----------------------------------------------------------------------------

-- Super admins can do everything
CREATE POLICY "super_admin_all_menu_items" ON menu_items
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- Business admins can manage menu items in their business
CREATE POLICY "business_admin_manage_menu_items" ON menu_items
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN categories c ON c.id = menu_items.category_id
            JOIN menus m ON m.id = c.menu_id
            JOIN branches b ON b.id = m.branch_id
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = b.business_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN categories c ON c.id = menu_items.category_id
            JOIN menus m ON m.id = c.menu_id
            JOIN branches b ON b.id = m.branch_id
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = b.business_id
        )
    );

-- Branch admins can manage menu items in their branch
CREATE POLICY "branch_admin_manage_menu_items" ON menu_items
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN categories c ON c.id = menu_items.category_id
            JOIN menus m ON m.id = c.menu_id
            WHERE p.id = auth.uid() 
            AND p.role = 'branch_admin'
            AND p.branch_id = m.branch_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN categories c ON c.id = menu_items.category_id
            JOIN menus m ON m.id = c.menu_id
            WHERE p.id = auth.uid() 
            AND p.role = 'branch_admin'
            AND p.branch_id = m.branch_id
        )
    );

-- Public can view available menu items
CREATE POLICY "public_view_available_menu_items" ON menu_items
    FOR SELECT
    USING (is_available = true);

-- ----------------------------------------------------------------------------
-- QR_CODES Policies
-- ----------------------------------------------------------------------------

-- Super admins can do everything
CREATE POLICY "super_admin_all_qr_codes" ON qr_codes
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- Business admins can manage QR codes in their business
CREATE POLICY "business_admin_manage_qr_codes" ON qr_codes
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN branches b ON b.id = qr_codes.branch_id
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = b.business_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN branches b ON b.id = qr_codes.branch_id
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = b.business_id
        )
    );

-- Branch admins can manage QR codes in their branch
CREATE POLICY "branch_admin_manage_qr_codes" ON qr_codes
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'branch_admin'
            AND branch_id = qr_codes.branch_id
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'branch_admin'
            AND branch_id = qr_codes.branch_id
        )
    );

-- Public can view active QR codes (needed for QR resolution)
CREATE POLICY "public_view_active_qr_codes" ON qr_codes
    FOR SELECT
    USING (is_active = true);

-- ----------------------------------------------------------------------------
-- PROFILES Policies
-- ----------------------------------------------------------------------------

-- Super admins can manage all profiles
CREATE POLICY "super_admin_all_profiles" ON profiles
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- Users can view their own profile
CREATE POLICY "users_view_own_profile" ON profiles
    FOR SELECT
    USING (id = auth.uid());

-- Users can update their own profile (but not role/business/branch)
CREATE POLICY "users_update_own_profile" ON profiles
    FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Business admins can view profiles in their business
CREATE POLICY "business_admin_view_profiles" ON profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = profiles.business_id
        )
    );

-- Business admins can manage branch_admin profiles in their business
CREATE POLICY "business_admin_manage_branch_admins" ON profiles
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = profiles.business_id
            AND profiles.role = 'branch_admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles p
            WHERE p.id = auth.uid() 
            AND p.role = 'business_admin'
            AND p.business_id = profiles.business_id
            AND profiles.role = 'branch_admin'
        )
    );

-- ============================================================================
-- TRIGGERS FOR updated_at
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON businesses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_branches_updated_at
    BEFORE UPDATE ON branches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menus_updated_at
    BEFORE UPDATE ON menus
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_qr_codes_updated_at
    BEFORE UPDATE ON qr_codes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- TRIGGER TO AUTO-CREATE PROFILE ON USER SIGNUP
-- ============================================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- USEFUL VIEWS
-- ============================================================================

-- View for getting complete menu item details with effective price
CREATE OR REPLACE VIEW v_menu_items_with_details AS
SELECT 
    mi.id AS menu_item_id,
    mi.category_id,
    mi.product_id,
    mi.sort_order,
    mi.is_available,
    mi.created_at,
    mi.updated_at,
    -- Product details
    p.name AS product_name,
    p.slug AS product_slug,
    p.description AS product_description,
    p.base_price,
    p.image_url AS product_image_url,
    p.is_active AS product_is_active,
    -- Effective price (custom or base)
    COALESCE(mi.custom_price, p.base_price) AS effective_price,
    mi.custom_price IS NOT NULL AS has_custom_price,
    -- Category details
    c.name AS category_name,
    c.slug AS category_slug,
    c.sort_order AS category_sort_order,
    -- Menu details
    m.id AS menu_id,
    m.name AS menu_name,
    m.slug AS menu_slug,
    m.is_default AS menu_is_default,
    -- Branch details
    b.id AS branch_id,
    b.name AS branch_name,
    b.slug AS branch_slug,
    -- Business details
    bus.id AS business_id,
    bus.name AS business_name,
    bus.slug AS business_slug
FROM menu_items mi
JOIN products p ON p.id = mi.product_id
JOIN categories c ON c.id = mi.category_id
JOIN menus m ON m.id = c.menu_id
JOIN branches b ON b.id = m.branch_id
JOIN businesses bus ON bus.id = b.business_id;

-- ============================================================================
-- SAMPLE DATA (Optional - Remove in production)
-- ============================================================================

-- Uncomment below to insert sample data for testing

/*
-- Insert sample business
INSERT INTO businesses (name, slug, description) 
VALUES ('John Filippo', 'john-filippo', 'Premium Italian Restaurant Chain');

-- Get the business ID for subsequent inserts
DO $$
DECLARE
    v_business_id UUID;
    v_branch_id UUID;
    v_menu_id UUID;
    v_category_pizza_id UUID;
    v_category_pasta_id UUID;
    v_product_margherita_id UUID;
    v_product_pepperoni_id UUID;
BEGIN
    SELECT id INTO v_business_id FROM businesses WHERE slug = 'john-filippo';
    
    -- Insert sample branch
    INSERT INTO branches (business_id, name, slug, address, city, district, phone)
    VALUES (v_business_id, 'Eryaman Şubesi', 'eryaman', 'Şehit Osman Avcı, Malazgirt 1071. Cd. No:46/C-10', 'Ankara', 'Etimesgut', '+90 312 577 39 99')
    RETURNING id INTO v_branch_id;
    
    -- Insert sample menu
    INSERT INTO menus (branch_id, name, slug, is_default)
    VALUES (v_branch_id, 'Ana Menü', 'ana-menu', true)
    RETURNING id INTO v_menu_id;
    
    -- Insert sample categories
    INSERT INTO categories (menu_id, name, slug, sort_order)
    VALUES (v_menu_id, 'Pizzalar', 'pizzalar', 1)
    RETURNING id INTO v_category_pizza_id;
    
    INSERT INTO categories (menu_id, name, slug, sort_order)
    VALUES (v_menu_id, 'Makarnalar', 'makarnalar', 2)
    RETURNING id INTO v_category_pasta_id;
    
    -- Insert sample products
    INSERT INTO products (business_id, name, slug, description, base_price, is_active)
    VALUES (v_business_id, 'Margherita Pizza', 'margherita', 'Classic tomato and mozzarella', 159.00, true)
    RETURNING id INTO v_product_margherita_id;
    
    INSERT INTO products (business_id, name, slug, description, base_price, is_active)
    VALUES (v_business_id, 'Pepperoni Pizza', 'pepperoni', 'Spicy pepperoni with mozzarella', 179.00, true)
    RETURNING id INTO v_product_pepperoni_id;
    
    -- Insert sample menu items
    INSERT INTO menu_items (category_id, product_id, sort_order)
    VALUES (v_category_pizza_id, v_product_margherita_id, 1);
    
    INSERT INTO menu_items (category_id, product_id, sort_order, custom_price)
    VALUES (v_category_pizza_id, v_product_pepperoni_id, 2, 189.00); -- Custom price for this branch
    
    -- Insert sample QR code
    INSERT INTO qr_codes (branch_id, table_label, url_slug)
    VALUES (v_branch_id, 'Masa 1', 'jf-ery-001');
    
END $$;
*/
