'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Tag, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useCategories } from '@/hooks/useFinancialData';
import { api } from '@/lib/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface CategoryManagementProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CategoryManagement({ isOpen, onClose }: CategoryManagementProps) {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();
    const { data: categories, isLoading } = useCategories();

    const createMutation = useMutation({
        mutationFn: (name: string) => api.post('/categories', { name }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            setNewCategoryName('');
            toast.success('Category architecture updated.', {
                description: 'New financial node has been indexed.',
            });
        },
        onError: (err: any) => {
            toast.error('Indexing failed.', {
                description: err || 'Failed to create new category.',
            });
        },
        onSettled: () => setIsSubmitting(false)
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/categories/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category purged.', {
                description: 'Financial node removed from index.',
            });
        }
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        setIsSubmitting(true);
        createMutation.mutate(newCategoryName);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md glass p-10 rounded-[40px] border border-white/10 overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-8 top-8 p-2 rounded-full hover:bg-white/5 text-muted-foreground transition-all"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-2xl font-black font-poppins text-white uppercase tracking-tight">Manage Categories</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mt-1 italic">Define your financial architecture</p>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-6 mb-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">New Category Name</label>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="e.g. LUXURY"
                                        className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary/50 outline-none transition-all text-white font-bold text-xs tracking-widest placeholder:opacity-20 uppercase"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !newCategoryName.trim()}
                                        className="w-14 h-14 bg-primary text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 glow-primary shrink-0"
                                    >
                                        {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Plus size={24} />}
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-30 px-1">Active Index</h3>
                            {isLoading ? (
                                <div className="py-10 text-center opacity-20"><Loader2 className="animate-spin mx-auto" /></div>
                            ) : categories && categories.length > 0 ? (
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <div key={cat.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-primary/20 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                                    <Tag size={16} />
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">{cat.name}</span>
                                            </div>
                                            {!cat.is_default && (
                                                <button
                                                    onClick={() => deleteMutation.mutate(cat.id)}
                                                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-20">No custom categories indexed.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
