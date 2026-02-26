
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Loader2, Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import { MarketingButton } from '@/components/ui/MarketingButton';
import { toast } from 'sonner';

const resetPasswordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Keys do not match",
    path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
    });

    useEffect(() => {
        if (!token) {
            setError('Valid recovery token required to use this protocol.');
        }
    }, [token]);

    const onSubmit = async (values: ResetPasswordFormValues) => {
        if (!token) return;

        setIsLoading(true);
        setError(null);
        try {
            await api.post('/auth/reset-password', {
                token,
                new_password: values.password
            });
            toast.success('Password updated successfully.', {
                description: 'You can now sign in with your new password.',
            });
            router.push('/login');
        } catch (err: any) {
            setError(err || 'Failed to update credentials. The token may be expired.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!token && !isLoading) {
        return (
            <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-destructive/10 rounded-[32px] border border-destructive/20 flex items-center justify-center mx-auto text-destructive">
                    <ShieldAlert size={40} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter text-destructive">Invalid Token</h3>
                <p className="text-sm text-muted-foreground italic">No recovery token was detected. Please relaunch the reset process from your email.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic ml-1 font-heading">New Password</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Lock size={18} />
                    </div>
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="••••••••"
                        className={cn(
                            "w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm",
                            errors.password && "border-destructive/50"
                        )}
                    />
                </div>
                {errors.password && (
                    <p className="text-[10px] text-destructive italic font-black uppercase ml-1 tracking-widest">{errors.password.message}</p>
                )}
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic ml-1 font-heading">Confirm New Password</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Lock size={18} />
                    </div>
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        placeholder="••••••••"
                        className={cn(
                            "w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm",
                            errors.confirmPassword && "border-destructive/50"
                        )}
                    />
                </div>
                {errors.confirmPassword && (
                    <p className="text-[10px] text-destructive italic font-black uppercase ml-1 tracking-widest">{errors.confirmPassword.message}</p>
                )}
            </div>

            {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest rounded-xl text-center italic">
                    {error}
                </div>
            )}

            <MarketingButton
                type="submit"
                disabled={isLoading || !token}
                className="w-full h-16 group"
            >
                {isLoading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>
                        Update Password
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </MarketingButton>
        </form>
    );
}

export default function ResetPasswordPage() {
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
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-black tracking-tighter font-heading uppercase">Reset Password</h1>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] italic opacity-60">Enter your new password below</p>
                </div>

                <div className="h-px bg-white/5 w-full" />

                <Suspense fallback={<div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary/20" /></div>}>
                    <ResetPasswordForm />
                </Suspense>
            </motion.div>
        </div>
    );
}
