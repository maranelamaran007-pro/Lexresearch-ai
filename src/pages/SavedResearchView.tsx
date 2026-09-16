import React, { useState } from 'react';
import {
  Bookmark,
  FileText,
  ExternalLink,
  CheckCircle2,
  Clock,
  Search,
  Tag,
  Trash2,
  Copy,
  Check,
  UserCheck
} from 'lucide-react';
import { SavedResearchItem, LegalDocument, UserRole } from '../types';
import { MOCK_SAVED_RESEARCH } from '../data/mockData';

interface SavedResearchViewProps {
  savedItems: SavedResearchItem[];
  onOpenDocument: (doc: LegalDocument, page?: number, passage?: string) => void;
  documents: LegalDocument[];
  userRole: UserRole;
  onDeleteItem?: (id: string) => void;
}

export const SavedResearchView: React.FC<SavedResearchViewProps> = ({
  savedItems,
  onOpenDocument,
  documents,
  userRole,
  onDeleteItem
}) => {
  const [items, setItems] = useState<SavedResearchItem[]>(savedItems.length > 0 ? savedItems : MOCK_SAVED_RESEARCH);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = items.filter(
    (it) =>
      search === '' ||
      it.title.toLowerCase().includes(search.toLowerCase()) ||
      it.question.toLowerCase().includes(search.toLowerCase()) ||
      it.caseName.toLowerCase().includes(search.toLowerCase()) ||
      it.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCopy = (it: SavedResearchItem) => {
    navigator.clipboard.writeText(`${it.title}\n${it.question}\n\n${it.answerSummary}\nNotes: ${it.notes}`);
    setCopiedId(it.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
    if (onDeleteItem) onDeleteItem(id);
  };

  return (
    <div id="saved-research-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Saved Legal Memoranda & Research</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Curated, counsel-verified answers with grounded source links, litigation notes, and strategic tagging
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold rounded-lg">
            {items.length} Saved Records
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        <Search className="w-4 h-4 text-slate-400 absolute left-6 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter saved research by topic, question keyword, tag (e.g. 'UCC 2-712'), or case..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Saved Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {item.caseName.split('vs')[0].trim()}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{item.status}</span>
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>By {item.createdBy}</span>
                <span>•</span>
                <span>{item.createdAt}</span>
              </div>
            </div>

            <div className="text-xs space-y-2">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Inquiry: "{item.question}"
              </div>
              <p className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                {item.answerSummary}
              </p>
            </div>

            {/* Counsel Notes */}
            {item.notes && (
              <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Counsel Strategic Annotations:</span>
                </div>
                <p className="text-emerald-900 dark:text-emerald-200 text-[11px] leading-relaxed">
                  {item.notes}
                </p>
              </div>
            )}

            {/* Citations & Tags */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-[10px] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(item)}
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                  title="Copy memo"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>

                {item.citations[0] && (
                  <button
                    onClick={() => {
                      const doc = documents.find((d) => d.fileName === item.citations[0].fileName);
                      if (doc) onOpenDocument(doc, item.citations[0].page, item.citations[0].passage);
                    }}
                    className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-semibold rounded-lg text-xs transition flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View Grounded Source</span>
                  </button>
                )}

                {userRole !== 'Viewer' && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                    title="Delete saved memo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
