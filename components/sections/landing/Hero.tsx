
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Target, ShieldCheck } from 'lucide-react';
import { MarketingButton } from '@/components/ui/MarketingButton';
import { Card } from '@/components/ui/Cards';

export function Hero() {
    return (
        <section className="relative pt-40 pb-32 overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] -z-10 opacity-70">
                <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[140px] animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-6 md:px-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    {/* Left Content */}
                    <div className="flex-1 space-y-10 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-[0.4em] shadow-xl"
                        >
                            <Sparkles size={14} className="animate-spin-slow" /> AI Financial Insights Active
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl md:text-8xl font-black font-heading tracking-tighter leading-[0.9] text-white"
                        >
                            REACH YOUR <br />
                            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent italic">GOALS FASTER</span> <br />
                            WITH AI
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium opacity-80 italic"
                        >
                            Stop manually tracking every cent. Start optimizing your financial future.
                            The smartest way to manage expenses and grow your savings automatically.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4"
                        >
                            <MarketingButton href="/register" size="lg" icon={<ArrowRight size={20} />}>
                                Get Started
                            </MarketingButton>
                            <MarketingButton href="/about" variant="outline" size="lg">
                                See How It Works
                            </MarketingButton>
                        </motion.div>
                    </div>

                    {/* Right Interactive Cards */}
                    <div className="flex-1 relative w-full max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, rotateY: 20, rotateX: 10, scale: 0.9 }}
                            animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="relative z-10 perspective-[1000px]"
                        >
                            {/* Main Display Card */}
                            <Card className="p-10 bg-black/60 backdrop-blur-3xl border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">AI Review</p>
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Savings Analytics</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <TrendingUp size={24} />
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Savings Progress</span>
                                            <span className="text-lg font-black text-white">94.8%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '94.8%' }}
                                                transition={{ delay: 1, duration: 2 }}
                                                className="h-full bg-primary glow-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Growth</p>
                                            <p className="text-xl font-black text-white leading-none">+42%</p>
                                        </div>
                                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Total Saved</p>
                                            <p className="text-xl font-black text-primary leading-none">$12.4k</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Floating Auxiliary Cards */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-12 -right-12 z-20"
                            >
                                <Card className="p-6 py-4 bg-accent/20 border-accent/30 shadow-2xl min-w-[200px]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                                            <Target size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-accent opacity-70 leading-none">Top Goal</p>
                                            <p className="text-sm font-black text-white uppercase tracking-tight">Real Estate</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-8 -left-12 z-20"
                            >
                                <Card className="p-6 py-4 bg-secondary/10 border-secondary/20 shadow-2xl min-w-[200px]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-widest text-secondary opacity-70 leading-none">Secure Vault</p>
                                            <p className="text-sm font-black text-white uppercase tracking-tight">Data Protected</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
