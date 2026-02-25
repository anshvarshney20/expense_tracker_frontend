
'use client';

import { motion } from 'framer-motion';
import { Layers, Target, Brain, ArrowRight } from 'lucide-react';

const steps = [
    {
        title: 'Initialize Nodes',
        desc: 'Connect your industrial flow through secure neural bank APIs. Income and movement data is encrypted and indexed instantly.',
        icon: Layers,
    },
    {
        title: 'Define Strategic Pots',
        desc: 'Establish your capital accumulation objectives. Real estate, venture, or emergency buffers—your pots are your mission parameters.',
        icon: Target,
    },
    {
        title: 'AI Warp Execution',
        desc: 'Our Cortex engine monitors behavioural drift and redirects subsystem leaks to accelerate your projected completion by up to 42%.',
        icon: Brain,
    }
];

export function HowItWorks() {
    return (
        <section className="py-48 relative overflow-hidden text-center lg:text-left">
            <div className="container mx-auto px-6 md:px-10">
                <div className="max-w-3xl mb-32 space-y-6 mx-auto lg:mx-0">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">Operational Protocol</h2>
                    <h3 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter leading-none text-white">THE AEQUITAS <br /> WORKFLOW</h3>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-32">
                    {/* Animated Line for Desktop */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px bg-gradient-to-r from-primary/50 via-accent/50 to-secondary/50 -z-10" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="space-y-10 group"
                        >
                            <div className="relative">
                                <div className="w-24 h-24 rounded-3xl bg-black border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2">
                                    <step.icon size={40} />
                                </div>
                                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white italic">
                                    0{i + 1}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-2xl font-black font-poppins text-white uppercase tracking-tight">{step.title}</h4>
                                <p className="text-sm font-medium leading-relaxed text-muted-foreground uppercase opacity-70 italic tracking-widest">
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
