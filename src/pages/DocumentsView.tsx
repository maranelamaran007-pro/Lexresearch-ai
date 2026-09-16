import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Layers,
  Sparkles,
  Download,
  Filter
} from 'lucide-react';
import { LegalDocument, LegalCase, UserRole, ActiveNavTab } from '../types';

interface DocumentsViewProps {
  documents: LegalDocument[];
  activeCase: LegalCase;
  onOpenDocument: (doc: LegalDocument, page?: number, passage?: string) => void;
  onOpenUpload: () => void;
  onNavigate: (tab: ActiveNavTab) => void;
  userRole: UserRole;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  activeCase,
  onOpenDocument,
  onOpenUpload,
  onNavigate,
  userRole
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterCaseOnly, setFilterCaseOnly] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const displayedDocs = documents.filter((d) => {
    const matchesCase = !filterCaseOnly || d.caseId === activeCase.id;
    const matchesCategory = filterCategory === 'ALL' || d.category === filterCategory;
    const matchesSearch =
      search === '' ||
      d.fileName.toLowerCase().includes(search.toLowerCase()) ||
      d.documentId.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase());
    return matchesCase && matchesCategory && matchesSearch;
  });

  return (
    <div id="documents-management-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Legal Document Repository</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Authenticated contracts, agreements, notices, and exhibits indexed for vector RAG retrieval
          </p>
        </div>

        <button
          id="upload-doc-view-btn"
          onClick={onOpenUpload}
          className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-1.5 shadow-sm shadow-blue-500/20"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Legal Document</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search document name, ID, or clause keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Categories</option>
            <option value="Contract">Contracts</option>
            <option value="Amendment">Amendments</option>
            <option value="Notice">Legal Notices</option>
            <option value="Evidence">Evidence / POs</option>
            <option value="Court Order">Court Orders</option>
          </select>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg select-none">
            <input
              type="checkbox"
              checked={filterCaseOnly}
              onChange={(e) => setFilterCaseOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-0"
            />
            <span className="text-[11px] font-medium truncate">Current Case Only ({activeCase.caseId})</span>
          </label>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3">Document & ID</th>
                <th className="px-4 py-3">Case Matter</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Vector Status</th>
                <th className="px-4 py-3">Chunks</th>
                <th className="px-4 py-3">Size / Pages</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedDocs.map((doc) => {
                const isIndexed = doc.processingStatus === 'INDEXED';
                const isProcessing = doc.processingStatus === 'PROCESSING';

                return (
                  <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-slate-900 dark:text-white block truncate max-w-xs sm:max-w-sm">
                            {doc.fileName}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {doc.documentId} • {doc.documentType}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="text-slate-700 dark:text-slate-300 font-medium block truncate max-w-[180px]">
                        {doc.caseName}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-[11px]">
                        {doc.category}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full font-mono ${
                          isIndexed
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : isProcessing
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 animate-pulse'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isIndexed ? 'bg-emerald-500' : isProcessing ? 'bg-amber-500' : 'bg-slate-400'}`}></span>
                        {doc.processingStatus}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                      {doc.chunkCount > 0 ? (
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3 text-slate-400" />
                          <span>{doc.chunkCount}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">Pending</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400">
                      <div>{doc.fileSize}</div>
                      <div className="text-[10px]">{doc.pageCount} pages</div>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenDocument(doc)}
                          className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-200 hover:text-blue-600 rounded-lg transition flex items-center gap-1 font-medium"
                          title="Open document viewer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                        <button
                          onClick={() => onNavigate('research')}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition"
                          title="Ask research query on this document"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
