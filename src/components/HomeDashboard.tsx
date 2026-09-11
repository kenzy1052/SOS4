import React, { useState } from 'react';
import { SubTabId } from '../types';

interface HomeDashboardProps {
  subTab: SubTabId;
  onNavigate: (screen: any) => void;
  onOpenSubmitModal: () => void;
  onOpenQuickOp: (type: 'course' | 'task' | 'exam' | 'study') => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  subTab,
  onNavigate,
  onOpenSubmitModal,
  onOpenQuickOp,
}) => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'highlights'>('today');
  const [solutionSubmitted, setSolutionSubmitted] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* Top Profile Banner with Clean Rounded Bottom */}
      <div className="w-full bg-[#191c3d] text-white px-4 pt-3 pb-5 rounded-b-2xl shadow-md border-b border-white/10">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#dfe1f8] flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.2)] border-2 border-white/20">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9A4eLuqlWD-tKDpqhBBObc40h4T2qHgIYBLDIL-dDoiundnqMRK0gxpL61-avLAS7Gqn1arbF2bHsy5Es7ScFpyU6y0PyuW7HbPpITixY3RdbbX4cXBKp0OBd9Nr-bOfVVGRARFYaOVw56NYkc_Ro_LsNTli4ZKhnOo-rfKBCuXFwQQ6yWwUtEUZMnE_UchoNROLjW2hGOg1Upyh5QceMN_PgQciDm38Rz52fhvgucXYiEaoy_eXRw"
                alt="Kwame Mensah"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[17px] text-white truncate">Kwame Mensah</span>
                <span className="material-symbols-outlined text-[16px] text-[#fe6b75]">verified</span>
              </div>
              <span className="text-[12px] text-[#c1c3ee] truncate">BSc Computer Science • Level 300, UCC</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#e0e0ff] backdrop-blur-md border border-white/10 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-wide uppercase">Offline Ready</span>
          </div>
        </div>

        {/* Filter Capsule: Today, Week, Highlights */}
        <div className="flex items-center justify-between bg-black/35 p-1 rounded-full backdrop-blur-md max-w-sm mx-auto shadow-inner border border-white/10">
          <button
            onClick={() => setTimeFilter('today')}
            className={`flex-1 py-1.5 px-3 rounded-full text-[12px] font-bold transition-all flex items-center justify-center gap-1 ${
              timeFilter === 'today'
                ? 'bg-white text-[#191c3d] shadow-[0_2px_8px_rgba(0,0,0,0.18)]'
                : 'text-[#c1c3ee] hover:text-white'
            }`}
          >
            <span>Today</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#fe6b75]"></span>
          </button>
          <button
            onClick={() => setTimeFilter('week')}
            className={`flex-1 py-1.5 px-3 rounded-full text-[12px] font-bold transition-all flex items-center justify-center ${
              timeFilter === 'week'
                ? 'bg-white text-[#191c3d] shadow-[0_2px_8px_rgba(0,0,0,0.18)]'
                : 'text-[#c1c3ee] hover:text-white'
            }`}
          >
            <span>Week</span>
          </button>
          <button
            onClick={() => setTimeFilter('highlights')}
            className={`flex-1 py-1.5 px-3 rounded-full text-[12px] font-bold transition-all flex items-center justify-center ${
              timeFilter === 'highlights'
                ? 'bg-white text-[#191c3d] shadow-[0_2px_8px_rgba(0,0,0,0.18)]'
                : 'text-[#c1c3ee] hover:text-white'
            }`}
          >
            <span>Highlights</span>
          </button>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="px-4 space-y-4 mt-4 pb-12">
        {/* Section: Urgent Due Card */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-5 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] relative overflow-hidden transition-transform active:scale-[0.99] border border-[#e5e7fe]">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#fe6b75]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fe6b75] text-white shadow-[0_4px_14px_rgba(254,107,117,0.35)]">
              <span className="material-symbols-outlined text-[14px]">timer</span>
              <span className="text-[11px] font-bold uppercase tracking-wider">Due in 5h 12m</span>
            </div>
            <span className="text-[12px] text-[#46464e] font-semibold">Assignment 03</span>
          </div>

          <div className="space-y-1 mb-4">
            <h2 className="font-bold text-[18px] text-[#171b2b] tracking-tight">
              DCIT 301: Database Relational Schema
            </h2>
            <div className="flex items-center gap-1 text-[#46464e]">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span className="text-[13px]">Due Today, 5:00 PM • Est. 2 hrs remaining</span>
            </div>
          </div>

          <div className="bg-[#dfe1f8]/60 rounded-2xl p-3 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-[#191c3d] text-[20px]">description</span>
              <div className="min-w-0">
                <span className="text-[13px] font-semibold text-[#171b2b] block truncate">
                  schema_normalisation_v2.sql
                </span>
                <span className="text-[11px] text-[#46464e]">
                  {solutionSubmitted ? 'Submitted successfully to UCC Portal' : 'Draft saved locally 22m ago'}
                </span>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] ${
                solutionSubmitted ? 'text-emerald-600' : 'text-[#46464e]'
              }`}
            >
              check_circle
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                if (solutionSubmitted) {
                  alert('Your solution was already submitted. You may resubmit if needed.');
                }
                onOpenSubmitModal();
              }}
              className="flex-1 py-3 px-4 rounded-full bg-[#191c3d] text-white text-[14px] font-bold shadow-[0_8px_20px_rgba(25,28,61,0.2)] hover:bg-[#020324] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{solutionSubmitted ? 'Resubmit Solution' : 'Submit Solution'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              aria-label="Review assignment rubric"
              onClick={() => alert('Rubric: 40% 3NF Decomposition, 30% BCNF Proofs, 30% PostgreSQL Triggers.')}
              className="w-12 h-12 rounded-full bg-[#ececff] text-[#171b2b] flex items-center justify-center hover:bg-[#e5e7fe] transition-colors flex-shrink-0"
              title="View rubric"
            >
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </button>
          </div>
        </section>

        {/* Section: Academic Standings */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-5 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] border border-[#e5e7fe]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#191c3d] text-[22px]">trending_up</span>
              <h3 className="font-bold text-[17px] text-[#171b2b]">Academic Standings</h3>
            </div>
            <button
              onClick={() => onNavigate('gpa-academic')}
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#e5e7fe] text-[#46464e] hover:text-[#191c3d] flex items-center gap-1"
            >
              <span>Semester 1</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Current CGPA */}
            <div
              onClick={() => onNavigate('gpa-academic')}
              className="bg-white rounded-2xl p-3.5 flex flex-col justify-between shadow-sm cursor-pointer hover:ring-2 hover:ring-[#191c3d]/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#46464e]">Current CGPA</span>
                <span className="text-[11px] font-bold text-[#ad2f3d] bg-[#ffdada] px-1.5 py-0.5 rounded-md">1st Class</span>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-bold text-[#171b2b] leading-none">3.68</span>
                  <span className="text-[12px] text-[#46464e]">/4.00</span>
                </div>
                <span className="text-[11px] text-[#46464e] mt-1 block">Target: 3.75</span>
              </div>
              <div className="w-full bg-[#ececff] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#191c3d] h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            {/* Projected GPA */}
            <div
              onClick={() => onNavigate('gpa-academic')}
              className="bg-white rounded-2xl p-3.5 flex flex-col justify-between shadow-sm cursor-pointer hover:ring-2 hover:ring-[#fe6b75]/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#46464e]">Projected GPA</span>
                <div className="w-2 h-2 rounded-full bg-[#fe6b75]"></div>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-bold text-[#fe6b75] leading-none">3.80</span>
                  <span className="text-[12px] text-[#46464e]">/4.00</span>
                </div>
                <span className="text-[11px] text-[#46464e] mt-1 block">+0.12 trajectory</span>
              </div>
              <div className="w-full bg-[#ececff] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#fe6b75] h-full rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Quick Operations */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[14px] font-bold text-[#171b2b]">Quick Operations</span>
            <span className="text-[11px] text-[#46464e]">Create new entry</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            <button
              onClick={() => onOpenQuickOp('course')}
              className="bg-[#f3f2ff] hover:bg-[#ececff] rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-[0_8px_20px_-6px_rgba(25,28,61,0.06)] transition-all active:scale-95 group border border-[#e5e7fe]"
            >
              <div className="w-10 h-10 rounded-full bg-[#191c3d] text-white flex items-center justify-center group-hover:bg-[#020324] transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
              </div>
              <span className="text-[11px] font-bold text-[#171b2b]">Course</span>
            </button>

            <button
              onClick={() => onOpenQuickOp('task')}
              className="bg-[#f3f2ff] hover:bg-[#ececff] rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-[0_8px_20px_-6px_rgba(25,28,61,0.06)] transition-all active:scale-95 group border border-[#e5e7fe]"
            >
              <div className="w-10 h-10 rounded-full bg-[#dfe1f8] text-[#171b2b] flex items-center justify-center group-hover:bg-[#191c3d] group-hover:text-white transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[20px]">assignment_add</span>
              </div>
              <span className="text-[11px] font-bold text-[#171b2b]">Task</span>
            </button>

            <button
              onClick={() => onOpenQuickOp('exam')}
              className="bg-[#f3f2ff] hover:bg-[#ececff] rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-[0_8px_20px_-6px_rgba(25,28,61,0.06)] transition-all active:scale-95 group border border-[#e5e7fe]"
            >
              <div className="w-10 h-10 rounded-full bg-[#dfe1f8] text-[#171b2b] flex items-center justify-center group-hover:bg-[#191c3d] group-hover:text-white transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
              </div>
              <span className="text-[11px] font-bold text-[#171b2b]">Exam</span>
            </button>

            <button
              onClick={() => onOpenQuickOp('study')}
              className="bg-[#f3f2ff] hover:bg-[#ececff] rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-[0_8px_20px_-6px_rgba(25,28,61,0.06)] transition-all active:scale-95 group border border-[#e5e7fe]"
            >
              <div className="w-10 h-10 rounded-full bg-[#ffdada] text-[#ad2f3d] flex items-center justify-center group-hover:bg-[#fe6b75] group-hover:text-white transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[20px]">timer_10_alt_1</span>
              </div>
              <span className="text-[11px] font-bold text-[#171b2b]">Study</span>
            </button>
          </div>
        </section>

        {/* Section: Today's Academic Schedule */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-5 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] border border-[#e5e7fe]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#191c3d] text-[22px]">calendar_today</span>
              <h3 className="font-bold text-[17px] text-[#171b2b]">Today's Academic Schedule</h3>
            </div>
            <span className="text-[12px] text-[#ad2f3d] font-bold bg-[#ffdada]/60 px-2 py-0.5 rounded-full">3 Sessions</span>
          </div>

          <div className="relative space-y-4">
            {/* Vertical timeline connector */}
            <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-[#dfe1f8]"></div>

            {/* Session 1 */}
            <div className="relative flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#dfe1f8] flex items-center justify-center z-10 flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px] text-[#46464e]">check</span>
              </div>
              <div className="flex-1 bg-white/80 rounded-2xl p-3 shadow-sm min-w-0 opacity-85">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[11px] font-semibold text-[#46464e]">08:30 - 10:30 AM</span>
                  <span className="text-[11px] text-[#77767f] font-medium bg-[#f3f2ff] px-1.5 py-0.5 rounded">Completed</span>
                </div>
                <h4 className="font-bold text-[14px] text-[#171b2b] truncate">DCIT 303: Software Engineering</h4>
                <div className="flex items-center gap-1 mt-1 text-[#46464e]">
                  <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                  <span className="text-[12px] truncate">Lecture Theatre 21</span>
                </div>
              </div>
            </div>

            {/* Session 2: Active */}
            <div className="relative flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#fe6b75] text-white flex items-center justify-center z-10 flex-shrink-0 mt-0.5 shadow-[0_0_12px_rgba(254,107,117,0.45)]">
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              </div>
              <div className="flex-1 bg-white rounded-2xl p-3.5 shadow-sm min-w-0 ring-2 ring-[#fe6b75]/40">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[11px] text-[#ad2f3d] font-bold">01:00 - 03:00 PM</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffdada] text-[#40000a]">
                    Happening Next
                  </span>
                </div>
                <h4 className="font-bold text-[15px] text-[#171b2b] truncate">DCIT 305: Operating Systems</h4>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1 text-[#46464e] min-w-0">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span className="text-[12px] truncate">CS Lab 3 • Practical Session</span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#191c3d]">navigate_next</span>
                </div>
              </div>
            </div>

            {/* Session 3 */}
            <div className="relative flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#dfe1f8] flex items-center justify-center z-10 flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[16px] text-[#46464e]">schedule</span>
              </div>
              <div className="flex-1 bg-white rounded-2xl p-3 shadow-sm min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[11px] font-semibold text-[#46464e]">04:30 - 06:00 PM</span>
                  <span className="text-[11px] text-[#46464e] font-medium">Solo Focus</span>
                </div>
                <h4 className="font-bold text-[14px] text-[#171b2b] truncate">Library Study Block: Graph Theory</h4>
                <div className="flex items-center gap-1 mt-1 text-[#46464e]">
                  <span className="material-symbols-outlined text-[14px]">local_library</span>
                  <span className="text-[12px] truncate">Main Library 2nd Floor</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Milestone Alert */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-4 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] border border-[#e5e7fe]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#ffdada] text-[#ad2f3d] flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-[#ad2f3d] tracking-wide">Milestone Alert</span>
                <span className="w-1 h-1 rounded-full bg-[#ad2f3d]"></span>
                <span className="text-[11px] text-[#46464e]">Mid-Sem Exams</span>
              </div>
              <p className="font-bold text-[14px] leading-tight text-[#171b2b] truncate">
                DCIT 307: Computer Networks in 4 days
              </p>
              <span className="text-[11px] text-[#46464e]">Thursday, 09:00 AM • Great Hall Arena</span>
            </div>
            <button
              onClick={() => onNavigate('exams-schedule')}
              className="px-3.5 py-1.5 rounded-full bg-[#191c3d] text-white text-[12px] font-bold hover:bg-[#020324] transition-all flex-shrink-0 shadow-sm"
            >
              Prep Plan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
