import { FileText } from 'lucide-react';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { Skeleton } from '../components/Skeleton';
import { useDashboardData } from '../hooks/useDashboardData';
import type { UserId } from '../types/api';

interface KnowledgeBasePageProps {
  userId: UserId;
}

export function KnowledgeBasePage({ userId }: KnowledgeBasePageProps) {
  const { dashboard, isLoading, isError, refetchAll } = useDashboardData(userId);

  if (isLoading) return <PageSkeleton />;
  if (isError || !dashboard.data) return <ErrorState onRetry={refetchAll} />;

  const usage = dashboard.data.usage.kb_files;
  const isEmpty = usage.used === 0;

  return (
    <section aria-labelledby="knowledge-base-heading" className="min-w-0">
      <h2 id="knowledge-base-heading" className="text-[27px] font-semibold leading-[1.1] tracking-[-0.2px] text-black">
        Knowledge Base
      </h2>
      <p className="mt-[8px] text-[16px] font-normal leading-none text-black">
        Manage files and resources for smarter calls.
      </p>

      {isEmpty ? (
        <div className="mx-auto mt-[40px] max-w-[600px] rounded-[18px] border border-border bg-white">
          <EmptyState
            title="No knowledge base files yet"
            description="Upload documents to help Hintro answer questions during your calls."
          />
        </div>
      ) : (
        <div className="mt-[26px] max-w-[600px] rounded-[18px] border border-border bg-white p-8">
          <div className="flex items-center gap-4">
            <div className="grid h-[45px] w-[45px] place-items-center rounded-[11px] bg-navActive text-navActiveText">
              <FileText size={25} strokeWidth={2.2} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[19px] font-semibold text-black">Storage usage</p>
              <p className="mt-1 text-[14px] text-subtle">
                {usage.used} of {usage.limit} files ({usage.percentage}%)
              </p>
            </div>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary hintro-transition"
              style={{ width: `${Math.min(100, usage.percentage)}%` }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function PageSkeleton() {
  return (
    <section className="space-y-[30px]" aria-label="Loading knowledge base">
      <Skeleton className="h-8 w-[280px]" />
      <Skeleton className="h-4 w-[360px]" />
      <Skeleton className="mx-auto mt-10 h-[200px] max-w-[600px] rounded-[18px]" />
    </section>
  );
}
