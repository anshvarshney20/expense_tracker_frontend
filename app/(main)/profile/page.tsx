
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Cards';
import { useAuth } from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/lib/api';
import {
    User,
    Mail,
    Shield,
    Zap,
    Clock,
    ArrowUpRight,
    Sparkles,
    ShieldCheck,
    Lock,
    X,
    Loader2,
    CheckCircle2
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
// @ts-ignore
import { toast } from 'sonner';

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current key required'),
    newPassword: z.string().min(6, 'New key must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Keys do not match",
    path: ["confirmPassword"],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

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

export default function ProfilePage() {
    const { user } = useAuth();
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
    });

    const stats = [
        { label: 'System Access', value: 'Level 4 Elite', icon: Shield },
        { label: 'Uptime', value: '99.9%', icon: Clock },
        { label: 'Analysis Cycles', value: '1,242', icon: Zap },
    ];

    const onChangePassword = async (values: ChangePasswordFormValues) => {
        setIsSubmitting(true);
        try {
            await api.post('/auth/change-password', {
                current_password: values.currentPassword,
                new_password: values.newPassword
            });
            toast.success('Security protocol successful.', {
                description: 'Your security key has been rotated and synchronized across all nodes.',
            });
            setIsChangePasswordModalOpen(false);
            reset();
        } catch (err: any) {
            toast.error('Rotation failed.', {
                description: err || 'The current security key provided is invalid.',
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
                title="Identity Node"
                subtitle="Detailed specifications and tier-access parameters of your sovereignty profile."
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Profile Overview */}
                <Card className="xl:col-span-1 p-12 border-white/5 flex flex-col items-center text-center">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-primary/20 rounded-[48px] blur-[30px] animate-pulse" />
                        <div className="w-40 h-40 rounded-[48px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/30 flex items-center justify-center relative backdrop-blur-xl">
                            <User size={80} className="text-primary opacity-80" />
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-2xl">
                                <ShieldCheck size={20} className="text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10 w-full">
                        <h2 className="text-4xl font-black font-poppins text-white uppercase tracking-tighter">{user?.full_name || 'System Sovereign'}</h2>
                        <div className="flex items-center justify-center gap-3">
                            <Mail size={14} className="text-muted-foreground opacity-50" />
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{user?.email}</p>
                        </div>
                        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-[0.2em] text-white">Active Node</span>
                            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-[0.2em] text-primary">Sovereign Tier</span>
                        </div>
                    </div>

                    <div className="w-full space-y-4 pt-10 border-t border-white/[0.03]">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                                <div className="flex items-center gap-3">
                                    <stat.icon size={16} className="text-muted-foreground opacity-50" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                                </div>
                                <span className="text-xs font-black text-white uppercase">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Profile Details & Logs */}
                <div className="xl:col-span-2 space-y-10">
                    <Card className="p-10 md:p-12 border-white/5">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-2xl font-black font-poppins uppercase tracking-tighter">Security Credentials</h3>
                            <button
                                onClick={() => setIsChangePasswordModalOpen(true)}
                                className="px-5 py-2.5 rounded-xl bg-primary text-black text-[8px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-lg glow-primary"
                            >
                                Rotate Security Key
                            </button>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'Auth Method', value: 'OAuth 2.0 / JWT Node', status: 'Secured' },
                                { label: 'Node Residency', value: 'Frankfurt-DE / AWS-01', status: 'Latency: 12ms' },
                                { label: 'Bio-Hash', value: 'xxxx-xxxx-8492-xxxx', status: 'Verified' },
                                { label: 'Last Vector Access', value: 'Feb 24, 2026 - 19:42', status: 'Trusted' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-6 rounded-[32px] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">{item.label}</p>
                                        <p className="text-sm font-black text-white italic">{item.value}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-primary">{item.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-10 md:p-12 border-primary/10 bg-gradient-to-br from-primary/[0.02] to-transparent">
                        <div className="flex items-center gap-4 mb-10">
                            <Sparkles className="text-primary" size={24} />
                            <h3 className="text-2xl font-black font-poppins uppercase tracking-tighter">Cognitive Maturity</h3>
                        </div>
                        <div className="space-y-8">
                            <p className="text-sm font-medium text-muted-foreground leading-relaxed italic uppercase opacity-60">
                                Your identity node has been synchronized with the Cortex AI engine for 142 days. Pattern recognition accuracy is currently at <span className="text-primary font-black">98.4%</span>.
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5">
                                    <div className="h-full w-[92%] bg-primary rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                </div>
                                <span className="text-xs font-black text-white">92%</span>
                            </div>
                            <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-primary hover:underline">
                                View behavioral evolution <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Change Password Modal */}
            <AnimatePresence>
                {isChangePasswordModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsChangePasswordModalOpen(false)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-md glass p-10 md:p-12 rounded-[48px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                            <button
                                onClick={() => setIsChangePasswordModalOpen(false)}
                                className="absolute right-10 top-10 p-3 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white transition-all border border-transparent hover:border-white/10"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-12">
                                <h2 className="text-3xl font-black font-poppins text-white tracking-tight uppercase leading-none">Key Rotation</h2>
                                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] mt-3 opacity-60 italic">Updating identity security parameters</p>
                            </div>

                            <form onSubmit={handleSubmit(onChangePassword)} className="space-y-6">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 font-heading">Current Key</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                {...register('currentPassword')}
                                                type="password"
                                                placeholder="••••••••"
                                                className={cn(
                                                    "w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-sm",
                                                    errors.currentPassword && "border-destructive/50"
                                                )}
                                            />
                                        </div>
                                        {errors.currentPassword && (
                                            <p className="text-[10px] text-destructive italic font-black uppercase ml-1 tracking-widest">{errors.currentPassword.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 font-heading">New Key</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                {...register('newPassword')}
                                                type="password"
                                                placeholder="••••••••"
                                                className={cn(
                                                    "w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-sm",
                                                    errors.newPassword && "border-destructive/50"
                                                )}
                                            />
                                        </div>
                                        {errors.newPassword && (
                                            <p className="text-[10px] text-destructive italic font-black uppercase ml-1 tracking-widest">{errors.newPassword.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 font-heading">Confirm Key</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                {...register('confirmPassword')}
                                                type="password"
                                                placeholder="••••••••"
                                                className={cn(
                                                    "w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-sm",
                                                    errors.confirmPassword && "border-destructive/50"
                                                )}
                                            />
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="text-[10px] text-destructive italic font-black uppercase ml-1 tracking-widest">{errors.confirmPassword.message}</p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-16 bg-primary text-black font-black uppercase tracking-[0.2em] italic rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg glow-primary disabled:opacity-50 mt-4"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>Synchronize Key <CheckCircle2 size={18} /></>
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
