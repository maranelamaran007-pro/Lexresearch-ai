import React, { useState } from 'react';
import {
  X,
  FileText,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Highlighter,
  ShieldAlert,
  Info,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { LegalDocument, UserRole } from '../../types';

interface DocumentViewerModalProps {
  document: LegalDocument | null;
  initialPage?: number;
  highlightPassage?: string;
  onClose: () => void;
  userRole: UserRole;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  initialPage = 1,
  highlightPassage = '',
  onClose,
  userRole
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [inDocSearch, setInDocSearch] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!document) return null;

  const canDownload = userRole !== 'Viewer';

  const handleCopyPassage = () => {
    if (highlightPassage) {
      navigator.clipboard.writeText(highlightPassage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id="document-viewer-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150"
    >
      <div
        id="document-viewer-container"
        className="bg-white dark:bg-slate-900 w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
      >
        {/* Top Control Bar */}
        <div className="px-4 py-3 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm truncate text-white">{document.fileName}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono">
                  {document.documentType}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {document.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                Case: {document.caseName} • {document.fileSize}
              </p>
            </div>
          </div>

          {/* Viewer Tools */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Page Navigation */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg text-xs">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                className="p-1 hover:bg-slate-700 disabled:opacity-30 rounded transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-slate-300 px-1">
                Page {currentPage} of {document.pageCount || 1}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(document.pageCount || 1, currentPage + 1))}
                disabled={currentPage >= (document.pageCount || 1)}
                className="p-1 hover:bg-slate-700 disabled:opacity-30 rounded transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg text-xs">
              <button
                onClick={() => setZoomLevel(Math.max(75, zoomLevel - 15))}
                className="p-1 hover:bg-slate-700 rounded transition"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-slate-300 px-1">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(175, zoomLevel + 15))}
                className="p-1 hover:bg-slate-700 rounded transition"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={() => {
                if (canDownload) {
                  alert(`Downloading original authenticated legal copy: ${document.fileName}`);
                } else {
                  alert('Download Restricted: Viewer role has read-only access.');
                }
              }}
              className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition ${
                canDownload
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  : 'bg-slate-800/40 text-slate-500 cursor-not-allowed'
              }`}
              title={canDownload ? 'Download authenticated original document' : 'Download restricted for Viewer role'}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Download</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Highlight Banner if Navigated from Citation */}
        {highlightPassage && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2 min-w-0">
              <Highlighter className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold shrink-0">Grounded Citation Passage:</span>
              <span className="truncate italic text-slate-700 dark:text-slate-300">"{highlightPassage.substring(0, 120)}..."</span>
            </div>
            <button
              onClick={handleCopyPassage}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-amber-200/80 hover:bg-amber-300/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-medium rounded transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Passage'}</span>
            </button>
          </div>
        )}

        {/* Content Body: Split between Document Page Canvas and Context Metadata */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Document Reader Canvas */}
          <div className="flex-1 bg-slate-100 dark:bg-slate-950 overflow-y-auto p-4 sm:p-8 flex justify-center">
            <div
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-xl rounded-lg p-8 sm:p-12 w-full max-w-3xl border border-slate-200 dark:border-slate-800 min-h-[600px] transition-all font-serif"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              {/* Document Header Representation */}
              <div className="border-b-2 border-slate-900 dark:border-slate-200 pb-4 mb-6">
                <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-500">
                  {document.caseName} • EXHIBIT BATCH
                </div>
                <h1 className="text-xl font-bold font-serif uppercase tracking-wide mt-1">
                  {document.fileName.replace('.pdf', '').replace(/_/g, ' ')}
                </h1>
                <div className="text-xs font-sans text-slate-500 mt-1 flex items-center justify-between">
                  <span>Document ID: {document.documentId}</span>
                  <span>Page {currentPage} of {document.pageCount}</span>
                </div>
              </div>

              {/* Document Text Rendering with Highlight Engine */}
              <div className="space-y-4 text-sm leading-relaxed whitespace-pre-line">
                {document.fullText ? (
                  document.fullText.split('\n\n').map((para, idx) => {
                    const isHighlighted =
                      highlightPassage &&
                      (para.toLowerCase().includes(highlightPassage.toLowerCase().substring(0, 40)) ||
                        highlightPassage.toLowerCase().includes(para.toLowerCase().substring(0, 40)));

                    return (
                      <p
                        key={idx}
                        className={`p-2 rounded transition ${
                          isHighlighted
                            ? 'bg-amber-100 dark:bg-amber-950/60 border-l-4 border-amber-500 text-slate-900 dark:text-amber-100 font-medium'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {para}
                      </p>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-slate-400 font-sans">
                    <p className="text-sm font-medium">Text extraction preview active.</p>
                    <p className="text-xs mt-1">{document.contentSnippet || 'Full document content indexed in Vector database.'}</p>
                  </div>
                )}
              </div>

              {/* Document Footer */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-12 text-[11px] font-sans text-slate-400 flex items-center justify-between">
                <span>AUTHENTICATED LEGAL RECORD • COMMERCIAL DISPUTE DIVISION</span>
                <span>PAGE {currentPage}</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Indexing & Provenance Metadata */}
          <div className="w-72 bg-slate-50 dark:bg-slate-900/60 border-l border-slate-200 dark:border-slate-800 p-4 overflow-y-auto hidden lg:block text-xs">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px] flex items-center gap-1.5 mb-3">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Indexing Metadata</span>
            </h4>

            <div className="space-y-3">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-medium text-slate-500 block uppercase">Vector Status</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  INDEXED & EMBEDDED
                </span>
                <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                  <div>Chunks: <strong className="text-slate-800 dark:text-slate-200">{document.chunkCount}</strong></div>
                  <div>Pages: <strong className="text-slate-800 dark:text-slate-200">{document.pageCount}</strong></div>
                  <div>Dimension: <strong className="text-slate-800 dark:text-slate-200">768 (Gemini)</strong></div>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-medium text-slate-500 block uppercase">Chain of Custody</span>
                <div className="mt-1 space-y-1 text-slate-600 dark:text-slate-400">
                  <div>Uploaded By: <span className="font-medium text-slate-800 dark:text-slate-200">{document.uploadedBy}</span></div>
                  <div>Upload Date: <span className="font-medium text-slate-800 dark:text-slate-200">{document.uploadDate}</span></div>
                  <div>Category: <span className="font-medium text-slate-800 dark:text-slate-200">{document.category}</span></div>
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200 text-[11px]">
                <div className="flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-300">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Citations Grounding</span>
                </div>
                <p className="mt-1 text-blue-800 dark:text-blue-300/90 leading-relaxed">
                  Every citation rendered in LexResearch AI links directly to precise character offsets and page markers inside this authenticated record.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
