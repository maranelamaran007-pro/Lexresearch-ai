import React, { useState } from 'react';
import {
  Scale,
  AlertTriangle,
  FileText,
  ExternalLink,
  ShieldAlert,
  Search,
  CheckCircle2,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { LegalCase, LegalDocument, LegalIssue } from '../types';
import { MOCK_LEGAL_ISSUES } from '../data/mockData';

interface LegalIssuesViewProps {
  activeCase: LegalCase;
  documents: LegalDocument[];
  onOpenDocument: (doc: LegalDocument, page?: number, passage?: string) => void;
}

export const LegalIssuesView: React.FC<LegalIssuesViewProps> = ({
  activeCase,
  documents,
  onOpenDocument
}) => {
  const [issues] = useState<LegalIssue[]>(MOCK_LEGAL_ISSUES);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredIssues = issues.filter(
    (iss) => selectedCategory === 'ALL' || iss.category === selectedCategory
  );

  return (
    <div id="legal-issues-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Potential Legal Issue Identification
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            AI-assisted extraction of potential commercial dispute liabilities, breaches, and statutory defenses from case documents
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Issue Categories</option>
            <option value="Breach of Contract">Breach of Contract</option>
            <option value="Damages">Damages & Cover</option>
            <option value="Termination">Notice & Termination</option>
            <option value="Liability">Liability & Surcharges</option>
          </select>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Legal Tech Safety Notice: </span>
          These items represent <strong>potential legal issues</strong> extracted through pattern matching across contractual clauses and factual notices. They do not constitute definitive legal conclusions or formal counsel findings.
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredIssues.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {item.category}
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Confidence: {item.confidence}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                {item.issue}
              </h3>

              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <p>
                  <strong className="text-slate-800 dark:text-slate-200">Why Relevant: </strong>
                  {item.whyRelevant}
                </p>
              </div>

              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60 text-xs">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Supporting Document Passage</span>
                  <span className="font-mono">{item.relevantDocument} • p.{item.page}</span>
                </div>
                <p className="italic text-slate-700 dark:text-slate-300 line-clamp-3">
                  "{item.supportingPassage}"
                </p>
              </div>

              <div className="mt-3 p-2.5 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-200 flex items-start gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Suggested Counsel Action: </span>
                  {item.suggestedAction}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">{item.section}</span>
              <button
                onClick={() => {
                  const doc = documents.find((d) => d.fileName === item.relevantDocument);
                  if (doc) {
                    onOpenDocument(doc, item.page, item.supportingPassage);
                  }
                }}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-300 hover:text-blue-600 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Source Document</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
