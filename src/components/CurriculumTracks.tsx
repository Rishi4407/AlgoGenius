import React, { useState } from 'react';
import { CURRICULUM_TRACKS } from '../data/curriculumData';
import { LearningTrack } from '../types';
import { BookOpen, Code, Cpu, ChevronRight, X, Sparkles, CheckCircle } from 'lucide-react';

export const CurriculumTracks: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<LearningTrack | null>(null);

  return (
    <section id="tracks" className="py-14 md:py-24 border-t border-slate-800/80 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            {/* Zero-pill metadata kicker */}
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
              Curated Academic & Engineering Tracks
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Foundational & Applied AI Curriculum
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Every track pairs mathematical derivations with real-world Python code. 
              No abstractions without understanding the underlying matrix operations and tensor mechanics.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Updated for Python 3.11+ · PyTorch 2.3+
          </div>
        </div>

        {/* Tracks Grid (3-5 well developed items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRICULUM_TRACKS.map((track) => (
            <div
              key={track.id}
              className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-lg hover:border-slate-700 transition-all duration-300 group"
            >
              {/* Card Image Slot with Fallback */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={track.image}
                  alt={track.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

                {/* Level text */}
                <div className="absolute top-3 right-3 text-[11px] font-mono font-semibold text-sky-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                  {track.level}
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Clean unboxed metadata with bullet separators */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span>{track.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{track.modulesCount} Modules</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {track.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-mono">
                    {track.coreLibraries.slice(0, 3).join(', ')}
                  </div>

                  <button
                    onClick={() => setSelectedTrack(track)}
                    className="flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 group/btn transition-colors"
                  >
                    <span>View Syllabus</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Track Syllabus & Deep-Dive Modal Drawer */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-slate-950/80">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-sky-400">
                  {selectedTrack.kicker}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedTrack.title}
                </h3>
                <div className="text-xs text-slate-400">
                  {selectedTrack.duration} · {selectedTrack.modulesCount} Comprehensive Modules
                </div>
              </div>

              <button
                onClick={() => setSelectedTrack(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close track drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
              {/* Mathematical Foundations Card */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>Key Mathematical Formulations</span>
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {selectedTrack.mathFormulas.map((mf, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1"
                    >
                      <div className="text-xs font-bold text-white">{mf.name}</div>
                      <div className="font-mono text-xs text-sky-300 bg-slate-900/80 p-2 rounded border border-slate-800/80 overflow-x-auto">
                        {mf.formula}
                      </div>
                      <div className="text-xs text-slate-400">{mf.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Syllabus */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span>Module Syllabus Breakdown</span>
                </h4>
                <div className="space-y-3">
                  {selectedTrack.syllabus.map((mod, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
                      <div className="text-sm font-semibold text-white">
                        Module 0{idx + 1}: {mod.title}
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        {mod.topics.map((t, tIdx) => (
                          <li key={tIdx}>{t}</li>
                        ))}
                      </ul>
                      <div className="text-xs text-sky-400 font-mono">
                        Python Focus: {mod.pythonFocus}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capstone Project Portfolio */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 border border-sky-800/50 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Capstone Engineering Project</span>
                </div>
                <div className="text-base font-bold text-white">
                  {selectedTrack.capstoneProject.title}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedTrack.capstoneProject.description}
                </p>
                <div className="text-xs font-mono text-slate-400 pt-1">
                  Stack: {selectedTrack.capstoneProject.pythonStack}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setSelectedTrack(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
