import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface Props {
  variant?: 'banner' | 'compact' | 'inline';
}

export const LegalDisclaimerBanner: React.FC<Props> = ({ variant = 'banner' }) => {
  if (variant === 'compact') {
    return (
      <div id="legal-disclaimer-compact" className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-md text-xs text-amber-700 dark:text-amber-300">
        <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-600" />
        <span className="font-medium">AI research support only. Not legal advice. Verify with qualified counsel.</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div id="legal-disclaimer-inline" className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">Legal Safety Notice:</span> AI-generated legal research support only. This output is not legal advice and should be independently verified by a qualified legal professional. The system relies strictly on retrieved source passages and does not establish binding legal doctrine.
        </div>
      </div>
    );
  }

  return (
    <div id="legal-disclaimer-banner" className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/5 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
      <div className="flex items-center gap-2.5 max-w-5xl mx-auto w-full">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="leading-snug">
          <strong className="font-semibold tracking-wide uppercase text-[11px] bg-amber-200/60 dark:bg-amber-900/60 px-1.5 py-0.5 rounded text-amber-800 dark:text-amber-200 mr-1.5">Compliance Notice</strong>
          AI-generated legal research support only. This output is not legal advice and should be independently verified by a qualified legal professional. All citations correspond directly to extracted document passages.
        </p>
      </div>
    </div>
  );
};
