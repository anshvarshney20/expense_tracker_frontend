
'use client';

import { Sparkles, Brain, TrendingUp, AlertTriangle, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from './Cards';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AIAnalysis } from '@/lib/types';

interface AIInsightCardProps {
    analysis?: AIAnalysis;
    isLoading?: boolean;
}

export function AIInsightCard({ analysis, isLoading }: AIInsightCardProps) {
    return (
        <Card className="h-full border-primary/10 bg-gradient-to-br from-primary/[0.03] to-transparent overflow-hidden">
            {/* AI Scanning Animation Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        y: ["0%", "100%", "0%"],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-[2px] bg-primary blur-[4px]"
                />
            </div>

            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Brain size={24} className="animate-pulse" />
                </div>
                <div>
                    <h3 className="text-xl font-black font-outfit text-white tracking-tight uppercase leading-none">Cortex Insight</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                            <ShieldCheck size={10} className="text-primary" />
                            <span className="text-[9px] font-black uppercase tracking-wider text-primary">Active Analysis</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {isLoading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 w-1/3 bg-white/5 animate-pulse rounded" />
                                <div className="h-12 w-full bg-white/5 animate-pulse rounded-2xl" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group"
                        >
                            <div className="flex items-center gap-2 text-primary mb-3">
                                <Zap size={14} className="fill-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Immediate Action</span>
                            </div>
                            <p className="text-sm font-medium text-white italic leading-relaxed group-hover:text-primary transition-colors">
                                "{analysis?.savings_tip || "Calibrating financial patterns for optimal delta extraction..."}"
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-4 rounded-3xl bg-white/[0.01] border border-white/5"
                            >
                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-2 opacity-50">Discipline Score</span>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-black font-outfit text-white leading-none">{analysis?.discipline_score || 0}</span>
                                    <span className="text-[10px] font-black text-primary mb-1">/ 100</span>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="p-4 rounded-3xl bg-white/[0.01] border border-white/5"
                            >
                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-2 opacity-50">Savings Rate</span>
                                <div className="flex items-end gap-1">
                                    <span className="text-3xl font-black font-outfit text-white leading-none">{((analysis?.savings_rate || 0) * 100).toFixed(1)}</span>
                                    <span className="text-[10px] font-black text-primary mb-1">%</span>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-5 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent"
                        >
                            <div className="flex items-center gap-2 text-accent mb-3">
                                <TrendingUp size={14} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Projected Impact</span>
                            </div>
                            <p className="text-xs font-bold text-muted-foreground leading-relaxed uppercase opacity-80">
                                {analysis?.timeline_impact || "Predictive timeline updates based on real-time capital velocities."}
                            </p>
                        </motion.div>

                        <button className="w-full py-4 mt-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-primary hover:text-black transition-all group">
                            Full Cognitive Audit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </>
                )}
            </div>
        </Card>
    );
}
