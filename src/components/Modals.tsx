import React, { useState, useEffect } from 'react';
import { Course, Assignment } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  assignments: Assignment[];
  onSelectResult: (type: 'course' | 'task', item: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  courses,
  assignments,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredCourses = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.instructor.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTasks = assignments.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fbf8ff] w-full max-w-md rounded-[28px] shadow-2xl border border-[#dfe1f8] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 bg-[#191c3d] text-white flex items-center gap-3">
          <span className="material-symbols-outlined text-[20px] text-[#fe6b75]">search</span>
          <input
            type="text"
            placeholder="Search courses, assignments, exams..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-white/10 text-white placeholder:text-[#c1c3ee] px-3 py-2 rounded-full text-[14px] outline-none border border-white/10"
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-4">
          <div>
            <h4 className="text-[11px] font-bold text-[#77767f] uppercase tracking-wider mb-2">
              Courses ({filteredCourses.length})
            </h4>
            <div className="space-y-1.5">
              {filteredCourses.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectResult('course', c);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#e5e7fe] flex items-center justify-between border border-[#e5e7fe] cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#191c3d] text-[18px]">{c.icon}</span>
                    <div>
                      <span className="font-bold text-[13px] text-[#171b2b]">{c.code}</span>
                      <p className="text-[11px] text-[#46464e] truncate">{c.title}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#191c3d] bg-[#ececff] px-2 py-0.5 rounded-full">
                    {c.credits} Cr
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-[#77767f] uppercase tracking-wider mb-2">
              Assignments & Tasks ({filteredTasks.length})
            </h4>
            <div className="space-y-1.5">
              {filteredTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    onSelectResult('task', t);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#e5e7fe] flex items-center justify-between border border-[#e5e7fe] cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[#fe6b75] text-[18px]">assignment</span>
                    <div className="min-w-0">
                      <span className="font-bold text-[13px] text-[#171b2b] truncate block">{t.title}</span>
                      <p className="text-[11px] text-[#46464e] truncate">{t.dueDate} • {t.dueTime}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#ad2f3d] bg-[#ffdada] px-2 py-0.5 rounded-full shrink-0">
                    {t.statusText}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fbf8ff] w-full max-w-md rounded-[28px] shadow-2xl border border-[#dfe1f8] overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 bg-[#191c3d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fe6b75] text-[20px]">notifications</span>
            <span className="font-bold text-[16px]">Academic Radar Notifications</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto">
          {/* Notification 1 */}
          <div className="p-3 bg-white rounded-2xl border border-[#e5e7fe] shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ffdada] text-[#ad2f3d] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">alarm</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[13px] text-[#171b2b]">Submission Deadline Alert</span>
                <span className="text-[10px] text-[#77767f]">22m ago</span>
              </div>
              <p className="text-[11px] text-[#46464e] mt-0.5">
                DCIT 301 Final Lab Project is due today at 5:00 PM. Draft file schema_normalisation_v2.sql is ready.
              </p>
            </div>
          </div>

          {/* Notification 2 */}
          <div className="p-3 bg-white rounded-2xl border border-[#e5e7fe] shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e5e7fe] text-[#191c3d] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">school</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[13px] text-[#171b2b]">Exam Timetable Published</span>
                <span className="text-[10px] text-[#77767f]">2h ago</span>
              </div>
              <p className="text-[11px] text-[#46464e] mt-0.5">
                DCIT 307 seating assigned to Great Hall Wing B (Desk UCC/307/110-180).
              </p>
            </div>
          </div>

          {/* Notification 3 */}
          <div className="p-3 bg-white rounded-2xl border border-[#e5e7fe] shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[13px] text-[#171b2b]">CGPA Standing Projected</span>
                <span className="text-[10px] text-[#77767f]">Yesterday</span>
              </div>
              <p className="text-[11px] text-[#46464e] mt-0.5">
                Trajectory remains on track for First Class Honours (3.80 projected GPA).
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#ececff] border-t border-[#dfe1f8] flex justify-between items-center">
          <button
            onClick={() => {
              onClear();
              onClose();
            }}
            className="text-[12px] font-bold text-[#ad2f3d] hover:underline"
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#191c3d] text-white rounded-full text-[12px] font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [offlineSync, setOfflineSync] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fbf8ff] w-full max-w-md rounded-[28px] shadow-2xl border border-[#dfe1f8] overflow-hidden flex flex-col">
        <div className="p-6 bg-[#191c3d] text-white flex flex-col items-center text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-[#fe6b75] shadow-lg mb-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9A4eLuqlWD-tKDpqhBBObc40h4T2qHgIYBLDIL-dDoiundnqMRK0gxpL61-avLAS7Gqn1arbF2bHsy5Es7ScFpyU6y0PyuW7HbPpITixY3RdbbX4cXBKp0OBd9Nr-bOfVVGRARFYaOVw56NYkc_Ro_LsNTli4ZKhnOo-rfKBCuXFwQQ6yWwUtEUZMnE_UchoNROLjW2hGOg1Upyh5QceMN_PgQciDm38Rz52fhvgucXYiEaoy_eXRw"
              alt="Kwame Mensah"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-[18px]">Kwame Mensah</h3>
          <p className="text-[12px] text-[#c1c3ee]">Student ID: UCC/CS/22/0481 • Level 300</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold">
            <span>BSc Computer Science • UCC</span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="p-3 rounded-2xl bg-white border border-[#e5e7fe] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#77767f] uppercase">Academic Advisor</span>
              <p className="text-[13px] font-bold text-[#171b2b]">Dr. Emmanuel Quaye</p>
              <span className="text-[11px] text-[#46464e]">e.quaye@ucc.edu.gh</span>
            </div>
            <span className="material-symbols-outlined text-[#191c3d] text-[22px]">contact_support</span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#e5e7fe] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[13px] font-bold text-[#171b2b]">Offline Synchronisation</span>
              <p className="text-[11px] text-[#46464e]">Store coursework locally during network cuts</p>
            </div>
            <button
              onClick={() => setOfflineSync(!offlineSync)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                offlineSync ? 'bg-[#191c3d]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  offlineSync ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#e5e7fe] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#77767f] uppercase">Degree Threshold</span>
              <p className="text-[13px] font-bold text-[#171b2b]">First Class Honours Standing (3.68)</p>
            </div>
            <span className="text-[11px] font-bold bg-[#ffdada] text-[#ad2f3d] px-2 py-0.5 rounded-full">
              Safe Zone
            </span>
          </div>
        </div>

        <div className="p-4 bg-[#ececff] border-t border-[#dfe1f8] flex justify-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#191c3d] text-white rounded-full font-bold text-[13px]"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

interface SubmitSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const SubmitSolutionModal: React.FC<SubmitSolutionModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState(
    'Included all BCNF decomposition proofs and PL/pgSQL trigger for audit logging.'
  );

  if (!isOpen) return null;

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmitSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fbf8ff] w-full max-w-md rounded-[28px] shadow-2xl border border-[#dfe1f8] overflow-hidden flex flex-col">
        <div className="p-4 bg-[#191c3d] text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[16px]">Submit Assignment Solution</h3>
            <p className="text-[11px] text-[#c1c3ee]">DCIT 301 • Database Relational Schema</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="p-3 bg-[#e5e7fe]/60 rounded-2xl border border-[#dfe1f8]">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#191c3d] text-[20px]">code</span>
              <span className="font-bold text-[13px] text-[#171b2b]">schema_normalisation_v2.sql</span>
            </div>
            <p className="text-[11px] text-[#46464e]">
              Size: 42 KB • Last modified: 22m ago • PostgreSQL 16 script
            </p>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#46464e] block mb-1">Submission Notes</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              className="w-full bg-white p-3 rounded-2xl text-[12px] border border-[#e5e7fe] outline-none focus:border-[#191c3d]"
            />
          </div>

          <div className="p-3 rounded-2xl bg-[#ffdada]/60 border border-[#fe6b75]/30 flex items-center gap-2 text-[11px] text-[#ad2f3d]">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span>UCC Honor Code Agreement confirmed for L300 Coursework.</span>
          </div>
        </div>

        <div className="p-4 bg-[#ececff] border-t border-[#dfe1f8] flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full bg-white text-[#171b2b] text-[13px] font-bold border border-[#dfe1f8]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 py-2.5 rounded-full bg-[#fe6b75] hover:bg-[#ad2f3d] text-white text-[13px] font-bold shadow-md flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit to Portal</span>
                <span className="material-symbols-outlined text-[16px]">send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface StudyTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyTimerModal: React.FC<StudyTimerModalProps> = ({ isOpen, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  if (!isOpen) return null;

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fbf8ff] w-full max-w-md rounded-[28px] shadow-2xl border border-[#dfe1f8] overflow-hidden flex flex-col text-center">
        <div className="p-4 bg-[#191c3d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffdada] text-[20px]">timer</span>
            <span className="font-bold text-[16px]">Deep Work Study Block</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col items-center">
          <span className="text-[12px] font-bold text-[#ad2f3d] bg-[#ffdada] px-3 py-1 rounded-full mb-3">
            Focus: Graph Theory & BCNF
          </span>
          <div className="w-40 h-40 rounded-full border-4 border-[#191c3d] flex flex-col items-center justify-center bg-white shadow-inner my-2">
            <span className="text-[38px] font-bold text-[#191c3d]">
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
            <span className="text-[11px] text-[#77767f]">Pomodoro Interval</span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6 py-2.5 rounded-full bg-[#191c3d] text-white text-[13px] font-bold shadow-md hover:bg-[#020324]"
            >
              {isRunning ? 'Pause Session' : 'Start Focus'}
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(25 * 60);
              }}
              className="px-4 py-2.5 rounded-full bg-[#ececff] text-[#171b2b] text-[13px] font-bold hover:bg-[#dfe1f8]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (newCourse: Course) => void;
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAddCourse }) => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [credits, setCredits] = useState(3);
  const [instructor, setInstructor] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !title) return;
    const newCourse: Course = {
      id: `c_${Date.now()}`,
      code: code.toUpperCase(),
      title,
      credits,
      instructor: instructor || 'Faculty Member',
      icon: 'menu_book',
      syllabusCompletion: 0,
      highlightType: 'active',
      highlightText: 'Newly Enrolled',
    };
    onAddCourse(newCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fbf8ff] w-full max-w-md rounded-[28px] shadow-2xl border border-[#dfe1f8] overflow-hidden flex flex-col">
        <div className="p-4 bg-[#191c3d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffdada] text-[20px]">add_circle</span>
            <span className="font-bold text-[16px]">Enroll in New Course</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="text-[11px] font-bold text-[#46464e] block mb-1">Course Code</label>
            <input
              type="text"
              placeholder="e.g. DCIT 313"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full bg-white p-2.5 rounded-xl text-[13px] border border-[#dfe1f8] outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#46464e] block mb-1">Course Title</label>
            <input
              type="text"
              placeholder="e.g. Artificial Intelligence Fundamentals"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-white p-2.5 rounded-xl text-[13px] border border-[#dfe1f8] outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-[#46464e] block mb-1">Credits</label>
              <select
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full bg-white p-2.5 rounded-xl text-[13px] border border-[#dfe1f8] outline-none"
              >
                <option value={1}>1 Credit</option>
                <option value={2}>2 Credits</option>
                <option value={3}>3 Credits</option>
                <option value={4}>4 Credits</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#46464e] block mb-1">Instructor</label>
              <input
                type="text"
                placeholder="e.g. Dr. Arthur"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full bg-white p-2.5 rounded-xl text-[13px] border border-[#dfe1f8] outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full bg-white text-[#171b2b] text-[13px] font-bold border border-[#dfe1f8]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-full bg-[#191c3d] text-white text-[13px] font-bold shadow-md hover:bg-[#020324]"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface NewAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAssignment: (assignment: Assignment) => void;
  courses: Course[];
}

export const NewAssignmentModal: React.FC<NewAssignmentModalProps> = ({
  isOpen,
  onClose,
  onAddAssignment,
  courses,
}) => {
  const [courseCode, setCourseCode] = useState(courses[0]?.code || 'DCIT 301');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('In 4 days');
  const [dueTime, setDueTime] = useState('11:59 PM');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const newAss: Assignment = {
      id: `a_${Date.now()}`,
      courseCode,
      title: `${courseCode}: ${title}`,
      description: 'Coursework submission for academic assessment.',
      dueDate,
      dueTime,
      credits: 3,
      category: 'upcoming',
      statusText: `Due ${dueDate}`,
    };
    onAddAssignment(newAss);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fbf8ff] w-full max-w-md rounded-[28px] shadow-2xl border border-[#dfe1f8] overflow-hidden flex flex-col">
        <div className="p-4 bg-[#191c3d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fe6b75] text-[20px]">assignment_add</span>
            <span className="font-bold text-[16px]">Create Academic Task</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="text-[11px] font-bold text-[#46464e] block mb-1">Course</label>
            <select
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full bg-white p-2.5 rounded-xl text-[13px] border border-[#dfe1f8] outline-none"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.code} - {c.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#46464e] block mb-1">Task Title</label>
            <input
              type="text"
              placeholder="e.g. Lab 5 - Dynamic Programming"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-white p-2.5 rounded-xl text-[13px] border border-[#dfe1f8] outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-[#46464e] block mb-1">Due Horizon</label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-white p-2.5 rounded-xl text-[13px] border border-[#dfe1f8] outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#46464e] block mb-1">Time</label>
              <input
                type="text"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full bg-white p-2.5 rounded-xl text-[13px] border border-[#dfe1f8] outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full bg-white text-[#171b2b] text-[13px] font-bold border border-[#dfe1f8]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-full bg-[#fe6b75] hover:bg-[#e75a65] text-white text-[13px] font-bold shadow-md"
            >
              Add Deadline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onViewTasks: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onViewTasks,
}) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fbf8ff] w-full max-w-md rounded-[28px] shadow-2xl border border-[#dfe1f8] overflow-hidden flex flex-col">
        <div className="p-5 bg-[#191c3d] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 text-[11px] font-bold mb-2">
            <span>{course.credits} Credits</span>
          </div>
          <h3 className="font-bold text-[20px]">{course.code}</h3>
          <p className="text-[13px] text-[#c1c3ee] mt-0.5">{course.title}</p>
        </div>

        <div className="p-5 space-y-3.5">
          <div className="bg-white p-3.5 rounded-2xl border border-[#e5e7fe] shadow-sm">
            <div className="flex items-center justify-between text-[12px] mb-1.5">
              <span className="font-semibold text-[#46464e]">Syllabus Progress</span>
              <span className="font-bold text-[#191c3d]">{course.syllabusCompletion}%</span>
            </div>
            <div className="w-full h-2 bg-[#dfe1f8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#191c3d] rounded-full"
                style={{ width: `${course.syllabusCompletion}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#e5e7fe] shadow-sm space-y-2 text-[12px]">
            <div className="flex items-center justify-between">
              <span className="text-[#46464e]">Instructor</span>
              <span className="font-bold text-[#171b2b]">{course.instructor}</span>
            </div>
            {course.email && (
              <div className="flex items-center justify-between">
                <span className="text-[#46464e]">Email</span>
                <span className="font-bold text-[#191c3d]">{course.email}</span>
              </div>
            )}
            {course.room && (
              <div className="flex items-center justify-between">
                <span className="text-[#46464e]">Venue / Room</span>
                <span className="font-bold text-[#171b2b]">{course.room}</span>
              </div>
            )}
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                onClose();
                onViewTasks();
              }}
              className="w-full py-3 bg-[#191c3d] hover:bg-[#020324] text-white rounded-full font-bold text-[13px] shadow-md flex items-center justify-center gap-2"
            >
              <span>View Course Deadlines</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
