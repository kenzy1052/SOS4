export type ScreenId = 'home-dashboard' | 'gpa-academic' | 'courses' | 'deadlines-tasks' | 'exams-schedule';

export type SubTabId = 'overview' | 'timeline' | 'analysis';

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  icon: string;
  instructor: string;
  email?: string;
  room?: string;
  syllabusCompletion: number;
  highlightText?: string;
  highlightType?: 'urgent' | 'assignment' | 'sprint' | 'exam' | 'active';
  scheduleInfo?: string;
  stats?: string;
  examDate?: string;
}

export interface Assignment {
  id: string;
  courseCode: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  credits: number;
  category: 'today' | 'upcoming' | 'overdue';
  statusText: string;
  preparedPercent?: number;
  remainingEst?: string;
  tags?: string[];
  overdueGraceText?: string;
  penaltyText?: string;
}

export interface ExamPaper {
  id: string;
  courseCode: string;
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  venue: string;
  creditUnits: number;
  category: string;
  isUrgent?: boolean;
  syllabusReadiness?: number;
  masteredUnits?: number;
  totalUnits?: number;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  status: 'completed' | 'happening-next' | 'solo-focus';
  statusLabel: string;
  icon: string;
}

export interface GradeInputItem {
  courseCode: string;
  title: string;
  credits: number;
  icon: string;
  grade: number; // 4.0, 3.5, 3.0, 2.5, 2.0
  gradeLetter: string;
}

export interface TopicChecklistItem {
  id: string;
  title: string;
  status: 'done' | 'pending';
  scheduledTime?: string;
}
