
'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Cards';
import { motion } from 'framer-motion';
import {
    Settings as SettingsIcon,
    Bell,
    Lock,
    User as UserIcon,
    Globe,
    Shield,
    ChevronRight,
    Trash2,
    Save,
    Coins
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export default function SettingsPage() {
    const { user, updateProfile, isUpdating } = useAuth();
    const [activeTab, setActiveTab] = useState('general');

    const [currency, setCurrency] = useState('USD');
    const [fullName, setFullName] = useState('');

    // Sync state when user data is available
    useEffect(() => {
        if (user) {
            setCurrency(user.currency || 'USD');
            setFullName(user.full_name || '');
        }
    }, [user]);

    const tabs = [
        { id: 'general', label: 'General', icon: SettingsIcon },
        { id: 'profile', label: 'Profile', icon: UserIcon },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    const handleSaveGeneral = () => {
        updateProfile({ currency }, {
            onSuccess: () => {
                toast.success(`Currency updated to ${currency}.`);
            }
        });
    };

    const handleSaveProfile = () => {
        updateProfile({ full_name: fullName });
    };

    const handleSaveSecurity = () => {
        toast.info('Security settings updated successfully.');
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12 pb-24"
        >
            <PageHeader
                title="Settings"
                subtitle="Manage your account preferences, profile, and security settings."
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Sidebar Tabs */}
                <Card className="lg:col-span-1 p-4 h-fit border-white/5 bg-white/[0.01]">
                    <div className="flex flex-col gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-300 group",
                                    activeTab === tab.id
                                        ? "bg-primary text-black font-black shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <tab.icon size={20} className={cn("shrink-0", activeTab === tab.id ? "" : "group-hover:scale-110 transition-transform")} />
                                <span className="text-[10px] uppercase font-black tracking-widest">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* Settings Content */}
                <div className="lg:col-span-3 space-y-8">
                    {activeTab === 'general' && (
                        <Card className="p-10 md:p-12 border-white/5">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                    <SettingsIcon size={24} />
                                </div>
                                <h3 className="text-2xl font-black font-poppins uppercase tracking-tighter">General Settings</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Interface Language</label>
                                        <select className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-white font-bold text-sm">
                                            <option className="bg-[#050505]">English (US)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Default Currency</label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary">
                                                <Coins size={18} />
                                            </div>
                                            <select
                                                value={currency}
                                                onChange={(e) => setCurrency(e.target.value)}
                                                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-white font-bold text-sm appearance-none"
                                            >
                                                <option value="USD" className="bg-[#050505]">USD - US Dollar</option>
                                                <option value="EUR" className="bg-[#050505]">EUR - Euro</option>
                                                <option value="GBP" className="bg-[#050505]">GBP - British Pound</option>
                                                <option value="INR" className="bg-[#050505]">INR - Indian Rupee</option>
                                                <option value="JPY" className="bg-[#050505]">JPY - Japanese Yen</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[40px] bg-white/[0.01] border border-white/5 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-white">Smart AI Insights</h4>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1 opacity-60">Enable AI-powered tips and spending analysis</p>
                                        </div>
                                        <button className="w-12 h-6 rounded-full bg-primary relative transition-all">
                                            <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-black shadow-lg" />
                                        </button>
                                    </div>
                                    <div className="h-[1px] w-full bg-white/5" />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-white">Cloud Sync</h4>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1 opacity-60">Automatically sync your data across devices</p>
                                        </div>
                                        <button className="w-12 h-6 rounded-full bg-white/10 relative transition-all">
                                            <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white/20 shadow-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveGeneral}
                                disabled={isUpdating}
                                className="mt-12 w-full md:w-auto px-12 h-16 bg-primary text-black font-black rounded-2xl flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl glow-primary disabled:opacity-50"
                            >
                                <Save size={18} /> {isUpdating ? 'Saving...' : 'Save General Settings'}
                            </button>
                        </Card>
                    )}

                    {activeTab === 'profile' && (
                        <Card className="p-10 md:p-12 border-white/5">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                                    <UserIcon size={24} />
                                </div>
                                <h3 className="text-2xl font-black font-poppins uppercase tracking-tighter">Profile Details</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="flex flex-col md:flex-row items-center gap-10 p-10 rounded-[48px] bg-white/[0.01] border border-white/5">
                                    <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center text-secondary border border-white/5 shadow-2xl relative group">
                                        <UserIcon size={64} className="opacity-40 group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px] flex items-center justify-center">
                                            <span className="text-[8px] font-black uppercase tracking-widest">Update</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4 text-center md:text-left">
                                        <h4 className="text-3xl font-black font-poppins text-white uppercase">{user?.full_name || 'Member'}</h4>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] opacity-60 italic">Standard Subscription Tier</p>
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                                            <div className="px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[8px] font-black uppercase tracking-widest">Bio-Verified</div>
                                            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">Active Ops</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-secondary/50 outline-none transition-all text-white font-bold text-sm"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                                        <input type="email" defaultValue={user?.email || ''} readOnly className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-2xl outline-none text-muted-foreground font-bold text-sm cursor-not-allowed" />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                disabled={isUpdating}
                                className="mt-12 w-full md:w-auto px-12 h-16 bg-secondary text-white font-black rounded-2xl flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl glow-secondary disabled:opacity-50"
                            >
                                <Save size={18} /> {isUpdating ? 'Saving...' : 'Save Profile'}
                            </button>
                        </Card>
                    )}

                    {activeTab === 'security' && (
                        <Card className="p-10 md:p-12 border-white/5">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                                    <Shield size={24} />
                                </div>
                                <h3 className="text-2xl font-black font-poppins uppercase tracking-tighter">Security Settings</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Current Password</label>
                                        <input type="password" placeholder="••••••••••••" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-accent/50 outline-none transition-all text-white font-bold text-sm" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">New Password</label>
                                            <input type="password" placeholder="••••••••••••" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-accent/50 outline-none transition-all text-white font-bold text-sm" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Confirm New Password</label>
                                            <input type="password" placeholder="••••••••••••" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-accent/50 outline-none transition-all text-white font-bold text-sm" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 rounded-[40px] bg-red-400/5 border border-red-400/10 space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-400">DANGER ZONE: DELETE ACCOUNT</h4>
                                    <p className="text-[10px] font-medium text-red-200/60 uppercase tracking-widest leading-relaxed">Deleting your account will permanently remove all your data, expense history, and savings goals.</p>
                                    <button className="flex items-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-widest hover:underline pt-2 group">
                                        <Trash2 size={14} className="group-hover:rotate-12 transition-transform" /> Delete My Account
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveSecurity}
                                className="mt-12 w-full md:w-auto px-12 h-16 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                            >
                                <Lock size={18} /> Update Password
                            </button>
                        </Card>
                    )}
                </div>
            </div>
        </motion.div >
    );
}
