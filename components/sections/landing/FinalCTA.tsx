
'use client';

import { motion } from 'framer-motion';
import { MarketingButton } from '@/components/ui/MarketingButton';
import { ArrowRight, Target, Shield, Zap } from 'lucide-react';

export function FinalCTA() {
    return (
        <section className="py-64 relative overflow-hidden bg-[#02040a]">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/20 rounded-full blur-[200px] -z-10 animate-pulse opacity-30" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container mx-auto px-6 md:px-10 text-center relative z-10">
                <div className="max-w-5xl mx-auto space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-7xl md:text-[140px] font-black font-poppins tracking-tighter leading-[0.8] text-white italic">
                            READY FOR <br /> <span className="text-primary italic animate-shimmer">TAKEOFF?</span>
                        </h2>
                        <p className="text-xl md:text-3xl text-muted-foreground font-medium opacity-80 uppercase tracking-[0.2em] italic leading-relaxed max-w-3xl mx-auto">
                            The infrastructure is established. The nodes are ready.
                            Your secondary life as a high-performance sovereign begins today.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-8"
                    >
                        <MarketingButton href="/register" size="lg" className="h-24 px-16 text-lg" icon={<Target size={24} />}>
                            Initialize System
                        </MarketingButton>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-24 border-t border-white/[0.03]">
                        {[
                            { icon: Shield, label: 'Secured by ZK-Proof' },
                            { icon: Zap, label: 'Real-time synchronization' },
                            { icon: Target, label: 'Warp protocol active' }
                        ].map((node, i) => (
                            <div key={i} className="flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-white/40 italic">
                                <node.icon size={16} />
                                {node.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
