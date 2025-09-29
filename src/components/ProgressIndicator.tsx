import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressStep {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, className }) => {
  return (
    <div className={cn("w-full py-8", className)}>
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
          <div 
            className="h-full bg-gradient-to-r from-accent to-secondary-bright transition-all duration-1000 ease-out animate-progress-fill"
            style={{ 
              width: `${(steps.filter(s => s.status === 'completed').length / (steps.length - 1)) * 100}%` 
            }}
          />
        </div>

        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            {/* Step Circle */}
            <div className={cn(
              "progress-step",
              {
                "completed": step.status === 'completed',
                "current": step.status === 'current',
                "pending": step.status === 'pending'
              }
            )}>
              {step.status === 'completed' ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{step.id}</span>
              )}
            </div>

            {/* Step Title */}
            <div className="mt-3 text-center">
              <p className={cn(
                "text-sm font-medium transition-colors duration-300",
                {
                  "text-accent": step.status === 'completed',
                  "text-secondary-bright": step.status === 'current',
                  "text-muted-foreground": step.status === 'pending'
                }
              )}>
                {step.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
