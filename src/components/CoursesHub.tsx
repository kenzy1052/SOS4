import React, { useState } from 'react';
import { Course, SubTabId } from '../types';

interface CoursesHubProps {
  courses: Course[];
  subTab: SubTabId;
  onOpenAddCourse: () => void;
  onOpenFilter: () => void;
  onOpenCourseDetail: (course: Course) => void;
}

export const CoursesHub: React.FC<CoursesHubProps> = ({
  courses,
  subTab,
  onOpenAddCourse,
  onOpenFilter,
  onOpenCourseDetail,
}) => {
  const [semesterFilter, setSemesterFilter] = useState<'active' | 'archived' | 'historical'>('active');

  return (
    <div className="flex flex-col w-full">
      {/* Top Header with Semester Filter Pills */}
      <div className="w-full bg-[#191c3d] px-4 pt-2 pb-4 rounded-b-2xl shadow-md border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSemesterFilter('active')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all active:scale-95 ${
              semesterFilter === 'active'
                ? 'bg-white text-[#191c3d] shadow-[0_4px_16px_rgba(0,0,0,0.15)]'
                : 'bg-white/10 text-[#c1c3ee] hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#fe6b75]"></span>
            Active (Sem 1)
          </button>
          <button
            onClick={() => setSemesterFilter('archived')}
            className={`px-4 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors ${
              semesterFilter === 'archived'
                ? 'bg-white text-[#191c3d] shadow-[0_4px_16px_rgba(0,0,0,0.15)]'
                : 'bg-white/10 text-[#c1c3ee] hover:text-white'
            }`}
          >
            Archived Semesters
          </button>
          <button
            onClick={() => setSemesterFilter('historical')}
            className={`px-4 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-colors ${
              semesterFilter === 'historical'
                ? 'bg-white text-[#191c3d] shadow-[0_4px_16px_rgba(0,0,0,0.15)]'
                : 'bg-white/10 text-[#c1c3ee] hover:text-white'
            }`}
          >
            Historical Transcript
          </button>
        </div>
      </div>

      {/* Main Course Content */}
      <div className="flex flex-col px-4 gap-4 mt-4 pb-14">
        {/* Semester Capacity Progress Card */}
        <section className="bg-[#f3f2ff] rounded-[28px] p-4 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] relative overflow-hidden border border-[#e5e7fe]">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#e5e7fe]/60 blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e5e7fe] text-[#46464e] text-[10px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">school</span>
              Level 300 UCC • Computer Science Dept
            </span>
            <span className="text-[11px] text-[#ad2f3d] font-bold px-2 py-0.5 rounded-full bg-[#ffdada]">
              85% Cap
            </span>
          </div>

          <div className="flex flex-col mt-1">
            <h2 className="font-bold text-[19px] text-[#171b2b]">Course Hub • 18 Credits Enrolled</h2>
            <p className="text-[12px] text-[#46464e] mt-0.5">Target: 21 Max Workload Units (85% Workload Cap)</p>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] text-[#46464e] font-medium">Semester Capacity Progress</span>
              <span className="text-[12px] text-[#191c3d] font-bold">18 / 21 Units</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#dfe1f8] overflow-hidden relative p-0.5">
              <div
                className="h-full rounded-full bg-[#191c3d] relative flex items-center justify-end"
                style={{ width: '85.7%' }}
              >
                <div className="w-2 h-2 rounded-full bg-[#fe6b75] mr-0.5 shadow-[0_0_8px_rgba(254,107,117,0.9)] animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-1">
            <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/90 text-center shadow-sm">
              <span className="font-bold text-[18px] text-[#171b2b]">5</span>
              <span className="text-[11px] text-[#46464e]">Active Courses</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/90 text-center shadow-sm">
              <span className="font-bold text-[18px] text-[#fe6b75]">3</span>
              <span className="text-[11px] text-[#46464e]">Upcoming Labs</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/90 text-center shadow-sm">
              <span className="font-bold text-[18px] text-[#171b2b]">3.82</span>
              <span className="text-[11px] text-[#46464e]">Target CGPA</span>
            </div>
          </div>
        </section>

        {/* Section Header: Registered Modules */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[17px] text-[#171b2b]">Registered Modules</span>
            <span className="px-2 py-0.5 rounded-full bg-[#191c3d] text-white text-[11px] font-bold">
              {courses.length} Total
            </span>
          </div>
          <button
            onClick={onOpenFilter}
            className="flex items-center gap-1 text-[13px] font-semibold text-[#46464e] hover:text-[#191c3d] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            Filter
          </button>
        </div>

        {/* Module Cards */}
        {courses.map((course) => (
          <article
            key={course.id}
            onClick={() => onOpenCourseDetail(course)}
            className="bg-[#f3f2ff] rounded-[28px] p-4 shadow-[0_12px_32px_-8px_rgba(25,28,61,0.08)] transition-all hover:translate-y-[-2px] border border-[#e5e7fe] cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-[#191c3d] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">{course.icon}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[16px] text-[#171b2b] truncate">{course.code}</h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#e5e7fe] text-[#46464e]">
                      {course.credits} Credits
                    </span>
                  </div>
                  <p className="text-[12px] text-[#46464e] truncate mt-0.5">{course.title}</p>
                </div>
              </div>
              <button
                aria-label="Course actions"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCourseDetail(course);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#46464e] hover:bg-[#e5e7fe] transition-colors flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>

            {/* Dynamic Highlight Pill */}
            {course.highlightText && (
              <div
                className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-xl w-full text-[12px] font-semibold ${
                  course.highlightType === 'urgent'
                    ? 'bg-[#ffdada] text-[#6d0018]'
                    : course.highlightType === 'exam'
                    ? 'bg-[#ffdada]/70 text-[#ad2f3d]'
                    : course.highlightType === 'active'
                    ? 'bg-[#e5e7fe] text-[#191c3d]'
                    : 'bg-[#e5e7fe] text-[#46464e]'
                }`}
              >
                {course.highlightType === 'urgent' && (
                  <span className="w-2 h-2 rounded-full bg-[#fe6b75] animate-ping"></span>
                )}
                {course.highlightType === 'assignment' && (
                  <span className="material-symbols-outlined text-[16px] text-[#fe6b75]">assignment</span>
                )}
                {course.highlightType === 'sprint' && (
                  <span className="material-symbols-outlined text-[16px] text-[#191c3d]">published_with_changes</span>
                )}
                {course.highlightType === 'exam' && (
                  <span className="material-symbols-outlined text-[16px] text-[#ad2f3d]">security_update_warning</span>
                )}
                <span className="truncate">{course.highlightText}</span>
              </div>
            )}

            {/* Syllabus Completion Meter */}
            <div className="mt-3.5 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-[#46464e]">Syllabus Completion</span>
                <span className="text-[#191c3d] font-bold">{course.syllabusCompletion}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#dfe1f8] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#191c3d]"
                  style={{ width: `${course.syllabusCompletion}%` }}
                ></div>
              </div>
            </div>

            {/* Instructor and Contact / Venue Details */}
            <div className="flex items-center justify-between mt-3 pt-1 text-[#46464e] text-[12px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="material-symbols-outlined text-[16px] flex-shrink-0">person</span>
                <span className="truncate">{course.instructor}</span>
              </div>
              {course.email ? (
                <a
                  href={`mailto:${course.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-[#191c3d] underline truncate ml-1 flex-shrink-0"
                >
                  {course.email}
                </a>
              ) : course.room ? (
                <span className="truncate ml-1 flex-shrink-0 font-medium text-[#46464e]">{course.room}</span>
              ) : null}
            </div>

            {/* Secondary footer strip if available */}
            {course.scheduleInfo && (
              <div className="mt-2.5 p-2.5 rounded-2xl bg-white/80 flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="material-symbols-outlined text-[15px] text-[#ad2f3d]">event</span>
                  <span className="text-[#171b2b] font-semibold truncate">{course.scheduleInfo}</span>
                </div>
                {course.stats && <span className="text-[#46464e] flex-shrink-0">{course.stats}</span>}
              </div>
            )}

            {course.examDate && (
              <div className="mt-2.5 p-2.5 rounded-2xl bg-white/80 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#ad2f3d]">alarm</span>
                  <span className="text-[#171b2b] font-semibold">Mid-semester Exam</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#e5e7fe] text-[#171b2b] font-bold">
                  {course.examDate}
                </span>
              </div>
            )}
          </article>
        ))}

        {/* CTA Button: + Enroll or Add Course */}
        <div className="pt-2 pb-2 flex justify-center">
          <button
            onClick={onOpenAddCourse}
            className="w-full max-w-md py-3.5 px-6 rounded-full bg-[#191c3d] text-white font-bold text-[15px] shadow-[0_12px_28px_-6px_rgba(25,28,61,0.35)] flex items-center justify-center gap-2 hover:bg-[#020324] active:scale-[0.99] transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            + Enroll or Add Course
          </button>
        </div>
      </div>
    </div>
  );
};
