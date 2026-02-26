
'use client';

import { motion } from 'framer-motion';
import { Layers, Target, Brain, ArrowRight } from 'lucide-react';

const steps = [
    {
        title: 'Connect Your Accounts',
        desc: 'Securely link your bank accounts through our encrypted API. Your transactions are synced and categorized instantly.',
        icon: Layers,
    },
    {
        title: 'Set Your Goals',
        desc: 'Tell us what you are saving for—whether it is a new home, a car, or just an emergency fund.',
        icon: Target,
    },
    {
        title: 'AI Saves You Money',
        desc: 'Our AI tracks your spending habits and helps you move small amounts of money toward your goals automatically.',
        icon: Brain,
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 md:py-48 relative overflow-hidden text-center lg:text-left">
            <div className="container mx-auto px-6 md:px-10">
                <div className="max-w-3xl mb-16 md:mb-32 space-y-4 md:space-y-6 mx-auto lg:mx-0">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">SIMPLE STEPS</h2>
                    <h3 className="text-4xl md:text-7xl font-black font-heading uppercase tracking-tighter leading-none text-white">HOW IT <br className="hidden sm:block" /> WORKS</h3>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-32">
                    {/* Animated Line for Desktop */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px bg-gradient-to-r from-primary/50 via-accent/50 to-secondary/50 -z-10" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="space-y-6 md:space-y-10 group"
                        >
                            <div className="relative inline-block lg:block">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-black border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2">
                                    <step.icon size={32} className="md:size-10" />
                                </div>
                                <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[8px] md:text-[10px] font-black text-white italic">
                                    0{i + 1}
                                </div>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <h4 className="text-xl md:text-2xl font-black font-heading text-white uppercase tracking-tight">{step.title}</h4>
                                <p className="text-xs md:text-sm font-medium leading-relaxed text-muted-foreground uppercase opacity-70 italic tracking-widest">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
