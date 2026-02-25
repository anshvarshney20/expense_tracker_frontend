
'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-black overflow-hidden font-sans flex-col lg:flex-row">
            <Sidebar />

            <main className="flex-1 relative overflow-y-auto overflow-x-hidden pt-20 lg:pt-0">
                {/* Master Background Architecture */}
                <div className="fixed inset-0 pointer-events-none -z-10">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] opacity-40" />
                    <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] opacity-20" />
                    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] opacity-10" />

                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />
                </div>

                <div className="container mx-auto p-6 md:p-12 lg:p-16 max-w-[1400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 15, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -15, scale: 0.99 }}
                            transition={{
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <footer className="container mx-auto px-6 py-12 text-center border-t border-white/[0.02] mt-20">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground opacity-20 italic">
                        Secured by Æquitas Neural Network • v1.0.4-ELITE
                    </p>
                </footer>
            </main>
        </div>
    );
}
