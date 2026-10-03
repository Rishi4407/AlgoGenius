/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PythonAILab } from './components/PythonAILab';
import { CurriculumTracks } from './components/CurriculumTracks';
import { ArchitectureSimulator } from './components/ArchitectureSimulator';
import { DeveloperRoadmap } from './components/DeveloperRoadmap';
import { VideoMasterclasses } from './components/VideoMasterclasses';
import { AIGlossary } from './components/AIGlossary';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-200">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPythonLab={() => scrollToSection('lab')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenPythonLab={() => scrollToSection('lab')}
          onExploreRoadmap={() => scrollToSection('roadmap')}
          onExploreTracks={() => scrollToSection('tracks')}
        />

        {/* 1. Core Curriculum Tracks */}
        <CurriculumTracks />

        {/* 2. Interactive In-Browser Python AI Code Studio */}
        <PythonAILab />

        {/* 3. Neural Architecture & Signal Propagation Simulator */}
        <ArchitectureSimulator />

        {/* 4. 20-Week Strategic Master Plan for Python AI Developers */}
        <DeveloperRoadmap />

        {/* 5. Multimedia Masterclasses & Video Lectures */}
        <VideoMasterclasses />

        {/* 6. AI Knowledge Hub & Glossary */}
        <AIGlossary />

        {/* 7. Diagnostic Knowledge Evaluation */}
        <InteractiveQuiz />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
