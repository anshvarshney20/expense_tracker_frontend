
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Calendar, Zap, ArrowRight, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Cards';
import { MarketingButton } from '@/components/ui/MarketingButton';

export function GoalSimulator() {
    const [monthlySavings, setMonthlySavings] = useState(2500);
    const [targetAmount, setTargetAmount] = useState(150000);

    const stats = useMemo(() => {
        const monthsBase = targetAmount / monthlySavings;
        const monthsAI = monthsBase * 0.58; // 42% acceleration
        return {
            standard: Math.round(monthsBase),
            accelerated: Math.round(monthsAI),
            saved: Math.round(monthsBase - monthsAI)
        };
    }, [monthlySavings, targetAmount]);

    return (
        <section className="py-24 md:py-48 bg-gradient-to-b from-black to-[#050505]">
            <div className="container mx-auto px-6 md:px-10">
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-32 space-y-6 md:space-y-8">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary italic">SMART PLANNING</h2>
                    <h3 className="text-4xl sm:text-5xl md:text-8xl font-black font-heading uppercase tracking-tighter leading-none text-white">PLAN YOUR <br className="hidden sm:block" /> FINANCIAL FUTURE</h3>
                    <p className="text-sm md:text-lg text-muted-foreground font-medium uppercase tracking-[0.2em] italic opacity-60">
                        Adjust your savings and see how our AI helps you reach your goals much faster.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-stretch">
                    {/* Controls */}
                    <Card className="p-8 md:p-12 bg-white/[0.02] border-white/5 space-y-10 md:space-y-12 h-full">
                        <div className="space-y-8">
                            <div className="space-y-5 md:space-y-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white italic">Savings Goal</label>
                                    <span className="text-2xl md:text-4xl font-black font-heading text-white tracking-widest leading-none">${targetAmount.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="1000000"
                                    step="10000"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            <div className="space-y-5 md:space-y-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white italic">Monthly Savings</label>
                                    <span className="text-2xl md:text-4xl font-black font-heading text-primary leading-none">${monthlySavings.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="500"
                                    max="20000"
                                    step="500"
                                    value={monthlySavings}
                                    onChange={(e) => setMonthlySavings(Number(e.target.value))}
                                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                        </div>

                        <div className="pt-8 md:pt-12 border-t border-white/5 space-y-6">
                            <div className="flex items-center gap-4 p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                <Shield className="text-muted-foreground opacity-30 flex-shrink-0" size={24} />
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground leading-relaxed">
                                    Simulations are based on average user savings and AI-powered budget optimization results.
                                </p>
                            </div>
                            <MarketingButton className="w-full" size="lg" icon={<ArrowRight size={20} />}>
                                Calculate My Savings
                            </MarketingButton>
                        </div>
                    </Card>

                    {/* Visualisation */}
                    <div className="space-y-8 md:space-y-10 flex flex-col justify-between">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                            <Card className="p-8 md:p-10 border-white/5 space-y-4">
                                <TrendingUp className="text-muted-foreground opacity-30 mb-2 size-6 md:size-8" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Normal Path</h4>
                                <div className="space-y-1 md:space-y-2">
                                    <p className="text-4xl md:text-5xl font-black font-heading text-white leading-none">{stats.standard}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 italic">Months to Reach Goal</p>
                                </div>
                            </Card>
                            <Card className="p-8 md:p-10 border-primary/20 bg-primary/5 space-y-4 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-3 md:p-4">
                                    <Zap className="text-primary animate-pulse size-6 md:size-8" />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary italic">AI Optimized Path</h4>
                                <div className="space-y-1 md:space-y-2">
                                    <p className="text-5xl md:text-6xl font-black font-heading text-white leading-none tracking-tighter shadow-primary/20 drop-shadow-2xl">{stats.accelerated}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white opacity-60 italic">Months to Reach Goal</p>
                                </div>
                                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-black text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                                    42% Faster goal completion
                                </div>
                            </Card>
                        </div>

                        <Card className="flex-1 p-8 md:p-12 bg-black border-white/10 flex flex-col justify-center space-y-8 md:space-y-10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 -z-10" />
                            <div className="text-center space-y-3 md:space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white opacity-40 italic">Predicted Savings Over Time</h4>
                                <p className="text-5xl sm:text-6xl md:text-8xl font-black font-heading tracking-tighter text-white">
                                    SAVE <span className="text-primary italic animate-shimmer">{stats.saved}</span><span className="text-2xl md:text-4xl text-muted-foreground uppercase tracking-widest ml-3 md:ml-4">Months</span>
                                </p>
                            </div>
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex justify-between text-[8px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                    <span>Goal Progress</span>
                                    <span>{((stats.standard - stats.accelerated) / stats.standard * 100).toFixed(0)}% acceleration</span>
                                </div>
                                <div className="h-3 md:h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((stats.standard - stats.accelerated) / stats.standard * 100)}%` }}
                                        transition={{ duration: 2, ease: "circOut" }}
                                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
