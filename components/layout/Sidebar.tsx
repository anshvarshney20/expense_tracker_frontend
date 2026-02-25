
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Receipt,
    Wallet,
    PieChart,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    User as UserIcon,
    Loader2,
    Menu,
    X,
    Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
    { icon: LayoutDashboard, label: 'Treasury', href: '/dashboard' },
    { icon: Receipt, label: 'Ledger', href: '/expenses' },
    { icon: Wallet, label: 'Strategic Pots', href: '/pots' },
    { icon: PieChart, label: 'Intelligence', href: '/analytics' },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { user, logout, isLoading } = useAuth();

    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    const SidebarContent = (
        <div className="flex flex-col h-full py-8">
            {/* Brand Logo */}
            <div className="px-6 mb-12 flex items-center justify-between">
                <AnimatePresence mode="wait">
                    {(!isCollapsed || isMobileOpen) && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 transition-transform hover:rotate-6">
                                <span className="text-black font-black text-xl">Æ</span>
                            </div>
                            <span className="font-black text-xl tracking-tighter font-poppins text-white">Æquitas</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isMobileOpen && (
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex p-2 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-white transition-all border border-transparent hover:border-white/10"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1.5 mt-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group overflow-hidden",
                                isActive
                                    ? "text-primary font-open-sans"
                                    : "text-muted-foreground hover:text-white hover:bg-white/[0.03] font-open-sans"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-primary/5 border-l-2 border-primary z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <item.icon size={22} className={cn("shrink-0 z-10 transition-transform duration-300 group-hover:scale-110", isActive && "text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]")} />
                            <AnimatePresence>
                                {(!isCollapsed || isMobileOpen) && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -5 }}
                                        className="whitespace-nowrap z-10 font-bold tracking-tight text-sm uppercase"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile & Footer */}
            <div className="px-4 mt-auto space-y-2">
                <Link
                    href="/profile"
                    className={cn(
                        "flex flex-col gap-1 p-4 rounded-3xl mb-4 transition-all duration-300 group/user font-open-sans",
                        isCollapsed && !isMobileOpen ? "items-center px-2" : "bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:bg-white/5"
                    )}
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin text-muted-foreground" size={20} />
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 border border-secondary/20 shadow-inner group-hover/user:bg-secondary group-hover/user:text-black transition-all">
                                    <UserIcon size={20} />
                                </div>
                                {(!isCollapsed || isMobileOpen) && (
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-black truncate text-white uppercase tracking-widest leading-none mb-1 group-hover/user:text-primary transition-colors font-poppins">
                                            {user?.full_name || 'System Sovereign'}
                                        </p>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                            <p className="text-[10px] text-muted-foreground truncate font-bold uppercase">Elite Tier</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </Link>

                <div className="space-y-1">
                    <Link
                        href="/settings"
                        className="flex items-center gap-4 px-4 py-3 rounded-2xl text-muted-foreground hover:bg-white/[0.03] hover:text-white transition-all group font-open-sans"
                    >
                        <Settings size={20} className="shrink-0 transition-transform group-hover:rotate-45" />
                        {(!isCollapsed || isMobileOpen) && <span className="text-xs font-bold uppercase tracking-widest">Global Ops</span>}
                    </Link>
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-destructive/70 hover:bg-destructive/10 hover:text-destructive transition-all group font-open-sans"
                    >
                        <LogOut size={20} className="shrink-0 transition-transform group-hover:-translate-x-1" />
                        {(!isCollapsed || isMobileOpen) && <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="lg:hidden flex items-center justify-between p-5 bg-black/80 backdrop-blur-2xl border-b border-white/5 fixed top-0 w-full z-40">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                        <span className="text-black font-black text-sm">Æ</span>
                    </div>
                    <span className="font-black text-lg tracking-tighter font-poppins text-white">Æquitas</span>
                </div>
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="p-2 rounded-xl bg-white/5 text-white transition-colors border border-white/10 shadow-lg"
                >
                    <Menu size={20} />
                </button>
            </div>

            <motion.div
                initial={false}
                animate={{ width: isCollapsed ? 90 : 280 }}
                className="hidden lg:flex relative flex-col h-screen border-r border-white/5 bg-[#080808] z-50 overflow-hidden"
            >
                {SidebarContent}
            </motion.div>

            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-full max-w-[280px] bg-[#080808] border-r border-white/5 z-[70] lg:hidden"
                        >
                            {SidebarContent}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
