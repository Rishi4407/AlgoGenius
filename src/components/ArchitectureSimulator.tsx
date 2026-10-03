import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward, Sliders, Cpu, Activity, Info } from 'lucide-react';

export const ArchitectureSimulator: React.FC = () => {
  // Simulator States
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0); // 0: Input, 1: Hidden, 2: Output
  const [weightScale, setWeightScale] = useState<number>(1.2);
  const [biasVal, setBiasVal] = useState<number>(0.1);
  const [activationFunc, setActivationFunc] = useState<'relu' | 'sigmoid' | 'gelu'>('relu');
  const [selectedNode, setSelectedNode] = useState<string>('h1');

  // Input signals
  const inputs = [0.85, -0.4, 0.65];

  // Animation cycle
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Compute activation
  const computeAct = (val: number): number => {
    if (activationFunc === 'relu') return Math.max(0, val);
    if (activationFunc === 'sigmoid') return 1.0 / (1.0 + Math.exp(-val));
    // GELU approximation: 0.5 * x * (1 + tanh(sqrt(2/pi) * (x + 0.044715 * x^3)))
    return 0.5 * val * (1.0 + Math.tanh(Math.sqrt(2.0 / Math.PI) * (val + 0.044715 * Math.pow(val, 3))));
  };

  // Hidden layer values
  const hiddenWeights = [
    [0.8 * weightScale, -0.5 * weightScale, 0.4 * weightScale],
    [-0.3 * weightScale, 0.9 * weightScale, 0.7 * weightScale],
    [0.6 * weightScale, 0.2 * weightScale, -0.8 * weightScale],
    [-0.4 * weightScale, -0.7 * weightScale, 0.5 * weightScale],
  ];

  const hiddenZ = hiddenWeights.map((wRow) => {
    return wRow[0] * inputs[0] + wRow[1] * inputs[1] + wRow[2] * inputs[2] + biasVal;
  });
  const hiddenA = hiddenZ.map(computeAct);

  // Output layer values
  const outWeights = [
    [0.7 * weightScale, -0.6 * weightScale, 0.5 * weightScale, 0.3 * weightScale],
    [-0.5 * weightScale, 0.8 * weightScale, -0.4 * weightScale, 0.6 * weightScale],
  ];
  const outZ = outWeights.map((wRow) => {
    return (
      wRow[0] * hiddenA[0] +
      wRow[1] * hiddenA[1] +
      wRow[2] * hiddenA[2] +
      wRow[3] * hiddenA[3] +
      biasVal
    );
  });
  // Softmax on output
  const maxZ = Math.max(...outZ);
  const expZ = outZ.map((z) => Math.exp(z - maxZ));
  const sumExp = expZ.reduce((a, b) => a + b, 0);
  const outProbs = expZ.map((e) => e / sumExp);

  return (
    <section id="simulator" className="py-14 md:py-24 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span>Interactive Signal Propagation Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Neural Computational Graph & Tensor Flow
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Inspect how floating-point signals transform through affine matrix projections and non-linear activation functions in real time.
            </p>
          </div>

          {/* Current Stage Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>
              {activeStep === 0
                ? 'Phase 1: Input Vector Encoding'
                : activeStep === 1
                ? 'Phase 2: Hidden Feature Projection'
                : 'Phase 3: Softmax Probability Distribution'}
            </span>
          </div>
        </div>

        {/* Two-Zone Sandbox Layout (Mandatory from references/6_education_simulations.md) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ZONE 1 (Interactive Visual Stage - 7 Cols, ~60%) */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl flex flex-col justify-between min-h-[460px] relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-semibold text-slate-300">
                Layer Topology: 3 Inputs &rarr; 4 Hidden (ReLU/GELU) &rarr; 2 Softmax Classes
              </span>
              <span className="text-xs font-mono text-sky-400 tabular-nums">
                Active Step: {activeStep + 1}/3
              </span>
            </div>

            {/* Interactive Neural Canvas SVG */}
            <div className="relative py-6 flex-1 flex items-center justify-center">
              <svg className="w-full h-72" viewBox="0 0 600 280">
                <defs>
                  <linearGradient id="synapsePulse" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Synaptic Connection Lines: Layer 1 to Layer 2 */}
                {inputs.map((_, iIdx) => {
                  const y1 = 50 + iIdx * 90;
                  return hiddenA.map((_, hIdx) => {
                    const y2 = 35 + hIdx * 70;
                    const w = hiddenWeights[hIdx][iIdx];
                    const isPositive = w >= 0;
                    const isStepActive = activeStep === 0 || activeStep === 1;

                    return (
                      <line
                        key={`l1-${iIdx}-${hIdx}`}
                        x1="110"
                        y1={y1}
                        x2="300"
                        y2={y2}
                        stroke={isStepActive ? (isPositive ? '#0284C7' : '#F43F5E') : '#334155'}
                        strokeWidth={Math.max(1, Math.min(3.5, Math.abs(w) * 2))}
                        strokeOpacity={isStepActive ? 0.75 : 0.25}
                        strokeDasharray={isStepActive ? '4 2' : 'none'}
                        className={isStepActive ? 'animate-pulse' : ''}
                      />
                    );
                  });
                })}

                {/* Synaptic Connection Lines: Layer 2 to Layer 3 */}
                {hiddenA.map((_, hIdx) => {
                  const y2 = 35 + hIdx * 70;
                  return outProbs.map((_, oIdx) => {
                    const y3 = 90 + oIdx * 100;
                    const w = outWeights[oIdx][hIdx];
                    const isPositive = w >= 0;
                    const isStepActive = activeStep === 1 || activeStep === 2;

                    return (
                      <line
                        key={`l2-${hIdx}-${oIdx}`}
                        x1="300"
                        y1={y2}
                        x2="490"
                        y2={y3}
                        stroke={isStepActive ? (isPositive ? '#38BDF8' : '#F43F5E') : '#334155'}
                        strokeWidth={Math.max(1, Math.min(3.5, Math.abs(w) * 2))}
                        strokeOpacity={isStepActive ? 0.8 : 0.25}
                      />
                    );
                  });
                })}

                {/* Input Layer Nodes (x1, x2, x3) */}
                {inputs.map((val, idx) => {
                  const y = 50 + idx * 90;
                  return (
                    <g key={`in-${idx}`} className="cursor-pointer" onClick={() => setSelectedNode(`x${idx + 1}`)}>
                      <circle
                        cx="110"
                        cy={y}
                        r="22"
                        fill="#0F172A"
                        stroke={activeStep === 0 ? '#38BDF8' : '#334155'}
                        strokeWidth={activeStep === 0 ? '3' : '1.5'}
                      />
                      <text x="110" y={y - 4} fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                        x{idx + 1}
                      </text>
                      <text x="110" y={y + 10} fill="#38BDF8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                        {val.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* Hidden Layer Nodes (h1, h2, h3, h4) */}
                {hiddenA.map((val, idx) => {
                  const y = 35 + idx * 70;
                  const isSel = selectedNode === `h${idx + 1}`;
                  return (
                    <g key={`hid-${idx}`} className="cursor-pointer" onClick={() => setSelectedNode(`h${idx + 1}`)}>
                      <circle
                        cx="300"
                        cy={y}
                        r="22"
                        fill="#0F172A"
                        stroke={isSel ? '#38BDF8' : activeStep === 1 ? '#0284C7' : '#334155'}
                        strokeWidth={isSel ? '3' : '2'}
                      />
                      <text x="300" y={y - 4} fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                        h{idx + 1}
                      </text>
                      <text x="300" y={y + 10} fill="#38BDF8" fontSize="9" fontFamily="monospace" textAnchor="middle">
                        {val.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* Output Layer Nodes (y1, y2) */}
                {outProbs.map((prob, idx) => {
                  const y = 90 + idx * 100;
                  return (
                    <g key={`out-${idx}`} className="cursor-pointer" onClick={() => setSelectedNode(`y${idx + 1}`)}>
                      <circle
                        cx="490"
                        cy={y}
                        r="24"
                        fill="#0F172A"
                        stroke={activeStep === 2 ? '#38BDF8' : '#334155'}
                        strokeWidth="2.5"
                      />
                      <text x="490" y={y - 5} fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Class {idx}
                      </text>
                      <text x="490" y={y + 11} fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        {Math.round(prob * 100)}%
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Interactive Feedback Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
              <div>
                Click any neuron node to inspect forward affine equation: <span className="text-white font-mono">{selectedNode.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="flex items-center gap-1 text-sky-400">
                  <span className="w-2 h-0.5 bg-sky-400 inline-block" /> Pos (+)
                </span>
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2 h-0.5 bg-rose-400 inline-block" /> Neg (-)
                </span>
              </div>
            </div>
          </div>

          {/* ZONE 2 (Control & Concept Deck - 5 Cols, ~40%) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Playback Controls Deck */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/90 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-sky-400" />
                  <span>Simulation Parameter Deck</span>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                    title={isPlaying ? 'Pause Cycle' : 'Play Cycle'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-sky-400" />}
                  </button>

                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % 3)}
                    className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                    title="Step Forward Single Layer"
                  >
                    <FastForward className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setWeightScale(1.2);
                      setBiasVal(0.1);
                      setActiveStep(0);
                    }}
                    className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                    title="Reset Parameters"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Labeled Sliders (Strict compliance with Section 5) */}
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-300">Synaptic Weight Scale (w_mult)</span>
                    <span className="font-mono text-sky-400 tabular-nums">{weightScale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={weightScale}
                    onChange={(e) => setWeightScale(parseFloat(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-slate-300">Additive Bias Vector (b)</span>
                    <span className="font-mono text-sky-400 tabular-nums">{biasVal.toFixed(2)} rad</span>
                  </div>
                  <input
                    type="range"
                    min="-1.5"
                    max="1.5"
                    step="0.1"
                    value={biasVal}
                    onChange={(e) => setBiasVal(parseFloat(e.target.value))}
                    className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="text-xs text-slate-300 mb-1.5">Non-Linear Activation Function</div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['relu', 'sigmoid', 'gelu'] as const).map((fn) => (
                      <button
                        key={fn}
                        onClick={() => setActivationFunc(fn)}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-md border transition-all uppercase font-mono ${
                          activationFunc === fn
                            ? 'bg-sky-500 text-white border-sky-400 shadow-sm'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {fn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scientific Mathematical Concept Card */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/90 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Info className="w-4 h-4 text-sky-400" />
                <span>Mathematical Formulation in Action</span>
              </div>

              <div className="font-mono text-sky-300 bg-slate-950 p-2.5 rounded border border-slate-800/80 overflow-x-auto text-[11px]">
                {activationFunc === 'relu'
                  ? 'f(z) = max(0, z)  |  df/dz = 1 if z > 0 else 0'
                  : activationFunc === 'sigmoid'
                  ? 'sigma(z) = 1 / (1 + e^-z)  |  dsigma = sigma(z)(1 - sigma(z))'
                  : 'GELU(z) = 0.5 * z * (1 + tanh(sqrt(2/pi) * (z + 0.044715*z^3)))'}
              </div>

              <p className="text-slate-400 leading-relaxed text-[11px]">
                {activationFunc === 'relu'
                  ? 'ReLU avoids saturation in positive territory, accelerating stochastic gradient descent by ~6x over Sigmoid, though neurons can "die" if pre-activations stay persistently negative.'
                  : activationFunc === 'sigmoid'
                  ? 'Sigmoid squashes outputs smoothly between 0 and 1, but suffers from vanishing gradients when |z| is large.'
                  : 'GELU (Gaussian Error Linear Unit) scales inputs by their percentile in a standard normal distribution, standard in modern Transformers like GPT and BERT.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
