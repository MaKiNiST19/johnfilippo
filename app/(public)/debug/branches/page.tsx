import { createClient } from '@/lib/supabase/server'

// Type for the branches query result
interface BranchWithBusiness {
    id: string
    name: string
    slug: string
    city: string | null
    district: string | null
    address: string | null
    phone: string | null
    is_active: boolean
    created_at: string
    business: {
        id: string
        name: string
        slug: string
    } | null
}

/**
 * Debug page to verify Supabase connection and data fetching.
 * This is a Server Component that fetches branches directly.
 * 
 * Path: /debug/branches
 */
export default async function DebugBranchesPage() {
    const supabase = await createClient()

    // Fetch all branches with their business data
    const { data, error } = await supabase
        .from('branches')
        .select(`
      id,
      name,
      slug,
      city,
      district,
      address,
      phone,
      is_active,
      created_at,
      business:businesses (
        id,
        name,
        slug
      )
    `)
        .order('created_at', { ascending: false })

    // Type assertion for the query result
    const branches = data as BranchWithBusiness[] | null

    if (error) {
        return (
            <main className="min-h-screen bg-gray-900 text-white p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-red-400 mb-4">
                        ❌ Database Error
                    </h1>
                    <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6">
                        <p className="font-mono text-sm text-red-300">
                            {error.message}
                        </p>
                        <p className="text-gray-400 mt-4 text-sm">
                            Code: {error.code}
                        </p>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-emerald-400 mb-2">
                        🔌 Supabase Connection Test
                    </h1>
                    <p className="text-gray-400">
                        Debug page to verify database connectivity and data fetching.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <p className="text-4xl font-bold text-emerald-400">
                            {branches?.length ?? 0}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">Total Branches</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <p className="text-4xl font-bold text-blue-400">
                            {branches?.filter(b => b.is_active).length ?? 0}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">Active</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <p className="text-4xl font-bold text-yellow-400">
                            {branches?.filter(b => !b.is_active).length ?? 0}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">Inactive</p>
                    </div>
                </div>

                {/* Branches List */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-700">
                        <h2 className="text-xl font-semibold">Branches</h2>
                    </div>

                    {(!branches || branches.length === 0) ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-400 text-lg mb-2">
                                No branches found
                            </p>
                            <p className="text-gray-500 text-sm">
                                The database is connected but there are no branches yet.
                                <br />
                                Add some data to see it here.
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-700">
                            {branches.map((branch) => (
                                <li
                                    key={branch.id}
                                    className="px-6 py-4 hover:bg-gray-700/50 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-white">
                                                {branch.name}
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                {branch.city && branch.district
                                                    ? `${branch.district}, ${branch.city}`
                                                    : branch.city || 'No location set'
                                                }
                                            </p>
                                            {branch.business && (
                                                <p className="text-xs text-emerald-400/70 mt-1">
                                                    {branch.business.name}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-500 font-mono">
                                                /{branch.slug}
                                            </span>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${branch.is_active
                                                    ? 'bg-emerald-500/20 text-emerald-400'
                                                    : 'bg-gray-600/20 text-gray-400'
                                                    }`}
                                            >
                                                {branch.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Debug Info */}
                <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-500 font-mono">
                        ✅ Server Component • Supabase Connected
                    </p>
                </div>
            </div>
        </main>
    )
}
