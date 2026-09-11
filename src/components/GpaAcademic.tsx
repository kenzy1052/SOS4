import React, { useState } from 'react';
import { SubTabId } from '../types';
import { INITIAL_GRADE_PLANNER } from '../data/initialData';

interface GpaAcademicProps {
  subTab: SubTabId;
}

export const GpaAcademic: React.FC<GpaAcademicProps> = ({ subTab }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'transcripts'>('overview');
  const [selectedScenario, setSelectedScenario] = useState<'worst' | 'likely' | 'best'>('likely');
  const [grades, setGrades] = useState(INITIAL_GRADE_PLANNER);
  const [exportState, setExportState] = useState<'idle' | 'exporting' | 'done'>('idle');

  // Recalculate planner outcome
  const totalSimPoints = grades.reduce((acc, curr) => acc + curr.grade * curr.credits, 0);
  const simCredits = grades.reduce((acc, curr) => acc + curr.credits, 0);
  const semGpa = (totalSimPoints / simCredits).toFixed(2);

  // UCC Formula: 68 prior completed credits at 3.68 CGPA
  const priorCredits = 68;
  const priorPoints = 68 * 3.68;
  const totalCredits = priorCredits + simCredits;
  const projectedCgpa = ((priorPoints + totalSimPoints) / totalCredits).toFixed(2);

  const numCgpa = parseFloat(projectedCgpa);
  let classStatus = '1st Class Secured';
  let badgeColor = 'bg-[#fe6b75] text-white';

  if (numCgpa >= 3.60) {
    classStatus = '1st Class Secured';
    badgeColor = 'bg-[#fe6b75] text-white';
  } else if (numCgpa >= 3.00) {
    classStatus = '2nd Class Upper';
    badgeColor = 'bg-[#e5e7fe] text-[#191c3d]';
  } else {
    classStatus = '2nd Class Lower';
    badgeColor = 'bg-[#ffdada] text-[#ba1a1a]';
  }

  const handleGradeChange = (code: string, newGrade: number) => {
    setGrades((prev) =>
      prev.map((item) =>
        item.courseCode === code
          ? {
              ...item,
              grade: newGrade,
              gradeLetter:
                newGrade === 4.0
                  ? 'A'
                  : newGrade === 3.5
                  ? 'B+'
                  : newGrade === 3.0
                  ? 'B'
                  : newGrade === 2.5
                  ? 'C+'
                  : 'C',
            }
          : item
      )
    );
  };

  const handleReset = () => {
    setGrades(INITIAL_GRADE_PLANNER);
    setSelectedScenario('likely');
  };

  const handleSelectScenario = (scenario: 'worst' | 'likely' | 'best') => {
    setSelectedScenario(scenario);
    if (scenario === 'worst') {
      setGrades((prev) => prev.map((item) => ({ ...item, grade: 3.0, gradeLetter: 'B' })));
    } else if (scenario === 'best') {
      setGrades((prev) => prev.map((item) => ({ ...item, grade: 4.0, gradeLetter: 'A' })));
    } else {
      setGrades(INITIAL_GRADE_PLANNER);
    }
  };

  const handleExport = () => {
    setExportState('exporting');
    setTimeout(() => {
      setExportState('done');
      setTimeout(() => setExportState('idle'), 2500);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Header Mode Tabs */}
      <div className="w-full bg-[#191c3d] pt-2 pb-4 px-4 rounded-b-2xl shadow-md border-b border-white/10">
        <div className="w-full flex items-center justify-center">
          <div className="inline-flex p-1 bg-black/30 backdrop-blur-md rounded-full shadow-inner border border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-white text-[#191c3d] shadow-sm'
                  : 'text-[#c1c3ee] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">insights</span>
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-white text-[#191c3d] shadow-sm'
                  : 'text-[#c1c3ee] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              <span>Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab('transcripts')}
              className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'transcripts'
                  ? 'bg-white text-[#191c3d] shadow-sm'
                  : 'text-[#c1c3ee] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              <span>Transcripts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full px-4 pt-3 pb-16 space-y-4">
        {/* Target CGPA & Division Hero Card */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-5 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.07)] relative overflow-hidden border border-[#e5e7fe]">
          <div className="absolute -right-12 -top-12 w-44 h-44 bg-[#e5e7fe]/80 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col space-y-3">
            {/* Top Category Badge & Status Pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 bg-[#e5e7fe] px-3 py-1 rounded-full text-[#191c3d]">
                <span className="material-symbols-outlined text-[16px] text-[#ad2f3d]">verified</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">UCC 4.0 Standard</span>
              </div>
              <div className="inline-flex items-center gap-1 bg-[#ffdada] px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#ad2f3d] animate-pulse"></span>
                <span className="text-[11px] font-bold text-[#ad2f3d]">1st Class Honours</span>
              </div>
            </div>

            {/* Metric Stack */}
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[11px] font-bold text-[#46464e] uppercase tracking-wider block mb-0.5">
                  Cumulative CGPA
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[36px] font-bold text-[#191c3d] tracking-tight leading-none">
                    3.68
                  </span>
                  <span className="text-[16px] font-semibold text-[#77767f]">/ 4.00</span>
                </div>
              </div>

              {/* Radial Gauge */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                  <circle
                    className="text-[#dfe1f8]"
                    cx="24"
                    cy="24"
                    fill="transparent"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4.5"
                  ></circle>
                  <circle
                    className="text-[#ad2f3d]"
                    cx="24"
                    cy="24"
                    fill="transparent"
                    r="20"
                    stroke="currentColor"
                    strokeDasharray="125.6"
                    strokeDashoffset="10.0"
                    strokeLinecap="round"
                    strokeWidth="4.5"
                  ></circle>
                </svg>
                <span className="material-symbols-outlined absolute text-[20px] text-[#ad2f3d]">
                  workspace_premium
                </span>
              </div>
            </div>

            {/* Division Threshold Visual Bar */}
            <div className="bg-white rounded-2xl p-3.5 flex flex-col space-y-2 border border-[#e5e7fe]">
              <div className="flex justify-between items-center text-[#46464e] text-[11px]">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#77767f]"></span>
                  1st Class Min (3.60)
                </span>
                <span className="text-[#ad2f3d] font-bold bg-[#ffdada] px-2 py-0.5 rounded-full">
                  +0.08 Buffer
                </span>
                <span className="font-bold text-[#191c3d]">Target: 3.75</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-3 bg-[#dfe1f8] rounded-full relative overflow-hidden flex items-center">
                <div className="absolute left-[70%] top-0 bottom-0 w-0.5 bg-[#c7c5cf] z-10"></div>
                <div className="absolute left-[87.5%] top-0 bottom-0 w-0.5 bg-[#191c3d] z-10"></div>
                <div
                  className="h-full bg-gradient-to-r from-[#ad2f3d] to-[#fe6b75] rounded-full transition-all duration-700"
                  style={{ width: '78%' }}
                ></div>
              </div>

              <div className="flex justify-between text-[#77767f] text-[10px] pt-0.5 font-medium">
                <span>2nd Upper (3.00)</span>
                <span className="text-[#191c3d] font-bold">Current 3.68</span>
                <span>Max 4.00</span>
              </div>
            </div>

            {/* 2 Metric Quick Chips */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#ececff] p-3 rounded-2xl flex flex-col">
                <span className="text-[11px] text-[#46464e] font-medium">Semester Target</span>
                <span className="font-bold text-[16px] text-[#191c3d] mt-0.5">3.75 CGPA</span>
                <span className="text-[10px] text-[#46464e] mt-1">UCC Level 300</span>
              </div>
              <div className="bg-[#ececff] p-3 rounded-2xl flex flex-col">
                <span className="text-[11px] text-[#46464e] font-medium">Required Sem GPA</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-bold text-[16px] text-[#ad2f3d]">3.82</span>
                  <span className="text-[11px] text-[#46464e]">/ 18 Cr</span>
                </div>
                <span className="text-[10px] text-[#ad2f3d] mt-1 flex items-center gap-0.5 font-bold">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> Stretch goal
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Target Grade Planner */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-5 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.07)] flex flex-col space-y-4 border border-[#e5e7fe]">
          {/* Header of Planner */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[17px] text-[#191c3d]">What Grade Do I Need?</h2>
              <p className="text-[12px] text-[#46464e]">Interactive Target Grade Planner (18 Credits)</p>
            </div>
            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-full bg-[#ececff] flex items-center justify-center text-[#46464e] hover:text-[#191c3d] hover:bg-[#e5e7fe] transition-all"
              title="Reset defaults"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            </button>
          </div>

          {/* Course Grades List with Styled Selectors */}
          <div className="space-y-2.5">
            {grades.map((course) => (
              <div
                key={course.courseCode}
                className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm border border-[#e5e7fe]"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-[#ececff] flex items-center justify-center text-[#191c3d] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{course.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[13px] text-[#191c3d]">{course.courseCode}</span>
                      <span className="bg-[#ececff] text-[#46464e] text-[10px] font-semibold px-1.5 py-0.5 rounded">
                        {course.credits} Cr
                      </span>
                    </div>
                    <p className="text-[11px] text-[#46464e] truncate">{course.title}</p>
                  </div>
                </div>

                <div className="shrink-0 relative">
                  <select
                    value={course.grade}
                    onChange={(e) => handleGradeChange(course.courseCode, parseFloat(e.target.value))}
                    className="bg-[#e5e7fe] text-[#191c3d] text-[12px] font-bold px-3 py-1.5 rounded-full appearance-none pr-7 focus:outline-none cursor-pointer border border-[#dfe1f8]"
                  >
                    <option value="4.0">A (4.0)</option>
                    <option value="3.5">B+ (3.5)</option>
                    <option value="3.0">B (3.0)</option>
                    <option value="2.5">C+ (2.5)</option>
                    <option value="2.0">C (2.0)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-2 pointer-events-none text-[16px] text-[#191c3d]">
                    expand_more
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Calculated Real-Time Outcome Pill */}
          <div className="bg-[#191c3d] text-white rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-[0_8px_24px_rgba(25,28,61,0.22)]">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="material-symbols-outlined text-[#fe6b75] text-[20px]">auto_awesome</span>
              <div>
                <span className="text-[10px] font-bold text-[#c1c3ee] uppercase tracking-wider block">
                  SIMULATED FORECAST
                </span>
                <span className="text-[13px] font-bold text-white">
                  Sem GPA: {semGpa} • Projected CGPA: {projectedCgpa}
                </span>
              </div>
            </div>
            <div
              className={`${badgeColor} px-3 py-1 rounded-full text-[12px] font-bold tracking-wide shrink-0 shadow-[0_4px_12px_rgba(231,90,101,0.3)]`}
            >
              {classStatus}
            </div>
          </div>
        </section>

        {/* Scenario Sensitivity Card */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-5 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.07)] flex flex-col space-y-3.5 border border-[#e5e7fe]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[16px] text-[#191c3d]">Scenario Sensitivity</h3>
              <p className="text-[12px] text-[#46464e]">Examine grade swing tolerances</p>
            </div>
            <span className="material-symbols-outlined text-[#191c3d] text-[22px]">tune</span>
          </div>

          {/* 3 Scenario Pills */}
          <div className="grid grid-cols-3 gap-2">
            {/* Worst Case */}
            <button
              onClick={() => handleSelectScenario('worst')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all text-center border ${
                selectedScenario === 'worst'
                  ? 'bg-[#191c3d] text-white shadow-[0_8px_20px_-4px_rgba(25,28,61,0.3)] border-transparent'
                  : 'bg-white hover:bg-[#ececff] text-[#171b2b] border-[#e5e7fe]'
              }`}
            >
              <span className={`text-[10px] font-bold ${selectedScenario === 'worst' ? 'text-[#c1c3ee]' : 'text-[#46464e]'}`}>
                Worst Case
              </span>
              <span className="font-bold text-[17px] mt-0.5">3.42</span>
              <span className={`text-[10px] font-bold mt-0.5 ${selectedScenario === 'worst' ? 'text-[#ffdada]' : 'text-[#ad2f3d]'}`}>
                2nd Upper
              </span>
            </button>

            {/* Likely Case */}
            <button
              onClick={() => handleSelectScenario('likely')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all text-center border ${
                selectedScenario === 'likely'
                  ? 'bg-[#191c3d] text-white shadow-[0_8px_20px_-4px_rgba(25,28,61,0.3)] border-transparent'
                  : 'bg-white hover:bg-[#ececff] text-[#171b2b] border-[#e5e7fe]'
              }`}
            >
              <span className={`text-[10px] font-bold ${selectedScenario === 'likely' ? 'text-[#c1c3ee]' : 'text-[#46464e]'}`}>
                Likely Case
              </span>
              <span className="font-bold text-[17px] mt-0.5">3.75</span>
              <span className={`text-[10px] font-bold mt-0.5 ${selectedScenario === 'likely' ? 'text-[#ffdada]' : 'text-[#ad2f3d]'}`}>
                1st Class
              </span>
            </button>

            {/* Best Case */}
            <button
              onClick={() => handleSelectScenario('best')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all text-center border ${
                selectedScenario === 'best'
                  ? 'bg-[#191c3d] text-white shadow-[0_8px_20px_-4px_rgba(25,28,61,0.3)] border-transparent'
                  : 'bg-white hover:bg-[#ececff] text-[#171b2b] border-[#e5e7fe]'
              }`}
            >
              <span className={`text-[10px] font-bold ${selectedScenario === 'best' ? 'text-[#c1c3ee]' : 'text-[#46464e]'}`}>
                Best Case
              </span>
              <span className="font-bold text-[17px] mt-0.5">3.91</span>
              <span className={`text-[10px] font-bold mt-0.5 ${selectedScenario === 'best' ? 'text-[#ffdada]' : 'text-[#ad2f3d]'}`}>
                Dean's List
              </span>
            </button>
          </div>

          {/* Explanatory note */}
          <div className="bg-[#ececff]/80 rounded-2xl p-3 flex items-start gap-2.5 border border-[#dfe1f8]">
            <span className="material-symbols-outlined text-[18px] text-[#46464e] shrink-0 mt-0.5">info</span>
            <p className="text-[11px] text-[#46464e] leading-relaxed">
              Formula: <strong className="text-[#191c3d]">CGPA = Σ(Prior Points + Sim Points) / Total 86 Credits</strong>.
              Verified against UCC Senate Regulations & Degree Class thresholds.
            </p>
          </div>
        </section>

        {/* Academic Trajectory History */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-5 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.07)] flex flex-col space-y-3.5 border border-[#e5e7fe]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[16px] text-[#191c3d]">Academic Trajectory</h3>
              <p className="text-[12px] text-[#46464e]">Prior verified semester records</p>
            </div>
            <div className="flex items-center gap-1 text-[#191c3d]">
              <span className="text-[11px] font-bold bg-[#e5e7fe] px-2.5 py-1 rounded-full">
                68 Cr Completed
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {/* Level 200 Sem 2 */}
            <div className="bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-sm border border-[#e5e7fe]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ececff] flex items-center justify-center text-[#191c3d]">
                  <span className="material-symbols-outlined text-[20px]">school</span>
                </div>
                <div>
                  <span className="font-bold text-[13px] text-[#191c3d] block">Level 200 • Semester 2</span>
                  <span className="text-[11px] text-[#46464e]">18 Credits • 6 Courses</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="font-bold text-[16px] text-[#191c3d]">3.70</span>
                  <span className="text-[11px] text-[#77767f]">GPA</span>
                </div>
                <span className="text-[11px] text-[#46464e]">CGPA 3.68</span>
              </div>
            </div>

            {/* Level 200 Sem 1 */}
            <div className="bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-sm border border-[#e5e7fe]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ececff] flex items-center justify-center text-[#191c3d]">
                  <span className="material-symbols-outlined text-[20px]">school</span>
                </div>
                <div>
                  <span className="font-bold text-[13px] text-[#191c3d] block">Level 200 • Semester 1</span>
                  <span className="text-[11px] text-[#46464e]">17 Credits • 5 Courses</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="font-bold text-[16px] text-[#191c3d]">3.65</span>
                  <span className="text-[11px] text-[#77767f]">GPA</span>
                </div>
                <span className="text-[11px] text-[#46464e]">CGPA 3.66</span>
              </div>
            </div>

            {/* Level 100 Cumulative */}
            <div className="bg-white/70 rounded-2xl p-3.5 flex items-center justify-between border border-[#e5e7fe]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#dfe1f8] flex items-center justify-center text-[#77767f]">
                  <span className="material-symbols-outlined text-[20px]">history</span>
                </div>
                <div>
                  <span className="font-bold text-[13px] text-[#191c3d] block">Level 100 Cumulative</span>
                  <span className="text-[11px] text-[#46464e]">33 Credits • Foundation</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="font-bold text-[16px] text-[#191c3d]">3.67</span>
                  <span className="text-[11px] text-[#77767f]">Avg</span>
                </div>
                <span className="text-[11px] text-[#ad2f3d] font-bold">1st Class Base</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Export Slip Button */}
        <div className="pt-2">
          <button
            onClick={handleExport}
            disabled={exportState === 'exporting'}
            className="w-full bg-[#ad2f3d] hover:bg-[#8c1528] text-white rounded-full py-3.5 px-6 font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_8px_24px_0_rgba(231,90,101,0.38)] active:scale-[0.98] transition-all"
          >
            {exportState === 'exporting' ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                <span>Preparing UCC Official PDF...</span>
              </>
            ) : exportState === 'done' ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>UCC Official Slip Downloaded!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>Export Official Slip / PDF</span>
                <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
