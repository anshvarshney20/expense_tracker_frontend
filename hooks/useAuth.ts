
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useAuth() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data: user, isLoading, isError } = useQuery<User | null>({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await api.get<User>('/auth/me');
                return user;
            } catch (err) {
                return null;
            }
        },
        retry: false,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });

    const logout = useMutation({
        mutationFn: () => api.post('/auth/logout'),
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
            router.push('/login');
        },
    });

    const updateProfile = useMutation({
        mutationFn: (data: Partial<User>) => api.patch<User>('/auth/me', data),
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['user'], updatedUser);
            toast.success('System configuration updated successfully.');
        },
        onError: (error: string) => {
            toast.error('Update failed', { description: error });
        }
    });

    return {
        user,
        isLoading,
        isError,
        isAuthenticated: !!user,
        logout: logout.mutate,
        updateProfile: updateProfile.mutate,
        isUpdating: updateProfile.isPending,
    };
}
