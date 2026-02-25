
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
    BarChart3,
    ArrowRight,
    Cpu,
    Lock,
    Globe
} from 'lucide-react';
import { Card } from '@/components/ui/Cards';
import { MarketingButton } from '@/components/ui/MarketingButton';

const detailedFeatures = [
    {
        id: 'pots',
        title: 'Strategic Pot System',
        subtitle: 'Capital Accumulation Nodes',
        desc: 'Traditional accounts are static. Strategic Pots are active entities within your financial ecosystem. They reflect your long-term mission parameters—be it real estate, venture reserves, or life-extension buffers.',
        icon: Target,
        color: 'primary',
        stats: ['Unlimited Sub-nodes', 'Real-time Balancing', 'Warp Integration']
    },
    {
        id: 'ai',
        title: 'Cortex Neural Engine',
        subtitle: 'The Auditor of Truth',
        desc: 'Our AI doesn\'t just categorize; it audits the intent behind every capital movement. By mapping your behavioural drift against mission objectives, the Cortex engine can predict and prevent subsystem failure.',
        icon: Brain,
        color: 'accent',
        stats: ['99.8% Indexing Accuracy', 'Behavioural Drift Guard', 'Predictive Modeling']
    },
    {
        id: 'income',
        title: 'Income Intelligence',
        subtitle: 'Multi-Vault Synchronisation',
        desc: 'Manage multiple income flows through a single neural interface. Whether it\'s traditional salary, venture dividends, or decentralised assets, Æquitas provides a unified audit of your capital entrance.',
        icon: Globe,
        color: 'secondary',
        stats: ['150+ Currency Support', 'Multi-vault Aggregation', 'Real-time Velocity']
    },
    {
        id: 'discipline',
        title: 'Financial Discipline Score',
        subtitle: 'The Quotient of Sovereignty',
        desc: 'Quantify your ability to maintain mission parameters. The Discipline Score is a real-time index of your capital efficiency, derived from behavioural patterns and goal adherence velocity.',
        icon: Zap,
        color: 'primary',
        stats: ['Dynamic Scoring', 'Historical Benchmarking', 'Alpha Projection']
    }
];

export default function FeaturesPage() {
    return (
        <div className="bg-[#02040a] min-h-screen pt-40">
            <div className="container mx-auto px-6 md:px-10">
                {/* Hero */}
                <div className="text-center max-w-5xl mx-auto mb-48 space-y-10">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent italic">Intelligence Architecture</h2>
                    <h1 className="text-6xl md:text-9xl font-black font-poppins uppercase tracking-tighter leading-[0.8] text-white">THE PLATFORM <br /> <span className="text-primary italic">PROTOCOL</span></h1>
                    <p className="text-xl text-muted-foreground font-medium uppercase tracking-[0.2em] italic max-w-3xl mx-auto opacity-70">
                        Deep dive into the neural infrastructure powering the next generation of financial sovereigns.
                    </p>
                </div>

                {/* Detailed Sections */}
                <div className="space-y-64 pb-48">
                    {detailedFeatures.map((feature, i) => (
                        <motion.section
                            key={feature.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col lg:flex-row items-center gap-24 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 space-y-10">
                                <div className="space-y-6">
                                    <div className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-${feature.color}/20 bg-${feature.color}/5 backdrop-blur-md text-${feature.color} text-[10px] font-black uppercase tracking-[0.4em]`}>
                                        <feature.icon size={16} /> {feature.subtitle}
                                    </div>
                                    <h3 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter leading-none text-white">{feature.title}</h3>
                                </div>
                                <p className="text-xl text-muted-foreground font-medium opacity-80 leading-relaxed italic border-l-2 border-white/5 pl-8">
                                    {feature.desc}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {feature.stats.map((stat, j) => (
                                        <div key={j} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/50 text-center">
                                            {stat}
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-6">
                                    <MarketingButton href="/register" icon={<ArrowRight size={20} />}>
                                        Initialize {feature.title.split(' ')[0]}
                                    </MarketingButton>
                                </div>
                            </div>

                            {/* Visual Mock-up Area */}
                            <div className="flex-1 w-full relative">
                                <div className={`absolute inset-0 bg-${feature.color}/10 rounded-full blur-[120px] -z-10 opacity-30`} />
                                <motion.div
                                    whileHover={{ scale: 1.02, rotateY: i % 2 === 0 ? 5 : -5 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <Card className="p-0 border-white/10 bg-black/40 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                                        <div className="bg-white/5 p-4 border-b border-white/5 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-400/20" />
                                                <div className="w-2 h-2 rounded-full bg-yellow-400/20" />
                                                <div className="w-2 h-2 rounded-full bg-green-400/20" />
                                            </div>
                                            <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em] italic">System Audit Mode</div>
                                        </div>
                                        <div className="p-10 space-y-8">
                                            {/* Abstract UI elements mimicking the feature */}
                                            <div className="flex items-center justify-between">
                                                <div className="w-32 h-4 bg-white/5 rounded-full" />
                                                <div className="w-10 h-10 rounded-lg bg-white/5" />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="h-2 bg-white/5 rounded-full w-full" />
                                                <div className="h-2 bg-white/5 rounded-full w-[80%]" />
                                                <div className="h-2 bg-white/5 rounded-full w-[60%]" />
                                            </div>
                                            <div className="pt-10 flex gap-4">
                                                <div className={`h-24 flex-1 rounded-2xl bg-${feature.color}/5 border border-${feature.color}/10 animate-pulse`} />
                                                <div className="h-24 flex-1 rounded-2xl bg-white/[0.02] border border-white/5" />
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Final Architecture CTA */}
                <section className="py-48 text-center space-y-12">
                    <div className="inline-flex items-center gap-4 px-8 py-4 rounded-3xl bg-white/5 border border-white/10 text-white group cursor-default">
                        <Cpu className="text-primary group-hover:rotate-180 transition-transform duration-1000" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] font-poppins italic">System Core Status: Fully Operational</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter leading-none text-white italic">
                        BUILD ON THE <br /> <span className="text-primary italic">ELITE INFRASTRUCTURE</span>
                    </h2>
                    <div className="pt-8">
                        <MarketingButton href="/register" size="lg" icon={<ArrowRight size={24} />}>
                            GET STARTED NOW
                        </MarketingButton>
                    </div>
                </section>
            </div>
        </div>
    );
}
