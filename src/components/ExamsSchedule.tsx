import React, { useState, useEffect } from 'react';
import { SubTabId } from '../types';
import { UPCOMING_EXAM_PAPERS, TOPIC_CHECKLIST } from '../data/initialData';

interface ExamsScheduleProps {
  subTab: SubTabId;
  onStartRevision: () => void;
  onOpenTasks: () => void;
}

export const ExamsSchedule: React.FC<ExamsScheduleProps> = ({
  subTab,
  onStartRevision,
  onOpenTasks,
}) => {
  const [filter, setFilter] = useState<'timetable' | 'checklists' | 'papers'>('timetable');
  const [showAnswer, setShowAnswer] = useState(false);
  const [checklist, setChecklist] = useState(TOPIC_CHECKLIST);

  // Live countdown timer state (ticking seconds and minutes)
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 18,
    minutes: 23,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'done' ? 'pending' : 'done' }
          : item
      )
    );
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Filter Pill Row */}
      <div className="w-full bg-[#191c3d] pt-2 pb-4 px-4 rounded-b-2xl shadow-md border-b border-white/10">
        <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-0.5">
          <div className="inline-flex p-1 bg-black/30 backdrop-blur-md rounded-full w-full justify-between shadow-inner border border-white/10">
            <button
              onClick={() => setFilter('timetable')}
              className={`flex-1 py-1.5 px-3 rounded-full text-[12px] font-bold text-center transition-all ${
                filter === 'timetable'
                  ? 'bg-white text-[#191c3d] shadow-sm'
                  : 'text-[#c1c3ee] hover:text-white'
              }`}
            >
              Timetable
            </button>
            <button
              onClick={() => setFilter('checklists')}
              className={`flex-1 py-1.5 px-3 rounded-full text-[12px] font-bold text-center transition-all ${
                filter === 'checklists'
                  ? 'bg-white text-[#191c3d] shadow-sm'
                  : 'text-[#c1c3ee] hover:text-white'
              }`}
            >
              Checklists
            </button>
            <button
              onClick={() => setFilter('papers')}
              className={`flex-1 py-1.5 px-3 rounded-full text-[12px] font-bold text-center transition-all ${
                filter === 'papers'
                  ? 'bg-white text-[#191c3d] shadow-sm'
                  : 'text-[#c1c3ee] hover:text-white'
              }`}
            >
              Past Papers
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="px-4 flex flex-col gap-4 w-full relative z-20 pt-3 pb-16">
        {/* Hero Countdown Card */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-5 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] flex flex-col gap-4 relative overflow-hidden border border-[#e5e7fe]">
          {/* Ambient Glow */}
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#fe6b75]/15 blur-2xl pointer-events-none"></div>

          {/* Sub-header & Badge */}
          <div className="flex items-center justify-between gap-2 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#fe6b75] animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#46464e]">
                NEXT PENDING PAPER
              </span>
            </div>
            <span className="bg-[#fe6b75] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-[0_8px_24px_0_rgba(231,90,101,0.38)] tracking-wide">
              URGENT
            </span>
          </div>

          {/* Course Title & Code */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[12px] font-bold px-2 py-0.5 rounded-md bg-[#dfe1f8] text-[#46464e]">
                L300 Core
              </span>
              <span className="text-[11px] text-[#77767f] font-semibold">3 Credit Units</span>
            </div>
            <h2 className="font-bold text-[22px] text-[#171b2b] tracking-tight leading-tight">
              DCIT 307: Computer Networks & Security
            </h2>
          </div>

          {/* Countdown Blocks Container */}
          <div className="bg-[#191c3d] text-white rounded-2xl p-3.5 shadow-inner flex items-center justify-between gap-1 relative z-10">
            {/* Days */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-full bg-[#020324]/70 rounded-xl py-2 flex items-center justify-center">
                <span className="text-[26px] font-bold tracking-tight text-white">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] text-[#c1c3ee] uppercase tracking-widest mt-1 font-bold">
                Days
              </span>
            </div>
            <span className="text-[18px] text-[#8184ab] pb-4 font-bold">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-full bg-[#020324]/70 rounded-xl py-2 flex items-center justify-center">
                <span className="text-[26px] font-bold tracking-tight text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] text-[#c1c3ee] uppercase tracking-widest mt-1 font-bold">
                Hours
              </span>
            </div>
            <span className="text-[18px] text-[#8184ab] pb-4 font-bold">:</span>

            {/* Mins */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-full bg-[#020324]/70 rounded-xl py-2 flex items-center justify-center">
                <span className="text-[26px] font-bold tracking-tight text-[#ffdada]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] text-[#c1c3ee] uppercase tracking-widest mt-1 font-bold">
                Mins
              </span>
            </div>
          </div>

          {/* Exam Logistics Metadata */}
          <div className="bg-white rounded-2xl p-3 flex flex-col gap-2 relative z-10 shadow-sm border border-[#e5e7fe]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#dfe1f8] flex items-center justify-center flex-shrink-0 text-[#191c3d]">
                <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-semibold text-[#77767f]">Date & Schedule</span>
                <span className="text-[13px] font-bold text-[#171b2b] truncate">
                  Friday, 14 Nov 2026 • 09:00 AM – 11:00 AM
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#dfe1f8] flex items-center justify-center flex-shrink-0 text-[#ad2f3d]">
                <span className="material-symbols-outlined text-[18px]">near_me</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-semibold text-[#77767f]">Designated Seating Venue</span>
                <span className="text-[13px] font-bold text-[#171b2b] truncate">
                  Great Hall, UCC Central Campus
                </span>
              </div>
            </div>
          </div>

          {/* Readiness Index Meter */}
          <div className="flex flex-col gap-1.5 relative z-10">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#171b2b] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#fe6b75]">verified</span>
                Syllabus Readiness Index
              </span>
              <span className="text-[#ad2f3d] font-bold">70% Ready</span>
            </div>
            <div className="w-full h-2.5 bg-[#dfe1f8] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#191c3d] via-[#595c80] to-[#fe6b75] rounded-full transition-all duration-700"
                style={{ width: '70%' }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[#77767f] text-[10px] font-semibold">
              <span>4 of 6 units mastered</span>
              <span>2 pending modules</span>
            </div>
          </div>

          {/* CTA Action Row */}
          <div className="grid grid-cols-2 gap-2.5 pt-1 relative z-10">
            <button
              onClick={onStartRevision}
              className="w-full py-3 px-4 rounded-full bg-[#191c3d] hover:bg-[#020324] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(25,28,61,0.22)] active:scale-[0.98] transition-all"
            >
              <span>Start Revision</span>
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            </button>
            <button
              onClick={onOpenTasks}
              className="w-full py-3 px-4 rounded-full bg-[#e5e7fe] hover:bg-[#dfe1f8] text-[#171b2b] text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">checklist</span>
              <span>Open Tasks</span>
            </button>
          </div>
        </section>

        {/* Active Quick Drill Card with Reveal Model Answer */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-5 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] flex flex-col gap-3 relative overflow-hidden border border-[#e5e7fe]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#ffdbce] flex items-center justify-center text-[#311307] flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-[15px] text-[#171b2b] truncate">
                  UCC Past Exam Question Recall
                </span>
                <span className="text-[11px] text-[#77767f]">End of Sem 1 • 2024 / Q3 (a)</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e5e7fe] text-[#46464e]">
              3 min drill
            </span>
          </div>

          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#e5e7fe]">
            <p className="text-[13px] text-[#171b2b] leading-relaxed">
              “Identify two distinct advantages of{' '}
              <strong className="text-[#191c3d] font-bold">OSPF link-state routing</strong> over{' '}
              <strong className="text-[#ad2f3d] font-bold">RIP distance-vector</strong> algorithms in
              campus LAN backbones.”
            </p>
          </div>

          {/* Interactive Reveal Accordion */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="w-full py-2.5 px-4 rounded-full bg-[#dfe1f8] hover:bg-[#e5e7fe] text-[#191c3d] text-[12px] font-bold flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                <span>{showAnswer ? 'Hide Model Points' : 'Reveal Key Model Points'}</span>
              </span>
              <span
                className={`material-symbols-outlined text-[18px] transition-transform ${
                  showAnswer ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            {showAnswer && (
              <div className="bg-[#ececff] rounded-2xl p-3.5 flex flex-col gap-2 text-[#171b2b] animate-fadeIn">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#ad2f3d] text-[16px] mt-0.5 flex-shrink-0">
                    check_circle
                  </span>
                  <p className="text-[12px] leading-relaxed">
                    <strong className="font-bold">Fast Convergence & Metric Precision:</strong> OSPF
                    utilizes Dijkstra’s algorithm to recalculate shortest paths immediately upon topology
                    changes, eliminating routing loops (count-to-infinity).
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#ad2f3d] text-[16px] mt-0.5 flex-shrink-0">
                    check_circle
                  </span>
                  <p className="text-[12px] leading-relaxed">
                    <strong className="font-bold">Hierarchical Scalability:</strong> Divides campus backbones
                    into Areas (Area 0), preventing full routing table overhead and packet flood across
                    low-power access switches.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Visual Media Strip: Study Pod & Hall Navigation */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#f3f2ff] rounded-[24px] p-3 shadow-sm flex flex-col gap-2 border border-[#e5e7fe]">
            <div className="w-full h-24 rounded-2xl overflow-hidden relative shadow-sm">
              <img
                className="w-full h-full object-cover"
                alt="Main Library Pod 3"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi-3NaxsThkA-qAqpHS3Lze6OIUB10D8arQ9F8432G3Mwu2JIGyui53obj-ngFMgd8N9TZMT9DsUg4p6T7b9UGZdCoq8wcIr6bOROetiK5pU4HQHbjTZk1ch4i8CIuT_ppgGXb0IhilW5yO1k9DCVZ13I_AMilGuMvCi8nndpt7YfKgGEhWaiAxbWKfp-eGCI_IzZP54sP0aQJ-MfEygYb-pWf-Dl3VfX-st3mBeK1r5fwVTdwykKohg"
              />
              <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold bg-[#191c3d]/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full">
                Revision Hub
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] text-[#171b2b] font-bold truncate">Main Library Pod 3</span>
              <span className="text-[10px] text-[#77767f]">Open 24/7 during finals</span>
            </div>
          </div>

          <div className="bg-[#f3f2ff] rounded-[24px] p-3 shadow-sm flex flex-col gap-2 border border-[#e5e7fe]">
            <div className="w-full h-24 rounded-2xl overflow-hidden relative shadow-sm bg-[#dfe1f8] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#ad2f3d] text-4xl">location_on</span>
              <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold bg-[#191c3d]/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full">
                Seating Map
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] text-[#171b2b] font-bold truncate">Great Hall Wing B</span>
              <span className="text-[10px] text-[#77767f]">Desk Range: UCC/307/110-180</span>
            </div>
          </div>
        </div>

        {/* Topic Mastery Checklist Card */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-5 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] flex flex-col gap-3 border border-[#e5e7fe]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ad2f3d]"></span>
              <h3 className="font-bold text-[16px] text-[#171b2b]">Topic Mastery Checklist</h3>
            </div>
            <span className="text-[11px] font-semibold text-[#77767f]">DCIT 307</span>
          </div>

          {/* Checklist Items */}
          <div className="flex flex-col gap-2">
            {checklist.map((item) => {
              const isDone = item.status === 'done';
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3 rounded-2xl flex items-center justify-between gap-3 shadow-sm border border-[#e5e7fe] cursor-pointer transition-all ${
                    isDone ? 'bg-white/80' : 'bg-[#ececff]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isDone
                          ? 'bg-[#dfe1f8] text-[#191c3d]'
                          : 'bg-white hover:bg-[#fe6b75] hover:text-white text-[#77767f]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {isDone ? 'check' : 'circle'}
                      </span>
                    </button>
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-[13px] truncate ${
                          isDone ? 'text-[#77767f] line-through' : 'font-semibold text-[#171b2b]'
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.scheduledTime && (
                        <span className="text-[10px] text-[#ad2f3d] flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          {item.scheduledTime}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isDone ? 'bg-[#dfe1f8] text-[#46464e]' : 'bg-white text-[#191c3d]'
                    }`}
                  >
                    {isDone ? 'Done' : 'Active'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Upcoming Timetable Papers */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[16px] text-[#171b2b]">Upcoming Timetable Papers</h3>
            <span className="text-[11px] text-[#77767f]">4 Remaining</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {UPCOMING_EXAM_PAPERS.slice(1).map((paper) => (
              <div
                key={paper.id}
                className="bg-[#f3f2ff] rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow border border-[#e5e7fe]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#dfe1f8] text-[#191c3d] flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[9px] uppercase font-bold text-[#77767f] leading-none">
                      {paper.month}
                    </span>
                    <span className="text-[16px] font-bold leading-none mt-0.5">{paper.day}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#46464e] bg-[#e5e7fe] px-1.5 py-0.5 rounded">
                        {paper.courseCode}
                      </span>
                      <span className="text-[11px] text-[#77767f]">{paper.time}</span>
                    </div>
                    <span className="text-[13px] text-[#171b2b] truncate font-bold">{paper.title}</span>
                    <span className="text-[11px] text-[#46464e] truncate">{paper.venue}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#77767f] text-[20px] flex-shrink-0">
                  chevron_right
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* UCC Examination Regulations Reminder Footer */}
        <footer className="bg-[#e5e7fe]/70 rounded-2xl p-4 flex items-start gap-3 mt-1 mb-6 text-[#171b2b] border border-[#dfe1f8]">
          <div className="w-8 h-8 rounded-full bg-[#191c3d] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">gavel</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-[#191c3d] font-bold uppercase tracking-wider">
              UCC Examination Regulation reminder
            </span>
            <p className="text-[11px] text-[#46464e] leading-relaxed">
              Valid Student ID Card & printed signed Examination Slip are strictly mandatory at the
              entrance. Candidates arriving 30 minutes past session start will be disqualified under Section
              12-B.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
