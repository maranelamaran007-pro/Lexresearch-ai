import React, { useState } from 'react';
import {
  FileCheck2,
  FileText,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Search,
  CheckCircle2,
  Layers,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { LegalCase, LegalDocument } from '../types';
import { MOCK_CLAUSE_ANALYSIS } from '../data/mockData';

interface ClauseAnalyzerViewProps {
  activeCase: LegalCase;
  documents: LegalDocument[];
  onOpenDocument: (doc: LegalDocument, page?: number, passage?: string) => void;
}

export const ClauseAnalyzerView: React.FC<ClauseAnalyzerViewProps> = ({
  activeCase,
  documents,
  onOpenDocument
}) => {
  const [analysis, setAnalysis] = useState(MOCK_CLAUSE_ANALYSIS);
  const [selectedClausePreset, setSelectedClausePreset] = useState('12.2');
  const [customText, setCustomText] = useState('');

  const handleSelectPreset = (val: string) => {
    setSelectedClausePreset(val);
  };

  return (
    <div id="clause-analyzer-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Commercial Clause Analyzer</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deconstruct complex contractual covenants into plain-English summaries, conditions, risks, and liability implications
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Sample Clause:</span>
          <select
            value={selectedClausePreset}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="12.2">Section 12.2 – Buyer Cover & Cumulative Remedies</option>
            <option value="4.2">Section 4.2 – Delay Liquidated Damages & Caps</option>
            <option value="8.1">Section 8.1 – Fixed Price & Raw Material Escalation Bar</option>
          </select>
        </div>
      </div>

      {/* Raw Clause Box & Source Reference */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {analysis.clauseTitle}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {analysis.sourceDoc} (Page {analysis.page})
            </span>
          </div>
          <button
            onClick={() => {
              const doc = documents.find((d) => d.fileName === analysis.sourceDoc);
              if (doc) onOpenDocument(doc, analysis.page, analysis.rawText);
            }}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View in Document</span>
          </button>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 font-serif text-xs leading-relaxed text-slate-800 dark:text-slate-200">
          "{analysis.rawText}"
        </div>
      </div>

      {/* 2-Column Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Plain Language Summary & Affected Parties */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Plain-Language Summary</span>
            </h4>
            <p className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-xl text-slate-800 dark:text-slate-200 leading-relaxed">
              {analysis.plainSummary}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>Parties Affected & Operational Scope</span>
            </h4>
            <div className="space-y-1">
              {analysis.partiesAffected.map((party, idx) => (
                <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-slate-700 dark:text-slate-300 font-medium">
                  • {party}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Core Obligation & Legal Covenant</span>
            </h4>
            <p className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-slate-700 dark:text-slate-300">
              {analysis.mainObligation}
            </p>
          </div>
        </div>

        {/* Conditions, Risks & Exceptions */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Trigger Conditions & Prerequisites</span>
            </h4>
            <ul className="space-y-1.5">
              {analysis.conditions.map((cond, idx) => (
                <li key={idx} className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-blue-600">{idx + 1}.</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>Potential Litigation & Commercial Risks</span>
            </h4>
            <div className="space-y-1.5">
              {analysis.potentialRisks.map((risk, idx) => (
                <div key={idx} className="p-2.5 bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-lg text-rose-900 dark:text-rose-200">
                  ⚠️ {risk}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Interconnected / Related Provisions</span>
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {analysis.relatedClauses.map((rc, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md font-mono text-[11px]">
                  {rc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
