import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Brain, CheckCircle2, Clock } from 'lucide-react';

const ReasoningTrace = ({ steps }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-4 border border-border rounded-xl bg-secondary/30 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-all"
      >
        <div className="flex items-center gap-2">
          <Brain size={16} className="text-blue-400" />
          <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Agent Reasoning Trace
          </span>
        </div>
        {isOpen ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 border-t border-border">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                  {step.status === 'completed' ? (
                    <CheckCircle2 size={12} className="text-green-500" />
                  ) : (
                    <Clock size={12} className="text-yellow-500" />
                  )}
                </div>
                {idx !== steps.length - 1 && (
                  <div className="w-px h-full bg-border mt-2" />
                )}
              </div>
              <div className="pb-4">
                <p className="text-sm font-medium text-white mb-1">{step.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed font-mono">
                  {step.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReasoningTrace;
