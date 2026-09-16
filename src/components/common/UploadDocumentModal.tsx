import React, { useState } from 'react';
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Layers,
  Cpu,
  Database
} from 'lucide-react';
import { LegalCase, LegalDocument } from '../../types';

interface UploadDocumentModalProps {
  activeCase: LegalCase;
  allCases: LegalCase[];
  onClose: () => void;
  onUploadComplete: (newDoc: LegalDocument) => void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  activeCase,
  allCases,
  onClose,
  onUploadComplete
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState(activeCase.id);
  const [category, setCategory] = useState<LegalDocument['category']>('Contract');
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [error, setError] = useState('');

  const pipelineSteps = [
    { title: 'File Validation', desc: 'Verify PDF/DOCX MIME type and cryptographic hash' },
    { title: 'Text Extraction & Cleaning', desc: 'Parse structural text, OCR fallback, normalize legal terms' },
    { title: 'Page & Clause Segmentation', desc: 'Detect pagination markers and numbered provisions' },
    { title: 'Semantic Chunking', desc: 'Form 500-token chunks with 50-token semantic overlap' },
    { title: 'Embedding Generation', desc: 'Vectorize chunks using Google text-embedding-004' },
    { title: 'Vector DB Indexing', desc: 'Commit vectors with metadata to MongoDB Atlas Vector Search' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      const ext = f.name.split('.').pop()?.toLowerCase();
      if (!['pdf', 'docx', 'txt'].includes(ext || '')) {
        setError('Unsupported file type. Please select a valid PDF, DOCX, or TXT legal document.');
        return;
      }
      if (f.size > 25 * 1024 * 1024) {
        setError('File size exceeds 25 MB limit for document ingestion.');
        return;
      }
      setError('');
      setFile(f);
    }
  };

  const handleStartProcessing = () => {
    if (!file) {
      setError('Please select a file to ingest.');
      return;
    }

    setIsProcessing(true);
    setError('');

    // Simulate the real-world processing pipeline steps with visible feedback
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < pipelineSteps.length) {
        setProcessingStep(pipelineSteps[stepIndex].title);
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);

        const targetCase = allCases.find((c) => c.id === selectedCaseId) || activeCase;
        const fileExt = (file.name.split('.').pop()?.toUpperCase() || 'PDF') as 'PDF' | 'DOCX' | 'TXT';
        const estPages = Math.max(1, Math.round(file.size / (45 * 1024)));
        const estChunks = estPages * 3;

        const newDoc: LegalDocument = {
          id: `doc-${Date.now()}`,
          documentId: `DOC-${Math.floor(100 + Math.random() * 900)}`,
          caseId: targetCase.id,
          caseName: targetCase.caseName,
          fileName: file.name,
          documentType: fileExt,
          category,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadedBy: 'Eleanor Vance, Esq.',
          uploadDate: new Date().toISOString().split('T')[0],
          processingStatus: 'INDEXED',
          pageCount: estPages,
          chunkCount: estChunks,
          indexedStatus: true,
          contentSnippet: `Ingested legal document "${file.name}" for ${targetCase.caseName}. Extracted clauses and vector embeddings stored in MongoDB Atlas index.`,
          fullText: `AUTHENTICATED LEGAL RECORD\nDocument Name: ${file.name}\nCase: ${targetCase.caseName}\n\nSECTION 1. INGESTED RECITALS AND TERMS\nThis document has been processed through the LexResearch AI pipeline. Structural sections, clauses, and monetary schedules have been tokenized and indexed for semantic vector search.\n\nSECTION 2. BINDING OBLIGATIONS & DISPUTE PROVISIONS\nAll representations, warranty schedules, and notice cure covenants extracted from this instrument are preserved with character offsets and verifiable page references.`
        };

        onUploadComplete(newDoc);
        onClose();
      }
    }, 450);
  };

  return (
    <div id="upload-modal-backdrop" className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div id="upload-document-modal" className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">Upload & Index Legal Document</h3>
              <p className="text-xs text-slate-400">PDF, DOCX, and TXT parsing with semantic chunking & vector indexing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg flex items-center gap-2 text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Case Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Assign to Dispute Case *
              </label>
              <select
                value={selectedCaseId}
                disabled={isProcessing}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              >
                {allCases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.caseId} – {c.caseName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Document Category *
              </label>
              <select
                value={category}
                disabled={isProcessing}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              >
                <option value="Contract">Contract / Agreement</option>
                <option value="Amendment">Amendment / Addendum</option>
                <option value="Notice">Legal Notice / Default Notice</option>
                <option value="Correspondence">Correspondence / Letters</option>
                <option value="Court Order">Court Order / Judgment</option>
                <option value="Arbitration Brief">Arbitration Brief / Memorial</option>
                <option value="Evidence">Evidence / Purchase Orders</option>
              </select>
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl p-6 text-center bg-slate-50/50 dark:bg-slate-800/40 transition">
            <input
              id="file-upload-input"
              type="file"
              accept=".pdf,.docx,.txt"
              disabled={isProcessing}
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="file-upload-input" className="cursor-pointer block">
              <UploadCloud className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                {file ? file.name : 'Click to browse or drag & drop legal files'}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                Supports PDF, DOCX, TXT up to 25 MB per document
              </p>
              {file && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-full font-mono text-xs">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{(file.size / (1024 * 1024)).toFixed(2)} MB Selected</span>
                </div>
              )}
            </label>
          </div>

          {/* Processing Visualizer */}
          {isProcessing && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-blue-900 dark:text-blue-200 font-semibold">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  <span>Processing Pipeline: {processingStep}</span>
                </div>
                <span className="font-mono text-xs">In-Progress</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {pipelineSteps.map((s, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg border text-[11px] ${
                      processingStep === s.title
                        ? 'bg-blue-600 text-white border-blue-600 font-medium'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold truncate">{idx + 1}. {s.title}</div>
                    <div className="text-[10px] opacity-80 truncate">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pipeline Architectural Explainer */}
          <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1 text-xs">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>RAG Vector Ingestion Pipeline</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every ingested document is segmented into chunk boundaries preserving page numbers and legal section headers. Chunks are embedded with Google Embeddings and indexed for cosine semantic search.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={isProcessing}
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!file || isProcessing}
              onClick={handleStartProcessing}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition flex items-center gap-1.5 shadow-sm"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Ingesting Document...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Start Ingestion & Vector Indexing</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
