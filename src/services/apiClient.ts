import axios from 'axios';
import type { UserId } from '../types/api';

export const API_BASE_URL = 'https://mock-backend-hintro.vercel.app';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12_000,
});

export function withUserHeader(userId: UserId) {
  return {
    headers: {
      'x-user-id': userId,
    },
  };
}
