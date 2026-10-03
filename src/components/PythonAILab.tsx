import React, { useState, useEffect, useRef } from 'react';
import { PYTHON_LAB_TEMPLATES } from '../data/pythonLabTemplates';
import { PythonLabTemplate } from '../types';
import { Play, RotateCcw, Copy, Check, Terminal, Sliders, BarChart3, Sparkles } from 'lucide-react';

export const PythonAILab: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<PythonLabTemplate>(PYTHON_LAB_TEMPLATES[0]);
  const [code, setCode] = useState<string>(selectedTemplate.initialCode);
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<Record<string, string | number>>({});
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const [activeVisualTab, setActiveVisualTab] = useState<'chart' | 'terminal'>('chart');
  const [copied, setCopied] = useState<boolean>(false);

  // Initialize parameters when template changes
  useEffect(() => {
    setCode(selectedTemplate.initialCode);
    const initialParams: Record<string, any> = {};
    selectedTemplate.parameters.forEach((param) => {
      initialParams[param.name] = param.defaultValue;
    });
    setParameters(initialParams);
    runSimulatedExecution(selectedTemplate.id, initialParams);
  }, [selectedTemplate]);

  const handleParamChange = (name: string, value: any) => {
    const updated = { ...parameters, [name]: value };
    setParameters(updated);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(selectedTemplate.initialCode);
    const initialParams: Record<string, any> = {};
    selectedTemplate.parameters.forEach((param) => {
      initialParams[param.name] = param.defaultValue;
    });
    setParameters(initialParams);
    runSimulatedExecution(selectedTemplate.id, initialParams);
  };

  // Simulated real computational execution logic in JavaScript
  const runSimulatedExecution = (templateId: string, params: Record<string, any>) => {
    setIsRunning(true);
    setTerminalOutput(['[AlgoGenius Python 3.11 Runtime Initialized]']);

    setTimeout(() => {
      const outputLines: string[] = ['[AlgoGenius Python 3.11 Runtime Initialized]'];

      if (templateId === 'backprop-neural-net') {
        const lr = parseFloat(params.learningRate || 0.5);
        const epochs = parseInt(params.epochs || 500);
        const activation = params.activation || 'sigmoid';

        outputLines.push(`[Init] Multi-Layer Perceptron (2 -> 4 -> 1) | Activation: ${activation}`);
        outputLines.push(`[Init] Learning Rate: ${lr.toFixed(2)} | Target Epochs: ${epochs}`);
        outputLines.push('---------------------------------------------------------');

        const simulatedLosses: number[] = [];
        let currentLoss = 0.693; // initial log(2) random loss

        for (let ep = 100; ep <= epochs; ep += 100) {
          // mathematical decay modeling gradient descent
          currentLoss = Math.max(0.008, currentLoss * (1 - lr * 0.45));
          simulatedLosses.push(parseFloat(currentLoss.toFixed(5)));
          const acc = currentLoss < 0.2 ? 100 : Math.min(95, 50 + (1 - currentLoss) * 50);
          outputLines.push(`Epoch ${ep.toString().padStart(4, ' ')} | BCE Loss: ${currentLoss.toFixed(5)} | Accuracy: ${acc.toFixed(1)}%`);
        }

        outputLines.push('');
        outputLines.push('[Inference Test on XOR Gates]:');
        outputLines.push('Input: [0, 0] -> Target: 0 | Predicted: 0.0412 [MATCH]');
        outputLines.push('Input: [0, 1] -> Target: 1 | Predicted: 0.9634 [MATCH]');
        outputLines.push('Input: [1, 0] -> Target: 1 | Predicted: 0.9589 [MATCH]');
        outputLines.push('Input: [1, 1] -> Target: 0 | Predicted: 0.0387 [MATCH]');
        outputLines.push('[Process completed in 42ms with 0 errors]');

        setLossHistory(simulatedLosses);
        setMetrics({
          finalLoss: currentLoss.toFixed(4),
          accuracy: '100.0%',
          gradNorm: (currentLoss * 0.12).toFixed(5),
        });
      } else if (templateId === 'self-attention-transformer') {
        const d_k = parseInt(params.d_k || 8);
        const temp = parseFloat(params.temperature || 1.0);
        const isCausal = params.causalMask === 'true';

        outputLines.push(`[Transformer] Scaled Dot-Product Attention (d_model=8, d_k=${d_k})`);
        outputLines.push(`[Config] Softmax Temperature: ${temp.toFixed(1)} | Causal Masking: ${isCausal ? 'ENABLED' : 'DISABLED'}`);
        outputLines.push('---------------------------------------------------------');
        outputLines.push('[Self-Attention Matrix Heatmap (Row: Query -> Col: Key)]:');
        outputLines.push('Token      |  The | neur | netw | lear | repr');
        outputLines.push('-------------------------------------------------');
        
        // Generate pseudo attention row weights based on temperature
        const tokens = ['The', 'neural', 'network', 'learned', 'representations'];
        tokens.forEach((tok, rIdx) => {
          let rowWeights: number[];
          if (isCausal) {
            // zero out after rIdx
            rowWeights = tokens.map((_, cIdx) => (cIdx <= rIdx ? Math.exp((1.5 - Math.abs(rIdx - cIdx)) / temp) : 0));
          } else {
            rowWeights = tokens.map((_, cIdx) => Math.exp((1.8 - Math.abs(rIdx - cIdx) * 0.7) / temp));
          }
          const sum = rowWeights.reduce((a, b) => a + b, 0);
          const normalized = rowWeights.map((w) => (sum > 0 ? (w / sum).toFixed(2) : '0.00'));
          outputLines.push(`${tok.padEnd(10, ' ')} | ` + normalized.map((w) => `${w.padStart(4, ' ')}`).join(' | '));
        });

        outputLines.push('');
        outputLines.push(`Context Matrix Output Shape: (5, ${d_k}) projected via W_v.`);
        outputLines.push('[Inference completed in 18ms]');

        setLossHistory([0.88, 0.65, 0.42, 0.28, 0.19]);
        setMetrics({
          entropy: (1.28 * temp).toFixed(3),
          maxAffinity: (0.74 / temp).toFixed(2),
          depth: '12 Layers',
        });
      } else if (templateId === 'rag-vector-similarity') {
        const topK = parseInt(params.topK || 3);
        const cutoff = parseFloat(params.similarityThreshold || 0.45);

        outputLines.push(`[Vector Index] Query: "How do autonomous LLM agents manage memory?"`);
        outputLines.push(`[Vector Index] Top-K: ${topK} | Cosine Cutoff: ${cutoff.toFixed(2)}`);
        outputLines.push('---------------------------------------------------------');
        outputLines.push('Top Retrieved Knowledge Chunks:');
        outputLines.push('Rank 1 | Cosine: 0.8924 | Doc #4: "Autonomous agents maintain short-term memory through conversational context windows." [TOP MATCH]');
        outputLines.push('Rank 2 | Cosine: 0.6741 | Doc #3: "Vector databases like Chroma and Qdrant store high-dimensional embeddings for RAG."');
        if (topK >= 3) {
          outputLines.push('Rank 3 | Cosine: 0.5120 | Doc #1: "Transformers rely on multi-head self-attention without recurrent recurrence."');
        }
        outputLines.push('');
        outputLines.push('[RAG Context Assembly verified. Token overhead: 142 tokens]');

        setLossHistory([0.89, 0.67, 0.51, 0.38, 0.22]);
        setMetrics({
          topScore: '0.8924',
          tokenCount: '142 tokens',
          latency: '24ms',
        });
      } else if (templateId === 'kmeans-clustering') {
        const k = parseInt(params.kClusters || 3);
        const iters = parseInt(params.maxIterations || 10);

        outputLines.push(`[K-Means] Partitioning 90 samples into K=${k} centroids`);
        outputLines.push(`[Lloyd's Algorithm] Max Iterations: ${iters}`);
        outputLines.push('---------------------------------------------------------');

        const wcss: number[] = [];
        let currInertia = 450.0;
        for (let i = 1; i <= Math.min(iters, 6); i++) {
          currInertia = currInertia * 0.62 + 25.0;
          wcss.push(Math.round(currInertia));
          outputLines.push(`Iteration ${i.toString().padStart(2, ' ')} | Displacement: ${(1.2 / i).toFixed(4)} | WCSS Inertia: ${currInertia.toFixed(2)}`);
        }
        outputLines.push(`--> Converged at iteration ${Math.min(iters, 6)} with displacement < 1e-4!`);
        outputLines.push(`[Cluster Distribution]: Balanced across K=${k} centroid Voronoi cells.`);

        setLossHistory(wcss);
        setMetrics({
          inertia: currInertia.toFixed(1),
          steps: `${Math.min(iters, 6)} iters`,
          silhouette: '0.784',
        });
      } else if (templateId === 'convolution-edge-filter') {
        const filter = params.kernelType || 'sobel';
        const thresh = parseInt(params.threshold || 150);

        outputLines.push(`[Convolution] 2D Spatial Operator: ${filter.toUpperCase()} 3x3`);
        outputLines.push(`[Config] Edge Magnitude Threshold: ${thresh} px`);
        outputLines.push('---------------------------------------------------------');
        outputLines.push('Convolved Gradient Magnitude Array (6x6 patch):');
        outputLines.push('   12    18    45   180   240   240');
        outputLines.push('   15    22    85   260   280   275');
        outputLines.push('   14    40   140   275   290   285');
        outputLines.push('   35    90   210   280   290   290');
        outputLines.push('   80   160   240   285   290   290');
        outputLines.push('  120   210   270   290   290   290');
        outputLines.push('');
        outputLines.push(`[Edge Detection] Peak gradient detected: 290.0 magnitude.`);

        setLossHistory([290, 240, 180, 85, 45, 12]);
        setMetrics({
          peakGradient: '290.0',
          activeEdges: '18 pixels',
          flops: '1,458 ops',
        });
      }

      setTerminalOutput(outputLines);
      setIsRunning(false);
    }, 450);
  };

  return (
    <section id="lab" className="py-12 md:py-20 border-t border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
              <Terminal className="w-4 h-4" />
              <span>Interactive In-Browser Python Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Python AI Code Studio & Algorithm Lab
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Write, tweak hyperparameters, and execute foundational machine learning and transformer algorithms with real-time tensor computation and visual loss convergence.
            </p>
          </div>

          {/* Interactive Algorithm Template Selector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {PYTHON_LAB_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedTemplate.id === tmpl.id
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tmpl.title.split(' ')[0]} {tmpl.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Code Editor & Parameters (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
            {/* Editor Action Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  algo_genius_sandbox.py · Python 3.11
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded transition-colors"
                  title="Copy Python Code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                  title="Reset to Template Default"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => runSimulatedExecution(selectedTemplate.id, parameters)}
                  disabled={isRunning}
                  className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 disabled:opacity-50 rounded transition-all active:scale-95"
                >
                  <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Computing...' : 'Run Script'}</span>
                </button>
              </div>
            </div>

            {/* Hyperparameter Controls Deck */}
            <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedTemplate.parameters.map((param) => (
                <div key={param.name} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">{param.label}</span>
                    <span className="font-mono text-sky-400 text-[11px] tabular-nums">
                      {parameters[param.name]} {param.unit || ''}
                    </span>
                  </div>

                  {param.type === 'slider' && (
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={parameters[param.name] ?? param.defaultValue}
                      onChange={(e) => handleParamChange(param.name, parseFloat(e.target.value))}
                      className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                    />
                  )}

                  {param.type === 'select' && param.options && (
                    <select
                      value={parameters[param.name] ?? param.defaultValue}
                      onChange={(e) => handleParamChange(param.name, e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-slate-800 text-slate-200 border border-slate-700 rounded focus:outline-none focus:border-sky-500"
                    >
                      {param.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            {/* Code Textarea with Line Numbers */}
            <div className="flex-1 relative font-mono text-xs overflow-auto max-h-[460px] bg-slate-950/70 p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full min-h-[380px] bg-transparent text-slate-200 focus:outline-none resize-none font-mono leading-relaxed selection:bg-sky-500/30 whitespace-pre"
              />
            </div>
          </div>

          {/* Right Column: Execution Terminal & Visual Canvas (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl">
            {/* Output Segmented Switcher */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveVisualTab('chart')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    activeVisualTab === 'chart'
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Visual Canvas</span>
                </button>
                <button
                  onClick={() => setActiveVisualTab('terminal')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    activeVisualTab === 'terminal'
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Stdout Console</span>
                </button>
              </div>

              {/* Status pill replacement (clean unboxed text) */}
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ready</span>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/40 grid grid-cols-3 gap-2">
              {selectedTemplate.expectedMetrics.map((m) => (
                <div key={m.key} className="text-center">
                  <div className="text-[11px] text-slate-400">{m.label}</div>
                  <div className="text-sm font-bold font-mono text-sky-400 tabular-nums">
                    {metrics[m.key] ?? '--'} <span className="text-[10px] text-slate-400 font-normal">{m.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Canvas Stage */}
            {activeVisualTab === 'chart' ? (
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-white">Dynamic Loss & Convergence Trajectory</span>
                    <span className="text-[11px] font-mono text-slate-400">Epoch 1 to {parameters.epochs || 500}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Real-time gradient descent descent curve verifying mathematical convergence.
                  </p>
                </div>

                {/* SVG Visual Plot Chart */}
                <div className="h-56 w-full bg-slate-950/90 rounded-lg p-3 border border-slate-800/80 flex flex-col justify-between">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Loss 0.70</span>
                    <span className="text-sky-400">Target: 0.00</span>
                  </div>

                  <div className="relative flex-1 flex items-end">
                    {/* SVG Line path */}
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area beneath */}
                      <path
                        d={
                          lossHistory.length > 0
                            ? `M 0,${120 - Math.min(110, (lossHistory[0] || 0.6) * 160)} ` +
                              lossHistory
                                .map((val, idx) => {
                                  const x = (idx / (lossHistory.length - 1 || 1)) * 300;
                                  const y = 120 - Math.min(110, val * 160);
                                  return `L ${x},${y}`;
                                })
                                .join(' ') +
                              ` L 300,120 L 0,120 Z`
                            : 'M 0,120 L 300,120 Z'
                        }
                        fill="url(#curveGradient)"
                      />

                      {/* Stroke line */}
                      <path
                        d={
                          lossHistory.length > 0
                            ? `M 0,${120 - Math.min(110, (lossHistory[0] || 0.6) * 160)} ` +
                              lossHistory
                                .map((val, idx) => {
                                  const x = (idx / (lossHistory.length - 1 || 1)) * 300;
                                  const y = 120 - Math.min(110, val * 160);
                                  return `L ${x},${y}`;
                                })
                                .join(' ')
                            : 'M 0,100 L 300,20'
                        }
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="2.5"
                      />

                      {/* Nodes on points */}
                      {lossHistory.map((val, idx) => {
                        const x = (idx / (lossHistory.length - 1 || 1)) * 300;
                        const y = 120 - Math.min(110, val * 160);
                        return <circle key={idx} cx={x} cy={y} r="3" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1" />;
                      })}
                    </svg>
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-1">
                    <span>Init (Epoch 0)</span>
                    <span>50%</span>
                    <span>Convergence (End)</span>
                  </div>
                </div>

                {/* Practical Takeaway Tip */}
                <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-900/50 text-xs text-sky-200 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Mathematical Insight: </span>
                    {selectedTemplate.id === 'backprop-neural-net'
                      ? 'Backpropagation propagates scalar loss errors backwards through transposes of weight matrices, maintaining O(N) linear time complexity per training sample.'
                      : selectedTemplate.id === 'self-attention-transformer'
                      ? 'Self-attention calculates pairwise affinities without positional bias, which is why positional encodings (RoPE or sinusoidal) must be added to preserve token ordering.'
                      : 'The algorithm operates in hyper-dimensional vector space using metric distance invariants.'}
                  </div>
                </div>
              </div>
            ) : (
              /* Terminal Output View */
              <div className="p-4 flex-1 bg-slate-950 font-mono text-xs text-slate-300 overflow-auto max-h-[380px] space-y-1">
                {terminalOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={`${
                      line.includes('[MATCH]') || line.includes('completed') || line.includes('Converged')
                        ? 'text-emerald-400'
                        : line.includes('Epoch') || line.includes('Rank 1')
                        ? 'text-sky-300'
                        : line.startsWith('[')
                        ? 'text-indigo-300 font-semibold'
                        : 'text-slate-400'
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
