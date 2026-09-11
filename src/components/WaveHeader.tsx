import React from 'react';
import { ScreenId } from '../types';

interface WaveHeaderProps {
  currentScreen: ScreenId;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const WaveHeader: React.FC<WaveHeaderProps> = ({
  currentScreen,
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 1,
}) => {
  const getScreenTitle = (screen: ScreenId) => {
    switch (screen) {
      case 'home-dashboard':
        return 'Dashboard';
      case 'courses':
        return 'Courses Hub';
      case 'deadlines-tasks':
        return 'Deadlines & Tasks';
      case 'exams-schedule':
        return 'Exams Schedule';
      case 'gpa-academic':
        return 'GPA Academic';
      default:
        return 'Academic Portal';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#191c3d] text-white border-b border-white/10 shadow-md">
      <div className="w-full max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Brand Icon + Title & Screen Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[#fe6b75] border border-white/10">
            <span className="material-symbols-outlined text-[20px]">school</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[16px] tracking-tight text-white truncate">Student OS</span>
              <span className="text-[10px] font-semibold text-[#fe6b75] bg-[#fe6b75]/15 border border-[#fe6b75]/30 rounded-full px-2 py-0.2 uppercase tracking-wide">
                {getScreenTitle(currentScreen)}
              </span>
            </div>
            <span className="text-[11px] text-[#a5a8d4] truncate">University of Cape Coast • L300</span>
          </div>
        </div>

        {/* Right: Search, Notifications, Profile Avatar */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            aria-label="Search"
            onClick={onOpenSearch}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/90 transition-colors"
          >
            <span className="material-symbols-outlined text-[19px]">search</span>
          </button>

          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/90 transition-colors relative"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fe6b75] ring-2 ring-[#191c3d]"></span>
            )}
          </button>

          <button
            aria-label="Student Profile"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full overflow-hidden border border-white/20 hover:ring-2 hover:ring-[#fe6b75] transition-all ml-1 relative group flex-shrink-0 bg-[#020324]"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9A4eLuqlWD-tKDpqhBBObc40h4T2qHgIYBLDIL-dDoiundnqMRK0gxpL61-avLAS7Gqn1arbF2bHsy5Es7ScFpyU6y0PyuW7HbPpITixY3RdbbX4cXBKp0OBd9Nr-bOfVVGRARFYaOVw56NYkc_Ro_LsNTli4ZKhnOo-rfKBCuXFwQQ6yWwUtEUZMnE_UchoNROLjW2hGOg1Upyh5QceMN_PgQciDm38Rz52fhvgucXYiEaoy_eXRw"
              alt="Kwame Mensah"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

