
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Plus,
    Receipt,
    Calendar,
    Search,
    Filter,
    Trash2,
    Edit2,
    ChevronLeft,
    ChevronRight,
    Loader2,
    AlertCircle,
    CheckCircle2,
    ArrowDownRight,
    ArrowUpRight
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { useExpenses } from '@/hooks/useFinancialData';
import { useAuth } from '@/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Cards';
// @ts-ignore
import { toast } from 'sonner';

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function ExpensesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { user } = useAuth();
    const currency = user?.currency || 'USD';

    const queryClient = useQueryClient();
    const { data: expenses, isLoading } = useExpenses();

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/expenses/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['ai'] });
            queryClient.invalidateQueries({ queryKey: ['expenses', 'summary'] });
            toast.success('Movement record purged.', {
                description: 'The industrial entry has been removed from the ledger.',
            });
        },
        onError: (err: any) => {
            toast.error('Purge failure.', {
                description: err || 'Failed to remove movement from audit record.',
            });
        }
    });

    const removeExpense = (id: string) => {
        toast('Confirm Purge Protocol', {
            description: 'Are you sure you want to delete this movement?',
            action: {
                label: 'Confirm',
                onClick: () => deleteMutation.mutate(id),
            },
            cancel: {
                label: 'Abort',
                onClick: () => { },
            }
        });
    };

    const handleCreateExpense = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const formData = new FormData(e.currentTarget);
        const amountVal = Number(formData.get('amount'));

        if (isNaN(amountVal) || amountVal <= 0) {
            setSubmitError('Please enter a valid amount greater than zero.');
            setIsSubmitting(false);
            return;
        }

        const data = {
            title: formData.get('title'),
            amount: amountVal,
            category: formData.get('category'),
            date: formData.get('date'),
            is_avoidable: formData.get('is_avoidable') === 'on'
        };

        try {
            await api.post('/expenses', data);
            toast.success('Expense recorded.', {
                description: 'The expense has been successfully added to your ledger.',
            });
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['ai'] });
            queryClient.invalidateQueries({ queryKey: ['expenses', 'summary'] });
            setIsModalOpen(false);
        } catch (err: any) {
            setSubmitError(err || 'Failed to record expense.');
            toast.error('Submission failed.', {
                description: err || 'The system could not record your expense.',
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
            className="space-y-12 pb-24"
        >
            <PageHeader
                title="Expense Ledger"
                subtitle="A complete record of all your spending and financial movements."
                action={
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-3 bg-primary text-black px-10 py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.05] active:scale-95 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)] glow-primary"
                    >
                        <Plus size={18} />
                        Add Expense
                    </button>
                }
            />

            {/* Filters Bar */}
            <motion.div variants={itemVar} className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search expenses..."
                        className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-[20px] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all font-bold text-sm tracking-tight placeholder:opacity-30"
                    />
                </div>
                <div className="flex gap-4">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-[20px] hover:bg-white/10 text-xs font-black uppercase tracking-widest transition-all">
                        <Filter size={16} />
                        Categories
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-[20px] hover:bg-white/10 text-xs font-black uppercase tracking-widest transition-all">
                        <Calendar size={16} />
                        Date Range
                    </button>
                </div>
            </motion.div>

            {/* Expenses Table/List */}
            <motion.div variants={itemVar}>
                <Card className="p-0 border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.01]">
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">Expense Name</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50 hidden sm:table-cell">Category</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50 hidden md:table-cell">Date</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">Amount</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-10 py-32 text-center">
                                            <Loader2 className="animate-spin inline-block text-primary opacity-20" size={48} />
                                            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">Loading Expenses...</p>
                                        </td>
                                    </tr>
                                ) : (
                                    <AnimatePresence mode="popLayout">
                                        {expenses?.map((expense) => (
                                            <motion.tr
                                                key={expense.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="group hover:bg-white/[0.02] transition-colors cursor-default"
                                            >
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500 shrink-0 border border-transparent group-hover:border-primary/20 shadow-inner">
                                                            <Receipt size={20} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-white text-lg tracking-tight group-hover:translate-x-1 transition-transform duration-500">{expense.title}</span>
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 sm:hidden mt-0.5">{expense.category}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6 hidden sm:table-cell">
                                                    <span className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">
                                                        {expense.category}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-6 text-xs font-bold text-muted-foreground uppercase hidden md:table-cell whitespace-nowrap opacity-70">
                                                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-black font-poppins text-xl text-white">-{formatCurrency(expense.amount, currency)}</span>
                                                        <span className="text-[9px] font-bold text-muted-foreground md:hidden opacity-50 uppercase">{format(new Date(expense.date), 'MMM dd')}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                        <button className="p-2.5 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-white transition-all">
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => removeExpense(expense.id)}
                                                            disabled={deleteMutation.isPending}
                                                            className="p-2.5 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all disabled:opacity-50"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                )}
                                {!isLoading && expenses?.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-10 py-32 text-center">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-30 italic">No expenses found for this period.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-8 md:p-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/[0.01]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40 italic">Audit scale: {expenses?.length || 0} entities</p>
                        <div className="flex items-center gap-3">
                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 disabled:opacity-20 hover:bg-white/10 transition-all">
                                <ChevronLeft size={18} />
                            </button>
                            <div className="h-10 px-4 flex items-center justify-center rounded-xl bg-primary text-black font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20">Index 01</div>
                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Log Expense Modal */}
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
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-10 top-10 p-3 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white transition-all border border-transparent hover:border-white/10 shadow-lg"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-12">
                                <h2 className="text-3xl font-black font-poppins text-white tracking-tight uppercase">Add Expense</h2>
                                <p className="text-muted-foreground text-sm font-medium mt-2 opacity-70 italic uppercase tracking-widest">Record a new spending entry</p>
                            </div>

                            <form onSubmit={handleCreateExpense} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Expense Name</label>
                                            <input
                                                name="title"
                                                required
                                                type="text"
                                                placeholder="e.g. Groceries"
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-white font-bold text-sm tracking-tight placeholder:opacity-20"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Amount ({currency})</label>
                                            <input
                                                name="amount"
                                                required
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-white font-bold text-sm tracking-tight placeholder:opacity-20"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Category</label>
                                            <select
                                                name="category"
                                                required
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-white font-bold text-sm tracking-tight appearance-none cursor-pointer"
                                            >
                                                <option value="Food" className="bg-[#050505]">SUBSISTENCE</option>
                                                <option value="Transport" className="bg-[#050505]">TRANSPORT</option>
                                                <option value="Housing" className="bg-[#050505]">HOUSING</option>
                                                <option value="Entertainment" className="bg-[#050505]">ENTERTAINMENT</option>
                                                <option value="Work" className="bg-[#050505]">UTILITIES</option>
                                                <option value="Other" className="bg-[#050505]">OTHER</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Date</label>
                                            <input
                                                name="date"
                                                type="date"
                                                required
                                                defaultValue={new Date().toISOString().split('T')[0]}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-white font-bold text-sm tracking-tight"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-5 bg-white/[0.02] rounded-2xl border border-white/5 group cursor-pointer hover:border-primary/20 transition-all">
                                        <input
                                            name="is_avoidable"
                                            type="checkbox"
                                            id="avoidable"
                                            className="w-6 h-6 rounded-lg border-white/10 bg-white/5 text-primary focus:ring-primary/50 cursor-pointer"
                                        />
                                        <label htmlFor="avoidable" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors cursor-pointer select-none">
                                            Mark as Impulse Purchase
                                        </label>
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
                                    className="w-full h-16 bg-primary text-black font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(16,185,129,0.2)] disabled:opacity-30 glow-primary"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        "Save Expense"
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
