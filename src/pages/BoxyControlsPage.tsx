import { Trophy } from 'lucide-react';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { Skeleton } from '../components/Skeleton';
import { useDashboardData } from '../hooks/useDashboardData';
import type { UserId } from '../types/api';

interface BoxyControlsPageProps {
  userId: UserId;
}

export function BoxyControlsPage({ userId }: BoxyControlsPageProps) {
  const { dashboard, isLoading, isError, refetchAll } = useDashboardData(userId);

  if (isLoading) return <PageSkeleton />;
  if (isError || !dashboard.data) return <ErrorState onRetry={refetchAll} />;

  const subscription = dashboard.data.subscription;
  const isEmpty = !subscription;

  return (
    <section aria-labelledby="boxy-controls-heading" className="min-w-0">
      <h2 id="boxy-controls-heading" className="text-[27px] font-semibold leading-[1.1] tracking-[-0.2px] text-black">
        Boxy Controls
      </h2>
      <p className="mt-[8px] text-[16px] font-normal leading-none text-black">
        Configure your Boxy assistant and subscription settings.
      </p>

      {isEmpty ? (
        <div className="mx-auto mt-[40px] max-w-[600px] rounded-[18px] border border-border bg-white">
          <EmptyState
            title="No active subscription"
            description="Upgrade your plan to unlock Boxy controls and advanced assistant features."
          />
        </div>
      ) : (
        <div className="mt-[26px] max-w-[600px] rounded-[18px] border border-border bg-white p-8">
          <div className="flex items-center gap-4">
            <div className="grid h-[45px] w-[45px] place-items-center rounded-[11px] bg-navActive text-navActiveText">
              <Trophy size={25} strokeWidth={2.2} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[19px] font-semibold capitalize text-black">{subscription.plan} plan</p>
              <p className="mt-1 text-[14px] capitalize text-subtle">
                {subscription.billing_cycle} · {subscription.status}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PageSkeleton() {
  return (
    <section className="space-y-[30px]" aria-label="Loading boxy controls">
      <Skeleton className="h-8 w-[280px]" />
      <Skeleton className="h-4 w-[360px]" />
      <Skeleton className="mx-auto mt-10 h-[200px] max-w-[600px] rounded-[18px]" />
    </section>
  );
}
