
'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { Card } from '@/components/ui/Cards';

const testimonials = [
    {
        name: 'Alexander Volkov',
        role: 'Venture Sovereign',
        content: 'Æquitas isn\'t a tracking app. It\'s a discipline layer for my subsystems. The goal warp functionality alone saved me 18 months on my estate acquisition timeline.',
        metrics: '+42% Growth'
    },
    {
        name: 'Seraphina Chen',
        role: 'High-Frequency Trader',
        content: 'The neural audit detected patterns in my discretionary expenditure that I was blind to. It redirected $4k/month into my strategic reserves without me feeling a deficit.',
        metrics: '15.4% Efficiency'
    },
    {
        name: 'Marcus Thorne',
        role: 'Architecture Lead',
        content: 'I require logic and precision. The Life Energy metric changed how I view every movement of capital. It\'s the first time a platform actually optimized my future instead of just logging my past.',
        metrics: 'Goal Met: T-120d'
    },
    {
        name: 'Elena Rossi',
        role: 'Cognitive Designer',
        content: 'A aesthetic and functional triumph. The ZK-proof sovereignty gives me the anonymity I require, while the Cortex AI provides the oversight I need.',
        metrics: '100% Secure'
    }
];

export function Testimonials() {
    return (
        <section className="py-48 bg-black overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-px bg-white/[0.03]" />

            <div className="container mx-auto px-6 md:px-10 mb-32">
                <div className="flex flex-col md:flex-row items-end justify-between gap-10">
                    <div className="max-w-2xl space-y-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent italic">Sovereign Validation</h2>
                        <h3 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter leading-none text-white">THE INTELLIGENCE <br /> HAS SPOKEN</h3>
                    </div>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} className="text-primary fill-primary" size={20} />)}
                    </div>
                </div>
            </div>

            <div className="flex flex-nowrap gap-10 animate-infinite-scroll">
                {[...testimonials, ...testimonials].map((t, i) => (
                    <motion.div
                        key={i}
                        className="flex-shrink-0 w-[400px]"
                    >
                        <Card className="hover:border-primary/30 transition-all p-10 h-full bg-white/[0.01] flex flex-col justify-between space-y-8">
                            <Quote className="text-primary opacity-20" size={40} />
                            <p className="text-lg font-black italic leading-relaxed text-white/90">
                                "{t.content}"
                            </p>
                            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                <div>
                                    <h5 className="text-sm font-black font-poppins text-white uppercase tracking-widest">{t.name}</h5>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">{t.role}</p>
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                                    {t.metrics}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
            `}</style>
        </section>
    );
}
