import React, { useState } from 'react';
import { ROADMAP_MILESTONES } from '../data/roadmapData';
import { RoadmapMilestone } from '../types';
import { Compass, CheckSquare, Square, Code, Copy, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const DeveloperRoadmap: React.FC = () => {
  const [completedDeliverables, setCompletedDeliverables] = useState<Record<string, boolean>>({
    'Pure-Python linear regression optimizer using analytic normal equation': true,
    'Numerical gradient checker comparing central difference against analytical derivatives': true,
  });
  const [expandedMilestone, setExpandedMilestone] = useState<string>(ROADMAP_MILESTONES[0].id);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  // Calculate total deliverables
  const allDeliverables = ROADMAP_MILESTONES.flatMap((m) => m.deliverables);
  const totalCount = allDeliverables.length;
  const completedCount = Object.values(completedDeliverables).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const toggleDeliverable = (item: string) => {
    setCompletedDeliverables((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleCopySnippet = (milestoneId: string, snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetId(milestoneId);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  return (
    <section id="roadmap" className="py-14 md:py-24 border-t border-slate-800/80 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
              <Compass className="w-4 h-4" />
              <span>Architectural Blueprint & Career Progression</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              20-Week Python AI Developer Master Plan
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              A structured roadmap taking you from numerical vector calculus to distributed PyTorch models, autonomous multi-agent graphs, and scalable MLOps.
            </p>
          </div>

          {/* Interactive Progress Card */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/90 w-full md:w-72 space-y-2 shadow-lg">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white">Your Milestone Completion</span>
              <span className="font-mono text-sky-400 font-bold tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {completedCount} of {totalCount} engineering milestones verified
            </div>
          </div>
        </div>

        {/* Roadmap Phases Timeline */}
        <div className="space-y-6">
          {ROADMAP_MILESTONES.map((milestone) => {
            const isExpanded = expandedMilestone === milestone.id;
            return (
              <div
                key={milestone.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-lg transition-all"
              >
                {/* Header Row (Clickable Accordion) */}
                <div
                  onClick={() => setExpandedMilestone(isExpanded ? '' : milestone.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-850 transition-colors select-none"
                >
                  <div className="space-y-1">
                    {/* Unboxed metadata line */}
                    <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-medium">
                      <span>{milestone.phaseName}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{milestone.durationWeeks} Weeks Estimated</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {milestone.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-xs font-mono text-slate-400">
                      {milestone.pythonLibraries.slice(0, 3).join(', ')}
                    </div>
                    <button
                      className="p-1 text-slate-400 hover:text-white"
                      aria-label="Expand milestone"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-800/80 bg-slate-950/60 space-y-6 text-sm">
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                      {milestone.summary}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Core Skills & Checkable Deliverables */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Core Competencies & Mathematical Intuition
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {milestone.skills.map((s, idx) => (
                              <span
                                key={idx}
                                className="text-xs text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Interactive Engineering Checkpoints
                          </h4>
                          <div className="space-y-2">
                            {milestone.deliverables.map((deliv, idx) => {
                              const isChecked = !!completedDeliverables[deliv];
                              return (
                                <button
                                  key={idx}
                                  onClick={() => toggleDeliverable(deliv)}
                                  className="w-full flex items-start gap-2.5 text-left text-xs p-2 rounded-lg hover:bg-slate-900 transition-colors group"
                                >
                                  {isChecked ? (
                                    <CheckSquare className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-600 group-hover:text-slate-400 shrink-0 mt-0.5" />
                                  )}
                                  <span className={isChecked ? 'text-slate-400 line-through' : 'text-slate-200'}>
                                    {deliv}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Right: Copyable Python Scaffold */}
                      <div className="space-y-2 flex flex-col">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Code className="w-4 h-4 text-sky-400" />
                            <span>Python Scaffold: {milestone.projectStarter.name}</span>
                          </h4>

                          <button
                            onClick={() => handleCopySnippet(milestone.id, milestone.projectStarter.snippet)}
                            className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 transition-colors"
                          >
                            {copiedSnippetId === milestone.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedSnippetId === milestone.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto flex-1 max-h-52 leading-relaxed">
                          <pre>{milestone.projectStarter.snippet}</pre>
                        </div>
                        <div className="text-[11px] text-slate-400 italic">
                          {milestone.projectStarter.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
