
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { MarketingButton } from '../ui/MarketingButton';
import { api } from '@/lib/api';
import { toast } from 'sonner';

const footerLinks = [
    {
        title: 'Intelligence',
        links: [
            { label: 'Neural Ledger', href: '/features' },
            { label: 'Cortex AI', href: '/features' },
            { label: 'Risk Audit', href: '/features' },
            { label: 'Simulator', href: '/features' }
        ]
    },
    {
        title: 'Sovereignty',
        links: [
            { label: 'Data Freedom', href: '/about' },
            { label: 'Node Access', href: '/about' },
            { label: 'Vault Security', href: '/about' },
            { label: 'Protocol', href: '/about' }
        ]
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '/legal/privacy' },
            { label: 'Terms of Service', href: '/legal/terms' },
            { label: 'Cookie Policy', href: '/legal/cookies' }
        ]
    }
];

export function MarketingFooter() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            await api.post('/marketing/newsletter', { email });
            toast.success('Sovereign pulse initialized');
            setEmail('');
        } catch (err: any) {
            toast.error('Failed to subscribe to pulse.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <footer className="relative bg-[#02040a] pt-32 pb-20 overflow-hidden font-sans border-t border-white/[0.03]">
            {/* Background Architecture */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-primary/5 rounded-full blur-[160px] opacity-20 -z-10" />

            <div className="container mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-32">
                    {/* Brand & Newsletter */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-black text-xl shadow-lg font-heading">
                                Æ
                            </div>
                            <span className="text-3xl font-black font-heading tracking-tighter text-white">Æquitas</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em] leading-relaxed italic max-w-sm">
                            Empowering high-performance individuals through cognitive financial intelligence and zero-friction auditing.
                        </p>
                        <div className="space-y-4">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic font-heading">The Protocol Dispatch</h5>
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="SOVEREIGN@EMAIL.COM"
                                    className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-xs font-bold uppercase tracking-widest placeholder:opacity-20"
                                />
                                <MarketingButton type="submit" disabled={isLoading} size="md">
                                    {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Subscribe'}
                                </MarketingButton>
                            </form>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {footerLinks.map((col, i) => (
                        <div key={i} className="space-y-8">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white italic font-heading">{col.title}</h5>
                            <ul className="space-y-4">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <Link
                                            href={link.href}
                                            className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors italic opacity-60 hover:opacity-100"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground opacity-30 italic">
                        © 2026 Æquitas Intelligence Network • All Protocols Reserved
                    </p>
                    <div className="flex items-center gap-8">
                        {[
                            { icon: Twitter, href: '#' },
                            { icon: Github, href: '#' },
                            { icon: Linkedin, href: '#' },
                            { icon: Mail, href: '#' }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                className="text-muted-foreground hover:text-white transition-all opacity-40 hover:opacity-100 hover:scale-110"
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
