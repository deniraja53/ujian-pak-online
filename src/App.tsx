import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Terminal, 
  AlertTriangle, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  User, 
  School,
  Lock,
  Skull
} from 'lucide-react';
import { 
  QuestionType, 
  StudentInfo, 
  ExamSession, 
  Violation, 
  ExamResult 
} from './types';
import { EXAM_DATA } from './data/examData';
import { 
  CyberButton, 
  CyberInput, 
  CyberCard, 
  GlitchText, 
  CyberTextArea 
} from './components/CyberEx/UI';

import { transmitResults } from './services/examService';
import { playSound } from './lib/sounds';
import Antigravity from './components/CyberEx/Antigravity';

type Phase = 'LOGIN' | 'BRIEFING' | 'EXAM' | 'FINISH' | 'TERMINATED';

export default function App() {
  const [phase, setPhase] = useState<Phase>('LOGIN');
  const [student, setStudent] = useState<StudentInfo>({ name: '', school: '' });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [violations, setViolations] = useState<Violation[]>([]);
  const [timeLeft, setTimeLeft] = useState(EXAM_DATA.durationMinutes * 60);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [flashing, setFlashing] = useState(false);

  const examContainerRef = useRef<HTMLDivElement>(null);

  // Anti-cheat Listeners
  useEffect(() => {
    if (phase !== 'EXAM') return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        registerViolation('TAB_SWITCH');
      }
    };

    const handleBlur = () => {
      registerViolation('FOCUS_LOST');
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && phase === 'EXAM') {
        registerViolation('FULLSCREEN_EXIT');
      }
    };

    const disableContext = (e: MouseEvent) => e.preventDefault();
    const disableCopy = (e: ClipboardEvent) => e.preventDefault();

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('contextmenu', disableContext);
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'u')) {
        e.preventDefault();
      }
    });

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('contextmenu', disableContext);
    };
  }, [phase]);

  // Timer logic
  useEffect(() => {
    if (phase !== 'EXAM' || timeLeft <= 0) {
      if (timeLeft === 0 && phase === 'EXAM') {
        finishExam();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const registerViolation = (type: Violation['type']) => {
    setFlashing(true);
    setTimeout(() => setFlashing(false), 500);

    const newViolation: Violation = {
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setViolations(prev => {
      const updated = [...prev, newViolation];
      if (updated.length >= 3) {
        playSound('TERMINATED');
        setPhase('TERMINATED');
      } else {
        playSound('WARNING');
      }
      return updated;
    });
  };

  const startExam = async () => {
    if (!student.name || !student.school) {
      setErrorStatus('ACCESS DENIED - DATA REQUIRED');
      return;
    }
    
    try {
      if (examContainerRef.current) {
        await examContainerRef.current.requestFullscreen();
      }
    } catch (e) {
      console.warn('Fullscreen denied or failed', e);
    }
    
    setPhase('EXAM');
    setIsExamStarted(true);
  };

  const finishExam = () => {
    playSound('SUCCESS');
    const results = calculateResults();
    const session: ExamSession = {
      student,
      startTime: new Date().toISOString(), // Mock, should be real start
      answers,
      violations,
      status: 'COMPLETED'
    };
    transmitResults(session, results);

    setPhase('FINISH');
    setIsExamStarted(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft < 300) return 'text-cyber-red cyber-glow-red'; // 5 mins
    if (timeLeft < 900) return 'text-cyber-yellow'; // 15 mins
    return 'text-cyber-blue';
  };

  const calculateResults = (): ExamResult => {
    let score = 0;
    let totalMax = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let essayCount = 0;

    EXAM_DATA.questions.forEach(q => {
      totalMax += q.score;
      const answer = answers[q.id]?.trim();
      
      if (q.type === QuestionType.MULTIPLE_CHOICE || q.type === QuestionType.MATCHING) {
        if (answer?.toUpperCase() === q.correctAnswer.toUpperCase()) {
          score += q.score;
          correctCount++;
        } else {
          wrongCount++;
        }
      } else if (q.type === QuestionType.FILL_IN) {
        // Simple case-insensitive match for fill-in
        const normalizedAnswer = answer?.toLowerCase().replace(/\s/g, '');
        const normalizedCorrect = q.correctAnswer.toLowerCase().split('/')[0].trim().replace(/\s/g, ''); // Extract first part if multiple
        
        if (normalizedAnswer === normalizedCorrect) {
          score += q.score;
          correctCount++;
        } else {
          wrongCount++;
        }
      } else if (q.type === QuestionType.ESSAY) {
        essayCount++;
      }
    });

    return {
      score: Math.round((score / totalMax) * 100),
      totalScore: score,
      correctCount,
      wrongCount,
      essayCount,
      violations: violations.length
    };
  };

  const renderLogin = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
        <div className="text-[10px] font-mono tracking-widest leading-tight">
          SYS_AUTH_SERVICE [v.4.1]<br />
          LOCAL_DATA_CACHE: SIAP<br />
          SATELLITE_LINK: TERHUBUNG
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12 relative z-10"
      >
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 flex items-center justify-center relative">
              <img 
                src="https://lh3.googleusercontent.com/d/17xMFIMTnAsLDZdAaY1pM9N7RJYQ6y-um" 
                alt="School Logo" 
                className="w-full h-full object-contain relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <GlitchText text="INTERFACE UJIAN SISTEM" className="text-2xl md:text-3xl text-cyber-blue block font-black italic tracking-widest" />
          <p className="text-cyber-purple text-[10px] tracking-[0.2em] font-mono uppercase">
            Hanya Akses Personel Terotorisasi
          </p>
        </div>

        <CyberCard title="VERIFIKASI IDENTITAS">
          <div className="space-y-8 py-4">
            <div className="space-y-2">
              <label className="text-cyber-blue/60 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                <User size={10} /> Nama Lengkap
              </label>
              <CyberInput 
                placeholder="Inisialisasi identitas biometrik..."
                value={student.name}
                onChange={e => {
                  setStudent(prev => ({ ...prev, name: e.target.value }));
                  setErrorStatus(null);
                }}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-cyber-blue/60 text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                <School size={10} /> Sekolah
              </label>
              <CyberInput 
                placeholder="Inisialisasi data institusi..."
                value={student.school}
                onChange={e => {
                  setStudent(prev => ({ ...prev, school: e.target.value }));
                  setErrorStatus(null);
                }}
              />
            </div>

            <AnimatePresence>
              {errorStatus && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-cyber-red text-[10px] font-black font-mono py-3 border border-cyber-red/30 bg-cyber-red/5 flex items-center justify-center gap-2 px-4"
                >
                  <Skull size={14} /> AKSES_DITOLAK: {errorStatus}
                </motion.div>
              )}
            </AnimatePresence>

            <CyberButton 
              className="w-full mt-4 h-14"
              onClick={() => {
                if (!student.name || !student.school) {
                  setErrorStatus("DATA TIDAK LENGKAP");
                  return;
                }
                setPhase('BRIEFING');
              }}
            >
              Inisialisasi Handshake
            </CyberButton>
          </div>
        </CyberCard>
      </motion.div>
    </div>
  );

  const renderBriefing = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl space-y-10"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-cyber-blue/30" />
            <GlitchText text="BRIEFING MISI" className="text-4xl text-cyber-blue font-black tracking-tighter" />
            <div className="h-px w-12 bg-cyber-blue/30" />
          </div>
          <p className="text-cyber-purple text-[10px] tracking-[0.6em] font-mono uppercase">Parameter Operasional</p>
        </div>

        <CyberCard className="font-mono text-sm leading-relaxed text-cyber-blue/90">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
            className="space-y-6 py-4"
          >
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 border border-cyber-pink/40 flex items-center justify-center text-cyber-pink shrink-0">01</div>
              <p>Jalankan objektif dengan integritas maksimal. Ketidaksesuaian data adalah pelanggaran protokol.</p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 border border-cyber-pink/40 flex items-center justify-center text-cyber-pink shrink-0">02</div>
              <p>Pertahankan fokus sistem yang konsisten. HUD harus tetap dalam status viewport utama.</p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 border border-cyber-pink/40 flex items-center justify-center text-cyber-pink shrink-0">03</div>
              <p>Timeline misi ditetapkan selama <span className="text-cyber-pink font-bold underline underline-offset-4 decoration-cyber-pink/30">90 MENIT STANDAR</span>.</p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 border border-cyber-pink/40 flex items-center justify-center text-cyber-pink shrink-0">04</div>
              <p>Algoritma deteksi otomatis aktif. Pelanggaran sistem akan memicu penguncian terminal segera.</p>
            </div>
            <p className="text-cyber-purple text-[10px] border-t border-cyber-blue/10 pt-6 mt-8 flex justify-between">
              <span>{">"} STATUS: LINGKUNGAN_AMAN</span>
              <span>{">"} ENKRIPSI: AKTIF</span>
            </p>
          </motion.div>
        </CyberCard>

        <div className="flex justify-center mt-4">
          <CyberButton 
            variant="pink" 
            className="px-16 h-16"
            onClick={startExam}
          >
            Setujui & Kerahkan
          </CyberButton>
        </div>
      </motion.div>
    </div>
  );

  const renderQuestion = () => {
    const q = EXAM_DATA.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / EXAM_DATA.questions.length) * 100;

    return (
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Header HUD */}
        <header className="relative z-10 flex justify-between items-center px-8 py-4 border-b border-cyber-blue/30 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center relative">
              <img 
                src="https://lh3.googleusercontent.com/d/17xMFIMTnAsLDZdAaY1pM9N7RJYQ6y-um" 
                alt="School Logo" 
                className="w-full h-full object-contain relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-widest uppercase italic text-cyber-blue">System Examination Interface</h1>
              <p className="text-[10px] text-cyber-purple font-mono tracking-[0.2em]">AUTHORIZED STUDENT ACCESS ONLY // ID: STU-88291</p>
            </div>
          </div>
          
          <div className="flex gap-8 items-center">
            <div className="text-right font-mono">
              <div className="text-[10px] text-cyber-blue/60 uppercase">Remaining Time</div>
              <div className={`text-3xl font-bold tracking-tighter ${getTimerColor()}`}>{formatTime(timeLeft)}</div>
            </div>
            <div className="h-12 w-px bg-cyber-blue/20"></div>
            <div className="flex flex-col items-end">
              <span className="px-2 py-0.5 bg-cyber-blue text-bg-dark text-[10px] font-bold mb-1 uppercase tracking-tighter shadow-[0_0_10px_#00f0ff]">Security Monitor Active</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className={`w-4 h-1 transition-colors ${i <= 3 - violations.length ? 'bg-cyber-blue' : 'bg-cyber-red animate-pulse'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Hub */}
        <main className="relative z-10 flex flex-1 overflow-hidden p-6 gap-6">
          {/* Sidebar: Node Navigator */}
          <aside className="w-64 hud-border p-4 flex flex-col">
            <div className="text-[11px] font-mono mb-6 flex justify-between">
              <span className="text-cyber-blue/60 tracking-widest">NODE_NAVIGATOR</span>
              <span className="text-cyber-pink font-bold">{String(currentQuestionIndex + 1).padStart(2, '0')}/{String(EXAM_DATA.questions.length).padStart(2, '0')}</span>
            </div>
            <div className="grid grid-cols-5 gap-2 overflow-y-auto pr-2">
              {EXAM_DATA.questions.map((_, idx) => {
                const isSelected = idx === currentQuestionIndex;
                const isAnswered = answers[EXAM_DATA.questions[idx].id] !== undefined;
                return (
                  <div 
                    key={idx}
                    className={`
                      w-8 h-8 border flex items-center justify-center text-[10px] font-bold transition-all
                      ${isSelected ? 'border-cyber-pink bg-cyber-pink/20 text-white shadow-[0_0_10px_#ff00c8]' : 
                        isAnswered ? 'border-cyber-blue/40 bg-cyber-blue/5 text-cyber-blue' : 'border-cyber-blue/10 text-cyber-blue/20'}
                    `}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                );
              })}
            </div>
            <div className="mt-auto p-4 border-t border-cyber-blue/10 bg-cyber-blue/5">
              <div className="text-[9px] text-cyber-purple font-mono mb-2 tracking-tighter uppercase">Packet Transmission Status: {Math.round((Object.keys(answers).length / EXAM_DATA.questions.length) * 100)}%</div>
              <div className="w-full h-1 bg-cyber-purple/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-cyber-purple" 
                  initial={{ width: 0 }}
                  animate={{ width: `${(Object.keys(answers).length / EXAM_DATA.questions.length) * 100}%` }}
                />
              </div>
            </div>
          </aside>

          {/* Center: Question Module */}
          <section className="flex-1 flex flex-col gap-6">
            <div className="flex-1 hud-border relative p-8 overflow-y-auto">
              {/* Internal Corner Accents for specific module card feel */}
              <div className="corner-accent corner-tl !border-cyber-pink" />
              <div className="corner-accent corner-tr !border-cyber-pink" />
              <div className="corner-accent corner-bl !border-cyber-pink" />
              <div className="corner-accent corner-br !border-cyber-pink" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  <div>
                    <span className="text-cyber-pink font-mono text-[10px] tracking-[0.4em] uppercase block mb-2">
                      // Module: {q.type.replace('_', ' ')} Node
                    </span>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight text-white font-orbitron">
                      {q.question}
                    </h2>
                  </div>

                  {/* Question Content */}
                  <div className="space-y-4">
                    {q.type === QuestionType.MULTIPLE_CHOICE && q.options && (
                      <div className="grid grid-cols-1 gap-4">
                        {q.options.map((option, idx) => {
                          const optionLetter = option.charAt(0);
                          const isSelected = answers[q.id] === optionLetter;
                          return (
                            <div
                              key={idx}
                              onClick={() => setAnswers(prev => ({ ...prev, [q.id]: optionLetter }))}
                              className={`
                                group relative p-4 border flex items-center gap-6 cursor-pointer transition-all duration-300
                                ${isSelected 
                                  ? 'border-2 border-cyber-pink bg-cyber-pink/10 shadow-[0_0_20px_rgba(255,0,200,0.2)]' 
                                  : 'border-cyber-blue/30 bg-cyber-blue/5 hover:border-cyber-blue/60 hover:bg-cyber-blue/10'}
                              `}
                            >
                              <div className={`
                                w-8 h-8 border flex items-center justify-center font-mono text-xs font-bold
                                ${isSelected ? 'bg-cyber-pink border-cyber-pink text-bg-dark' : 'border-cyber-blue/60 text-cyber-blue'}
                              `}>
                                {optionLetter}
                              </div>
                              <span className={`text-xl font-medium ${isSelected ? 'text-white' : 'text-cyber-blue/80'}`}>
                                {option.substring(2)}
                              </span>
                              {isSelected && (
                                <div className="ml-auto text-[8px] font-mono text-cyber-pink font-bold tracking-[0.2em] animate-pulse">
                                  SELECTED_NODE
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {q.type === QuestionType.MATCHING && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div className="border border-cyber-blue/30 p-6 bg-cyber-blue/5">
                            <p className="text-cyber-blue/40 text-[9px] uppercase tracking-[0.3em] font-bold mb-4">Protocol Reference</p>
                            <p className="text-white text-lg font-medium">{q.question}</p>
                          </div>
                          <div className="space-y-3">
                            <label className="text-cyber-pink text-[9px] font-bold uppercase tracking-[0.4em]">Connect Target Node</label>
                            <select 
                              value={answers[q.id] || ''}
                              onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                              className="w-full bg-[#050505] border border-cyber-blue/40 text-cyber-blue p-4 font-mono focus:border-cyber-pink outline-none appearance-none block w-full px-4 rounded-none cursor-pointer"
                            >
                              <option value="">SELECT_NODE...</option>
                              {EXAM_DATA.questions.find(x => x.id === 26)?.matchingOptions?.map((opt, i) => (
                                <option key={i} value={opt.label}>
                                  [{opt.label}] {opt.text}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {q.type === QuestionType.FILL_IN && (
                      <div className="max-w-xl">
                        <p className="text-[9px] text-cyber-purple uppercase tracking-[0.4em] mb-4">Awaiting Input Response...</p>
                        <CyberInput 
                          placeholder="Initialize string response..."
                          value={answers[q.id] || ''}
                          onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                          autoFocus
                        />
                      </div>
                    )}

                    {q.type === QuestionType.ESSAY && (
                      <div className="space-y-4">
                        <p className="text-[9px] text-cyber-purple uppercase tracking-[0.4em]">Initialize Buffer Storage for Transmission...</p>
                        <CyberTextArea 
                          placeholder="Transmit extended data packet..."
                          value={answers[q.id] || ''}
                          onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                        />
                         <div className="flex justify-end pr-4">
                           <span className="text-[9px] text-cyber-blue/40 uppercase font-mono tracking-widest">Buffer Occupancy: {answers[q.id]?.length || 0} characters</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex justify-between items-center bg-black/40 p-4 border border-cyber-blue/20">
              <CyberButton 
                variant="purple" 
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              >
                Previous Node
              </CyberButton>

              <div className="flex-1 mx-12 h-1 bg-cyber-blue/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-cyber-blue shadow-[0_0_10px_#00f0ff]"
                  animate={{ width: `${progress}%` }}
                />
              </div>

              {currentQuestionIndex === EXAM_DATA.questions.length - 1 ? (
                <CyberButton 
                  variant="pink" 
                  onClick={finishExam}
                >
                  Final Transmission
                </CyberButton>
              ) : (
                <CyberButton 
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                >
                  Initialize Next Node
                </CyberButton>
              )}
            </div>
          </section>

          {/* Right Sidebar: Security Logs */}
          <aside className="w-48 hud-border p-4 text-[9px] font-mono flex flex-col">
            <div className="text-cyber-pink mb-6 flex items-center gap-2">
              <Lock size={12} />
              <span className="tracking-widest font-black uppercase">Critical_Logs</span>
            </div>
            <div className="space-y-4 overflow-y-auto pr-1 flex-1">
              <div className="border-l-2 border-cyber-blue/40 pl-3 py-1">
                <div className="text-cyber-blue/40">17:16:33</div>
                <div className="text-cyber-blue">Session Authenticated</div>
              </div>
              <div className="border-l-2 border-cyber-blue/40 pl-3 py-1">
                <div className="text-cyber-blue/40">17:17:01</div>
                <div className="text-cyber-blue">Handshake Successful</div>
              </div>
              {violations.map((v, i) => (
                 <div key={i} className="border-l-2 border-cyber-red pl-3 py-1 animate-pulse">
                    <div className="text-cyber-red/60">{v.timestamp}</div>
                    <div className="text-cyber-red font-bold">BREACH: {v.type}</div>
                 </div>
              ))}
              {Object.keys(answers).length > 0 && (
                <div className="border-l-2 border-cyber-purple pl-3 py-1">
                  <div className="text-cyber-purple/60 tracking-tighter">DATA PACKET {Object.keys(answers).length} STORED</div>
                </div>
              )}
            </div>
            
            <div className="mt-12 opacity-30 space-y-2 border-t border-cyber-blue/10 pt-4">
              <div className="flex justify-between items-center text-[10px] tracking-tight"><span>ENCRYPTION:</span> <span className="font-bold">AES-256</span></div>
              <div className="flex justify-between items-center text-[10px] tracking-tight"><span>SIGNAL:</span> <span className="text-green-500">OPTIMAL</span></div>
              <div className="text-xs tracking-[-0.2em] font-black text-center mt-2 opacity-50">\\\\\\\\\\\\\\\\\\\\\\\\\\\\</div>
            </div>
          </aside>
        </main>

        {/* HUD Footer Status Bar */}
        <footer className="h-8 border-t border-cyber-blue/20 bg-cyber-blue/5 flex items-center overflow-hidden z-50">
          <div className="flex whitespace-nowrap animate-marquee">
            {/* Duplicate content to ensure seamless loop */}
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-10 px-10">
                <span className="flex items-center gap-2 font-mono text-[9px] text-cyber-blue/60">
                  <div className="w-1 h-1 bg-cyber-pink" /> IP: 192.168.1.104
                </span>
                <span className="flex items-center gap-2 font-mono text-[9px] text-cyber-blue/60">
                  <div className="w-1 h-1 bg-cyber-purple" /> LATENCY: 14ms
                </span>
                <span className="text-cyber-purple font-mono text-[9px]">CYBER_ED MISSION_TERMINAL v2.04</span>
                <span className="text-cyber-blue font-black tracking-widest text-[10px] uppercase">
                  Design by deniraja99
                </span>
                <span className="text-cyber-pink font-bold font-mono text-[10px] uppercase tracking-wider italic">
                  FILIPI 4 : 13 "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku"
                </span>
              </div>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3 px-8 bg-bg-dark h-full border-l border-cyber-blue/20 z-10">
            <span className="flex items-center gap-2 text-[9px] font-mono">
              <div className="w-2 h-2 rounded-full bg-cyber-blue cyber-glow-blue animate-[pulse_2s_infinite]"></div>
              <span className="font-bold text-cyber-blue">SYSTEM_ONLINE</span>
            </span>
          </div>
        </footer>
      </div>
    );
  };

  const renderFinish = () => {
    const results = calculateResults();
    
    return (
      <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center space-y-16 max-w-6xl mx-auto relative">
         <div className="absolute top-10 right-10 flex flex-col items-end opacity-20 pointer-events-none text-right font-mono text-[9px] tracking-widest gap-2">
            <div>MISSION_ID: CX-2026-PAK</div>
            <div>STAMP: {new Date().toISOString()}</div>
            <div className="flex gap-1 justify-end mt-2"><div className="w-4 h-1 bg-cyber-pink" /><div className="w-2 h-1 bg-cyber-pink/40" /></div>
         </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-2 h-2 bg-cyber-blue rotate-45" />
            <GlitchText text="MISI SELESAI" className="text-4xl md:text-6xl text-cyber-blue font-black tracking-tighter" />
            <div className="w-2 h-2 bg-cyber-blue rotate-45" />
          </div>
          <p className="text-cyber-purple tracking-[0.8em] font-mono uppercase text-[10px]">Menyinkronkan Data Terminal...</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <CyberCard title="DATA_OPERATOR" className="md:col-span-1 border-cyber-blue/20">
             <div className="space-y-6 font-mono text-xs py-4">
                <div className="border-l border-cyber-blue/30 pl-4">
                  <p className="text-cyber-blue/40 text-[9px] uppercase tracking-widest mb-1">Identitas</p>
                  <p className="text-white text-xl font-bold tracking-tight">{student.name}</p>
                </div>
                <div className="border-l border-cyber-blue/30 pl-4">
                  <p className="text-cyber-blue/40 text-[9px] uppercase tracking-widest mb-1">Institusi</p>
                  <p className="text-white font-medium">{student.school}</p>
                </div>
                <div className="border-l border-cyber-blue/30 pl-4">
                  <p className="text-cyber-blue/40 text-[9px] uppercase tracking-widest mb-1">Node_Objektif</p>
                  <p className="text-white font-medium">{EXAM_DATA.subject}</p>
                </div>
             </div>
          </CyberCard>

          <CyberCard title="LAPORAN_ANALITIK" className="md:col-span-2">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center py-4">
                <div className="space-y-2 group">
                   <p className="text-cyber-pink text-5xl font-black drop-shadow-[0_0_10px_#ff00c8]">{results.score}</p>
                   <p className="text-[9px] text-cyber-blue/60 uppercase font-black tracking-widest">Efisiensi</p>
                </div>
                <div className="space-y-2">
                   <p className="text-green-400 text-5xl font-black drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">{results.correctCount}</p>
                   <p className="text-[9px] text-cyber-blue/60 uppercase font-black tracking-widest">Node Valid</p>
                </div>
                <div className="space-y-2">
                   <p className="text-cyber-red text-5xl font-black drop-shadow-[0_0_10px_rgba(255,0,60,0.3)]">{results.wrongCount}</p>
                   <p className="text-[9px] text-cyber-blue/60 uppercase font-black tracking-widest">Kesalahan</p>
                </div>
                <div className="space-y-2">
                   <p className="text-cyber-purple text-5xl font-black drop-shadow-[0_0_10px_rgba(157,0,255,0.3)]">{results.violations}</p>
                   <p className="text-[9px] text-cyber-blue/60 uppercase font-black tracking-widest">Pelanggaran</p>
                </div>
             </div>

             <div className="mt-10 p-6 bg-[#00f0ff]/5 border border-cyber-blue/20 rounded-none flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 border border-cyber-blue/30">
                    <CheckCircle2 className="text-cyber-blue" size={20} />
                  </div>
                  <div>
                    <p className="text-cyber-blue font-mono font-black text-[10px] tracking-widest uppercase">Status Enkripsi: Terverifikasi</p>
                    <p className="text-cyber-blue/60 font-mono text-[9px]">UPLINK STABIL // DATA_PACKET_CHECKSUM: OK</p>
                  </div>
                </div>
                <div className="text-cyber-blue/20 rotate-90 scale-150 font-black">HUD</div>
             </div>
          </CyberCard>
        </div>

        <CyberButton 
          variant="blue" 
          onClick={() => window.location.reload()}
          className="mt-8 h-14 px-20 translate-y-4"
        >
          Reboot Interface
        </CyberButton>
      </div>
    );
  };

  const renderTerminated = () => (
    <div className="min-h-screen bg-cyber-red/10 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 10 }}
        className="w-full max-w-xl text-center space-y-12"
      >
        <div className="flex justify-center">
           <div className="w-24 h-24 bg-cyber-red flex items-center justify-center rotate-45 shadow-[0_0_50px_#ff003c]">
              <Skull size={48} className="text-white -rotate-45" />
           </div>
        </div>
        
        <div className="space-y-4">
          <GlitchText text="PELANGGARAN" className="text-[40px] leading-[71px] text-cyber-red font-black tracking-tighter" />
          <div className="bg-cyber-red text-white py-2 font-mono text-sm tracking-[0.3em] font-black uppercase italic">
            Pelanggaran Keamanan: Pembersihan Sistem Dimulai
          </div>
        </div>

        <CyberCard title="LAPORAN_PELANGGARAN" className="border-cyber-red/40 bg-cyber-red/5">
          <div className="space-y-4 text-cyber-red font-mono text-xs text-left py-2">
             <div className="flex justify-between border-b border-cyber-red/20 pb-2">
                <span>JENIS_PELANGGARAN:</span>
                <span className="font-bold">KELUAR_VIEWPORT_ILEGAL</span>
             </div>
             <div className="flex justify-between border-b border-cyber-red/20 pb-2">
                <span>IDENTITAS:</span>
                <span className="font-bold">{student.name || 'ANONYMOUS'}</span>
             </div>
             <div className="flex justify-between border-b border-cyber-red/20 pb-2">
                <span>TIMESTAMP:</span>
                <span className="font-bold">{new Date().toISOString()}</span>
             </div>
             <p className="text-[10px] leading-relaxed opacity-60 mt-4 italic">
               Diagnostik akhir: Semua paket data telah dibuang. Diperlukan re-otorisasi melalui administrator pusat.
             </p>
          </div>
        </CyberCard>

        <CyberButton 
          variant="red" 
          onClick={() => window.location.reload()}
          className="h-16 px-16"
        >
          Konfirmasi Pembersihan
        </CyberButton>
      </motion.div>
    </div>
  );

  return (
    <div className="relative font-orbitron" ref={examContainerRef}>
      {/* Antigravity Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020205]">
        <Antigravity
          count={400}
          magnetRadius={15}
          ringRadius={12}
          waveSpeed={0.3}
          waveAmplitude={1.5}
          particleSize={1.2}
          lerpSpeed={0.03}
          color="#00f0ff"
          autoAnimate={true}
          particleVariance={1}
          fieldStrength={8}
        />
      </div>

      {/* Background Grid & Flash effects */}
      <div className={`fixed inset-0 pointer-events-none transition-colors duration-500 z-[999] ${flashing ? 'bg-cyber-red/30' : 'bg-transparent'}`} />
      
      <AnimatePresence mode="wait">
        {phase === 'LOGIN' && <motion.div key="login" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>{renderLogin()}</motion.div>}
        {phase === 'BRIEFING' && <motion.div key="briefing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderBriefing()}</motion.div>}
        {phase === 'EXAM' && <motion.div key="exam" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{renderQuestion()}</motion.div>}
        {phase === 'FINISH' && <motion.div key="finish" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderFinish()}</motion.div>}
        {phase === 'TERMINATED' && <motion.div key="terminated" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{renderTerminated()}</motion.div>}
      </AnimatePresence>

      {/* Decorative HUD Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20">
         <div className="absolute top-4 left-4 flex gap-2">
            <Shield size={16} className="text-cyber-blue" />
            <Terminal size={16} className="text-cyber-purple" />
            <Zap size={16} className="text-cyber-pink" />
         </div>
      </div>
    </div>
  );
}
