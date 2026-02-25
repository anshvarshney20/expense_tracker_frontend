
'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Zap, ArrowRight, Target } from 'lucide-react';
import { Card } from '@/components/ui/Cards';
import { MarketingButton } from '@/components/ui/MarketingButton';

const tiers = [
    {
        name: 'Citizen',
        price: '0',
        desc: 'Core expense audit and basic Strategic Pots.',
        features: ['Unlimited Transactions', '3 Strategic Pots', 'Standard AI Insights', 'Cloud Sync'],
        icon: ShieldCheck,
        color: 'muted'
    },
    {
        name: 'Sovereign',
        price: '19',
        desc: 'The full Cortex Intelligence suite with predictive Warp.',
        features: ['Everything in Citizen', 'Unlimited Pots', 'Predictive Goal Simulations', 'Early Access Features', 'Priority Support'],
        icon: Target,
        color: 'primary',
        highlight: true
    },
    {
        name: 'Architecture',
        price: '49',
        desc: 'Institutional-grade capital oversight and multi-vault synchronisation.',
        features: ['Everything in Sovereign', 'Advanced Risk Analysis', 'Multi-user Governance', 'Direct Node API Access', 'Personal Audit Lead'],
        icon: Zap,
        color: 'accent'
    }
];

export function PricingPreview() {
    return (
        <section id="pricing" className="py-48 relative">
            <div className="container mx-auto px-6 md:px-10">
                <div className="text-center mb-32 space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary italic">Access Protocol</h2>
                    <h3 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter">CHOOSE YOUR MISSION</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className={`h-full p-12 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 hover:border-${tier.color}/30 ${tier.highlight ? 'border-primary/20 bg-primary/[0.02]' : 'border-white/5'}`}>
                                {tier.highlight && (
                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest shadow-lg z-20">
                                        <Sparkles size={10} /> RECOMMENDED
                                    </div>
                                )}

                                <div className="space-y-8 w-full">
                                    <div className={`w-16 h-16 rounded-2xl bg-${tier.color}/10 flex items-center justify-center text-${tier.color} mx-auto ${tier.highlight ? 'mt-8' : ''} mb-6 transition-transform group-hover:scale-110 duration-500`}>
                                        <tier.icon size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-3xl font-black font-heading uppercase tracking-tight text-white italic">{tier.name}</h4>
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-lg font-black text-muted-foreground opacity-50">$</span>
                                            <span className="text-6xl font-black font-heading text-white">{tier.price}</span>
                                            <span className="text-sm font-bold text-muted-foreground opacity-50 uppercase tracking-widest">/mo</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest leading-relaxed italic opacity-60 min-h-[40px]">
                                        {tier.desc}
                                    </p>
                                </div>

                                <div className="h-px bg-white/5 w-full my-8" />

                                <ul className="space-y-5 w-full text-left flex-1 mb-10">
                                    {tier.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors">
                                            <ShieldCheck size={14} className={tier.highlight ? 'text-primary shadow-sm shadow-primary/20' : 'text-muted-foreground'} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <div className="w-full pt-4 mt-auto">
                                    <MarketingButton
                                        href="/register"
                                        className="w-full"
                                        variant={tier.highlight ? 'primary' : 'outline'}
                                        icon={<ArrowRight size={16} />}
                                    >
                                        Initialize Protocol
                                    </MarketingButton>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
