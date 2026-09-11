import React, { useState } from 'react';
import { ScreenId, SubTabId, Course, Assignment } from './types';
import { INITIAL_COURSES, INITIAL_ASSIGNMENTS } from './data/initialData';
import { WaveHeader } from './components/WaveHeader';
import { CurvedBottomNav } from './components/CurvedBottomNav';
import { HomeDashboard } from './components/HomeDashboard';
import { CoursesHub } from './components/CoursesHub';
import { DeadlinesTasks } from './components/DeadlinesTasks';
import { ExamsSchedule } from './components/ExamsSchedule';
import { GpaAcademic } from './components/GpaAcademic';
import {
  SearchModal,
  NotificationsModal,
  ProfileModal,
  SubmitSolutionModal,
  StudyTimerModal,
  AddCourseModal,
  NewAssignmentModal,
  CourseDetailModal,
} from './components/Modals';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home-dashboard');
  const [subTab, setSubTab] = useState<SubTabId>('overview');

  // Data states
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSubmitSolutionOpen, setIsSubmitSolutionOpen] = useState(false);
  const [isStudyTimerOpen, setIsStudyTimerOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
    showToast(`Enrolled in ${newCourse.code}: ${newCourse.title}`);
  };

  const handleAddAssignment = (newAssignment: Assignment) => {
    setAssignments((prev) => [newAssignment, ...prev]);
    showToast(`Added deadline for ${newAssignment.courseCode}`);
  };

  const handleSelectSearchResult = (type: 'course' | 'task', item: any) => {
    if (type === 'course') {
      setCurrentScreen('courses');
      setSelectedCourseDetail(item);
    } else {
      setCurrentScreen('deadlines-tasks');
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#171b2b] flex justify-center font-sans antialiased selection:bg-[#fe6b75] selection:text-white">
      {/* Mobile-centric canvas frame (max-w-md or tablet responsive) */}
      <div className="w-full max-w-md min-h-screen bg-[#fbf8ff] shadow-2xl relative flex flex-col">
        {/* Normal Rectangular Top Navigation Bar */}
        <WaveHeader
          currentScreen={currentScreen}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotifOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Screen Content Container */}
        <main className="flex-1 w-full flex flex-col pb-24">
          {currentScreen === 'home-dashboard' && (
            <HomeDashboard
              courses={courses}
              assignments={assignments}
              onNavigate={setCurrentScreen}
              onOpenSubmitModal={() => setIsSubmitSolutionOpen(true)}
              onOpenStudyTimer={() => setIsStudyTimerOpen(true)}
              onOpenProfile={() => setIsProfileOpen(true)}
              onOpenAddCourse={() => setIsAddCourseOpen(true)}
            />
          )}

          {currentScreen === 'courses' && (
            <CoursesHub
              courses={courses}
              subTab={subTab}
              onOpenAddCourse={() => setIsAddCourseOpen(true)}
              onOpenFilter={() => showToast('Displaying 5 Level 300 registered courses')}
              onOpenCourseDetail={(c) => setSelectedCourseDetail(c)}
            />
          )}

          {currentScreen === 'deadlines-tasks' && (
            <DeadlinesTasks
              assignments={assignments}
              subTab={subTab}
              onOpenNewAssignment={() => setIsNewAssignmentOpen(true)}
              onWorkOnTask={(task) => {
                if (task.courseCode === 'DCIT 301') {
                  setIsSubmitSolutionOpen(true);
                } else {
                  showToast(`Opened editor for ${task.title}`);
                }
              }}
              onSubmitLate={(task) => {
                showToast(`Late grace window active for ${task.title} (90% score cap)`);
              }}
            />
          )}

          {currentScreen === 'exams-schedule' && (
            <ExamsSchedule
              subTab={subTab}
              onStartRevision={() => setIsStudyTimerOpen(true)}
              onOpenTasks={() => setCurrentScreen('deadlines-tasks')}
            />
          )}

          {currentScreen === 'gpa-academic' && (
            <GpaAcademic subTab={subTab} />
          )}
        </main>

        {/* Rounded Rectangle Bottom Navigation Bar */}
        <CurvedBottomNav
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          urgentCount={1}
        />

        {/* Toast Notification Pill */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#191c3d] text-white px-4 py-2 rounded-full shadow-xl text-[12px] font-bold flex items-center gap-2 border border-[#fe6b75]/40 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-[#fe6b75] animate-ping"></span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modals */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          courses={courses}
          assignments={assignments}
          onSelectResult={handleSelectSearchResult}
        />

        <NotificationsModal
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
          onClear={() => showToast('All notifications cleared')}
        />

        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />

        <SubmitSolutionModal
          isOpen={isSubmitSolutionOpen}
          onClose={() => setIsSubmitSolutionOpen(false)}
          onSubmitSuccess={() =>
            showToast('✅ Assignment successfully submitted to UCC Assessment Portal!')
          }
        />

        <StudyTimerModal
          isOpen={isStudyTimerOpen}
          onClose={() => setIsStudyTimerOpen(false)}
        />

        <AddCourseModal
          isOpen={isAddCourseOpen}
          onClose={() => setIsAddCourseOpen(false)}
          onAddCourse={handleAddCourse}
        />

        <NewAssignmentModal
          isOpen={isNewAssignmentOpen}
          onClose={() => setIsNewAssignmentOpen(false)}
          onAddAssignment={handleAddAssignment}
          courses={courses}
        />

        <CourseDetailModal
          course={selectedCourseDetail}
          onClose={() => setSelectedCourseDetail(null)}
          onViewTasks={() => {
            setCurrentScreen('deadlines-tasks');
          }}
        />
      </div>
    </div>
  );
}
