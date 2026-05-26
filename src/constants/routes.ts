export const ROUTES = {
  dashboard: '/',
  callInsights: '/call-insights',
  knowledgeBase: '/knowledge-base',
  prompts: '/prompts',
  boxyControls: '/boxy-controls',
  feedbackHistory: '/feedback-history',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.dashboard, info: false },
  { label: 'Call Insights', path: ROUTES.callInsights, info: false },
  { label: 'Knowledge Base', path: ROUTES.knowledgeBase, info: true },
  { label: 'Prompts', path: ROUTES.prompts, info: true },
  { label: 'Boxy Controls', path: ROUTES.boxyControls, info: true },
] as const;

export function routeTitle(pathname: string): string {
  const item = NAV_ITEMS.find((nav) => nav.path === pathname);
  if (item) return item.label;
  if (pathname === ROUTES.feedbackHistory) return 'Feedback History';
  return 'Dashboard';
}
