import { useState } from 'react';
import { CalendarDays, Clock3, PhoneCall, Sparkles, MoreVertical } from 'lucide-react';
import { ComingSoonModal } from '../components/ComingSoonModal';
import { ErrorState } from '../components/ErrorState';
import { MetricCard } from '../components/MetricCard';
import { Skeleton } from '../components/Skeleton';
import { useDashboardData } from '../hooks/useDashboardData';
import type { CallSession, UserId } from '../types/api';
import { formatDuration } from '../utils/formatters';
import { getDisplayName } from '../utils/profile';

interface DashboardPageProps {
  userId: UserId;
}

export function DashboardPage({ userId }: DashboardPageProps) {
  const { profile, stats, sessions, isLoading, isError, refetchAll } = useDashboardData(userId);
  const [startCallOpen, setStartCallOpen] = useState(false);
  const [callActionOpen, setCallActionOpen] = useState(false);

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !profile.data || !stats.data || !sessions.data) {
    return <ErrorState onRetry={refetchAll} />;
  }

  const hasSessions = sessions.data.callSessions.length > 0;
  const displayName = getDisplayName(profile.data);

  return (
    <section aria-labelledby="dashboard-heading" className="min-w-0">
      <div className="relative min-h-[116px] lg:min-h-[95px]">
        <div>
          <h2 id="dashboard-heading" className="text-[22px] font-semibold leading-[1.15] tracking-[-0.2px] text-black lg:text-[27px]">
            Hi, {displayName} 👋 Welcome to Hintro
          </h2>
          <p className="mt-[7px] text-[11px] font-normal leading-none text-black lg:mt-[8px] lg:text-[16px]">Ready to make your next call smarter ?</p>
        </div>
        <button
          type="button"
          onClick={() => setStartCallOpen(true)}
          className="hintro-transition mt-[26px] h-[32px] rounded-[5px] bg-black px-[12px] text-[11px] font-normal text-white hover:opacity-90 lg:absolute lg:right-[9px] lg:top-[5px] lg:mt-0 lg:h-[48px] lg:px-[27px] lg:text-[17px]"
        >
          Start Call
        </button>
      </div>

      <div className="mt-[12px] grid max-w-[1258px] grid-cols-2 gap-x-[49px] gap-y-[14px] lg:mt-[26px] lg:grid-cols-4 lg:gap-[18px]">
        <MetricCard label="Total Sessions" value={String(stats.data.totalSessions)} icon={PhoneCall} tone="red" />
        <MetricCard label="Average Duration" value={formatStatDuration(stats.data.averageDuration)} icon={Clock3} tone="blue" />
        <MetricCard label="AI Used" value={stats.data.totalAIInteractions ? `${stats.data.totalAIInteractions} times` : '0'} icon={Sparkles} tone="green" />
        <MetricCard label="Last Session" value={stats.data.lastSession[0] ? relativeLastSession(stats.data.lastSession[0]) : '-'} icon={CalendarDays} tone="purple" />
      </div>

      <h3 className="mt-[52px] text-center text-[16px] font-semibold leading-none text-black lg:mt-[68px] lg:text-[22px]">Recent calls</h3>

      {hasSessions ? (
        <RecentCallsTimeline sessions={sessions.data.callSessions.slice(0, 4)} onCallAction={() => setCallActionOpen(true)} />
      ) : (
        <RecentCallsEmpty onStartCall={() => setStartCallOpen(true)} />
      )}

      <ComingSoonModal
        open={startCallOpen}
        title="Start a call"
        description="Call launching will connect to your calendar and meeting tools. This mock dashboard previews the experience — live calling is not enabled here."
        onClose={() => setStartCallOpen(false)}
      />
      <ComingSoonModal
        open={callActionOpen}
        title="Call actions"
        description="Call actions are available from each recent call. This mock shows the action entry point; transcript and detail actions would open from here."
        onClose={() => setCallActionOpen(false)}
      />
    </section>
  );
}

function formatStatDuration(seconds: number) {
  if (!seconds) return '0';
  return formatDuration(seconds).replace(/s\b/g, 'sec');
}

function relativeLastSession(value: string) {
  const elapsed = Math.max(0, Date.now() - new Date(value).getTime());
  const days = Math.max(1, Math.round(elapsed / 86_400_000));
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
}

