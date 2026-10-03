import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/glossaryData';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, HelpCircle } from 'lucide-react';

export const InteractiveQuiz: React.FC = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const question = QUIZ_QUESTIONS[currentQuestionIdx];
  const selectedOption = selectedAnswers[question.id];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [question.id]: idx,
    });
  };

  const handleNext = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setIsSubmitted(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qId, ans]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === parseInt(qId));
    return q && q.correctIndex === ans ? acc + 1 : acc;
  }, 0);

  return (
    <section className="py-14 md:py-20 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Knowledge Evaluation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Engineering Diagnostic Assessment
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Test your intuition on attention scaling factors, PyTorch gradient mechanics, and autonomous agent loops.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-6">
          {!isSubmitted ? (
            <>
              {/* Question Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 text-xs">
                <span className="font-mono text-sky-400">
                  Question 0{currentQuestionIdx + 1} of 0{QUIZ_QUESTIONS.length}
                </span>
                <span className="text-slate-400">
                  Topic: {currentQuestionIdx === 0 ? 'Transformers' : currentQuestionIdx === 1 ? 'PyTorch Internals' : currentQuestionIdx === 2 ? 'Computer Vision' : 'Autonomous Agents'}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                {question.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((opt, idx) => {
                  const isChosen = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                        isChosen
                          ? 'bg-sky-950/70 border-sky-400 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center font-mono text-xs text-slate-400">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isChosen && <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="text-xs text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={selectedOption === undefined}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 disabled:opacity-40 rounded-lg shadow-sm transition-all"
                >
                  <span>{currentQuestionIdx === QUIZ_QUESTIONS.length - 1 ? 'Complete & Score' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            /* Results View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Assessment Complete</h3>
                <p className="text-sm text-slate-300">
                  You scored <span className="text-sky-400 font-bold font-mono">{score}</span> out of{' '}
                  <span className="font-mono">{QUIZ_QUESTIONS.length}</span> ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
                </p>
              </div>

              {/* Review of Explanations */}
              <div className="text-left space-y-4 pt-4 border-t border-slate-800">
                {QUIZ_QUESTIONS.map((q) => {
                  const userAns = selectedAnswers[q.id];
                  const isCorrect = userAns === q.correctIndex;
                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center gap-2 font-semibold">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                        <span className="text-white">{q.question}</span>
                      </div>
                      <p className="text-slate-300">{q.explanation}</p>
                      <div className="font-mono text-sky-300 text-[11px] bg-slate-900 p-2 rounded">
                        {q.pythonRelevance}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Diagnostic</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
