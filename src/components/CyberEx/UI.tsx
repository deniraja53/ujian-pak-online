import React from 'react';
import { HTMLMotionProps, motion } from 'motion/react';

import { playSound } from '../../lib/sounds';

interface CyberButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
  children?: React.ReactNode;
  variant?: 'blue' | 'purple' | 'pink' | 'red';
  glow?: boolean;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  variant = 'blue', 
  glow = true, 
  className = '', 
  ...props 
}) => {
  const getColors = () => {
    switch (variant) {
      case 'purple': return 'border-cyber-purple/40 text-cyber-purple hover:bg-cyber-purple/10';
      case 'pink': return 'border-cyber-pink/40 text-cyber-pink hover:bg-cyber-pink/10';
      case 'red': return 'border-cyber-red/40 text-cyber-red hover:bg-cyber-red/10';
      default: return 'border-cyber-blue/40 text-cyber-blue hover:bg-cyber-blue/10';
    }
  };

  const getGlow = () => {
    if (!glow) return '';
    switch (variant) {
      case 'purple': return 'cyber-glow-purple';
      case 'pink': return 'cyber-glow-pink';
      case 'red': return 'shadow-[0_0_15px_rgba(255,0,60,0.3)]';
      default: return 'cyber-glow-blue';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => {
        playSound('CLICK');
        props.onClick?.(e);
      }}
      className={`
        px-8 py-2.5 border uppercase font-black tracking-[0.2em] transition-all duration-300
        relative overflow-hidden cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        text-xs ${getColors()} ${getGlow()} ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <span className="opacity-40">[</span>
        {children}
        <span className="opacity-40">]</span>
      </span>
      <motion.div 
        className="absolute inset-0 bg-current opacity-0 hover:opacity-5 transition-opacity"
      />
    </motion.button>
  );
};

export const CyberInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => {
  return (
    <div className="relative group">
      <input
        className={`
          w-full bg-[#050505]/60 border border-cyber-blue/20 px-4 py-3
          text-cyber-blue placeholder-cyber-blue/20 font-mono outline-none
          focus:border-cyber-blue/60 transition-all duration-300 backdrop-blur-md
          ${className}
        `}
        {...props}
      />
      <div className="absolute top-0 left-0 w-2 h-[1px] bg-cyber-pink" />
      <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-cyber-pink" />
    </div>
  );
};

export const CyberTextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => {
  return (
    <div className="relative group">
      <textarea
        className={`
          w-full bg-[#050505]/60 border border-cyber-blue/20 px-4 py-3 min-h-[150px]
          text-cyber-blue placeholder-cyber-blue/20 font-mono outline-none
          focus:border-cyber-blue/60 transition-all duration-300 backdrop-blur-md
          ${className}
        `}
        {...props}
      />
       <div className="corner-accent corner-tl" />
       <div className="corner-accent corner-tr" />
       <div className="corner-accent corner-bl" />
       <div className="corner-accent corner-br" />
    </div>
  );
};

export const CyberCard: React.FC<{ children: React.ReactNode; title?: string; className?: string }> = ({ children, title, className = '' }) => {
  return (
    <div className={`hud-border p-8 relative overflow-hidden ${className}`}>
      {/* Corner Accents */}
      <div className="corner-accent corner-tl" />
      <div className="corner-accent corner-tr" />
      <div className="corner-accent corner-bl" />
      <div className="corner-accent corner-br" />
      
      {title && (
        <div className="mb-6 border-b border-cyber-blue/10 pb-3 flex justify-between items-center">
          <h3 className="text-cyber-pink text-[10px] font-mono uppercase tracking-[0.4em] font-black">
            // {title}
          </h3>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-cyber-blue" />
            <div className="w-1 h-1 bg-cyber-blue/30" />
          </div>
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  return (
    <span 
      data-text={text} 
      className={`text-glitch uppercase font-black tracking-tight ${className}`}
    >
      {text}
    </span>
  );
};
