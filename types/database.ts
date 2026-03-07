/**
 * Database Types for John Filippo QR Menu System
 * 
 * These types correspond to the PostgreSQL schema defined in Supabase.
 * They provide type safety for all database operations.
 */

// =============================================================================
// Enums
// =============================================================================

export type UserRole = 'super_admin' | 'business_admin' | 'branch_admin'

// =============================================================================
// Base Types (matching database columns)
// =============================================================================

export interface Business {
    id: string
    name: string
    slug: string
    logo_url: string | null
    description: string | null
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Branch {
    id: string
    business_id: string
    name: string
    slug: string
    address: string | null
    city: string | null
    district: string | null
    phone: string | null
    latitude: number | null
    longitude: number | null
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Menu {
    id: string
    branch_id: string
    name: string
    slug: string
    description: string | null
    is_default: boolean
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Category {
    id: string
    menu_id: string
    name: string
    slug: string
    description: string | null
    image_url: string | null
    sort_order: number
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Product {
    id: string
    business_id: string
    name: string
    slug: string
    description: string | null
    base_price: number
    image_url: string | null
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface MenuItem {
    id: string
    category_id: string
    product_id: string
    custom_price: number | null
    is_available: boolean
    sort_order: number
    created_at: string
    updated_at: string
}

export interface QrCode {
    id: string
    branch_id: string
    table_label: string
    url_slug: string
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Profile {
    id: string
    email: string | null
    full_name: string | null
    avatar_url: string | null
    business_id: string | null
    branch_id: string | null
    role: UserRole
    created_at: string
    updated_at: string
}

// =============================================================================
// Insert Types (for creating new records)
// =============================================================================

export type BusinessInsert = Omit<Business, 'id' | 'created_at' | 'updated_at'> & {
    id?: string
    created_at?: string
    updated_at?: string
}

export type BranchInsert = Omit<Branch, 'id' | 'created_at' | 'updated_at'> & {
    id?: string
    created_at?: string
    updated_at?: string
}

export type MenuInsert = Omit<Menu, 'id' | 'created_at' | 'updated_at'> & {
    id?: string
    created_at?: string
    updated_at?: string
}

export type CategoryInsert = Omit<Category, 'id' | 'created_at' | 'updated_at'> & {
    id?: string
    created_at?: string
    updated_at?: string
}

export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'> & {
    id?: string
    created_at?: string
    updated_at?: string
}

export type MenuItemInsert = Omit<MenuItem, 'id' | 'created_at' | 'updated_at'> & {
    id?: string
    created_at?: string
    updated_at?: string
}

export type QrCodeInsert = Omit<QrCode, 'id' | 'created_at' | 'updated_at'> & {
    id?: string
    created_at?: string
    updated_at?: string
}

export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'> & {
    created_at?: string
    updated_at?: string
}

// =============================================================================
// Update Types (for updating existing records)
// =============================================================================

export type BusinessUpdate = Partial<Omit<Business, 'id' | 'created_at'>>
export type BranchUpdate = Partial<Omit<Branch, 'id' | 'created_at'>>
export type MenuUpdate = Partial<Omit<Menu, 'id' | 'created_at'>>
export type CategoryUpdate = Partial<Omit<Category, 'id' | 'created_at'>>
export type ProductUpdate = Partial<Omit<Product, 'id' | 'created_at'>>
export type MenuItemUpdate = Partial<Omit<MenuItem, 'id' | 'created_at'>>
export type QrCodeUpdate = Partial<Omit<QrCode, 'id' | 'created_at'>>
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>

// =============================================================================
// Extended Types (with relations)
// =============================================================================

export interface BranchWithBusiness extends Branch {
    business: Business
}

export interface MenuWithBranch extends Menu {
    branch: Branch
}

export interface CategoryWithMenu extends Category {
    menu: Menu
}

export interface MenuItemWithProduct extends MenuItem {
    product: Product
    /** Computed effective price - uses custom_price if set, otherwise base_price */
    effective_price: number
}

export interface MenuItemWithDetails extends MenuItem {
    product: Product
    category: Category
}

export interface QrCodeWithBranch extends QrCode {
    branch: Branch
}

// =============================================================================
// Database Schema Type (for Supabase client typing)
// =============================================================================

export interface Database {
    public: {
        Tables: {
            businesses: {
                Row: Business
                Insert: BusinessInsert
                Update: BusinessUpdate
            }
            branches: {
                Row: Branch
                Insert: BranchInsert
                Update: BranchUpdate
            }
            menus: {
                Row: Menu
                Insert: MenuInsert
                Update: MenuUpdate
            }
            categories: {
                Row: Category
                Insert: CategoryInsert
                Update: CategoryUpdate
            }
            products: {
                Row: Product
                Insert: ProductInsert
                Update: ProductUpdate
            }
            menu_items: {
                Row: MenuItem
                Insert: MenuItemInsert
                Update: MenuItemUpdate
            }
            qr_codes: {
                Row: QrCode
                Insert: QrCodeInsert
                Update: QrCodeUpdate
            }
            profiles: {
                Row: Profile
                Insert: ProfileInsert
                Update: ProfileUpdate
            }
        }
        Views: {
            v_menu_items_with_details: {
                Row: {
                    menu_item_id: string
                    category_id: string
                    product_id: string
                    sort_order: number
                    is_available: boolean
                    created_at: string
                    updated_at: string
                    product_name: string
                    product_slug: string
                    product_description: string | null
                    base_price: number
                    product_image_url: string | null
                    product_is_active: boolean
                    effective_price: number
                    has_custom_price: boolean
                    category_name: string
                    category_slug: string
                    category_sort_order: number
                    menu_id: string
                    menu_name: string
                    menu_slug: string
                    menu_is_default: boolean
                    branch_id: string
                    branch_name: string
                    branch_slug: string
                    business_id: string
                    business_name: string
                    business_slug: string
                }
            }
        }
        Functions: {
            is_super_admin: {
                Args: Record<string, never>
                Returns: boolean
            }
            can_access_business: {
                Args: { target_business_id: string }
                Returns: boolean
            }
            can_access_branch: {
                Args: { target_branch_id: string }
                Returns: boolean
            }
        }
        Enums: {
            user_role: UserRole
        }
    }
}
