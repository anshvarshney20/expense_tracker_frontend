
export type APIResponse<T> = {
  success: boolean;
  data: T | null;
  error: any | null;
  message: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string | null;
  is_active: boolean;
  currency?: string;
};

export type Expense = {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  category: string;
  emotion: string | null;
  is_avoidable: boolean;
  date: string;
  created_at: string;
};

export type PotPriority = 'low' | 'medium' | 'high';

export type Pot = {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  priority: PotPriority;
  progress_percentage: number;
  remaining_amount: number;
};

export type AIAnalysis = {
  summary: string;
  suggestions: {
    category: string;
    reduction: number;
    reason: string;
  }[];
  discipline_score: number;
  savings_rate: number;
  timeline_impact: string;
  savings_potential: number;
};

export type ExpenseSummary = {
  total_amount: number;
  count: number;
  lifetime_total: number;
  category_breakdown: Record<string, number>;
};

export type AuthResponse = {
  user: User;
  access_token: string;
  token_type: string;
};
