import React, { useState } from 'react';
import {
  GitCompare,
  FileText,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { LegalCase, LegalDocument } from '../types';
import { MOCK_COMPARISON_RESULT } from '../data/mockData';

interface CompareViewProps {
  activeCase: LegalCase;
  documents: LegalDocument[];
  onOpenDocument: (doc: LegalDocument, page?: number, passage?: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  activeCase,
  documents,
  onOpenDocument
}) => {
  const caseDocs = documents.filter((d) => d.caseId === activeCase.id);
  const [docAId, setDocAId] = useState(caseDocs[0]?.id || 'doc-001');
  const [docBId, setDocBId] = useState(caseDocs[1]?.id || 'doc-002');
  const [comparison] = useState(MOCK_COMPARISON_RESULT);

  return (
    <div id="document-comparison-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Side-by-Side Legal Instrument Comparison
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare base agreements against subsequent amendments, addenda, or competing vendor redlines
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold rounded-lg">
            Matter: {activeCase.caseId}
          </span>
        </div>
      </div>

      {/* Document Selectors Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Baseline Document (Instrument A)
          </label>
          <select
            value={docAId}
            onChange={(e) => setDocAId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
          >
            {caseDocs.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.fileName} ({doc.category})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Comparison / Amended Document (Instrument B)
          </label>
          <select
            value={docBId}
            onChange={(e) => setDocBId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
          >
            {caseDocs.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.fileName} ({doc.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Executive Callout */}
      <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl text-xs space-y-1">
        <h4 className="font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Executive Variance Synthesis</span>
        </h4>
        <p className="text-blue-900/90 dark:text-blue-300 leading-relaxed">
          {comparison.keyDifferencesSummary}
        </p>
      </div>

      {/* Modified Clauses Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Modified Covenants & Altered Terms
            </h3>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-mono">
            {comparison.modifiedClauses.length} Changed
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {comparison.modifiedClauses.map((mc, idx) => (
            <div key={idx} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-xs">
                  {mc.title} ({mc.section})
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600">
                  Critical Variance
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before */}
                <div className="p-3.5 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 rounded-xl space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                    Prior Text (Master Agreement 2023)
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                    "{mc.before}"
                  </p>
                </div>

                {/* After */}
                <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Amended Text (Amendment No. 1)
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                    "{mc.after}"
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-[11px] text-slate-600 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">Legal Impact: </strong>
                {mc.variance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Added Clauses Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Newly Introduced Provisions
            </h3>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono">
            {comparison.addedClauses.length} Added
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {comparison.addedClauses.map((ac, idx) => (
            <div key={idx} className="p-5 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white text-xs">
                {ac.title} ({ac.section})
              </div>
              <div className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/50 dark:border-emerald-900/30 text-slate-800 dark:text-slate-200 font-serif leading-relaxed">
                "{ac.text}"
              </div>
              <div className="text-[11px] text-slate-500">
                <strong>Strategic Consequence: </strong> {ac.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
