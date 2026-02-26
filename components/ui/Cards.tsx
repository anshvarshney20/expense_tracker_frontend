
'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps {
    children: ReactNode;
    className?: string;
    glow?: boolean;
    hover?: boolean;
}

export function Card({ children, className, glow = false, hover = true }: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.005 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
                "glass p-8 rounded-[40px] relative overflow-hidden group border border-white/5",
                glow && "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:pointer-events-none",
                className
            )}
        >
            {/* Subtle light leak effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-[64px] group-hover:bg-primary/10 transition-colors duration-1000" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

interface StatCardProps {
    label: string;
    value: string;
    subValue?: string;
    trend?: number;
    icon: any;
    color?: 'primary' | 'secondary' | 'accent';
    isLoading?: boolean;
}

export function StatCard({ label, value, subValue, trend, icon: Icon, color = 'primary', isLoading }: StatCardProps) {
    const colorClasses = {
        primary: 'text-primary bg-primary/10 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent',
        secondary: 'text-secondary bg-secondary/10 border-secondary/20 bg-gradient-to-br from-secondary/10 to-transparent',
        accent: 'text-accent bg-accent/10 border-accent/20 bg-gradient-to-br from-accent/10 to-transparent',
    };

    return (
        <Card className="border border-white/[0.03]">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-4 flex-1 min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60 italic font-lato">{label}</p>
                    {isLoading ? (
                        <div className="h-10 w-full max-w-[120px] bg-white/5 animate-pulse rounded-lg" />
                    ) : (
                        <div className="flex flex-col gap-1 w-full overflow-hidden">
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-black tracking-tight font-poppins text-white leading-none whitespace-nowrap">
                                {value.includes('.') ? (
                                    <>
                                        {value.split('.')[0]}
                                        <span className="text-[0.6em] opacity-50">.{value.split('.')[1]}</span>
                                    </>
                                ) : value}
                            </h2>
                            {subValue && (
                                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground opacity-50 italic">
                                    {subValue}
                                </p>
                            )}
                        </div>
                    )}

                    {trend !== undefined && (
                        <div className={cn(
                            "text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5 border backdrop-blur-md",
                            trend > 0 ? "text-red-400 bg-red-400/5 border-red-400/10" : "text-primary bg-primary/5 border-primary/10"
                        )}>
                            <span className="text-xs leading-none">{trend > 0 ? '↗' : '↘'}</span>
                            {Math.abs(trend)}% Velocity
                        </div>
                    )}
                </div>
                <div className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:rotate-[15deg] group-hover:scale-110 border shadow-inner shrink-0",
                    colorClasses[color]
                )}>
                    <Icon size={20} className="opacity-90 drop-shadow-lg" />
                </div>
            </div>
        </Card>
    );
}
