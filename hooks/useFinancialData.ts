
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Expense, Pot, ExpenseSummary, AIAnalysis } from '@/lib/types';

export function useExpenses(params?: any) {
    return useQuery({
        queryKey: ['expenses', params],
        queryFn: () => api.get<Expense[]>('/expenses', { params }),
    });
}

export function useMonthlySummary(year: number, month: number) {
    return useQuery({
        queryKey: ['expenses', 'summary', year, month],
        queryFn: () => api.get<ExpenseSummary>(`/expenses/summary`, {
            params: { year, month }
        }),
    });
}

export function usePots() {
    return useQuery({
        queryKey: ['pots'],
        queryFn: () => api.get<Pot[]>('/pots'),
    });
}

export function useAIAnalysis() {
    return useQuery({
        queryKey: ['ai', 'analysis'],
        queryFn: () => api.post<AIAnalysis>('/ai/analyze'),
    });
}
