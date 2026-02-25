
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { MarketingButton } from '@/components/ui/MarketingButton';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values: LoginFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            await api.post('/auth/login', values);
            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err || 'Failed to login. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div suppressHydrationWarning className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background decoration */}
            <div suppressHydrationWarning className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass p-10 rounded-[32px] space-y-8 relative z-10"
                suppressHydrationWarning
            >
                <div suppressHydrationWarning className="text-center space-y-4">
                    <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-black font-black text-2xl shadow-lg glow-primary font-heading">
                        Æ
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter font-heading uppercase">Welcome Back</h1>
                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] italic opacity-60">Enter credentials to synchronize</p>
                    </div>
                </div>

                <div className="h-px bg-white/5 w-full" />

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest rounded-xl text-center italic"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic ml-1 font-heading">Neural Address</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="ALEXANDER@PROTOCOL.COM"
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

                    <div className="space-y-3">
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic font-heading">Security Key</label>
                            <MarketingButton
                                onClick={() => router.push('/forgot-password')}
                                variant="secondary"
                                size="sm"
                                className="!px-4 !py-2 !rounded-xl !text-[9px] opacity-70 hover:opacity-100"
                            >
                                FORGOT KEY?
                            </MarketingButton>
                        </div>
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

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-16 bg-primary text-black font-black uppercase tracking-[0.2em] italic rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                Initialize Session
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
                        No neural link yet?{' '}
                        <Link href="/register" className="text-primary hover:underline ml-1">
                            INITIALIZE ACCOUNT
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
