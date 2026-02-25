
'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    icon?: ReactNode;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export function MarketingButton({
    children,
    href,
    onClick,
    variant = 'primary',
    size = 'md',
    className,
    icon,
    disabled = false,
    type = 'button'
}: ButtonProps) {
    const variants = {
        primary: 'bg-primary text-black shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.4)] glow-primary',
        secondary: 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)]',
        outline: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
        ghost: 'bg-transparent text-white hover:bg-white/5',
    };

    const sizes = {
        sm: 'px-5 py-2.5 text-[10px]',
        md: 'px-8 py-4 text-xs',
        lg: 'px-12 py-5 text-sm',
    };

    const content = (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "inline-flex items-center justify-center gap-3 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-300",
                variants[variant],
                sizes[size],
                disabled && "opacity-50 pointer-events-none",
                className
            )}
        >
            {children}
            {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className="group">
                {content}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className="group">
            {content}
        </button>
    );
}
