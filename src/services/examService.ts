import { StudentInfo, ExamResult, ExamSession } from '../types';

export const transmitResults = async (session: ExamSession, result: ExamResult) => {
  console.log('TRANS-LINK READY. INITIATING UPLINK...', { session, result });
  
  const teacherEmail = import.meta.env.VITE_TEACHER_EMAIL;
  
  const payload = {
    studentName: session.student.name,
    school: session.student.school,
    score: result.score,
    totalCorrect: result.correctCount,
    wrongCount: result.wrongCount,
    essayCount: result.essayCount,
    violations: result.violations,
    answers: JSON.stringify(session.answers),
    teacherEmail: teacherEmail,
    timestamp: new Date().toISOString()
  };

  // Call local backend endpoint to handle the transmission (bypasses CORS)
  try {
    await fetch('/api/transmit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('SATELLITE UPLINK SUCCESSFUL');
  } catch (e) {
    console.error('UPLINK FAILED', e);
  }

  // Optional: Email logic can be logged
  if (teacherEmail) {
    console.log(`DATA PACKET ARCHIVED FOR: ${teacherEmail}`);
  }
};
