import { MessageSquare } from 'lucide-react';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { Skeleton } from '../components/Skeleton';
import { useDashboardData } from '../hooks/useDashboardData';
import type { UserId } from '../types/api';

interface PromptsPageProps {
  userId: UserId;
}

export function PromptsPage({ userId }: PromptsPageProps) {
  const { dashboard, isLoading, isError, refetchAll } = useDashboardData(userId);

  if (isLoading) return <PageSkeleton />;
  if (isError || !dashboard.data) return <ErrorState onRetry={refetchAll} />;

  const { vocab_terms, notes } = dashboard.data.usage;
  const isEmpty = vocab_terms === 0 && notes === 0;

  return (
    <section aria-labelledby="prompts-heading" className="min-w-0">
      <h2 id="prompts-heading" className="text-[27px] font-semibold leading-[1.1] tracking-[-0.2px] text-black">
        Prompts
      </h2>
      <p className="mt-[8px] text-[16px] font-normal leading-none text-black">
        Custom vocabulary and notes for your calls.
      </p>

      {isEmpty ? (
        <div className="mx-auto mt-[40px] max-w-[600px] rounded-[18px] border border-border bg-white">
          <EmptyState
            title="No prompts configured"
            description="Add vocabulary terms and notes to personalize how Hintro assists you on calls."
          />
        </div>
      ) : (
        <div className="mt-[26px] grid max-w-[700px] grid-cols-1 gap-[18px] sm:grid-cols-2">
          <UsageCard icon={MessageSquare} label="Vocabulary terms" value={vocab_terms} />
          <UsageCard icon={MessageSquare} label="Notes" value={notes} />
        </div>
      )}
    </section>
  );
}

function UsageCard({ icon: Icon, label, value }: { icon: typeof MessageSquare; label: string; value: number }) {
  return (
    <div className="rounded-[18px] border border-border bg-white p-6">
      <Icon size={22} className="text-muted" aria-hidden="true" />
      <p className="mt-4 text-[28px] font-semibold text-black">{value}</p>
      <p className="mt-1 text-[14px] text-subtle">{label}</p>
    </div>
  );
}

function PageSkeleton() {
  return (
    <section className="space-y-[30px]" aria-label="Loading prompts">
      <Skeleton className="h-8 w-[200px]" />
      <Skeleton className="h-4 w-[360px]" />
      <Skeleton className="mx-auto mt-10 h-[200px] max-w-[600px] rounded-[18px]" />
    </section>
  );
}
