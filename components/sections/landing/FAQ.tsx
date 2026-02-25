
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/Cards';

const faqs = [
    {
        question: 'How secure is the brain-to-bank connection?',
        answer: 'We utilize bank-grade 256-bit encryption and zero-knowledge proof architecture. Your credentials never touch our servers—your sovereignty is maintained through direct neural-API handshakes.'
    },
    {
        question: 'What actually is the "Goal Warp" algorithm?',
        answer: 'Goal Warp is a proprietary neural model that analyzes your expenditure velocity against mission parameters. It detects subsistence drift and provides real-time redirection commands to accelerate capital retention.'
    },
    {
        question: 'Can I use this for business capital oversight?',
        answer: 'Yes. The Architecture Tier is designed specifically for institutional-grade capital flows, multi-vault synchronisation, and subsystem audit governance.'
    },
    {
        question: 'Is there a latency in data synchronisation?',
        answer: 'Nodes are updated in real-time. Most movements are audited and categorized within 120ms of the initial transaction hash.'
    }
];

export function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-48 bg-black/40">
            <div className="container mx-auto px-6 md:px-10">
                <div className="max-w-4xl mx-auto space-y-20">
                    <div className="text-center space-y-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">Intelligence Database</h2>
                        <h3 className="text-5xl md:text-7xl font-black font-poppins uppercase tracking-tighter">COMMON QUERIES</h3>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, i) => (
                            <Card
                                key={i}
                                className="p-0 border-white/5 overflow-hidden transition-all duration-500 hover:border-white/10"
                                hover={false}
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                    className="w-full p-8 md:p-10 flex items-center justify-between text-left group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors ${activeIndex === i ? 'text-primary border-primary/20' : ''}`}>
                                            <HelpCircle size={24} />
                                        </div>
                                        <span className="text-xl font-black font-poppins text-white uppercase tracking-tight">{faq.question}</span>
                                    </div>
                                    <ChevronDown
                                        size={24}
                                        className={`text-muted-foreground transition-transform duration-500 ${activeIndex === i ? 'rotate-180 text-primary' : ''}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div className="px-10 pb-10 pt-0">
                                                <div className="pl-16">
                                                    <p className="text-lg font-medium text-muted-foreground leading-relaxed uppercase italic opacity-80 tracking-widest border-l-2 border-primary/20 pl-8">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
