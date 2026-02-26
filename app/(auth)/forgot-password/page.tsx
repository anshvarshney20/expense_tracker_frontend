
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Loader2, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { MarketingButton } from '@/components/ui/MarketingButton';

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resetToken, setResetToken] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (values: ForgotPasswordFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post<string>('/auth/forgot-password', values);
            setIsSubmitted(true);
            // In a real app, this would be sent to email. 
            // For this project, we'll display it so the user can actually use it.
            setResetToken(response);
        } catch (err: any) {
            setError(err || 'Failed to process request. Please check your neural address.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans">
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass p-10 rounded-[32px] space-y-8 relative z-10"
            >
                <div className="text-center space-y-4">
                    <Link href="/login" className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-all hover:scale-110 active:scale-95">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter font-heading uppercase">Forgot Password</h1>
                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] italic opacity-60">Recover your account access</p>
                    </div>
                </div>

                <div className="h-px bg-white/5 w-full" />

                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            {error && (
                                <div className="p-4 mb-6 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest rounded-xl text-center italic">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic ml-1 font-heading">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            placeholder="YOUR@EMAIL.COM"
                                            className={cn(
                                                "w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-xs font-bold uppercase tracking-widest placeholder:opacity-20",
                                                errors.email && "border-destructive/50"
                                            )}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-[10px] text-destructive italic font-black uppercase ml-1 tracking-widest">{errors.email.message}</p>
                                    )}
                                </div>

                                <MarketingButton
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-16 group"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            Send Reset Link
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </MarketingButton>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6 pt-4"
                        >
                            <div className="w-20 h-20 bg-primary/10 rounded-[32px] border border-primary/20 flex items-center justify-center mx-auto text-primary">
                                <CheckCircle2 size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black uppercase tracking-tighter">Email Sent</h3>
                                <p className="text-sm text-muted-foreground italic">Check your terminal or the box below for the recovery key.</p>
                            </div>

                            {resetToken && (
                                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Reset Token Generated:</p>
                                    <div className="p-3 bg-black rounded-lg border border-white/5 font-mono text-[10px] break-all select-all text-white/70">
                                        {resetToken}
                                    </div>
                                    <MarketingButton
                                        href={`/reset-password?token=${resetToken}`}
                                        variant="primary"
                                        size="md"
                                        className="w-full group"
                                    >
                                        Reset Password Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </MarketingButton>
                                </div>
                            )}

                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest pt-4">
                                Dispatched to: <span className="text-white">Neural Address</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-center pt-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
                        Remembered details?{' '}
                        <Link href="/login" className="text-primary hover:underline ml-1">
                            RETURN TO LOGIN
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
