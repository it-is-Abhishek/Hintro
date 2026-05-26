import { PhoneCall, Sparkles, Clock3, CalendarDays } from 'lucide-react';
import { ErrorState } from '../components/ErrorState';
import { MetricCard } from '../components/MetricCard';
import { Skeleton } from '../components/Skeleton';
import { useDashboardData } from '../hooks/useDashboardData';
import type { UserId } from '../types/api';
import { formatDuration } from '../utils/formatters';

interface CallInsightsPageProps {
  userId: UserId;
}

export function CallInsightsPage({ userId }: CallInsightsPageProps) {
  const { stats, isLoading, isError, refetchAll } = useDashboardData(userId);

  if (isLoading) return <InsightsSkeleton />;
  if (isError || !stats.data) return <ErrorState onRetry={refetchAll} />;

  const data = stats.data;
  const hasData = data.totalSessions > 0;

  return (
    <section aria-labelledby="call-insights-heading" className="min-w-0">
      <h2 id="call-insights-heading" className="text-[27px] font-semibold leading-[1.1] tracking-[-0.2px] text-black">
        Call Insights
      </h2>
      <p className="mt-[8px] text-[16px] font-normal leading-none text-black">
        {hasData ? 'Overview of your call activity and AI usage.' : 'Start your first call to see insights here.'}
      </p>

      <div className="mt-[26px] grid max-w-[1258px] grid-cols-1 gap-[18px] md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Sessions" value={String(data.totalSessions)} icon={PhoneCall} tone="red" />
        <MetricCard
          label="Average Duration"
          value={data.averageDuration ? formatDuration(data.averageDuration) : '0'}
          icon={Clock3}
          tone="blue"
        />
        <MetricCard
          label="AI Interactions"
          value={data.totalAIInteractions ? `${data.totalAIInteractions} times` : '0'}
          icon={Sparkles}
          tone="green"
        />
        <MetricCard
          label="Last Session"
          value={data.lastSession[0] ? relativeLastSession(data.lastSession[0]) : '-'}
          icon={CalendarDays}
          tone="purple"
        />
      </div>
    </section>
  );
}

function relativeLastSession(value: string) {
  const elapsed = Math.max(0, Date.now() - new Date(value).getTime());
  const days = Math.max(1, Math.round(elapsed / 86_400_000));
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
}

function InsightsSkeleton() {
  return (
    <section className="space-y-[30px]" aria-label="Loading call insights">
      <Skeleton className="h-8 w-[280px]" />
      <Skeleton className="h-4 w-[360px]" />
      <div className="grid max-w-[1258px] grid-cols-1 gap-[18px] md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-[100px] rounded-[11px]" />
        ))}
      </div>
    </section>
  );
}
