
'use client';

import { motion } from 'framer-motion';
import { Target, Shield, Zap, Brain, Globe, Cpu, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Cards';
import { MarketingButton } from '@/components/ui/MarketingButton';

const values = [
    {
        title: 'Capital Sovereignty',
        desc: 'We believe the individual should have ultimate authority and oversight over their capital flows, free from the friction of traditional tracking.',
        icon: Shield
    },
    {
        title: 'Neural Efficiency',
        desc: 'The difference between linear tracking and neural auditing is 42%. We optimize your future by auditing your behavioural drift.',
        icon: Brain
    },
    {
        title: 'Global Connectivity',
        desc: 'Intelligence knows no borders. Our infrastructure synchronises with over 150 currencies and thousands of global financial nodes.',
        icon: Globe
    }
];

export default function AboutPage() {
    return (
        <div className="bg-[#02040a] min-h-screen pt-40">
            <div className="container mx-auto px-6 md:px-10">
                {/* Mission Section */}
                <div className="flex flex-col lg:flex-row items-center gap-32 mb-64">
                    <div className="flex-1 space-y-12">
                        <div className="space-y-6 text-center lg:text-left">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">The Manifesto</h2>
                            <h1 className="text-6xl md:text-8xl font-black font-poppins uppercase tracking-tighter leading-none text-white">THE ARCHITECTS OF <br /> <span className="text-accent italic">SOVEREIGNTY</span></h1>
                        </div>
                        <p className="text-xl md:text-2xl text-muted-foreground font-medium opacity-80 leading-relaxed italic max-w-2xl border-l-2 border-primary/20 pl-8">
                            Æquitas was founded on a singular premise: Traditional personal finance is broken.
                            It focuses on the past—the log, the history, the failure.
                            We built an intelligence layer that focuses on the future—the optimization, the warp, THE GOAL.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white italic">Mission: Alpha Acceleration</div>
                            <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white italic">Infrastructure: Neural Cortex v2.0</div>
                        </div>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-[140px] -z-10 opacity-30" />
                        <Card className="p-0 border-white/10 overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-1000 bg-black/40">
                            <div className="p-16 space-y-10">
                                <Cpu className="text-primary animate-spin-slow" size={48} />
                                <h3 className="text-4xl font-black font-poppins text-white uppercase tracking-tighter italic">"THE FUTURE ISN'T LOGGED. <br /> IT'S CALCULATED."</h3>
                                <div className="space-y-4">
                                    <div className="h-1 bg-white/5 rounded-full w-full" />
                                    <div className="h-1 bg-white/5 rounded-full w-[80%]" />
                                    <div className="h-1 bg-primary/20 rounded-full w-[40%] animate-pulse" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Values Grid */}
                <section className="mb-64">
                    <div className="text-center mb-32 space-y-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent italic">Core Directives</h2>
                        <h3 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter">OUR ARCHITECTURE</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {values.map((v, i) => (
                            <Card key={i} className="p-12 space-y-10 border-white/5 group bg-white/[0.01]">
                                <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-inner">
                                    <v.icon size={36} />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-3xl font-black font-poppins text-white uppercase tracking-tight">{v.title}</h4>
                                    <p className="text-sm font-medium leading-relaxed text-muted-foreground uppercase opacity-60 italic tracking-widest">
                                        {v.desc}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="mb-64">
                    <div className="text-center mb-32 space-y-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary italic">Evolutionary Log</h2>
                        <h3 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter">PROTOCOL TIMELINE</h3>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-10">
                        {[
                            { year: '2024', event: 'Initial Seed: The first neural ledger prototype is indexed.' },
                            { year: '2025', event: 'Phase 1: Cortex AI engine achieves 90% drift detection accuracy.' },
                            { year: '2026', event: 'Global Launch: Æquitas v2.0 goes live for the elite sovereign community.' }
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-center gap-12 group"
                            >
                                <div className="text-4xl font-black font-poppins text-primary italic opacity-20 group-hover:opacity-100 transition-opacity min-w-[120px]">
                                    {t.year}
                                </div>
                                <div className="h-px bg-white/10 flex-1 group-hover:bg-primary/50 transition-colors" />
                                <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors max-w-sm italic">
                                    {t.event}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Final About CTA */}
                <section className="py-48 text-center bg-white/[0.01] rounded-[64px] border border-white/5 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-secondary/5 rounded-full blur-[160px] -z-10" />
                    <div className="max-w-3xl mx-auto space-y-10">
                        <h2 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter leading-none text-white">JOIN THE <br /> <span className="text-secondary italic">INTELLECTUAL ELITE</span></h2>
                        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground opacity-60 italic">
                            Your journey towards absolute capital sovereignty begins here.
                            Initialize your protocol and audit your path.
                        </p>
                        <div className="pt-8">
                            <MarketingButton href="/register" size="lg" icon={<ArrowRight size={20} />}>
                                Initialize Protocol
                            </MarketingButton>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
