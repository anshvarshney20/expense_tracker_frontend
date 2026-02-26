
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarketingButton } from '../ui/MarketingButton';

const links = [
    { label: 'Features', href: '/#features' },
    { label: 'How it Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/contact' },
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
                isScrolled ? "py-3 md:py-4" : "py-6 md:py-8"
            )}
        >
            <div className="container mx-auto px-6 md:px-10">
                <div className={cn(
                    "relative flex items-center justify-between px-4 md:px-6 py-2.5 md:py-4 rounded-2xl md:rounded-[32px] transition-all duration-500",
                    isScrolled ? "glass-dark bg-black/60 shadow-2xl shadow-black/50" : "bg-transparent"
                )}>
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3 md:gap-4 group">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-black text-base md:text-lg shadow-lg group-hover:rotate-12 transition-transform font-heading">
                            Æ
                        </div>
                        <span className="text-xl md:text-2xl font-black font-heading tracking-tighter text-white">Æquitas</span>
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
                            Sign In
                        </Link>
                        <MarketingButton href="/register" size="sm" icon={<ArrowRight size={14} />}>
                            Get Started
                        </MarketingButton>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="md:hidden p-2 text-white hover:text-primary transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
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
                            className="fixed top-20 left-6 right-6 p-8 md:p-10 glass rounded-3xl md:rounded-[48px] z-[100] border-white/10 lg:hidden flex flex-col gap-6 md:gap-8 text-center"
                        >
                            <div className="flex flex-col gap-4">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-base md:text-lg font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors font-heading py-2"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="h-px bg-white/5 w-full my-2 md:my-4" />
                            <Link href="/login" className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-muted-foreground italic">
                                Sign In
                            </Link>
                            <MarketingButton href="/register" className="w-full" icon={<ArrowRight size={16} />}>
                                Get Started for Free
                            </MarketingButton>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
