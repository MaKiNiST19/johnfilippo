-- ============================================================================
-- Fix RLS Infinite Recursion on profiles table
-- ============================================================================
-- The issue: is_super_admin() and other helper functions query the profiles
-- table, but the profiles table has RLS policies that call these functions,
-- creating infinite recursion.
--
-- Solution: Use a direct check in policies that bypasses the helper functions
-- for the profiles table, and ensure helper functions use SET search_path
-- with SECURITY DEFINER properly.
-- ============================================================================

-- Drop existing policies on profiles
DROP POLICY IF EXISTS "super_admin_all_profiles" ON profiles;
DROP POLICY IF EXISTS "users_view_own_profile" ON profiles;
DROP POLICY IF EXISTS "users_update_own_profile" ON profiles;
DROP POLICY IF EXISTS "business_admin_view_profiles" ON profiles;
DROP POLICY IF EXISTS "business_admin_manage_branch_admins" ON profiles;

-- Recreate helper functions with proper SECURITY DEFINER and explicit search_path
-- The key is to set search_path to empty to prevent RLS from being triggered
-- when these functions query the profiles table

CREATE OR REPLACE FUNCTION get_my_role()
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION get_my_business_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT business_id FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION get_my_branch_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT branch_id FROM public.profiles WHERE id = auth.uid();
$$;

-- Update existing helper functions to also use search_path = ''
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role = 'super_admin'
    );
$$;

CREATE OR REPLACE FUNCTION can_access_business(target_business_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND (
            role = 'super_admin'
            OR business_id = target_business_id
        )
    );
$$;

CREATE OR REPLACE FUNCTION can_access_branch(target_branch_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.id = auth.uid() 
        AND (
            p.role = 'super_admin'
            OR (
                p.role = 'business_admin' 
                AND p.business_id = (SELECT business_id FROM public.branches WHERE id = target_branch_id)
            )
            OR (
                p.role = 'branch_admin' 
                AND p.branch_id = target_branch_id
            )
        )
    );
$$;

-- Recreate profiles policies using the SECURITY DEFINER functions
-- These now bypass RLS because the functions use search_path = ''

-- Super admins can manage all profiles
CREATE POLICY "super_admin_all_profiles" ON profiles
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

-- Users can always view their own profile (direct check, no function needed)
CREATE POLICY "users_view_own_profile" ON profiles
    FOR SELECT
    USING (id = auth.uid());

-- Users can update their own profile
CREATE POLICY "users_update_own_profile" ON profiles
    FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Business admins can view profiles in their business
CREATE POLICY "business_admin_view_profiles" ON profiles
    FOR SELECT
    USING (
        get_my_role() = 'business_admin'
        AND get_my_business_id() = profiles.business_id
    );

-- Business admins can manage branch_admin profiles in their business
CREATE POLICY "business_admin_manage_branch_admins" ON profiles
    FOR ALL
    USING (
        get_my_role() = 'business_admin'
        AND get_my_business_id() = profiles.business_id
        AND profiles.role = 'branch_admin'
    )
    WITH CHECK (
        get_my_role() = 'business_admin'
        AND get_my_business_id() = profiles.business_id
        AND profiles.role = 'branch_admin'
    );

-- ============================================================================
-- Also update policies on other tables to use the fixed functions
-- These should already work but let's ensure consistency
-- ============================================================================

-- For branches - Update to use the fixed functions
DROP POLICY IF EXISTS "super_admin_all_branches" ON branches;
DROP POLICY IF EXISTS "business_admin_manage_branches" ON branches;
DROP POLICY IF EXISTS "branch_admin_view_own_branch" ON branches;
DROP POLICY IF EXISTS "branch_admin_update_own_branch" ON branches;

CREATE POLICY "super_admin_all_branches" ON branches
    FOR ALL
    USING (is_super_admin())
    WITH CHECK (is_super_admin());

CREATE POLICY "business_admin_manage_branches" ON branches
    FOR ALL
    USING (
        get_my_role() = 'business_admin'
        AND get_my_business_id() = branches.business_id
    )
    WITH CHECK (
        get_my_role() = 'business_admin'
        AND get_my_business_id() = branches.business_id
    );

CREATE POLICY "branch_admin_view_own_branch" ON branches
    FOR SELECT
    USING (
        get_my_role() = 'branch_admin'
        AND get_my_branch_id() = branches.id
    );

CREATE POLICY "branch_admin_update_own_branch" ON branches
    FOR UPDATE
    USING (
        get_my_role() = 'branch_admin'
        AND get_my_branch_id() = branches.id
    )
    WITH CHECK (
        get_my_role() = 'branch_admin'
        AND get_my_branch_id() = branches.id
    );
