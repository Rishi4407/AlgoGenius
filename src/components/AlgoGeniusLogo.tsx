import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only' | 'horizontal';
  showSubtitle?: boolean;
}

export const AlgoGeniusLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'horizontal',
}) => {
  const iconDimensions = {
    sm: { width: 28, height: 28 },
    md: { width: 38, height: 38 },
    lg: { width: 54, height: 54 },
    xl: { width: 80, height: 80 },
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon recreated with exact geometry from AlgoGenius brand mark */}
      <svg
        width={iconDimensions.width}
        height={iconDimensions.height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md"
      >
        <defs>
          <linearGradient id="agBlueGrad" x1="20" y1="180" x2="140" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="45%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="agCircuitGrad" x1="100" y1="40" x2="190" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="agDarkGrad" x1="90" y1="100" x2="160" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <filter id="agGlow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0284C7" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Navy "G" curve nested behind and wrapping under the "A" */}
        <path
          d="M 148 70 
             C 178 70 188 95 188 115 
             C 188 152 155 178 115 178 
             C 76 178 52 155 52 135 
             C 52 124 58 116 68 116 
             C 78 116 83 123 88 130 
             C 95 140 105 146 120 146 
             C 142 146 156 130 156 112 
             C 156 97 142 90 124 90 
             L 124 70 Z"
          fill="url(#agDarkGrad)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Stylized "A" main chevron structure */}
        <path
          d="M 98 22 
             C 103 22 108 26 112 32 
             L 172 148 
             C 176 156 170 166 160 166 
             L 142 166 
             L 128 136 
             L 68 136 
             L 54 166 
             L 36 166 
             C 26 166 20 156 24 148 
             L 84 32 
             C 88 26 93 22 98 22 Z"
          fill="url(#agBlueGrad)"
          filter="url(#agGlow)"
        />

        {/* Coding brackets < / > cut inside the A crossbar */}
        <g stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
          {/* < */}
          <path d="M 86 102 L 76 112 L 86 122" />
          {/* / */}
          <path d="M 103 98 L 93 126" />
          {/* > */}
          <path d="M 110 102 L 120 112 L 110 122" />
        </g>

        {/* Tech Circuit Traces branching from upper right */}
        {/* Top trace */}
        <path
          d="M 112 36 L 150 36 L 165 24 L 180 24"
          stroke="url(#agCircuitGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="180" cy="24" r="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />

        {/* Middle trace */}
        <path
          d="M 125 56 L 155 56 L 175 48 L 192 48"
          stroke="url(#agCircuitGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="192" cy="48" r="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />

        {/* Lower trace */}
        <path
          d="M 136 78 L 162 78 L 172 70 L 185 70"
          stroke="url(#agCircuitGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="185" cy="70" r="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      </svg>

      {/* Brand Wordmark (Algo in Crisp Slate/White, Genius in Electric Azure) */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col leading-none">
          <div className={`font-extrabold tracking-tight ${textSize}`}>
            <span className="text-white">Algo</span>
            <span className="text-sky-400">Genius</span>
          </div>
        </div>
      )}
    </div>
  );
};
