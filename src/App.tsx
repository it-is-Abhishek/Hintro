import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { ROUTES } from './constants/routes';
import { BoxyControlsPage } from './pages/BoxyControlsPage';
import { CallInsightsPage } from './pages/CallInsightsPage';
import { DashboardPage } from './pages/DashboardPage';
import { FeedbackHistoryPage } from './pages/FeedbackHistoryPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { PromptsPage } from './pages/PromptsPage';
import type { UserId } from './types/api';

export default function App() {
  const initialUser = new URLSearchParams(window.location.search).get('user') === 'u2' ? 'u2' : 'u1';
  const [userId, setUserId] = useState<UserId>(initialUser);

  function handleUserChange(nextUser: UserId) {
    setUserId(nextUser);
    window.history.replaceState(null, '', `?user=${nextUser}`);
  }

  return (
    <AppLayout userId={userId} onUserChange={handleUserChange}>
      <Routes>
        <Route path={ROUTES.dashboard} element={<DashboardPage userId={userId} />} />
        <Route path={ROUTES.callInsights} element={<CallInsightsPage userId={userId} />} />
        <Route path={ROUTES.knowledgeBase} element={<KnowledgeBasePage userId={userId} />} />
        <Route path={ROUTES.prompts} element={<PromptsPage userId={userId} />} />
        <Route path={ROUTES.boxyControls} element={<BoxyControlsPage userId={userId} />} />
        <Route path={ROUTES.feedbackHistory} element={<FeedbackHistoryPage />} />
        <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
      </Routes>
    </AppLayout>
  );
}
