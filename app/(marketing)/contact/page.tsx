"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Globe, ArrowRight, CornerDownRight } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="relative min-h-screen bg-background pt-40 pb-20 overflow-hidden font-sans">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />

            <div className="container px-6 mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left Side: Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary italic">Contact Us</h2>
                            <h1 className="text-6xl md:text-8xl font-black font-poppins uppercase tracking-tighter leading-[0.85] text-white">
                                GET IN <br />
                                <span className="text-secondary italic">TOUCH.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground font-medium italic opacity-70 leading-relaxed max-w-lg">
                                Have a question or need help? We're here for you. Reach out and our team will get back to you shortly.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { label: "Office Location", value: "San Francisco, CA", icon: Globe },
                                { label: "Email Support", value: "hello@aequitas.ai", icon: Mail },
                                { label: "Phone Support", value: "+1 (555) 000-1234", icon: MessageSquare },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-secondary border border-white/10 group-hover:scale-110 transition-transform">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-1">{item.label}</p>
                                        <p className="text-sm font-black text-white uppercase tracking-tighter">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full glass p-10 md:p-14 rounded-[48px] border-white/5 shadow-2xl space-y-10"
                    >
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black font-poppins text-white uppercase tracking-tight">Contact Form</h3>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-40">We'll get back to you within 24 hours</p>
                        </div>

                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="YOUR NAME"
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-white font-bold text-xs tracking-widest"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email</label>
                                    <input
                                        type="email"
                                        placeholder="YOUR@EMAIL.COM"
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-white font-bold text-xs tracking-widest"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Subject</label>
                                <select className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-white font-bold text-xs tracking-widest appearance-none cursor-pointer">
                                    <option className="bg-[#050505]">GENERAL QUESTION</option>
                                    <option className="bg-[#050505]">BUSINESS PARTNERSHIP</option>
                                    <option className="bg-[#050505]">MEDIA INQUIRY</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="HOW CAN WE HELP?"
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-white font-bold text-xs tracking-widest resize-none"
                                />
                            </div>

                            <button className="w-full h-18 bg-secondary text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-xl glow-secondary">
                                SEND MESSAGE
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
