import React, { useState } from 'react';
import { Terminal, Compass, Play, ArrowRight, CheckCircle2, Sliders } from 'lucide-react';

interface HeroProps {
  onOpenPythonLab: () => void;
  onExploreRoadmap: () => void;
  onExploreTracks: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenPythonLab,
  onExploreRoadmap,
  onExploreTracks,
}) => {
  // Live mini neural activation sandbox state
  const [x1, setX1] = useState(0.8);
  const [x2, setX2] = useState(0.4);
  const [x3, setX3] = useState(0.9);
  const [bias, setBias] = useState(-0.2);

  // Weights
  const w1 = 1.45;
  const w2 = -0.85;
  const w3 = 2.1;

  // Linear combination: z = w1*x1 + w2*x2 + w3*x3 + b
  const z = w1 * x1 + w2 * x2 + w3 * x3 + bias;
  // Sigmoid activation: 1 / (1 + exp(-z))
  const activation = 1.0 / (1.0 + Math.exp(-z));
  const confidencePercent = Math.round(activation * 100);

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-900/20 via-blue-950/10 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline and Positioning */}
          <div className="lg:col-span-7 space-y-6">
            {/* Zero-pill metadata line with typographic bullet separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-sky-400">
              <span>Python 3.11+ Core</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>PyTorch & Transformers</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Autonomous Agents & RAG</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Zero-Fluff Math</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              Master Artificial Intelligence with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">
                Python
              </span>
              : From Calculus to Autonomous Systems.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Step inside the comprehensive engineering platform where machine learning theory meets working code. 
              Simulate neural backpropagation, inspect self-attention tensors, and execute production algorithms directly in your browser.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenPythonLab}
                className="flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 rounded-lg shadow-md shadow-sky-500/20 transition-all transform active:scale-95"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Interactive Python Lab</span>
              </button>

              <button
                onClick={onExploreRoadmap}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700/80 rounded-lg transition-all"
              >
                <Compass className="w-4 h-4 text-sky-400" />
                <span>View 20-Week Master Plan</span>
              </button>
            </div>

            {/* Quantitative Proof Adjacency */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-white">24+</div>
                <div className="text-xs text-slate-400">Runnable Python Notebooks</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-sky-400">100%</div>
                <div className="text-xs text-slate-400">Client-Side Tensor Sandbox</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-indigo-300">5 Tracks</div>
                <div className="text-xs text-slate-400">From Math to Agentic AI</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Hero Asset & Live Synapse Sandbox */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/60 group">
              <img
                src="/src/assets/images/hero_ai_learning_platform_1791012095240.jpg"
                alt="AlgoGenius interactive AI learning laboratory with holographic neural network"
                className="w-full h-56 sm:h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Overlay Kicker */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-white">Neural Stage Active</span>
                <span className="font-mono tabular-nums text-sky-400">FPS: 60.0 · Tensor Engine</span>
              </div>
            </div>

            {/* Live Synapse Interactive Widget */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/90 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-semibold text-white">Live Synaptic Explorer</span>
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-400">
                  z = sum(w_i * x_i) + b: {z.toFixed(2)}
                </span>
              </div>

              {/* Input Signals Controls */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>x1 (Input)</span>
                    <span className="font-mono text-sky-300">{x1.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={x1}
                    onChange={(e) => setX1(parseFloat(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>x2 (Weight)</span>
                    <span className="font-mono text-sky-300">{x2.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={x2}
                    onChange={(e) => setX2(parseFloat(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>x3 (Context)</span>
                    <span className="font-mono text-sky-300">{x3.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={x3}
                    onChange={(e) => setX3(parseFloat(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>

              {/* Real-time Sigmoid Output Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Neuron Activation Probability (Sigmoid):</span>
                  <span className="font-mono font-bold text-sky-400 tabular-nums">
                    {(activation).toFixed(4)} ({confidencePercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 transition-all duration-150"
                    style={{ width: `${confidencePercent}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400 italic">
                  Mathematical mapping: sigma(z) = 1 / (1 + e^-z) maps arbitrary logit real numbers to [0, 1] probability range.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
