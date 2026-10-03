import React from 'react';
import { AlgoGeniusLogo } from './AlgoGeniusLogo';
import { Terminal, Github, BookOpen, Compass, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="space-y-2">
            <AlgoGeniusLogo size="md" variant="horizontal" />
            <p className="text-xs text-slate-400 max-w-sm">
              Modern AI Engineering Academy & Interactive Python Sandbox. Designed for software developers, research scientists, and machine learning practitioners.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#tracks" className="hover:text-white transition-colors">Curriculum Tracks</a>
            <a href="#lab" className="hover:text-white transition-colors">Python AI Lab</a>
            <a href="#simulator" className="hover:text-white transition-colors">Architecture Sandbox</a>
            <a href="#roadmap" className="hover:text-white transition-colors">20-Week Master Plan</a>
            <a href="#glossary" className="hover:text-white transition-colors">Knowledge Hub</a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} AlgoGenius. All rights reserved. Python & PyTorch are trademarks of their respective foundations.
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Client-Side Numerical Sandbox</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Dependency Python Vector Engines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
