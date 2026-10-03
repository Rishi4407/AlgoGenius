import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { GlossaryTerm } from '../types';
import { Search, Sparkles, Code, Info, ChevronRight } from 'lucide-react';

export const AIGlossary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(GLOSSARY_TERMS[0].id);

  const categories = ['All', 'Deep Learning', 'LLMs & GenAI', 'Math & Calculus', 'Computer Vision', 'Infrastructure & MLOps'];

  const filteredTerms = GLOSSARY_TERMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="glossary" className="py-14 md:py-24 border-t border-slate-800/80 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Reference Terminology & Mathematical Invariants</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              AI Engineering Knowledge Hub & Glossary
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Clear mathematical definitions, standard Python implementations, and hard-earned production caveats for foundational AI concepts.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts (e.g. Backprop, RAG, Quantization)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-900 border border-slate-800 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Category Segmented Controls (Interactive Filter Buttons) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Glossary Terms Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((item) => {
            const isExpanded = expandedTermId === item.id;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="space-y-2">
                  {/* Clean unboxed metadata */}
                  <div className="text-xs text-sky-400 font-mono font-medium">
                    {item.category}
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {item.term}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                {/* Math Formulation */}
                {item.mathNotation && (
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-sky-300 overflow-x-auto">
                    {item.mathNotation}
                  </div>
                )}

                {/* Python Snippet */}
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-sky-400" />
                    <span>Python Syntax</span>
                  </div>
                  <pre className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                    {item.pythonSnippet}
                  </pre>
                </div>

                {/* Practical Tip */}
                <div className="p-2.5 rounded-lg bg-sky-950/20 border border-sky-900/40 text-[11px] text-sky-200">
                  <span className="font-semibold text-white">Pro Tip: </span>
                  {item.practicalTip}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
