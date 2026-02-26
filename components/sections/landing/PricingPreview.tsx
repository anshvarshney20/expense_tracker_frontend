
'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Zap, ArrowRight, Target } from 'lucide-react';
import { Card } from '@/components/ui/Cards';
import { MarketingButton } from '@/components/ui/MarketingButton';

const tiers = [
    {
        name: 'Starter',
        price: '0',
        desc: 'Perfect for individuals just starting to track their money.',
        features: ['Unlimited Transactions', '3 Savings Goals', 'Basic AI Insights', 'Cloud Sync'],
        icon: ShieldCheck,
        color: 'muted'
    },
    {
        name: 'Pro',
        price: '19',
        desc: 'Advanced AI features for people serious about their financial goals.',
        features: ['Everything in Starter', 'Unlimited Savings Goals', 'Predictive Growth Simulations', 'Early Access Features', 'Priority Support'],
        icon: Target,
        color: 'primary',
        highlight: true
    },
    {
        name: 'Enterprise',
        price: '49',
        desc: 'Institutional-grade tools for teams and family offices.',
        features: ['Everything in Pro', 'Advanced Risk Analysis', 'Multi-user Access', 'Direct API Access', 'Dedicated Support Lead'],
        icon: Zap,
        color: 'accent'
    }
];

export function PricingPreview() {
    return (
        <section id="pricing" className="py-24 md:py-48 relative">
            <div className="container mx-auto px-6 md:px-10">
                <div className="text-center mb-16 md:mb-32 space-y-4 md:space-y-6">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary italic">SUBSCRIPTION PLANS</h2>
                    <h3 className="text-4xl md:text-7xl font-black font-heading uppercase tracking-tighter">SIMPLE PRICING</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className={`h-full p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 hover:border-${tier.color}/30 ${tier.highlight ? 'border-primary/20 bg-primary/[0.02]' : 'border-white/5'}`}>
                                {tier.highlight && (
                                    <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[7px] md:text-[8px] font-black uppercase tracking-widest shadow-lg z-20 whitespace-nowrap">
                                        <Sparkles size={10} /> RECOMMENDED
                                    </div>
                                )}

                                <div className="space-y-6 md:space-y-8 w-full">
                                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-${tier.color}/10 flex items-center justify-center text-${tier.color} mx-auto ${tier.highlight ? 'mt-10 md:mt-12' : ''} mb-4 md:mb-6 transition-transform group-hover:scale-110 duration-500`}>
                                        <tier.icon size={28} className="md:size-8" />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <h4 className="text-2xl md:text-3xl font-black font-heading uppercase tracking-tight text-white italic">{tier.name}</h4>
                                        <div className="flex items-center justify-center gap-1.5 md:gap-2">
                                            <span className="text-base md:text-lg font-black text-muted-foreground opacity-50">$</span>
                                            <span className="text-5xl md:text-6xl font-black font-heading text-white">{tier.price}</span>
                                            <span className="text-xs md:text-sm font-bold text-muted-foreground opacity-50 uppercase tracking-widest">/mo</span>
                                        </div>
                                    </div>

                                    <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-widest leading-relaxed italic opacity-60 min-h-[40px]">
                                        {tier.desc}
                                    </p>
                                </div>

                                <div className="h-px bg-white/5 w-full my-6 md:my-8" />

                                <ul className="space-y-4 md:space-y-5 w-full text-left flex-1 mb-8 md:mb-10">
                                    {tier.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-3 md:gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors">
                                            <ShieldCheck size={14} className={`flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-primary shadow-sm shadow-primary/20' : 'text-muted-foreground'}`} />
                                            <span>{f}</span>
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
                                        Initialize Plan
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
