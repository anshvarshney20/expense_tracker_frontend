
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Plus,
    Target,
    Zap,
    ArrowRight,
    Loader2,
    Calendar,
    Sparkles,
    X,
    CheckCircle2,
    AlertCircle,
    PartyPopper,
    Trophy,
    Star
} from 'lucide-react';
import { usePots } from '@/hooks/useFinancialData';
import { useAuth } from '@/hooks/useAuth';
import { cn, formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Cards';
// @ts-ignore
import { toast } from 'sonner';
import { Pot } from '@/lib/types';

// Simple Confetti Component
const Confetti = () => {
    const colors = ['#10b981', '#ec4899', '#3b82f6', '#f59e0b', '#8b5cf6'];
    return (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        top: '-10%',
                        left: `${Math.random() * 100}%`,
                        rotate: 0,
                        opacity: 1
                    }}
                    animate={{
                        top: '110%',
                        left: `${(Math.random() * 100) + (Math.random() * 20 - 10)}%`,
                        rotate: 360 * 2,
                        opacity: 0
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                    style={{
                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                        width: Math.random() * 10 + 5,
                        height: Math.random() * 10 + 5,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        position: 'absolute'
                    }}
                />
            ))}
        </div>
    );
};

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
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function PotsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
    const [selectedPot, setSelectedPot] = useState<Pot | null>(null);
    const [addAmount, setAddAmount] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const [celebratedGoal, setCelebratedGoal] = useState<string | null>(null);

    const { user } = useAuth();
    const currency = user?.currency || 'USD';

    const queryClient = useQueryClient();
    const { data: pots, isLoading } = usePots();

    const addMoneyMutation = useMutation({
        mutationFn: async ({ id, amount }: { id: string, amount: number }) => {
            const currentPots = queryClient.getQueryData<Pot[]>(['pots']);
            const pot = currentPots?.find(p => p.id === id);

            if (!pot) throw new Error('Goal not found');

            const newTotal = Number(pot.current_amount) + amount;

            return api.patch(`/pots/${id}`, {
                current_amount: newTotal
            });
        },
        onMutate: async ({ id, amount }) => {
            await queryClient.cancelQueries({ queryKey: ['pots'] });
            const previousPots = queryClient.getQueryData<Pot[]>(['pots']);

            if (previousPots) {
                queryClient.setQueryData<Pot[]>(['pots'], (old) =>
                    old?.map(p => p.id === id ? {
                        ...p,
                        current_amount: Number(p.current_amount) + amount,
                        progress_percentage: Math.min(((Number(p.current_amount) + amount) / Number(p.target_amount)) * 100, 100)
                    } : p)
                );
            }

            return { previousPots };
        },
        onError: (err: any, variables, context) => {
            if (context?.previousPots) {
                queryClient.setQueryData(['pots'], context.previousPots);
            }
            toast.error('Operation failed.', {
                description: err || 'Could not add money to your goal.',
            });
        },
        onSuccess: (data: any, variables) => {
            // Check if goal is reached (100%)
            const currentPots = queryClient.getQueryData<Pot[]>(['pots']);
            const updatedPot = currentPots?.find(p => p.id === variables.id);

            if (updatedPot && updatedPot.progress_percentage >= 100) {
                setShowCelebration(true);
                setCelebratedGoal(updatedPot.title);
                toast.success('GOAL REACHED!', {
                    description: `Amazing! You've completed "${updatedPot.title}"`,
                    icon: <Trophy className="text-yellow-400" />
                });
            } else {
                toast.success('Capital Deployed!', {
                    description: 'Your contribution has been successfully synchronized.',
                });
            }

            setIsAddMoneyModalOpen(false);
            setAddAmount('');
            setSelectedPot(null);
            setSubmitError(null);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['pots'] });
            queryClient.invalidateQueries({ queryKey: ['ai'] });
            queryClient.invalidateQueries({ queryKey: ['expenses', 'summary'] });
        }
    });

    const handleAddMoney = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPot) return;

        const amount = Number(addAmount);
        if (isNaN(amount) || amount <= 0) {
            setSubmitError('Please enter a valid numeric value.');
            return;
        }

        const newTotal = Number(selectedPot.current_amount) + amount;
        if (newTotal > Number(selectedPot.target_amount)) {
            setSubmitError(`This contribution would exceed your ${formatCurrency(Number(selectedPot.target_amount), currency)} goal limit.`);
            return;
        }

        addMoneyMutation.mutate({ id: selectedPot.id, amount });
    };


    const handleCreatePot = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const formData = new FormData(e.currentTarget);
        const currentAmountVal = formData.get('current_amount') ? Number(formData.get('current_amount')) : 0;
        const targetAmountVal = Number(formData.get('target_amount'));

        if (isNaN(targetAmountVal) || targetAmountVal <= 0) {
            setSubmitError('Target parameters must be positive numeric values.');
            setIsSubmitting(false);
            return;
        }

        const data = {
            title: formData.get('title'),
            target_amount: targetAmountVal,
            current_amount: isNaN(currentAmountVal) ? 0 : currentAmountVal,
            target_date: formData.get('target_date'),
            priority: formData.get('priority')
        };

        try {
            await api.post('/pots', data);
            toast.success('Savings goal established.', {
                description: 'Objective parameters have been locked in.',
            });
            queryClient.invalidateQueries({ queryKey: ['pots'] });
            queryClient.invalidateQueries({ queryKey: ['ai'] });
            queryClient.invalidateQueries({ queryKey: ['expenses', 'summary'] });
            setIsModalOpen(false);
        } catch (err: any) {
            setSubmitError(err || 'Failed to create savings goal.');
            toast.error('Creation failed.', {
                description: err || 'The system could not establish your goal.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12 pb-24 relative"
        >
            <AnimatePresence>
                {showCelebration && (
                    <>
                        <Confetti />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.5, y: -100 }}
                            className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-[210] flex flex-col items-center justify-center text-center pointer-events-none"
                        >
                            <div className="bg-black/80 backdrop-blur-2xl p-12 rounded-[64px] border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.2)] max-w-lg mx-6">
                                <motion.div
                                    animate={{
                                        rotate: [0, -10, 10, -10, 10, 0],
                                        scale: [1, 1.2, 1, 1.2, 1]
                                    }}
                                    transition={{ duration: 0.5, repeat: 3 }}
                                    className="w-24 h-24 bg-yellow-400 rounded-3xl flex items-center justify-center text-black mb-8 mx-auto"
                                >
                                    <Trophy size={48} />
                                </motion.div>
                                <h1 className="text-5xl font-black font-poppins text-white tracking-tighter mb-4 uppercase">MILESTONE ACHIEVED!</h1>
                                <p className="text-xl font-bold text-primary mb-8 tracking-widest uppercase">Goal: {celebratedGoal}</p>
                                <p className="text-muted-foreground text-sm uppercase font-black tracking-[0.3em] opacity-60">You are a financial architect. Keep building.</p>
                                <button
                                    onClick={() => setShowCelebration(false)}
                                    className="mt-10 px-10 py-4 bg-white text-black font-black rounded-2xl pointer-events-auto hover:bg-primary hover:text-white transition-all text-xs uppercase tracking-widest"
                                >
                                    Continue Mission
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <PageHeader
                title="Savings Goals"
                subtitle="Set and track your financial goals to build long-term wealth and security."
                action={
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-[20px] font-black text-sm uppercase tracking-widest hover:bg-secondary hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 group"
                    >
                        <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                        New Goal
                    </button>
                }
            />

            <div className="flex flex-wrap gap-4 -mt-4 mb-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass px-6 py-4 rounded-2xl flex items-center gap-4 border-primary/20 bg-primary/5 shadow-[0_10px_30px_rgba(16,185,129,0.05)]"
                >
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                        <Trophy size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 leading-none mb-1">Hall of Fame</span>
                        <span className="text-lg font-black font-poppins text-white leading-none">
                            {pots?.filter(p => p.progress_percentage >= 100).length || 0} Victories
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass px-6 py-4 rounded-2xl flex items-center gap-4 border-secondary/20 bg-secondary/5 shadow-[0_10px_30px_rgba(236,72,153,0.05)]"
                >
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
                        <Star size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary/60 leading-none mb-1">Active Frontier</span>
                        <span className="text-lg font-black font-poppins text-white leading-none">
                            {pots?.filter(p => p.progress_percentage < 100).length || 0} Objectives
                        </span>
                    </div>
                </motion.div>
            </div>

            {isLoading && !pots ? (
                <div className="flex flex-col items-center justify-center py-40 space-y-6">
                    <Loader2 className="animate-spin text-secondary opacity-20" size={64} />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-40">Accessing Goals...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pots?.map((pot) => (
                        <motion.div key={pot.id} variants={itemVar}>
                            <Card className={cn(
                                "h-full flex flex-col p-8 md:p-10 transition-all duration-500",
                                pot.progress_percentage >= 100 && "border-primary/50 bg-primary/[0.02]"
                            )}>
                                <div className="flex justify-between items-start mb-10">
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg transition-all",
                                        pot.progress_percentage >= 100
                                            ? "bg-primary text-black border-primary shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                            : "bg-secondary/10 text-secondary border-secondary/20 shadow-[0_0_20px_rgba(236,72,153,0.15)]"
                                    )}>
                                        {pot.progress_percentage >= 100 ? <Trophy size={28} /> : <Target size={28} />}
                                    </div>
                                    <div className={cn(
                                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md",
                                        pot.progress_percentage >= 100 ? "bg-primary/20 border-primary text-primary" :
                                            pot.priority === 'high' ? "bg-red-500/10 border-red-500/20 text-red-400" :
                                                pot.priority === 'medium' ? "bg-secondary/10 border-secondary/20 text-secondary" :
                                                    "bg-white/5 border-white/10 text-muted-foreground"
                                    )}>
                                        {pot.progress_percentage >= 100 ? 'COMPLETED' : pot.priority}
                                    </div>
                                </div>

                                <motion.h3
                                    className="text-2xl font-black font-poppins text-white tracking-tight mb-2 uppercase leading-tight"
                                >
                                    {pot.title}
                                </motion.h3>
                                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-10 opacity-60 italic">Goal Objective</p>

                                <div className="space-y-8 mb-10">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "text-4xl font-black font-poppins tracking-tighter transition-colors",
                                                pot.progress_percentage >= 100 ? "text-primary text-glow-primary" : "text-white"
                                            )}>
                                                {formatCurrency(Number(pot.current_amount), currency)}
                                            </span>
                                        </div>
                                        <span className="text-xs font-black text-muted-foreground pb-1 opacity-40 uppercase tracking-widest">
                                            of {formatCurrency(Number(pot.target_amount), currency)}
                                        </span>
                                    </div>

                                    <div className="h-4 bg-white/[0.03] rounded-full overflow-hidden border border-white/5 p-1 relative">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(pot.progress_percentage, 100)}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className={cn(
                                                "h-full rounded-full relative",
                                                pot.progress_percentage >= 100
                                                    ? "bg-gradient-to-r from-primary to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.7)]"
                                                    : "bg-gradient-to-r from-secondary to-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                                            )}
                                        >
                                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[pulse_2s_linear_infinite]" />
                                        </motion.div>
                                    </div>

                                    {pot.progress_percentage >= 100 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em]"
                                        >
                                            <Star size={14} fill="currentColor" />
                                            Target Achieved
                                        </motion.div>
                                    )}
                                </div>

                                <div className="mt-auto space-y-6 pt-6 border-t border-white/[0.03]">
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                                        <Calendar size={14} className={pot.progress_percentage >= 100 ? "text-primary" : "text-secondary"} />
                                        <span>Target Date: {new Date(pot.target_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <button
                                        disabled={pot.progress_percentage >= 100}
                                        onClick={() => {
                                            setSelectedPot(pot);
                                            setIsAddMoneyModalOpen(true);
                                        }}
                                        className={cn(
                                            "w-full py-4 border rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all group",
                                            pot.progress_percentage >= 100
                                                ? "bg-white/5 border-white/10 text-muted-foreground cursor-not-allowed"
                                                : "bg-white/5 border-white/10 hover:bg-secondary hover:text-white hover:border-secondary"
                                        )}
                                    >
                                        {pot.progress_percentage >= 100 ? (
                                            <>Objective Complete <CheckCircle2 size={14} /></>
                                        ) : (
                                            <>Add Money <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}

                    {/* AI Pot Accelerator */}
                    <motion.div variants={itemVar}>
                        <Card className="h-full border-dashed border-primary/20 bg-gradient-to-br from-primary/[0.03] to-transparent flex flex-col items-center justify-center text-center p-12 space-y-8 min-h-[400px]">
                            <div className="w-20 h-20 rounded-[32px] bg-primary/10 text-primary flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-primary/20">
                                <Sparkles size={40} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black font-poppins text-white tracking-widest uppercase mb-3 text-glow">Savings Boost</h3>
                                <p className="text-xs font-bold text-muted-foreground leading-relaxed uppercase opacity-70">AI analysis found unclaimed savings. Redirecting regular spending could complete your "Emergency Fund" 42 days early.</p>
                            </div>
                            <button className="px-10 py-4 bg-primary text-black font-black rounded-2xl hover:scale-105 transition-all text-[10px] uppercase tracking-[0.3em] shadow-2xl glow-primary">
                                Run Simulation
                            </button>
                        </Card>
                    </motion.div>
                </div>
            )}

            {!isLoading && pots?.length === 0 && (
                <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[48px] bg-white/[0.01]">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-30 italic">No savings goals found. Start building your future now.</p>
                </div>
            )}

            {/* Create Pot Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-xl glass p-10 md:p-12 rounded-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-10 top-10 p-3 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white transition-all border border-transparent hover:border-white/10"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-12">
                                <h2 className="text-3xl font-black font-poppins text-white tracking-tight uppercase">New Savings Goal</h2>
                                <p className="text-muted-foreground text-sm font-medium mt-2 opacity-70 italic uppercase tracking-widest">Create a new objective for your future wealth</p>
                            </div>

                            <form onSubmit={handleCreatePot} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Goal Name</label>
                                        <input
                                            name="title"
                                            required
                                            type="text"
                                            placeholder="e.g. REAL ESTATE ACQUISITION"
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-white font-bold text-sm tracking-tight placeholder:opacity-20"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Target Amount ({currency})</label>
                                            <input
                                                name="target_amount"
                                                required
                                                type="number"
                                                step="0.01"
                                                placeholder="50000.00"
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-white font-bold text-sm tracking-tight placeholder:opacity-20"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Starting Balance ({currency})</label>
                                            <input
                                                name="current_amount"
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-white font-bold text-sm tracking-tight placeholder:opacity-20"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Priority Level</label>
                                            <select
                                                name="priority"
                                                required
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-white font-bold text-sm tracking-tight appearance-none cursor-pointer"
                                            >
                                                <option value="low" className="bg-[#050505]">STANDARD DEFENSE</option>
                                                <option value="medium" className="bg-[#050505]">STRATEGIC FOCUS</option>
                                                <option value="high" className="bg-[#050505]">ABSOLUTE PRIORITY</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Target Date</label>
                                            <input
                                                name="target_date"
                                                required
                                                type="date"
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-white font-bold text-sm tracking-tight"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {submitError && (
                                    <div className="p-5 bg-red-400/5 border border-red-400/10 text-red-400 text-xs font-bold uppercase tracking-widest rounded-3xl flex items-center gap-4 animate-in">
                                        <AlertCircle size={20} className="shrink-0" />
                                        {submitError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-16 bg-secondary text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(236,72,153,0.3)] disabled:opacity-30 glow-secondary"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        "Create Savings Goal"
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add Money Modal */}
            <AnimatePresence>
                {isAddMoneyModalOpen && selectedPot && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsAddMoneyModalOpen(false);
                                setSubmitError(null);
                            }}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-sm glass p-10 rounded-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                            <button
                                onClick={() => {
                                    setIsAddMoneyModalOpen(false);
                                    setSubmitError(null);
                                }}
                                className="absolute right-8 top-8 p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white transition-all"
                            >
                                <X size={18} />
                            </button>

                            <div className="mb-8">
                                <h2 className="text-2xl font-black font-poppins text-white tracking-tight uppercase">Add Money</h2>
                                <p className="text-muted-foreground text-[10px] font-medium mt-1 uppercase tracking-widest italic">{selectedPot.title}</p>
                            </div>

                            <form onSubmit={handleAddMoney} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Amount to Add ({currency})</label>
                                    <input
                                        autoFocus
                                        required
                                        type="number"
                                        step="0.01"
                                        value={addAmount}
                                        onChange={(e) => setAddAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-white font-bold text-sm tracking-tight placeholder:opacity-20"
                                    />
                                </div>

                                {submitError && (
                                    <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">{submitError}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={addMoneyMutation.isPending}
                                    className="w-full h-14 bg-primary text-black font-black rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl glow-primary"
                                >
                                    {addMoneyMutation.isPending ? <Loader2 className="animate-spin" /> : <>Confirm Deposit <CheckCircle2 size={16} /></>}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
