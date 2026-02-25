
'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, ArrowRight, Zap, Target } from 'lucide-react';
import { Card } from '@/components/ui/Cards';
import { MarketingButton } from '@/components/ui/MarketingButton';

export function AIInsightShowcase() {
    return (
        <section className="py-48 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-accent/10 rounded-full blur-[160px] opacity-40 -z-10" />

            <div className="container mx-auto px-6 md:px-10">
                <div className="flex flex-col lg:flex-row items-center gap-32">
                    <div className="flex-1 space-y-10 order-2 lg:order-1">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                                <Brain size={16} /> CORTEX ENGINE ALPHA
                            </div>
                            <h3 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter leading-[0.9] text-white">
                                INTELLIGENCE YOU <br />
                                <span className="italic text-accent">CAN'T IGNORE</span>
                            </h3>
                        </div>
                        <p className="text-xl text-muted-foreground font-medium opacity-80 leading-relaxed italic max-w-2xl">
                            Our AI doesn't just log data. It audits your behaviour. It detects when your subsistence spending is exceeding your mission parameters and intervenes automatically.
                        </p>
                        <ul className="space-y-6">
                            {[
                                { icon: Zap, label: 'Efficiency leak detection' },
                                { icon: Target, label: 'Automatic subsidy routing' },
                                { icon: Sparkles, label: 'Predictive growth simulations' }
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-white italic"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                        <item.icon size={18} />
                                    </div>
                                    {item.label}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1 w-full order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group p-[1px] rounded-[48px] overflow-hidden"
                        >
                            {/* Animated Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary animate-shimmer" style={{ backgroundSize: '200% 200%' }} />

                            <Card className="relative p-12 bg-black border-none rounded-[47px] space-y-10 group-hover:scale-[0.99] transition-transform duration-700">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-primary italic">Neural Insight</h4>
                                    <div className="text-[10px] font-black text-muted-foreground uppercase opacity-40">T-minus 48h Audit</div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-8 rounded-[32px] bg-white/[0.03] border border-white/5 shadow-inner space-y-6">
                                        <blockquote className="text-2xl md:text-3xl font-black font-poppins text-white leading-snug tracking-tight">
                                            "SUBSISTENCE DRIFT DETECTED: UNNECESSARY IMPULSE SPEND AT 'STARBUCKS CORE'.
                                            REDIRECTING SUBSIDY TO 'REAL ESTATE POT'."
                                        </blockquote>
                                        <div className="flex items-center gap-4">
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: '85%' }}
                                                    transition={{ delay: 0.5, duration: 1.5 }}
                                                    className="h-full bg-accent"
                                                />
                                            </div>
                                            <span className="text-[10px] font-black text-accent uppercase tracking-widest">Warping...</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-6 rounded-2xl bg-primary/10 border border-primary/20">
                                        <div className="flex items-center gap-4">
                                            <Zap size={20} className="text-primary animate-pulse" />
                                            <div>
                                                <p className="text-[8px] font-black uppercase tracking-widest text-primary opacity-60">Impact</p>
                                                <p className="text-sm font-black text-white">Goal Accelerator +2.4 Days</p>
                                            </div>
                                        </div>
                                        <MarketingButton size="sm" variant="ghost" className="p-0 border-none bg-transparent">
                                            Authorize <ArrowRight size={14} />
                                        </MarketingButton>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
