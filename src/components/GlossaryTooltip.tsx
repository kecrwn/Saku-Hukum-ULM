'use client';

import React from 'react';
import { glossaryTerms } from '@/lib/glossary-data';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface GlossaryTooltipProps {
  termId: string;
  children: React.ReactNode;
}

export function GlossaryTooltip({ termId, children }: GlossaryTooltipProps) {
  const { isIndonesian } = useLanguage();
  const termData = glossaryTerms.find(t => t.id === termId);

  if (!termData) {
    return <>{children}</>;
  }

  const termDisplay = isIndonesian ? termData.term : termData.termEn;
  const defDisplay = isIndonesian ? termData.definition : termData.definitionEn;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className="cursor-help underline decoration-[var(--clay)] decoration-wavy underline-offset-4 decoration-1 hover:text-[var(--clay)] transition-colors inline-flex items-baseline gap-1">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          align="center"
          sideOffset={8}
          className="max-w-xs bg-[var(--ink-deep)] border border-white/10 p-3 rounded-xl shadow-2xl z-50 text-white"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5">
              <Info className="w-3.5 h-3.5 text-[var(--clay)]" />
              <p className="text-sm font-bold text-[var(--clay)]">{termDisplay}</p>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-manrope">
              {defDisplay}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
