
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
        title: 'Features',
        links: [
            { label: 'Smart Tracking', href: '/features' },
            { label: 'AI Analysis', href: '/features' },
            { label: 'Risk Audit', href: '/features' },
            { label: 'Simulator', href: '/features' }
        ]
    },
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/about' },
            { label: 'Security', href: '/about' },
            { label: 'Careers', href: '/about' }
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
            toast.success('Successfully subscribed!');
            setEmail('');
        } catch (err: any) {
            toast.error('Failed to subscribe.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <footer className="relative bg-[#02040a] pt-12 md:pt-20 pb-10 md:pb-16 overflow-hidden font-sans border-t border-white/[0.03]">
            {/* Background Architecture */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[1200px] md:h-[400px] bg-primary/5 rounded-full blur-[80px] md:blur-[160px] opacity-20 -z-10" />

            <div className="container mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 mb-12 md:mb-16">
                    {/* Brand & Newsletter */}
                    <div className="lg:col-span-2 space-y-8 md:space-y-10">
                        <div className="flex items-center gap-3 md:gap-4 group cursor-default">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black font-black text-lg md:text-xl shadow-lg font-heading">
                                Æ
                            </div>
                            <span className="text-2xl md:text-3xl font-black font-heading tracking-tighter text-white">Æquitas</span>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-[0.2em] leading-relaxed italic max-w-sm">
                            Empowering individuals to master their financial future through automated tracking and smart AI insights.
                        </p>
                        <div className="space-y-4">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic font-heading">Weekly Newsletter</h5>
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="YOUR@EMAIL.COM"
                                    className="flex-1 px-5 py-3.5 md:px-6 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-primary/50 outline-none transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest placeholder:opacity-20"
                                />
                                <MarketingButton type="submit" disabled={isLoading} size="md" className="w-full sm:w-auto">
                                    {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Subscribe'}
                                </MarketingButton>
                            </form>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {footerLinks.map((col, i) => (
                        <div key={i} className="space-y-6 md:space-y-8">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white italic font-heading">{col.title}</h5>
                            <ul className="space-y-3 md:space-y-4">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <Link
                                            href={link.href}
                                            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors italic opacity-60 hover:opacity-100"
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
                <div className="pt-8 md:pt-10 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-muted-foreground opacity-30 italic text-center md:text-left">
                        © 2026 Æquitas Intelligence Network • All Rights Reserved
                    </p>
                    <div className="flex items-center gap-6 md:gap-8">
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
                                <social.icon size={18} className="md:size-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
