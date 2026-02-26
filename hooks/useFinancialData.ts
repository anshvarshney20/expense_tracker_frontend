import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Expense, Pot, ExpenseSummary, AIAnalysis, ExpenseList } from '@/lib/types';
import { useAuth } from './useAuth';

export function useExpenses(params?: any) {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['expenses', params],
        queryFn: () => api.get<ExpenseList>('/expenses', { params }),
        enabled: !!user,
    });
}

export function useMonthlySummary(year: number, month: number) {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['expenses', 'summary', year, month],
        queryFn: () => api.get<ExpenseSummary>(`/expenses/summary`, {
            params: { year, month }
        }),
        enabled: !!user,
    });
}

export function usePots() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['pots'],
        queryFn: () => api.get<Pot[]>('/pots'),
        enabled: !!user,
    });
}

export function useAIAnalysis() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['ai', 'analysis'],
        queryFn: () => api.post<AIAnalysis>('/ai/analyze'),
        enabled: !!user,
    });
}

export function useCategories() {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => api.get<any[]>('/categories'),
        enabled: !!user,
    });
}
