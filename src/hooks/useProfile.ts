import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services/dashboardService';
import type { UserId } from '../types/api';

export function useProfile(userId: UserId) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getProfile(userId),
  });
}
