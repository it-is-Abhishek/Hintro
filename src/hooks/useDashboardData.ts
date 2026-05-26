import { useQuery } from '@tanstack/react-query';
import { getCallSessions, getCallSessionStats, getDashboard, getProfile } from '../services/dashboardService';
import type { UserId } from '../types/api';

export function useDashboardData(userId: UserId) {
  const profile = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getProfile(userId),
  });

  const dashboard = useQuery({
    queryKey: ['dashboard', userId],
    queryFn: () => getDashboard(userId),
  });

  const stats = useQuery({
    queryKey: ['call-session-stats', userId],
    queryFn: () => getCallSessionStats(userId),
  });

  const sessions = useQuery({
    queryKey: ['call-sessions', userId, 10],
    queryFn: () => getCallSessions(userId, 10),
  });

  return {
    profile,
    dashboard,
    stats,
    sessions,
    isLoading: profile.isLoading || dashboard.isLoading || stats.isLoading || sessions.isLoading,
    isError: profile.isError || dashboard.isError || stats.isError || sessions.isError,
    refetchAll: () => {
      void profile.refetch();
      void dashboard.refetch();
      void stats.refetch();
      void sessions.refetch();
    },
  };
}
