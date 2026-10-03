import React, { useState } from 'react';
import { VIDEO_LECTURES } from '../data/videoData';
import { VideoLecture } from '../types';
import { Play, Pause, Video, Clock, BookOpen, Code, Sparkles, CheckCircle2 } from 'lucide-react';

export const VideoMasterclasses: React.FC = () => {
  const [selectedLecture, setSelectedLecture] = useState<VideoLecture>(VIDEO_LECTURES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(1);

  return (
    <section id="videos" className="py-14 md:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
              <Video className="w-4 h-4" />
              <span>Multimedia Engineering Masterclasses</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Curated Video Lectures & Code Walkthroughs
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Step through mathematical proofs and architecture codebases with leading AI researchers and systems architects.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            4 Deep-Dive Masterclasses Available
          </div>
        </div>

        {/* Video Player Theater Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Video Viewport & Companion Notebook (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Visual Video Player Simulation Frame */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img
                src={selectedLecture.thumbnail}
                alt={selectedLecture.title}
                className="w-full h-64 sm:h-80 object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] flex flex-col justify-between p-5">
                {/* Top Overlay Bar */}
                <div className="flex justify-between items-center text-xs text-white">
                  <span className="bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded font-mono text-[11px]">
                    {selectedLecture.category} · 4K UHD
                  </span>
                  <span className="font-mono text-sky-400 font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedLecture.duration}</span>
                  </span>
                </div>

                {/* Center Play Button Affordance */}
                <div className="self-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-sky-500/90 hover:bg-sky-400 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 transition-transform transform hover:scale-105 active:scale-95"
                    aria-label={isPlaying ? 'Pause masterclass' : 'Play masterclass'}
                  >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </button>
                </div>

                {/* Bottom Scrubber & Active Chapter */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300 font-mono">
                    <span>{selectedLecture.chapters[activeChapterIndex]?.title}</span>
                    <span>{selectedLecture.chapters[activeChapterIndex]?.time}</span>
                  </div>
                  <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden cursor-pointer">
                    <div
                      className="h-full bg-sky-400 transition-all duration-300"
                      style={{ width: `${(activeChapterIndex / (selectedLecture.chapters.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Accompanying Python Code Snippet Viewer */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/90 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-sky-400" />
                  <span>Companion Python Implementation</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">lecture_notebook.py</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
                <pre>{selectedLecture.pythonCodeSample}</pre>
              </div>
            </div>
          </div>

          {/* Right Column: Lecture Selector & Syllabus Outlines (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Masterclass Selector Tabs */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Masterclass Series
              </div>
              <div className="space-y-2">
                {VIDEO_LECTURES.map((lecture) => {
                  const isSelected = selectedLecture.id === lecture.id;
                  return (
                    <button
                      key={lecture.id}
                      onClick={() => {
                        setSelectedLecture(lecture);
                        setActiveChapterIndex(0);
                        setIsPlaying(false);
                      }}
                      className={`w-full p-3.5 text-left rounded-xl border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-slate-900 border-sky-500 shadow-md shadow-sky-500/10'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-800 relative">
                        <img
                          src={lecture.thumbnail}
                          alt={lecture.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
                          <span>{lecture.category}</span>
                          <span>{lecture.duration}</span>
                        </div>
                        <div className={`text-xs font-bold truncate ${isSelected ? 'text-sky-300' : 'text-white'}`}>
                          {lecture.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {lecture.instructor}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chapters & Timestamps Accordion */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Lecture Chapters & Mathematical Derivations
              </div>
              <div className="space-y-1.5">
                {selectedLecture.chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`w-full flex items-center justify-between text-xs p-2 rounded-lg transition-colors text-left ${
                      activeChapterIndex === idx
                        ? 'bg-sky-950/60 text-sky-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-2">{ch.title}</span>
                    <span className="font-mono text-slate-500 text-[11px] shrink-0">{ch.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Essential Takeaways</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedLecture.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
