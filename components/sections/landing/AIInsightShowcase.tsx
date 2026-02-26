
'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, ArrowRight, Zap, Target } from 'lucide-react';
import { Card } from '@/components/ui/Cards';
import { MarketingButton } from '@/components/ui/MarketingButton';

export function AIInsightShowcase() {
    return (
        <section className="py-24 md:py-48 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-accent/10 rounded-full blur-[100px] md:blur-[160px] opacity-40 -z-10" />

            <div className="container mx-auto px-6 md:px-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-32">
                    <div className="flex-1 space-y-8 md:space-y-10 order-2 lg:order-1 text-center lg:text-left">
                        <div className="space-y-4 md:space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">
                                <Brain size={14} className="md:size-4" /> SMART AI ASSISTANT
                            </div>
                            <h3 className="text-3xl sm:text-4xl md:text-7xl font-black font-heading uppercase tracking-tighter leading-[0.95] md:leading-[0.9] text-white">
                                INSIGHTS YOU <br />
                                <span className="italic text-accent">CAN ACTUALLY USE</span>
                            </h3>
                        </div>
                        <p className="text-base md:text-xl text-muted-foreground font-medium opacity-80 leading-relaxed italic max-w-2xl mx-auto lg:mx-0">
                            Our AI doesn't just list numbers. It understands your habits. It spots when you're overspending on small things and helps you move that money toward your big goals instead.
                        </p>
                        <ul className="space-y-4 md:space-y-6 inline-block md:block text-left">
                            {[
                                { icon: Zap, label: 'Unnecessary spending alerts' },
                                { icon: Target, label: 'Automatic goal funding' },
                                { icon: Sparkles, label: 'Smart savings predictions' }
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white italic"
                                >
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                        <item.icon size={16} className="md:size-5" />
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
                            className="relative group p-[1px] rounded-[32px] md:rounded-[48px] overflow-hidden"
                        >
                            {/* Animated Border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary animate-shimmer" style={{ backgroundSize: '200% 200%' }} />

                            <Card className="relative p-6 md:p-12 bg-black border-none rounded-[31px] md:rounded-[47px] space-y-8 md:space-y-10 group-hover:scale-[0.99] transition-transform duration-700">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-primary italic">Smart Insight</h4>
                                    <div className="text-[8px] md:text-[10px] font-black text-muted-foreground uppercase opacity-40">Recent Activity</div>
                                </div>

                                <div className="space-y-6 md:space-y-8">
                                    <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white/[0.03] border border-white/5 shadow-inner space-y-4 md:space-y-6">
                                        <blockquote className="text-lg md:text-3xl font-black font-heading text-white leading-snug tracking-tight">
                                            "EXCESS SPENDING DETECTED: UNUSUAL ACTIVITY AT 'STARBUCKS'.
                                            MOVE $15 TO YOUR 'NEW HOME' SAVINGS?"
                                        </blockquote>
                                        <div className="flex items-center gap-4">
                                            <div className="h-1.5 md:h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: '85%' }}
                                                    transition={{ delay: 0.5, duration: 1.5 }}
                                                    className="h-full bg-accent"
                                                />
                                            </div>
                                            <span className="text-[8px] md:text-[10px] font-black text-accent uppercase tracking-widest flex-shrink-0">Optimizing...</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 md:p-6 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 gap-4">
                                        <div className="flex items-center gap-3 md:gap-4 lg:min-w-0">
                                            <Zap size={18} className="text-primary animate-pulse flex-shrink-0 md:size-5" />
                                            <div className="min-w-0">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-primary opacity-60">Result</p>
                                                <p className="text-xs md:text-sm font-black text-white truncate">Reach your goal 2 days sooner</p>
                                            </div>
                                        </div>
                                        <MarketingButton size="sm" variant="ghost" className="p-0 border-none bg-transparent flex-shrink-0">
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
