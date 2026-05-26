import { useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CircleAlert,
  BatteryFull,
  FileText,
  Gift,
  Inbox,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Phone,
  Play,
  SignalHigh,
  Trophy,
  Wifi,
  X,
} from 'lucide-react';
import { ComingSoonModal } from '../components/ComingSoonModal';
import { FeedbackModal } from '../components/FeedbackModal';
import { LogoutModal } from '../components/LogoutModal';
import { Skeleton } from '../components/Skeleton';
import { UserAvatar } from '../components/UserAvatar';
import { NAV_ITEMS, ROUTES, routeTitle } from '../constants/routes';
import { useProfile } from '../hooks/useProfile';
import type { UserId } from '../types/api';
import { getDisplayName } from '../utils/profile';

interface AppLayoutProps {
  children: ReactNode;
  userId: UserId;
  onUserChange: (userId: UserId) => void;
}

const navIcons = {
  Dashboard: LayoutDashboard,
  'Call Insights': Phone,
  'Knowledge Base': FileText,
  Prompts: MessageSquare,
  'Boxy Controls': Trophy,
} as const;

export function AppLayout({ children, userId, onUserChange }: AppLayoutProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const profileQuery = useProfile(userId);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  function switchUser() {
    const nextUser: UserId = userId === 'u1' ? 'u2' : 'u1';
    onUserChange(nextUser);
  }

  function goTo(path: string) {
    navigate(path);
    setMobileSidebarOpen(false);
    setProfileOpen(false);
  }

  const pageTitle = routeTitle(pathname);
  const profile = profileQuery.data;

  const sidebar = (
    <aside className="flex h-full w-[248px] flex-col border-r border-border bg-surface lg:w-sidebar">
      <div className="flex h-[78px] items-center px-[18px] lg:h-[86px] lg:px-[78px]">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close sidebar"
          className="grid h-9 w-9 place-items-center text-black lg:hidden"
        >
          <X size={26} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(ROUTES.dashboard)}
          className="hidden text-[31px] font-normal tracking-[-0.2px] text-black lg:block"
        >
          Hintro
        </button>
      </div>

      <nav className="space-y-[15px] px-[18px] pt-[60px] lg:space-y-[13px] lg:px-[22px] lg:pt-[31px]" aria-label="Primary navigation">
        {NAV_ITEMS.map(({ label, path, info }) => {
          const Icon = navIcons[label];
          const active = pathname === path;
          return (
            <button
              key={label}
              type="button"
              onClick={() => goTo(path)}
              aria-current={active ? 'page' : undefined}
              className={`hintro-transition flex h-[25px] w-full items-center rounded-[8px] px-0 text-left text-[14px] font-normal lg:h-[47px] lg:px-[14px] lg:text-[20px] ${
                active ? 'bg-[color:var(--nav-active)] text-[color:var(--nav-active-text)]' : 'text-[#24262a] hover:bg-secondary'
              }`}
            >
              <Icon
                className={`mr-[16px] h-[16px] w-[16px] shrink-0 lg:mr-[18px] lg:h-[20px] lg:w-[20px] ${active ? 'text-[color:var(--nav-active-text)]' : 'text-[#4f4f4f]'}`}
                strokeWidth={2.6}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate">{label}</span>
              {info ? <CircleAlert className="ml-3 hidden h-[20px] w-[20px] shrink-0 text-black lg:block" strokeWidth={2.2} aria-hidden="true" /> : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto h-[237px] border-t border-border px-[18px] pb-[31px] pt-[28px] lg:h-[313px] lg:px-[30px] lg:pt-[31px]">
        <div className="space-y-[20px] lg:space-y-[24px]">
          <button
            type="button"
            onClick={() => goTo(ROUTES.feedbackHistory)}
            aria-current={pathname === ROUTES.feedbackHistory ? 'page' : undefined}
            className={`hintro-transition flex h-[26px] w-full items-center text-left text-[14px] font-normal hover:text-black lg:h-[34px] lg:text-[20px] ${
              pathname === ROUTES.feedbackHistory ? 'text-black' : 'text-[#24262a]'
            }`}
          >
            <Inbox className="mr-[16px] h-[17px] w-[17px] text-[#4f4f4f] lg:mr-[18px] lg:h-[22px] lg:w-[22px]" strokeWidth={2.4} aria-hidden="true" />
            Feedback History
          </button>
          <button
            type="button"
            onClick={() => {
              setFeedbackOpen(true);
              setMobileSidebarOpen(false);
            }}
            className="hintro-transition flex h-[26px] w-full items-center text-left text-[14px] font-normal text-[#24262a] hover:text-black lg:h-[34px] lg:text-[20px]"
          >
            <Gift className="mr-[16px] h-[17px] w-[17px] text-[#4f4f4f] lg:mr-[18px] lg:h-[24px] lg:w-[24px]" strokeWidth={2.4} aria-hidden="true" />
            Feedback
          </button>
        </div>
        <button
          type="button"
          onClick={() => setUpgradeOpen(true)}
          className="hintro-transition mt-[36px] h-[33px] w-[178px] rounded-[6px] bg-[color:var(--upgrade)] text-[15px] font-normal text-white hover:bg-[color:var(--upgrade-hover)] lg:mt-[48px] lg:h-[43px] lg:w-[225px] lg:rounded-[8px] lg:text-[19px]"
        >
          Upgrade
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background lg:h-screen lg:overflow-hidden">
      <div className="fixed inset-y-0 left-0 z-30 hidden w-[calc(var(--sidebar-width)*var(--app-scale))] overflow-hidden border-r border-border bg-surface lg:block">
        <div className="origin-top-left scale-[var(--app-scale)]">{sidebar}</div>
      </div>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${mobileSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!mobileSidebarOpen}
      >
        <div
          className={`absolute inset-0 bg-black/30 hintro-transition ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileSidebarOpen(false)}
        />
        <div className={`absolute inset-y-0 left-0 hintro-transition ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>{sidebar}</div>
      </div>

      <header className="fixed left-0 right-0 top-0 z-20 flex h-[120px] flex-col border-b border-border bg-surface lg:left-[calc(var(--sidebar-width)*var(--app-scale))] lg:h-[calc(86px*var(--app-scale))] lg:flex-row lg:items-center">
        <div className="flex h-[54px] w-full items-center justify-between px-[64px] text-black lg:hidden">
          <span className="text-[20px] font-semibold leading-none">9:41</span>
          <div className="flex items-center gap-[6px]">
            <SignalHigh size={22} fill="black" strokeWidth={3} aria-hidden="true" />
            <Wifi size={20} fill="black" strokeWidth={3} aria-hidden="true" />
            <BatteryFull size={27} fill="black" strokeWidth={2.2} aria-hidden="true" />
          </div>
        </div>
        <div className="relative flex h-[66px] w-full items-center lg:contents">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Open sidebar"
          className="ml-[20px] grid h-10 w-10 place-items-center rounded-token text-text hover:bg-secondary lg:hidden"
        >
          <Menu size={31} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[21px] font-semibold tracking-[-0.2px] text-black lg:static lg:ml-[58px] lg:translate-x-0 lg:scale-[var(--app-scale)] lg:origin-left lg:text-[31px] lg:font-normal">
          {pageTitle}
        </h1>
        <div className="ml-auto mr-[25px] flex origin-right items-center gap-[36px] lg:mr-[43px] lg:scale-[var(--app-scale)] max-sm:gap-3">
          <button
            type="button"
            onClick={() => setTutorialOpen(true)}
            className="hintro-transition flex h-[41px] items-center gap-[17px] rounded-[5px] border border-black bg-white px-[17px] text-[16px] font-normal text-[#202020] hover:bg-secondary max-sm:hidden"
          >
            <Play size={22} className="fill-black text-black" aria-hidden="true" />
            Watch Tutorial
          </button>
          <div className="relative flex items-center gap-[17px]">
            <button
              type="button"
              onDoubleClick={switchUser}
              onClick={() => setProfileOpen((open) => !open)}
              className="flex items-center gap-[17px]"
              aria-label={profile ? `Open profile menu for ${getDisplayName(profile)}` : 'Open profile menu'}
              aria-expanded={profileOpen}
            >
              {profileQuery.isLoading ? (
                <Skeleton className="h-[42px] w-[42px] rounded-full" />
              ) : profile ? (
                <>
                  <UserAvatar profile={profile} className="h-[24px] w-[24px] lg:h-[42px] lg:w-[42px]" />
                  <span className="hidden text-[15px] font-normal text-[#202020] sm:inline">{getDisplayName(profile)}</span>
                </>
              ) : (
                <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-[#d7edff] text-[14px] text-[#263347]">?</span>
              )}
            </button>
            {profileOpen ? (
              <div className="absolute right-0 top-[50px] z-50 w-[200px] rounded-[4px] bg-white py-[18px] shadow-[0_3px_12px_rgba(0,0,0,0.16)]">
                {profile ? (
                  <p className="border-b border-border px-[16px] pb-3 text-[13px] text-subtle">{profile.email}</p>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    setLogoutOpen(true);
                  }}
                  className="flex w-full items-center px-[16px] pt-3 text-left text-[17px] font-normal text-black"
                >
                  Log out
                </button>
              </div>
            ) : null}
          </div>
        </div>
        </div>
      </header>

      <main className="min-h-screen pt-[120px] lg:pl-[calc(var(--sidebar-width)*var(--app-scale))] lg:pt-[calc(86px*var(--app-scale))]">
        <div className="origin-top-left px-[25px] pb-10 pt-[27px] sm:px-[32px] lg:w-[calc(100%/var(--app-scale))] lg:scale-[var(--app-scale)] lg:px-[104px] lg:pt-[29px] 2xl:px-[104px]">
          {children}
        </div>
      </main>

      <button type="button" onClick={switchUser} className="sr-only">
        Switch mock user ({userId === 'u1' ? 'show u2 data' : 'show u1 empty states'})
      </button>
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
      <ComingSoonModal
        open={upgradeOpen}
        title="Upgrade your plan"
        description="Professional and enterprise plans unlock more knowledge base storage, advanced Boxy controls, and priority support."
        onClose={() => setUpgradeOpen(false)}
      />
      <ComingSoonModal
        open={tutorialOpen}
        title="Watch Tutorial"
        description="A guided walkthrough of Hintro will be available here. For now, explore the dashboard and sidebar sections."
        onClose={() => setTutorialOpen(false)}
      />
    </div>
  );
}
