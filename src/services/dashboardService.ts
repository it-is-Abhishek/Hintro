import { apiClient, withUserHeader } from './apiClient';
import type { CallSessionsResponse, CallSessionStats, DashboardResponse, Profile, UserId } from '../types/api';

export async function getProfile(userId: UserId) {
  const response = await apiClient.get<Profile>('/api/auth/profile', withUserHeader(userId));
  return response.data;
}

export async function getDashboard(userId: UserId) {
  const response = await apiClient.get<DashboardResponse>('/api/auth/dashboard', withUserHeader(userId));
  return response.data;
}

export async function getCallSessionStats(userId: UserId) {
  const response = await apiClient.get<CallSessionStats>('/api/call-sessions/stats', withUserHeader(userId));
  return response.data;
}

export async function getCallSessions(userId: UserId, limit = 10) {
  const response = await apiClient.get<CallSessionsResponse>('/api/call-sessions', {
    ...withUserHeader(userId),
    params: { limit },
  });
  return response.data;
}