function RecentCallsEmpty({ onStartCall }: { onStartCall: () => void }) {
  return (
    <div className="mx-auto mt-[48px] flex max-w-[1000px] flex-col items-center justify-center bg-white text-center lg:mt-[20px] lg:h-[235px] lg:rounded-[18px] lg:border lg:border-border">
      <div className="grid h-[35px] w-[35px] place-items-center rounded-[6px] bg-navActive text-navActiveText lg:h-[45px] lg:w-[45px] lg:rounded-[11px]">
        <CalendarDays className="h-[16px] w-[16px] lg:h-[25px] lg:w-[25px]" strokeWidth={2.2} aria-hidden="true" />
      </div>
      <p className="mt-[16px] text-[11px] font-semibold leading-none text-black lg:text-[19px]">No Recent Calls</p>
      <p className="mt-[10px] max-w-[310px] text-[11px] font-normal leading-[14px] text-[#999999] lg:max-w-[410px] lg:text-[13px] lg:leading-[17px]">
        Connect your Google Calendar to see upcoming meetings,
        <br />
        get reminders, and join calls directly from Hintro.
      </p>
      <button
        type="button"
        onClick={onStartCall}
        className="mt-[30px] h-[31px] rounded-[5px] border border-black bg-white px-[18px] text-[11px] font-normal text-black hover:bg-secondary lg:mt-[29px] lg:px-[13px] lg:text-[14px]"
      >
        Start a call
      </button>
    </div>
  );
}

function RecentCallsTimeline({ sessions, onCallAction }: { sessions: CallSession[]; onCallAction: () => void }) {
  const grouped = groupSessions(sessions);

  return (
    <div className="mt-[24px] max-w-[990px] lg:mx-auto lg:mt-[18px]">
      {grouped.map(([date, items]) => (
        <section key={date} className="mb-[26px]">
          <p className="mb-[18px] text-[11px] font-normal text-[#8f8f8f] lg:mb-[25px] lg:text-[16px]">{date}</p>
          <div className="space-y-[24px] lg:space-y-[36px]">
            {items.map((session) => {
              const userParticipant = session.participants.find((p) => p.isUser);
              const initial = userParticipant?.name?.charAt(0).toUpperCase() ?? 'C';
              return (
              <article key={session._id} className="grid grid-cols-[36px_1fr_70px_20px] items-center gap-[18px] lg:grid-cols-[37px_1fr_95px_24px] lg:gap-[24px]">
                <div className="grid h-[36px] w-[36px] place-items-center rounded-[5px] bg-[#842cf3] text-[17px] font-medium text-white lg:h-[37px] lg:w-[37px]">{initial}</div>
                <div className="min-w-0">
                  <p className="truncate text-[17px] font-normal leading-none text-black lg:text-[19px]">{session.description || 'Design Call'}</p>
                  <div className="mt-[7px] flex -space-x-[6px] lg:mt-[8px]" aria-label="Participants">
                    {[0, 1, 2].map((item) => (
                      <span key={item} className="h-[17px] w-[17px] rounded-full border border-white bg-[linear-gradient(135deg,#d8eeff,#2f4157)]" />
                    ))}
                  </div>
                </div>
                <time className="text-[14px] font-normal text-black lg:text-[16px]">{formatCallTime(session.started_at)}</time>
                <button
                  type="button"
                  onClick={onCallAction}
                  className="grid h-8 w-8 place-items-center rounded-token text-black hover:bg-secondary"
                  aria-label={`Actions for ${session.description || 'call'}`}
                >
                  <MoreVertical size={24} strokeWidth={3} aria-hidden="true" />
                </button>
              </article>
            );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function groupSessions(sessions: CallSession[]) {
  const formatter = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric' });
  const groups = new Map<string, CallSession[]>();

  sessions.forEach((session) => {
    const key = formatter.format(new Date(session.started_at));
    groups.set(key, [...(groups.get(key) ?? []), session]);
  });

  return Array.from(groups.entries());
}

function formatCallTime(value: string) {
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(new Date(value))
    .toLowerCase();
}

function DashboardSkeleton() {
  return (
    <section className="space-y-[30px]" aria-label="Loading dashboard">
      <div className="flex justify-between">
        <div>
          <Skeleton className="h-8 w-[410px]" />
          <Skeleton className="mt-3 h-4 w-[300px]" />
        </div>
        <Skeleton className="h-12 w-[170px]" />
      </div>
      <div className="grid max-w-[1258px] grid-cols-1 gap-[18px] md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-[100px] rounded-[11px]" />
        ))}
      </div>
      <Skeleton className="mx-auto h-[235px] max-w-[1000px] rounded-[18px]" />
    </section>
  );
}
