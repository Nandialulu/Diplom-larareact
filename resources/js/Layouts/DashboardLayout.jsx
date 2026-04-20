// resources/js/Layouts/DashboardLayout.jsx
import { Link, usePage } from '@inertiajs/react'
import AuthenticatedLayout from './AuthenticatedLayout'
export default function DashboardLayout({ children }) {
  const { auth } = usePage().props

  return (
    <AuthenticatedLayout>
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow">
        <div className="p-4 font-bold text-lg">
          Хянах самбар
        </div>

        <nav className="px-4 space-y-2">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded hover:bg-gray-200"
          >
            Хянах самбар
          </Link>

          <Link
            href="/host/create"
            className="block px-3 py-2 rounded hover:bg-gray-200"
          >
            Create list
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 bg-white shadow flex items-center justify-between px-6">
          <span>Welcome, {auth.user.name}</span>
        </header>

        {/* Page content */}
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
    </AuthenticatedLayout>
  )
}
