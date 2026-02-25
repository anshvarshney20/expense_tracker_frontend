
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
import { Loader2, Mail, Lock, User, ArrowRight, Coins } from 'lucide-react';

const registerSchema = z.object({
    full_name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string(),
    currency: z.string().min(1, 'Please select a currency')
}).refine((data) => data.password === data.confirm_password, {
    message: "Keys do not match",
    path: ["confirm_password"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            currency: 'USD'
        }
    });

    const onSubmit = async (values: RegisterFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            const { confirm_password, ...data } = values;
            await api.post('/auth/register', data);
            router.push('/login?registered=true');
        } catch (err: any) {
            setError(err || 'Failed to initialize account.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans">
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg glass p-10 rounded-[40px] space-y-8 relative z-10"
            >
                <div className="text-center space-y-4">
                    <Link href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary text-white font-black text-2xl shadow-lg glow-secondary font-heading">
                        Æ
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter font-heading uppercase">Create Protocol</h1>
                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] italic opacity-60">Join the elite financial intelligence network</p>
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic ml-1 font-heading">Sovereign Identity</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary transition-colors">
                                <User size={18} />
                            </div>
                            <input
                                {...register('full_name')}
                                type="text"
                                placeholder="ALEXANDER V."
                                className={cn(
                                    "w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-xs font-bold uppercase tracking-widest placeholder:opacity-20",
                                    errors.full_name && "border-destructive/50"
                                )}
                            />
                        </div>
                        {errors.full_name && (
                            <p className="text-[10px] text-destructive italic font-black uppercase ml-1 tracking-widest">{errors.full_name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic ml-1 font-heading">Neural Address</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="ALEXANDER@PROTOCOL.COM"
                                className={cn(
                                    "w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-xs font-bold uppercase tracking-widest placeholder:opacity-20",
                                    errors.email && "border-destructive/50"
                                )}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-[10px] text-destructive italic font-black uppercase ml-1 tracking-widest">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic ml-1 font-heading">Security Key</label>
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="••••••••"
                                className={cn(
                                    "w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-sm",
                                    errors.password && "border-destructive/50"
                                )}
                            />
                        </div>
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic ml-1 font-heading">Verify Key</label>
                            <input
                                {...register('confirm_password')}
                                type="password"
                                placeholder="••••••••"
                                className={cn(
                                    "w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-sm",
                                    errors.confirm_password && "border-destructive/50"
                                )}
                            />
                        </div>
                    </div>
                    {errors.confirm_password && (
                        <p className="text-[10px] text-destructive italic font-black uppercase ml-1 tracking-widest">{errors.confirm_password.message}</p>
                    )}

                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic ml-1 font-heading">Neural Currency Node</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-secondary transition-colors">
                                <Coins size={18} />
                            </div>
                            <select
                                {...register('currency')}
                                className={cn(
                                    "w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all appearance-none cursor-pointer text-xs font-bold uppercase tracking-widest",
                                    errors.currency && "border-destructive/50"
                                )}
                            >
                                <option value="USD" className="bg-[#02040a]">USD - US Dollar</option>
                                <option value="EUR" className="bg-[#02040a]">EUR - Euro</option>
                                <option value="GBP" className="bg-[#02040a]">GBP - British Pound</option>
                                <option value="INR" className="bg-[#02040a]">INR - Indian Rupee</option>
                                <option value="JPY" className="bg-[#02040a]">JPY - Japanese Yen</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-16 bg-secondary text-white font-black uppercase tracking-[0.2em] italic rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 mt-4 shadow-lg shadow-secondary/10"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                Initialize Account
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">
                        Session already active?{' '}
                        <Link href="/login" className="text-secondary font-black hover:underline ml-1">
                            RESUME PROTOCOL
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
