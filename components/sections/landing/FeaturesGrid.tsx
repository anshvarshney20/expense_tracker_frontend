
'use client';

import { motion } from 'framer-motion';
import {
    Brain,
    Target,
    Zap,
    Shield,
    TrendingUp,
    Fingerprint,
    Layers,
    BarChart3
} from 'lucide-react';
import { Card } from '@/components/ui/Cards';

const features = [
    {
        title: 'Smart Expense Tracking',
        desc: 'Deep AI analysis that finds hidden savings in your daily spending habits automatically.',
        icon: Brain,
        color: 'primary'
    },
    {
        title: 'Custom Savings Goals',
        desc: 'Set up multiple savings buckets for your dream home, travel, or emergency fund.',
        icon: Target,
        color: 'accent'
    },
    {
        title: 'Budget Alert System',
        desc: 'Real-time monitoring that detects unusual spending before it affects your long-term plans.',
        icon: Zap,
        color: 'secondary'
    },
    {
        title: 'Value-Based Spending',
        desc: 'Understand the true cost of every purchase and see if it aligns with your priorities.',
        icon: Fingerprint,
        color: 'primary'
    },
    {
        title: 'Bank-Level Security',
        desc: 'Your data is 100% private and protected by the same encryption used by major banks.',
        icon: Shield,
        color: 'accent'
    },
    {
        title: 'Growth Forecasting',
        desc: 'Visualize your financial future through predictive models that show where you will be in 5 years.',
        icon: TrendingUp,
        color: 'secondary'
    }
];

export function FeaturesGrid() {
    return (
        <section id="features" className="py-24 md:py-48 bg-black/20">
            <div className="container mx-auto px-6 md:px-10">
                <div className="text-center mb-16 md:mb-32 space-y-4 md:space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent italic">SMART FEATURES</h2>
                    <h3 className="text-4xl md:text-7xl font-black font-heading uppercase tracking-tighter">BETTER BUDGETING</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="h-full border-white/5 hover:border-accent/30 transition-all p-8 md:p-12 group overflow-hidden">
                                <div className="relative h-24 md:h-32 flex items-center mb-4 md:mb-6">
                                    <div className={`absolute -top-10 -left-10 w-32 h-32 md:w-48 md:h-48 rounded-full bg-${feature.color}/10 blur-3xl opacity-50 group-hover:bg-${feature.color}/20 transition-all duration-700`} />
                                    <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[28px] bg-${feature.color}/10 flex items-center justify-center text-${feature.color} group-hover:scale-110 group-hover:bg-${feature.color} group-hover:text-black transition-all duration-500 z-10 shadow-2xl shadow-black`}>
                                        <feature.icon size={28} className="md:size-10" />
                                    </div>
                                    <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 -z-0 group-hover:rotate-12 group-hover:scale-110">
                                        <feature.icon size={120} className="md:size-180" />
                                    </div>
                                </div>
                                <div className="space-y-3 md:space-y-4 relative z-20">
                                    <h4 className="text-xl md:text-3xl font-black font-heading text-white uppercase tracking-tight leading-[1.1] md:leading-none group-hover:translate-x-1 transition-transform">
                                        {feature.title}
                                    </h4>
                                    <p className="text-xs md:text-sm font-medium leading-relaxed text-muted-foreground uppercase opacity-60 italic tracking-widest px-1">
                                        {feature.desc}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
