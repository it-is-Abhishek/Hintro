import { Star } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { getStoredFeedback } from '../services/feedbackStorage';

export function FeedbackHistoryPage() {
  const entries = getStoredFeedback();

  return (
    <section aria-labelledby="feedback-history-heading" className="min-w-0">
      <h2 id="feedback-history-heading" className="text-[27px] font-semibold leading-[1.1] tracking-[-0.2px] text-black">
        Feedback History
      </h2>
      <p className="mt-[8px] text-[16px] font-normal leading-none text-black">
        Feedback you have submitted from this browser.
      </p>

      {entries.length === 0 ? (
        <div className="mx-auto mt-[40px] max-w-[600px] rounded-[18px] border border-border bg-white">
          <EmptyState
            title="No feedback yet"
            description="Use the Feedback button in the sidebar to share your experience."
          />
        </div>
      ) : (
        <ul className="mt-[26px] max-w-[700px] space-y-4">
          {entries.map((entry, index) => (
            <li key={`${entry.createdAt}-${index}`} className="rounded-[12px] border border-border bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-1" aria-label={`Rating ${entry.rating} out of 5`}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      size={16}
                      className={value <= entry.rating ? 'fill-primary text-primary' : 'text-muted'}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <time className="text-[12px] text-subtle" dateTime={entry.createdAt}>
                  {new Intl.DateTimeFormat('en', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  }).format(new Date(entry.createdAt))}
                </time>
              </div>
              <p className="mt-3 text-[14px] leading-6 text-text">{entry.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
