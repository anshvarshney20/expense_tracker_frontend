
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarketingButton } from '../ui/MarketingButton';

const links = [
    { label: 'Intelligence', href: '/features' },
    { label: 'Sovereignty', href: '/about' },
    { label: 'Architecture', href: '/pricing' },
    { label: 'Protocol', href: '/contact' },
];

export function MarketingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-[100] transition-all duration-500 font-sans",
                isScrolled ? "py-4" : "py-8"
            )}
        >
            <div className="container mx-auto px-6 md:px-10">
                <div className={cn(
                    "relative flex items-center justify-between px-6 py-4 rounded-[32px] transition-all duration-500",
                    isScrolled ? "glass-dark bg-black/60 shadow-2xl shadow-black/50" : "bg-transparent"
                )}>
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-black text-lg shadow-lg group-hover:rotate-12 transition-transform font-heading">
                            Æ
                        </div>
                        <span className="text-2xl font-black font-heading tracking-tighter text-white">Æquitas</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-10">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:text-primary italic",
                                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-white transition-all italic">
                            Portal Access
                        </Link>
                        <MarketingButton href="/register" size="sm" icon={<ArrowRight size={14} />}>
                            Initialize
                        </MarketingButton>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="md:hidden p-2 text-white"
                        aria-label="Toggle Menu"
                    >
                        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[90] lg:hidden"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="fixed top-24 left-6 right-6 p-10 glass rounded-[48px] z-[100] border-white/10 lg:hidden flex flex-col gap-8 text-center"
                        >
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors font-heading"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-white/5 w-full my-4" />
                            <Link href="/login" className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground italic">
                                Portal Access
                            </Link>
                            <MarketingButton href="/register" icon={<ArrowRight size={16} />}>
                                Initialize system
                            </MarketingButton>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
