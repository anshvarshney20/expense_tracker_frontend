
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Target, ShieldCheck } from 'lucide-react';
import { MarketingButton } from '@/components/ui/MarketingButton';
import { Card } from '@/components/ui/Cards';

export function Hero() {
    return (
        <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] -z-10 opacity-70">
                <div className="absolute top-[-5%] left-[5%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 rounded-full blur-[80px] md:blur-[140px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-accent/20 rounded-full blur-[80px] md:blur-[140px] animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-6 md:px-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Content */}
                    <div className="flex-1 space-y-6 md:space-y-10 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 md:px-6 md:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] shadow-xl"
                        >
                            <Sparkles size={12} className="animate-spin-slow md:size-14" /> Smart Financial Intelligence Active
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tighter leading-[0.95] md:leading-[0.9] text-white uppercase"
                        >
                            MASTER YOUR <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent italic">MONEY MATTERS</span> <br />
                            WITH AI
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium opacity-80 italic"
                        >
                            Stop wasting hours on manual spreadsheets. Let our AI automate your tracking,
                            optimize your budget, and help you reach your goals faster than ever.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 pt-4"
                        >
                            <MarketingButton href="/register" size="lg" className="w-full sm:w-auto" icon={<ArrowRight size={20} />}>
                                Get Started
                            </MarketingButton>
                            <MarketingButton href="/about" variant="outline" className="w-full sm:w-auto" size="lg">
                                See How It Works
                            </MarketingButton>
                        </motion.div>
                    </div>

                    {/* Right Interactive Cards */}
                    <div className="flex-1 relative w-full max-w-xl mt-12 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, rotateY: 20, rotateX: 10, scale: 0.9 }}
                            animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="relative z-10 perspective-[1000px] px-4 sm:px-0"
                        >
                            {/* Main Display Card */}
                            <Card className="p-6 md:p-10 bg-black/40 backdrop-blur-[32px] border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />

                                <div className="space-y-8 md:space-y-10">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1.5">
                                            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                                                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                                                <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-primary italic">Live Tracking</p>
                                            </div>
                                            <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">Smart Dashboard</h3>
                                        </div>
                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
                                            <TrendingUp size={20} className="md:size-6" />
                                        </div>
                                    </div>

                                    <div className="p-5 md:p-8 rounded-[24px] md:rounded-[32px] bg-white/[0.02] border border-white/5 space-y-5 md:space-y-6 shadow-inner relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <TrendingUp size={60} />
                                        </div>
                                        <div className="flex items-center justify-between relative z-10">
                                            <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] italic">Current Progress</span>
                                            <span className="text-lg md:text-2xl font-black text-white tracking-tighter">94.8%</span>
                                        </div>
                                        <div className="relative h-2 md:h-3 bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '94.8%' }}
                                                transition={{ delay: 1, duration: 2, ease: "circOut" }}
                                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                                        <div className="p-4 md:p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors">
                                            <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Growth Rate</p>
                                            <p className="text-xl md:text-3xl font-black text-white tracking-tighter">+42%</p>
                                        </div>
                                        <div className="p-4 md:p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-colors">
                                            <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">Safe Savings</p>
                                            <p className="text-xl md:text-3xl font-black text-primary tracking-tighter leading-none">$12.4k</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Floating Auxiliary Cards */}
                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                    rotate: [0, 1, 0]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-6 md:-top-16 md:-right-16 z-20 group"
                            >
                                <Card className="p-4 md:p-6 bg-accent/[0.08] backdrop-blur-3xl border-accent/20 shadow-2xl shadow-accent/5 transition-all duration-500 hover:bg-accent/20 hover:scale-105">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent shadow-inner">
                                            <Target size={20} className="md:size-6" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-accent/80 italic">Recent Goal</p>
                                            <p className="text-xs md:text-base font-black text-white uppercase tracking-tight">New Home</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div
                                animate={{
                                    y: [0, 8, 0],
                                    rotate: [0, -1, 0]
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-8 -left-6 md:-bottom-12 md:-left-16 z-20 group"
                            >
                                <Card className="p-4 md:p-6 bg-secondary/[0.08] backdrop-blur-3xl border-secondary/20 shadow-2xl shadow-secondary/5 transition-all duration-500 hover:bg-secondary/20 hover:scale-105">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shadow-inner">
                                            <ShieldCheck size={20} className="md:size-6" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-secondary/80 italic">Security Status</p>
                                            <p className="text-xs md:text-base font-black text-white uppercase tracking-tight">Fully Encrypted</p>
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
