
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h1 className="text-4xl md:text-5xl font-black font-outfit tracking-tight text-white leading-none">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-muted-foreground mt-3 text-lg font-medium max-w-2xl italic opacity-80">
                        {subtitle}
                    </p>
                )}
            </motion.div>
            {action && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="shrink-0"
                >
                    {action}
                </motion.div>
            )}
        </div>
    );
}
