
'use client';

import { motion } from 'framer-motion';
import { MarketingButton } from '@/components/ui/MarketingButton';
import { ArrowRight, Target, Shield, Zap } from 'lucide-react';

export function FinalCTA() {
    return (
        <section className="py-32 md:py-64 relative overflow-hidden bg-[#02040a]">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[1200px] md:h-[600px] bg-primary/20 rounded-full blur-[80px] md:blur-[200px] -z-10 animate-pulse opacity-30" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container mx-auto px-6 md:px-10 text-center relative z-10">
                <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 md:space-y-8"
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-[140px] font-black font-heading tracking-tighter leading-[0.95] md:leading-[0.8] text-white italic uppercase px-4 md:px-0">
                            READY TO <br /> <span className="text-primary italic animate-shimmer">START?</span>
                        </h2>
                        <p className="text-base md:text-3xl text-muted-foreground font-medium opacity-80 uppercase tracking-widest md:tracking-[0.2em] italic leading-relaxed max-w-3xl mx-auto">
                            Join thousands of users who have automated their savings.
                            Take control of your financial future today with AI.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8"
                    >
                        <MarketingButton href="/register" size="lg" className="w-full sm:w-auto h-20 md:h-24 px-10 md:px-16 text-base md:text-lg" icon={<Target size={24} />}>
                            Get Started for Free
                        </MarketingButton>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-16 md:pt-24 border-t border-white/[0.03]">
                        {[
                            { icon: Shield, label: 'Secure Encryption' },
                            { icon: Zap, label: 'Real-time syncing' },
                            { icon: Target, label: 'Smart savings active' }
                        ].map((node, i) => (
                            <div key={i} className="flex items-center justify-center gap-3 md:gap-4 text-[9px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/40 italic">
                                <node.icon size={14} className="md:size-4" />
                                {node.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
