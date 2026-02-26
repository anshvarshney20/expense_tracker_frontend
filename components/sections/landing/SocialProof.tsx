
'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Zap } from 'lucide-react';

const stats = [
    { label: 'Active Users', value: 12400, suffix: '+', icon: Users, color: 'primary' },
    { label: 'Goal Completion', value: 42, suffix: '%', icon: Zap, color: 'accent' },
    { label: 'Monthly Savings Gain', value: 18.5, suffix: '%', icon: TrendingUp, color: 'secondary' },
];

export function SocialProof() {
    return (
        <section className="py-16 md:py-24 border-y border-white/[0.03] bg-black/40">
            <div className="container mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center text-center space-y-3 md:space-y-4"
                        >
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center text-${stat.color} mb-1 md:mb-2`}>
                                <stat.icon size={20} className="md:size-6" />
                            </div>
                            <div className="space-y-1">
                                <motion.h3
                                    className="text-3xl md:text-5xl font-black font-heading text-white tracking-tighter"
                                >
                                    {stat.value}{stat.suffix}
                                </motion.h3>
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-muted-foreground opacity-60 italic">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
