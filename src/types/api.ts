export type UserId = 'u1' | 'u2';

export interface Profile {
  id: UserId;
  email: string;
  firstName: string;
  lastName: string;
  login_method: string;
  status: string;
  is_hintro_admin: boolean;
  createdAt: string;
  updatedAt: string;
  /** Optional — shown in header when provided by the API */
  avatarUrl?: string;
  avatar?: string;
  profilePicture?: string;
  picture?: string;
}

export interface DashboardResponse {
  user: Profile;
  subscription: null | {
    plan: string;
    billing_cycle: string;
    status: string;
  };
  usage: {
    kb_files: {
      used: number;
      limit: number;
      percentage: number;
    };
    vocab_terms: number;
    notes: number;
  };
}

export interface CallSessionStats {
  totalSessions: number;
  averageDuration: number;
  totalAIInteractions: number;
  lastSession: string[];
}

export interface Participant {
  name: string;
  isUser: boolean;
}

export interface CallSession {
  _id: string;
  user_id: UserId;
  status: string;
  client: string;
  description: string;
  started_at: string;
  ended_at: string;
  total_duration_seconds: number;
  language: string[];
  auto_gen_ai_response: boolean;
  save_transcript: boolean;
  transcript: null | string;
  transcript_final: boolean;
  ai_interactions: number;
  call_framework_id: null | string;
  participants: Participant[];
  ended_reason: string;
  createdAt: string;
  updatedAt: string;
}

export interface CallSessionsResponse {
  callSessions: CallSession[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface FeedbackEntry {
  rating: number;
  message: string;
  createdAt: string;
}
