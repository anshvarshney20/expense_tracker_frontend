
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
        title: 'Neural Financial Audit',
        desc: 'Deep-layer AI analysis detecting every capital efficiency leak in real-time. Our Cortex maps behavioral drift patterns.',
        icon: Brain,
        color: 'primary'
    },
    {
        title: 'Strategic Pot System',
        desc: 'Establishing high-yield capital allocation nodes for long-term power projection and security.',
        icon: Target,
        color: 'accent'
    },
    {
        title: 'Lifestyle Drift Detection',
        desc: 'AI-monitored oversight of your subsistence spending. Detecting impulse movements before they break your delta.',
        icon: Zap,
        color: 'secondary'
    },
    {
        title: 'Life Energy Metrics',
        desc: 'Convert every movement into "Life Energy" nodes. Audit if the purchase matches the survival cost.',
        icon: Fingerprint,
        color: 'primary'
    },
    {
        title: 'Sovereign Guard',
        desc: 'End-to-end ZK-proof encryption. Your capital ledger is your property, secured by bank-grade biometric hashes.',
        icon: Shield,
        color: 'accent'
    },
    {
        title: 'Growth Velocity Audit',
        desc: 'Visualise the trajectory of your financial sovereignty through predictive modeling and trend analysis.',
        icon: TrendingUp,
        color: 'secondary'
    }
];

export function FeaturesGrid() {
    return (
        <section id="features" className="py-48 bg-black/20">
            <div className="container mx-auto px-6 md:px-10">
                <div className="text-center mb-32 space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent italic">Architecture Foundation</h2>
                    <h3 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter">ELITE PROTOCOLS</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="h-full border-white/5 hover:border-accent/30 transition-all p-12 space-y-10 group">
                                <div className={`w-20 h-20 rounded-[28px] bg-${feature.color}/10 flex items-center justify-center text-${feature.color} group-hover:scale-110 group-hover:bg-${feature.color} group-hover:text-black transition-all duration-500`}>
                                    <feature.icon size={36} />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-3xl font-black font-poppins text-white uppercase tracking-tight leading-none group-hover:translate-x-1 transition-transform">
                                        {feature.title}
                                    </h4>
                                    <p className="text-sm font-medium leading-relaxed text-muted-foreground uppercase opacity-60 italic tracking-widest">
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
