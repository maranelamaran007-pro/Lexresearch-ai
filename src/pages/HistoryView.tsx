import React, { useState } from 'react';
import {
  Clock,
  Search,
  FileText,
  Sparkles,
  ExternalLink,
  Trash2,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { ResearchAnswer, LegalDocument, ActiveNavTab } from '../types';

interface HistoryViewProps {
  history: ResearchAnswer[];
  onOpenDocument: (doc: LegalDocument, page?: number, passage?: string) => void;
  documents: LegalDocument[];
  onNavigate: (tab: ActiveNavTab) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onOpenDocument,
  documents,
  onNavigate
}) => {
  const [search, setSearch] = useState('');

  const filteredHistory = history.filter(
    (h) =>
      search === '' ||
      h.question.toLowerCase().includes(search.toLowerCase()) ||
      h.shortAnswer.toLowerCase().includes(search.toLowerCase()) ||
      h.caseName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="research-history-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Research Query Audit History</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Historical record of all RAG research inquiries, retrieved context, and citation outputs
          </p>
        </div>

        <button
          onClick={() => onNavigate('research')}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-1.5 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Research Query</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        <Search className="w-4 h-4 text-slate-400 absolute left-6 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter research history by keywords, clauses, case names..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* History Items */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {item.caseName.split('vs')[0].trim()}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Confidence: {item.confidence}
              </span>
            </div>

            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              "{item.question}"
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 leading-relaxed">
              <strong className="text-slate-800 dark:text-slate-200">Grounded Output: </strong>
              {item.shortAnswer}
            </p>

            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-slate-400">Sources ({item.supportingSources.length}):</span>
                {item.supportingSources.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const doc = documents.find((d) => d.fileName === s.fileName);
                      if (doc) onOpenDocument(doc, s.page, s.passage);
                    }}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-300 text-[11px] rounded transition"
                  >
                    <FileText className="w-3 h-3 text-blue-600" />
                    <span>{s.fileName} (p.{s.page})</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => onNavigate('research')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                Reopen in Assistant →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
