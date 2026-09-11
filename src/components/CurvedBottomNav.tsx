import React from 'react';
import { ScreenId } from '../types';

interface CurvedBottomNavProps {
  currentScreen: ScreenId;
  onSelectScreen?: (screen: ScreenId) => void;
  onNavigate?: (screen: ScreenId) => void;
  urgentCount?: number;
}

export const CurvedBottomNav: React.FC<CurvedBottomNavProps> = ({
  currentScreen,
  onSelectScreen,
  onNavigate,
  urgentCount = 1,
}) => {
  const handleNav = (screen: ScreenId) => {
    if (onSelectScreen) onSelectScreen(screen);
    if (onNavigate) onNavigate(screen);
  };

  const navItems = [
    { id: 'home-dashboard' as ScreenId, label: 'Home', icon: 'dashboard' },
    { id: 'courses' as ScreenId, label: 'Courses', icon: 'menu_book' },
    { id: 'deadlines-tasks' as ScreenId, label: 'Tasks', icon: 'event_upcoming', badge: urgentCount },
    { id: 'exams-schedule' as ScreenId, label: 'Exams', icon: 'school' },
    { id: 'gpa-academic' as ScreenId, label: 'GPA Hub', icon: 'calculate' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pb-3 pt-1 bg-gradient-to-t from-[#fbf8ff] via-[#fbf8ff]/95 to-transparent pointer-events-none">
      <div className="w-full max-w-md mx-auto px-4 pointer-events-auto">
        {/* Solid rounded rectangle bottom nav */}
        <nav
          aria-label="Main Navigation"
          className="w-full bg-[#191c3d] rounded-2xl p-1.5 flex items-center justify-between shadow-[0_12px_30px_rgba(25,28,61,0.35)] border border-white/10"
        >
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNav(item.id)}
                aria-label={item.label}
                className={`relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#fe6b75] text-white shadow-md'
                    : 'text-[#8f92be] hover:text-white hover:bg-white/5 active:scale-95'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">
                    {item.icon}
                  </span>
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#fe6b75] ring-2 ring-[#191c3d]" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold tracking-tight mt-0.5 ${
                    isActive ? 'text-white' : 'text-[#8f92be]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

