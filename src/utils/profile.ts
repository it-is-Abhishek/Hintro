import type { Profile } from '../types/api';

export function getDisplayName(profile: Profile): string {
  const first = profile.firstName?.trim();
  if (first) return first;
  const last = profile.lastName?.trim();
  if (last) return last;
  return profile.email.split('@')[0] || 'there';
}

export function getFullName(profile: Profile): string {
  const parts = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : getDisplayName(profile);
}

export function getInitials(profile: Profile): string {
  const first = profile.firstName?.trim().charAt(0) ?? '';
  const last = profile.lastName?.trim().charAt(0) ?? '';
  const initials = `${first}${last}`.toUpperCase();
  if (initials) return initials;
  return profile.email.charAt(0).toUpperCase() || '?';
}

export function getProfileImageUrl(profile: Profile): string | undefined {
  const extended = profile as Profile & {
    avatarUrl?: string;
    avatar?: string;
    profilePicture?: string;
    picture?: string;
    photoUrl?: string;
  };

  const url =
    extended.avatarUrl ??
    extended.avatar ??
    extended.profilePicture ??
    extended.picture ??
    extended.photoUrl;

  return typeof url === 'string' && url.trim().length > 0 ? url.trim() : undefined;
}
