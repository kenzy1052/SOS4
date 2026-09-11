import React, { useState } from 'react';
import { Assignment, SubTabId } from '../types';

interface DeadlinesTasksProps {
  assignments: Assignment[];
  subTab: SubTabId;
  onOpenNewAssignment: () => void;
  onWorkOnTask: (assignment: Assignment) => void;
  onSubmitLate: (assignment: Assignment) => void;
}

export const DeadlinesTasks: React.FC<DeadlinesTasksProps> = ({
  assignments,
  subTab,
  onOpenNewAssignment,
  onWorkOnTask,
  onSubmitLate,
}) => {
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'overdue'>('all');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Academic Radar synced with UCC LMS! All 7 deadlines verified.');
    }, 1000);
  };

  const filteredAssignments = assignments.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const counts = {
    all: assignments.length,
    today: assignments.filter((a) => a.category === 'today').length,
    upcoming: assignments.filter((a) => a.category === 'upcoming').length,
    overdue: assignments.filter((a) => a.category === 'overdue').length,
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Academic Radar Header with Filter Tabs */}
      <div className="w-full bg-[#191c3d] text-white pt-2 pb-4 px-4 rounded-b-2xl shadow-md border-b border-white/10">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#fe6b75] animate-ping"></span>
            <span className="text-[11px] font-bold text-[#c1c3ee] tracking-wider uppercase">
              Live Academic Radar
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#c1c3ee] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
            Fall 2024
          </span>
        </div>

        {/* Segmented Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setFilter('all')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all ${
              filter === 'all'
                ? 'bg-white text-[#191c3d] shadow-sm'
                : 'bg-white/10 text-[#c1c3ee] hover:text-white'
            }`}
          >
            All <span className="ml-1 opacity-75">{counts.all}</span>
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all ${
              filter === 'today'
                ? 'bg-white text-[#191c3d] shadow-sm'
                : 'bg-white/10 text-[#c1c3ee] hover:text-white'
            }`}
          >
            Today{' '}
            <span className="ml-1 px-1.5 py-0.5 bg-[#fe6b75] text-white rounded-full text-[10px] font-bold">
              {counts.today}
            </span>
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all ${
              filter === 'upcoming'
                ? 'bg-white text-[#191c3d] shadow-sm'
                : 'bg-white/10 text-[#c1c3ee] hover:text-white'
            }`}
          >
            Upcoming <span className="ml-1 opacity-75">{counts.upcoming}</span>
          </button>
          <button
            onClick={() => setFilter('overdue')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all ${
              filter === 'overdue'
                ? 'bg-white text-[#191c3d] shadow-sm'
                : 'bg-white/10 text-[#c1c3ee] hover:text-white'
            }`}
          >
            Overdue <span className="ml-1 opacity-75">{counts.overdue}</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="px-4 pt-3 pb-14 flex flex-col gap-4">
        {/* Status Strip with Sync Button */}
        <div className="bg-[#e5e7fe]/70 rounded-full px-3.5 py-2 flex items-center justify-between shadow-sm border border-[#dfe1f8]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#fe6b75] text-[18px] flex-shrink-0">cloud_done</span>
            <p className="text-[11px] font-medium text-[#46464e] truncate">
              Local offline sync active • Escalate reminders (30m, 3h, 24h) queued
            </p>
          </div>
          <button
            aria-label="Refresh and sync"
            onClick={handleSync}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/50 text-[#77767f] transition-all"
            title="Sync offline state"
          >
            <span className={`material-symbols-outlined text-[17px] ${isSyncing ? 'animate-spin text-[#fe6b75]' : ''}`}>
              sync
            </span>
          </button>
        </div>

        {/* Section 1: Urgent & Due Today */}
        {(filter === 'all' || filter === 'today') && (
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ad2f3d] text-[18px]">bolt</span>
                <h2 className="font-bold text-[17px] text-[#171b2b]">Urgent & Due Today</h2>
              </div>
              <span className="text-[11px] text-[#ad2f3d] font-bold bg-[#ffdada] px-2 py-0.5 rounded-full">
                1 Due
              </span>
            </div>

            <div className="bg-[#f3f2ff] rounded-[28px] p-4 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] relative overflow-hidden flex flex-col gap-3 border border-[#e5e7fe]">
              {/* Coral Left Accent Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#fe6b75]"></div>

              <div className="flex items-start justify-between gap-2 pl-1">
                <div className="inline-flex items-center gap-1.5 bg-[#ffdada] px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fe6b75]"></span>
                  <span className="text-[11px] font-bold text-[#ad2f3d]">Urgent • Due in 5h 12m</span>
                </div>
                <div className="flex items-center gap-1 bg-[#dfe1f8] px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[13px] text-[#46464e]">award_star</span>
                  <span className="text-[11px] font-semibold text-[#46464e]">3 Credits</span>
                </div>
              </div>

              <div className="pl-1">
                <h3 className="font-bold text-[16px] text-[#171b2b] leading-snug">
                  DCIT 301: Database Normalization & SQL Triggers
                </h3>
                <p className="text-[12px] text-[#46464e] mt-1">
                  3NF relations, BCNF proofs, and PostgreSQL trigger functions.
                </p>
              </div>

              {/* Progress Mini Tracker */}
              <div className="pl-1 bg-white/80 rounded-xl p-3 flex flex-col gap-1.5 shadow-sm">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#46464e] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    Today, 5:00 PM (Est: ~2 hrs remaining)
                  </span>
                  <span className="text-[#ad2f3d] font-bold">65% Prepared</span>
                </div>
                <div className="w-full bg-[#ececff] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#fe6b75] h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="pl-1 pt-1 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSoundAlerts(!soundAlerts)}
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-[#46464e] hover:text-[#171b2b] transition-colors"
                >
                  <span className={`material-symbols-outlined text-[16px] ${soundAlerts ? 'text-[#fe6b75]' : 'text-gray-400'}`}>
                    {soundAlerts ? 'volume_up' : 'volume_off'}
                  </span>
                  <span>{soundAlerts ? 'Sound alerts on' : 'Alerts muted'}</span>
                </button>

                <button
                  onClick={() => onWorkOnTask(assignments[0])}
                  className="inline-flex items-center gap-2 bg-[#191c3d] text-white px-5 py-2.5 rounded-full text-[13px] font-bold shadow-sm hover:bg-[#020324] active:scale-95 transition-all"
                >
                  <span>Work Now</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Weekly Pace Goal Widget */}
        <div className="relative w-full rounded-[24px] overflow-hidden p-4 bg-gradient-to-r from-[#191c3d] to-[#595c80] text-white shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[#ffdada]">target</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#e0e0ff] uppercase tracking-wider">Weekly Pace Goal</p>
              <p className="font-bold text-[17px] text-white">5 of 7 tasks mapped</p>
            </div>
          </div>
          <div className="w-12 h-12 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/20"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              ></path>
              <path
                className="text-[#fe6b75]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="71, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              ></path>
            </svg>
          </div>
        </div>

        {/* Section 2: Overdue & Grace Period */}
        {(filter === 'all' || filter === 'overdue') && (
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#77767f] text-[18px]">history</span>
                <h2 className="font-bold text-[17px] text-[#171b2b]">Overdue & Grace Period</h2>
              </div>
              <span className="text-[11px] text-[#46464e] font-bold bg-[#dfe1f8] px-2 py-0.5 rounded-full">
                1 Active Grace
              </span>
            </div>

            <div className="bg-[#f3f2ff] rounded-[28px] p-4 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] flex flex-col gap-3 border border-[#e5e7fe]">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 bg-[#dfe1f8] text-[#46464e] text-[11px] font-bold px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">timer_off</span>
                  1 day overdue • Grace Period Open
                </span>
                <span className="text-[11px] text-[#ba1a1a] font-bold bg-[#ffdad6] px-2 py-0.5 rounded-full">
                  Penalty Pending
                </span>
              </div>

              <div>
                <h3 className="font-bold text-[16px] text-[#171b2b]">MATH 301: Problem Set 3 - Graph Theory</h3>
                <p className="text-[12px] text-[#46464e] mt-0.5">
                  Due Yesterday, 11:59 PM • 90% score cap applies
                </p>
              </div>

              <div className="bg-[#dfe1f8]/60 rounded-xl p-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#77767f] text-[18px]">info</span>
                  <span className="text-[11px] text-[#46464e]">Grace window closes in 22h 40m</span>
                </div>
                <button
                  onClick={() => onSubmitLate(assignments[1])}
                  className="bg-[#191c3d] text-white px-3.5 py-1.5 rounded-full text-[12px] font-bold hover:bg-[#020324] transition-all shadow-sm"
                >
                  Submit Late
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Upcoming Submissions */}
        {(filter === 'all' || filter === 'upcoming') && (
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#595c80] text-[18px]">event_upcoming</span>
                <h2 className="font-bold text-[17px] text-[#171b2b]">Upcoming Submissions</h2>
              </div>
              <span className="text-[11px] text-[#46464e] font-bold bg-[#dfe1f8] px-2 py-0.5 rounded-full">
                3 Queued
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Upcoming Card 1 */}
              <div
                onClick={() => onWorkOnTask(assignments[2])}
                className="bg-[#f3f2ff] rounded-[24px] p-4 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.06)] flex items-center justify-between gap-3 border border-[#e5e7fe] hover:border-[#191c3d]/20 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#e5e7fe] flex items-center justify-center text-[#191c3d] flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px]">developer_board</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-[14px] text-[#171b2b] truncate">
                      DCIT 305: Process Scheduler Simulator
                    </h4>
                    <p className="text-[12px] text-[#46464e] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      In 3 days • 12 Nov, 11:59 PM
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#ececff] text-[#46464e] text-[10px] font-semibold">
                        C++ Runtime
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#ececff] text-[#46464e] text-[10px] font-semibold">
                        Lab 4
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  aria-label="View task"
                  className="w-9 h-9 rounded-full bg-[#e5e7fe] flex items-center justify-center text-[#171b2b] hover:bg-[#dfe1f8] transition-all flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>

              {/* Upcoming Card 2 */}
              <div
                onClick={() => onWorkOnTask(assignments[3])}
                className="bg-[#f3f2ff] rounded-[24px] p-4 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.06)] flex items-center justify-between gap-3 border border-[#e5e7fe] hover:border-[#191c3d]/20 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#e5e7fe] flex items-center justify-center text-[#191c3d] flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px]">account_tree</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-[14px] text-[#171b2b] truncate">
                      DCIT 303: Software Architecture Design Spec
                    </h4>
                    <p className="text-[12px] text-[#46464e] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      In 6 days • 15 Nov, 2:00 PM
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#ececff] text-[#46464e] text-[10px] font-semibold">
                        Team Milestone
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#ececff] text-[#46464e] text-[10px] font-semibold">
                        UML diagrams
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  aria-label="View task"
                  className="w-9 h-9 rounded-full bg-[#e5e7fe] flex items-center justify-center text-[#171b2b] hover:bg-[#dfe1f8] transition-all flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>

              {/* Upcoming Card 3 */}
              <div
                onClick={() => onWorkOnTask(assignments[4])}
                className="bg-[#f3f2ff] rounded-[24px] p-4 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.06)] flex items-center justify-between gap-3 border border-[#e5e7fe] hover:border-[#191c3d]/20 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#e5e7fe] flex items-center justify-center text-[#191c3d] flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px]">lan</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-[14px] text-[#171b2b] truncate">
                      DCIT 307: Network Packet Analysis Lab Report
                    </h4>
                    <p className="text-[12px] text-[#46464e] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      In 8 days • 17 Nov, 5:00 PM
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#ececff] text-[#46464e] text-[10px] font-semibold">
                        Wireshark PCAP
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#ececff] text-[#46464e] text-[10px] font-semibold">
                        Individual
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  aria-label="View task"
                  className="w-9 h-9 rounded-full bg-[#e5e7fe] flex items-center justify-center text-[#171b2b] hover:bg-[#dfe1f8] transition-all flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Floating Action Trigger Button: + New Assignment */}
        <div className="flex justify-center pt-2 pb-4">
          <button
            onClick={onOpenNewAssignment}
            className="inline-flex items-center gap-2.5 bg-[#fe6b75] text-white px-6 py-3 rounded-full text-[14px] font-bold shadow-[0_8px_24px_0_rgba(231,90,101,0.38)] active:scale-95 transition-all hover:bg-[#e75a65]"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>New Assignment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
