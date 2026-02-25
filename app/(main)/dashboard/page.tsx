
'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
// @ts-ignore
import { toast } from 'sonner';
import {
    Receipt,
    Target,
    TrendingUp,
    Zap,
    ArrowUpRight,
    Plus,
    Loader2,
    Calendar,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import { StatCard, Card } from '@/components/ui/Cards';
import { AIInsightCard } from '@/components/ui/AIInsightCard';
import { PageHeader } from '@/components/layout/PageHeader';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { cn, formatCurrency } from '@/lib/utils';
import { useExpenses, useMonthlySummary, usePots, useAIAnalysis } from '@/hooks/useFinancialData';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import Link from 'next/link';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function DashboardPage() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const currency = user?.currency || 'USD';

    const { data: summary, isLoading: isSummaryLoading, error: summaryError, refetch: refetchSummary } = useMonthlySummary(currentYear, currentMonth);
    const { data: pots, isLoading: isPotsLoading, refetch: refetchPots } = usePots();
    const { data: recentExpenses, isLoading: isExpensesLoading, refetch: refetchExpenses } = useExpenses({ limit: 5 });
    const { data: aiAnalysis, isLoading: isAILoading, refetch: refetchAI } = useAIAnalysis();

    const handleSync = async () => {
        setIsLoading(true);
        try {
            await Promise.all([
                refetchSummary(),
                refetchPots(),
                refetchExpenses(),
                refetchAI()
            ]);
            toast.success('Synchronization successful.', {
                description: 'All nodes have been updated with the latest ledger parameters.',
            });
        } catch (err: any) {
            toast.error('Synchronization failed.', {
                description: err || 'The system could not establish a clean handshake with the data node.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const chartData = summary?.category_breakdown ?
        Object.entries(summary.category_breakdown).map(([name, amount]) => ({
            name,
            amount: Number(amount)
        })) :
        [];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12 pb-24"
        >
            <PageHeader
                title="Financial Overview"
                subtitle="Track your balance, spending, and savings goals in real-time."
                action={
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleSync}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-6 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50 group"
                        >
                            <Zap size={18} className={cn("text-primary", isLoading && "animate-pulse")} />
                            {isLoading ? 'Syncing...' : 'Sync Node'}
                        </button>
                        <Link
                            href="/expenses"
                            className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 group"
                        >
                            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                            Add Expense
                        </Link>
                    </div>
                }
            />

            {/* Stats Grid */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    label="Monthly Spending"
                    value={isSummaryLoading ? "---" : formatCurrency(Number(summary?.total_amount || 0), currency)}
                    subValue={isSummaryLoading ? undefined : `${summary?.count || 0} Transactions`}
                    icon={Receipt}
                    color="primary"
                    isLoading={isSummaryLoading}
                />
                <StatCard
                    label="Savings Rate"
                    value={isAILoading ? "---" : `${((aiAnalysis?.savings_rate || 0) * 100).toFixed(1)}%`}
                    icon={TrendingUp}
                    color="secondary"
                    isLoading={isAILoading}
                />
                <StatCard
                    label="Total Savings"
                    value={isPotsLoading ? "---" : formatCurrency(
                        pots?.reduce((acc, pot) => acc + Number(pot.current_amount), 0) || 0,
                        currency
                    )}
                    icon={Target}
                    color="accent"
                    isLoading={isPotsLoading}
                />
                <StatCard
                    label="Managed Volume"
                    value={isSummaryLoading ? "---" : formatCurrency(Number(summary?.lifetime_total || 0), currency)}
                    subValue="Lifetime Aggregate"
                    icon={Sparkles}
                    color="primary"
                    isLoading={isSummaryLoading}
                />
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Main Chart */}
                <motion.div variants={item} className="xl:col-span-2">
                    <Card className="h-full border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
                            <div>
                                <h3 className="text-2xl font-black font-poppins text-white tracking-tight uppercase">Spending Breakdown</h3>
                                <p className="text-xs font-bold text-muted-foreground tracking-widest uppercase mt-1 opacity-60">Distribution across categories</p>
                            </div>
                            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 self-start">
                                <button className="px-5 py-2 rounded-lg bg-white/10 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">Current Month</button>
                            </div>
                        </div>

                        <div className="h-[350px] w-full mt-4">
                            {isSummaryLoading ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Loader2 className="animate-spin text-primary opacity-20" size={40} />
                                </div>
                            ) : chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }}
                                            dy={15}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#0a0a0a',
                                                borderRadius: '24px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                                                padding: '16px',
                                            }}
                                            itemStyle={{ color: '#10b981', fontWeight: 900, fontSize: '14px' }}
                                            labelStyle={{ color: '#71717a', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorAmount)"
                                            animationDuration={2500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-white/5 rounded-[32px]">
                                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs opacity-50 italic">Sector data pending synchronization...</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>

                {/* AI Insight Section */}
                <motion.div variants={item} className="xl:col-span-1">
                    <AIInsightCard analysis={aiAnalysis || undefined} isLoading={isAILoading} />
                </motion.div>
            </div>

            {/* Recent Activity List */}
            <motion.div variants={item}>
                <Card className="p-0 border-white/5 overflow-hidden">
                    <div className="p-8 md:p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                        <div>
                            <h3 className="text-2xl font-black font-poppins text-white uppercase tracking-tighter">Recent Expenses</h3>
                            <p className="text-xs font-bold text-muted-foreground tracking-[0.2em] uppercase mt-1 opacity-60 italic">Your latest financial activity</p>
                        </div>
                        <Link href="/expenses" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all group">
                            View All Expenses <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/5">
                        {isExpensesLoading ? (
                            <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary/20" /></div>
                        ) : (
                            recentExpenses?.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                                    className="flex items-center justify-between p-6 px-10 transition-colors group cursor-default"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500 border border-transparent group-hover:border-primary/20"
                                        )}>
                                            <Receipt size={20} />
                                        </div>
                                        <div>
                                            <p className="font-black text-white text-lg tracking-tight group-hover:translate-x-1 transition-transform duration-500">{item.title}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">{item.category}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase">{format(new Date(item.date), 'MMM dd, yyyy')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black font-poppins text-xl text-white">
                                            -{formatCurrency(item.amount, currency)}
                                        </p>
                                        <p className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground opacity-40 mt-1">Ref ID: {item.id.slice(0, 8)}</p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                        {!isExpensesLoading && recentExpenses?.length === 0 && (
                            <div className="p-20 text-center">
                                <p className="text-muted-foreground font-black uppercase tracking-widest text-xs opacity-50 italic">No expenses recorded in the current period.</p>
                            </div>
                        )}
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
}
