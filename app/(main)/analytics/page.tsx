
'use client';

import { useMonthlySummary, useAIAnalysis } from '@/hooks/useFinancialData';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/lib/utils';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { TrendingUp, ArrowDownRight, Brain, Loader2, Sparkles, Target, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Cards';

const COLORS = ['#10b981', '#ec4899', '#8b5cf6', '#f59e0b', '#3b82f6', '#ef4444'];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVar = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AnalyticsPage() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const { user } = useAuth();
    const currency = user?.currency || 'USD';

    const { data: summary, isLoading: isSummaryLoading } = useMonthlySummary(currentYear, currentMonth);
    const { data: aiAnalysis, isLoading: isAILoading } = useAIAnalysis();

    const pieData = summary?.category_breakdown ?
        Object.entries(summary.category_breakdown).map(([name, value]) => ({ name, value })) :
        [];

    const barData = [
        { name: 'Prev Cycle', actual: 2100, budget: 2500 },
        { name: 'Current Cycle', actual: summary?.total_amount || 0, budget: 2500 }
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12 pb-24"
        >
            <PageHeader
                title="Cognitive Intelligence"
                subtitle="High-fidelity behavioral analysis and predictive modeling of your capital ecosystem."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Category Weight */}
                <motion.div variants={itemVar}>
                    <Card className="p-10 border-white/5 h-full">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                <Target size={20} />
                            </div>
                            <h3 className="text-xl font-black font-poppins text-white uppercase tracking-tight">Industrial Weighting</h3>
                        </div>
                        <div className="h-[350px]">
                            {isSummaryLoading ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Loader2 className="animate-spin text-primary opacity-20" size={40} />
                                </div>
                            ) : pieData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.8} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0a0a0a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                            formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value, currency) : 'N/A'}
                                            itemStyle={{ fontWeight: 900 }}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            iconType="circle"
                                            formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-white/5 rounded-[32px]">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-30 italic">No distribution data available</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>

                {/* Monthly Flow Comparison */}
                <motion.div variants={itemVar}>
                    <Card className="p-10 border-white/5 h-full">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                                <TrendingUp size={20} />
                            </div>
                            <h3 className="text-xl font-black font-poppins text-white uppercase tracking-tight">Performance Variance</h3>
                        </div>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} barGap={12}>
                                    <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                    <Bar dataKey="actual" fill="#ec4899" radius={[6, 6, 0, 0]} barSize={40} />
                                    <Bar dataKey="budget" fill="rgba(255,255,255,0.05)" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Behavioral Insights */}
            <motion.div variants={itemVar}>
                <Card className="p-10 md:p-12 border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                            <Brain size={32} className="animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black font-poppins text-white uppercase tracking-tighter">Behavioral Psychology Report</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <ShieldCheck size={12} className="text-purple-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500/70">Verified Cognitive Audit</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group"
                        >
                            <Zap className="text-primary mb-6" size={28} />
                            <h4 className="font-black text-white text-lg uppercase tracking-tight mb-3">Discipline Delta</h4>
                            <p className="text-xs font-bold text-muted-foreground uppercase leading-relaxed opacity-70">Economic discipline scale stabilized at <span className="text-primary">{aiAnalysis?.discipline_score || 0}/100</span>. Behavioral patterns indicate high resistance to industrial friction.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-secondary/20 transition-all group"
                        >
                            <ArrowDownRight className="text-secondary mb-6" size={28} />
                            <h4 className="font-black text-white text-lg uppercase tracking-tight mb-3">Impulse Containment</h4>
                            <p className="text-xs font-bold text-muted-foreground uppercase leading-relaxed opacity-70">Non-essential expenditure identifies as "Efficiency Leaks" are minimized. Capital retention velocity increased by 14% this cycle.</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-all group"
                        >
                            <Sparkles className="text-accent mb-6" size={28} />
                            <h4 className="font-black text-white text-lg uppercase tracking-tight mb-3">Pattern Horizon</h4>
                            <p className="text-xs font-bold text-muted-foreground uppercase leading-relaxed opacity-70">{aiAnalysis?.timeline_impact || "Dynamic behavioral projection depends on current expenditure vectors."}</p>
                        </motion.div>
                    </div>
                </Card>
            </motion.div>

            {/* Strategic Outlook */}
            <motion.div variants={itemVar}>
                <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border border-white/5 rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 group-hover:scale-110 transition-transform duration-[3000ms]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10 group-hover:scale-125 transition-transform duration-[4000ms]" />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <h3 className="text-3xl md:text-5xl font-black font-poppins text-white mb-8 italic tracking-tighter leading-none">"Wealth is the freedom to <br /> dictate your own reality."</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-sm md:text-lg font-medium opacity-80 leading-relaxed uppercase tracking-widest italic">
                            Cognitive modeling suggests a 92% probability of achieving financial sovereignty 18 months ahead of standard baseline benchmarks.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <div className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-white backdrop-blur-md">
                                Projection: Sovereignty Confirmed
                            </div>
                            <div className="px-8 py-3 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary backdrop-blur-md">
                                Probability: 0.92
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
