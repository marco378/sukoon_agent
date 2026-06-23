import { Link, useLocation } from 'react-router-dom'
import { Home, FilePlus, ClipboardList, LogOut, Bell, Search, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Input } from '@/components/ui/input.jsx'

const nav = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/quotes/new', label: 'New Quote', icon: FilePlus },
  { to: '/proposals', label: 'Proposals', icon: ClipboardList },
]

export default function Layout({ children, onLogout }) {
  const { pathname } = useLocation()

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 flex flex-col bg-sidebar border-r border-sidebar-border shrink-0">
        <div className="h-14 flex items-center px-4 border-b border-sidebar-border">
          <img src="/logo.png" alt="Sukoon Insurance" className="h-10" />
        </div>

        <nav className="flex-1 px-2 py-2 space-y-0.5">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== '/' && pathname.startsWith(to))
            return (
              <Link
                key={to}
                to={to}
                className={`group flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                }`}
              >
                <Icon size={15} strokeWidth={1.8} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="px-2 pb-3">
          <Separator className="mb-2" />
          <button
            onClick={onLogout}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-colors w-full"
          >
            <LogOut size={15} strokeWidth={1.8} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-between px-6 border-b border-border shrink-0">
          <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <span>Agent Portal</span>
            <ChevronRight size={12} />
            <span className="text-foreground font-medium">
              {nav.find(n => n.to === pathname)?.label || 'Page'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="h-8 w-48 pl-8 text-[13px] bg-muted border-none"
              />
            </div>
            <Separator orientation="vertical" className="h-5" />
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={16} strokeWidth={1.8} />
              <span className="absolute -top-0.5 -right-0.5 size-2 bg-primary rounded-full" />
            </button>
            <div className="size-7 rounded-full bg-muted flex items-center justify-center text-[11px] font-semibold text-muted-foreground">
              AA
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
