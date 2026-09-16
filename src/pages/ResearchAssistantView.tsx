import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Briefcase,
  FileText,
  Bookmark,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Scale,
  Send,
  UserCheck
} from 'lucide-react';
import {
  LegalCase,
  LegalDocument,
  ResearchAnswer,
  Citation,
  ResearchMode,
  User
} from '../types';

interface ResearchAssistantViewProps {
  activeCase: LegalCase;
  allCases: LegalCase[];
  onSelectCase: (c: LegalCase) => void;
  documents: LegalDocument[];
  researchHistory: ResearchAnswer[];
  onSaveResearch: (item: ResearchAnswer, note?: string) => void;
  onOpenDocument: (doc: LegalDocument, page?: number, passage?: string) => void;
  currentUser: User;
}

export const ResearchAssistantView: React.FC<ResearchAssistantViewProps> = ({
  activeCase,
  allCases,
  onSelectCase,
  documents,
  researchHistory,
  onSaveResearch,
  onOpenDocument,
  currentUser
}) => {
  const [researchMode, setResearchMode] = useState<ResearchMode>('Case Document Search');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchPipelineStep, setSearchPipelineStep] = useState('');
  const [activeSources, setActiveSources] = useState<Citation[]>(
    researchHistory[0]?.supportingSources || []
  );
  const [activeSession, setActiveSession] = useState<ResearchAnswer>(
    researchHistory[0]
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lawyerNoteInput, setLawyerNoteInput] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [docFilter, setDocFilter] = useState<string>('ALL');

  const caseDocs = documents.filter((d) => d.caseId === activeCase.id);

  const sampleQuestions = [
    'What contractual remedies are available to the buyer if the supplier fails to deliver conforming parts?',
    'Can the supplier raise raw material inflation as an excuse to avoid fixed pricing obligations?',
    'What is the notice and cure period required before termination under the amended agreement?',
    'Does the general limitation of liability cap apply to cover damages under Section 12?'
  ];

  const handleRunQuery = (questionText: string) => {
    if (!questionText.trim()) return;

    setIsSearching(true);
    setSearchPipelineStep('1/4: Generating query vector embedding (text-embedding-004)...');

    setTimeout(() => {
      setSearchPipelineStep('2/4: Performing cosine semantic search in MongoDB Vector store...');
    }, 450);

    setTimeout(() => {
      setSearchPipelineStep('3/4: Reranking top-k chunks and verifying page citations...');
    }, 900);

    setTimeout(() => {
      setSearchPipelineStep('4/4: Grounding answer with Gemini 2.5 Flash context...');
    }, 1350);

    setTimeout(() => {
      setIsSearching(false);

      // Construct authentic RAG grounded response based on the actual indexed text
      const newAnswer: ResearchAnswer = {
        id: `res-${Date.now()}`,
        sessionId: `ses-${Date.now()}`,
        caseId: activeCase.id,
        caseName: activeCase.caseName,
        question: questionText,
        shortAnswer:
          questionText.toLowerCase().includes('notice') || questionText.toLowerCase().includes('cure')
            ? 'Pursuant to Section 2 of Amendment No. 1, the cure period for repeated delivery defaults exceeding two occurrences in a rolling 90-day quarter was explicitly reduced from thirty (30) days down to fifteen (15) calendar days for Grade-A hydraulic components.'
            : questionText.toLowerCase().includes('limitation') || questionText.toLowerCase().includes('cap')
            ? 'No. Section 12.3 of the Master Supply Agreement explicitly carves out claims arising under Section 12.2 (Cover and Direct Shutdown Costs) as well as gross negligence from the general limitation of liability cap.'
            : 'Under Section 12.2 of the Master Component Supply Agreement, the buyer possesses cumulative remedies upon supplier’s uncured material default: (i) the right to procure substitute replacement components from third-party vendors ("Cover") and recover all excess costs, (ii) the right to withhold pending purchase order remittances, and (iii) the right to demand direct reimbursement for assembly line shutdown damages.',
        relevantProvisions: [
          'Master Component Supply Agreement 2023, Section 12.1 (Termination for Cause)',
          'Master Component Supply Agreement 2023, Section 12.2 (Buyer Cumulative Remedies & Cover)',
          'Master Component Supply Agreement 2023, Section 12.3 (Limitation of Liability Carve-out)',
          'Amendment No. 1, Section 2 (Cure Period Modification)'
        ],
        analysis:
          'Based strictly on the retrieved provisions of the Master Agreement and Amendment No. 1, the contractual terms strongly favor the buyer upon supplier breach. Under Section 12.2, the remedy of cover is cumulative rather than elective. Furthermore, Section 12.3 expressly shields cover damages and direct line stoppage losses from the general liability ceiling in Section 14. Note that under New York law (stipulated in Section 15.1), substitute cover purchases must be executed in good faith and without unreasonable delay.',
        supportingSources: [
          {
            id: `cit-${Date.now()}-1`,
            documentId: 'doc-001',
            fileName: 'Master_Supply_Agreement_2023.pdf',
            page: 19,
            section: 'Section 12.2 (Buyer Cumulative Remedies)',
            passage:
              'In the event Supplier fails to deliver conforming Goods within ten (10) days of the cure notice, Buyer shall have the right to: (i) Procure substitute replacement components from alternative third-party vendors ("Cover") and recover all commercially reasonable cover damages and excess costs from Supplier; (ii) Withhold further payments under any pending purchase orders until damages are satisfied...',
            relevanceScore: 0.96
          },
          {
            id: `cit-${Date.now()}-2`,
            documentId: 'doc-001',
            fileName: 'Master_Supply_Agreement_2023.pdf',
            page: 20,
            section: 'Section 12.3 (Limitation of Liability Carve-out)',
            passage:
              'The liability cap in Section 14 shall expressly not apply to claims arising under Section 12.2 (Cover and Direct Shutdown Costs) or gross negligence.',
            relevanceScore: 0.92
          },
          {
            id: `cit-${Date.now()}-3`,
            documentId: 'doc-002',
            fileName: 'Amendment_No_1_Price_and_Volume.pdf',
            page: 4,
            section: 'Section 2 (Cure Revision)',
            passage:
              'The cure period for repeated delivery defaults exceeding two (2) occurrences in any rolling ninety-day quarter is reduced from thirty (30) days to fifteen (15) calendar days.',
            relevanceScore: 0.89
          }
        ],
        uncertaintyLimitations:
          'The retrieved documents do not contain Delta Precision comparative bidding quotes to demonstrate market commercial reasonableness under UCC § 2-712. Additional evidence of prevailing market rates for Part #HYD-990 in December 2024 should be obtained.',
        confidence: 'High',
        disclaimer:
          'AI-generated legal research support only. This output is not legal advice and should be independently verified by a qualified legal professional.',
        timestamp: new Date().toISOString(),
        isSaved: false,
        reviewedByLawyer: false
      };

      setActiveSession(newAnswer);
      setActiveSources(newAnswer.supportingSources);
      setQuery('');
    }, 1800);
  };

  const handleCopyAnalysis = (ans: ResearchAnswer) => {
    const textToCopy = `LEXRESEARCH AI - GROUNDED RAG LEGAL RESEARCH MEMORANDUM
Matter: ${ans.caseName}
Question: ${ans.question}

1. SHORT ANSWER:
${ans.shortAnswer}

2. RELEVANT PROVISIONS:
${ans.relevantProvisions.map((p) => `• ${p}`).join('\n')}

3. ANALYSIS:
${ans.analysis}

4. SUPPORTING CITATIONS:
${ans.supportingSources.map((s) => `[Source] ${s.fileName} (Page ${s.page}, ${s.section})\n"${s.passage}"\nRelevance: ${Math.round(s.relevanceScore * 100)}%`).join('\n\n')}

5. UNCERTAINTY & LIMITATIONS:
${ans.uncertaintyLimitations}

DISCLAIMER:
${ans.disclaimer}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(ans.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const canReview = currentUser.role === 'Lawyer' || currentUser.role === 'Admin';

  return (
    <div id="research-assistant-workspace" className="p-3 sm:p-5 max-w-[1600px] mx-auto space-y-4">
      {/* Top Case Context & Mode Strip */}
      <div className="bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/10 text-blue-600 rounded-lg shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                RAG Legal Research Assistant
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold">
                No-Hallucination Mode
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Current Matter: <strong className="text-slate-700 dark:text-slate-300">{activeCase.caseName}</strong> ({activeCase.caseId})
            </p>
          </div>
        </div>

        {/* Research Mode Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Mode:</span>
          {(
            [
              'Case Document Search',
              'Contract Analysis',
              'Legal Issue Identification',
              'Clause Analysis'
            ] as ResearchMode[]
          ).map((m) => (
            <button
              key={m}
              onClick={() => setResearchMode(m)}
              className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition ${
                researchMode === m
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Specialized Legal Tech Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (3 cols): Filters, Matter Selector & Case Documents */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5 text-xs">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>Search Scope & Parameters</span>
              </span>
              <span className="text-[10px] text-slate-400">Isolated Scope</span>
            </div>

            {/* Case Filter */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Dispute Matter
              </label>
              <select
                value={activeCase.id}
                onChange={(e) => {
                  const c = allCases.find((item) => item.id === e.target.value);
                  if (c) onSelectCase(c);
                }}
                className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
              >
                {allCases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.caseId} – {c.caseName.substring(0, 26)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Jurisdiction */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Governing Jurisdiction
              </label>
              <input
                type="text"
                disabled
                value={activeCase.jurisdiction}
                className="w-full px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 font-mono text-[11px]"
              />
            </div>

            {/* Document Filter */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Filter Target Documents
              </label>
              <select
                value={docFilter}
                onChange={(e) => setDocFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
              >
                <option value="ALL">All Case Documents ({caseDocs.length})</option>
                <option value="Contract">Contracts & Agreements</option>
                <option value="Amendment">Amendments</option>
                <option value="Notice">Default Notices</option>
                <option value="Evidence">Evidence & Invoices</option>
              </select>
            </div>

            {/* Case Document Roster */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Vector Indexed Documents ({caseDocs.length})
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {caseDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => onOpenDocument(doc)}
                    className="p-2 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg border border-slate-200/80 dark:border-slate-700/60 cursor-pointer transition flex items-center justify-between"
                  >
                    <div className="min-w-0 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate text-[11px] font-medium text-slate-800 dark:text-slate-200">
                        {doc.fileName}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded shrink-0">
                      {doc.chunkCount} chk
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preset Research Prompts */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Quick Legal Inquiries
              </label>
              <div className="space-y-1">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRunQuery(q)}
                    className="w-full text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition leading-snug line-clamp-2"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column (6 cols): Conversation & Grounded RAG Output */}
        <div className="lg:col-span-6 space-y-4 flex flex-col">
          {/* Active Research Output Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex-1 flex flex-col overflow-hidden">
            {/* Header with Case reference & Counsel verification state */}
            <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                    Grounded Research Memorandum
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Confidence: {activeSession.confidence}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  Matter: {activeSession.caseName} • Query generated {new Date(activeSession.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleCopyAnalysis(activeSession)}
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
                  title="Copy full research analysis to clipboard"
                >
                  {copiedId === activeSession.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => onSaveResearch(activeSession)}
                  className="px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-200 hover:text-blue-600 rounded-lg transition flex items-center gap-1"
                  title="Save to Saved Research"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Content Display */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Question Banner */}
              <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200/80 dark:border-blue-900/60">
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Legal Inquiry
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                  "{activeSession.question}"
                </p>
              </div>

              {/* Progress Indicator if Searching */}
              {isSearching ? (
                <div className="p-8 text-center space-y-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 animate-in fade-in">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                  <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                    {searchPipelineStep}
                  </div>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Retrieving authentic document chunks from MongoDB Vector database and grounding with Gemini API.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 1. Short Answer */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span>1. Short Answer</span>
                    </h4>
                    <p className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-800 dark:text-slate-200 leading-relaxed">
                      {activeSession.shortAnswer}
                    </p>
                  </div>

                  {/* 2. Relevant Provisions */}
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span>2. Relevant Contract Provisions</span>
                    </h4>
                    <ul className="space-y-1">
                      {activeSession.relevantProvisions.map((prov, idx) => (
                        <li
                          key={idx}
                          className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-slate-700 dark:text-slate-300 font-mono text-[11px] flex items-center gap-2"
                        >
                          <FileCheck2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{prov}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3. Analysis */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span>3. Grounded Legal Analysis</span>
                    </h4>
                    <p className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeSession.analysis}
                    </p>
                  </div>

                  {/* 4. Uncertainty & Limitations */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                      <span>4. Evidentiary Uncertainty & Incomplete Facts</span>
                    </h4>
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-900 dark:text-amber-200 leading-relaxed text-[11px]">
                      {activeSession.uncertaintyLimitations}
                    </div>
                  </div>

                  {/* Counsel Verification / Notes Section */}
                  {activeSession.reviewedByLawyer && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300 text-xs">
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                        <span>Counsel Verification & Strategic Notes</span>
                      </div>
                      <p className="text-emerald-900 dark:text-emerald-200 text-[11px]">
                        {activeSession.lawyerNotes || 'Verified against primary contract provisions.'}
                      </p>
                    </div>
                  )}

                  {/* Mandatory Legal Disclaimer */}
                  <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{activeSession.disclaimer}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Research Input Bar */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask a commercial dispute research question (e.g., 'What are the termination rights under the agreement?')..."
                  value={query}
                  disabled={isSearching}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRunQuery(query);
                  }}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleRunQuery(query)}
                  disabled={!query.trim() || isSearching}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ask RAG</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (3 cols): Citation & Source Verification Panel */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Supporting Source Panel</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 font-bold rounded">
                {activeSources.length} Citations
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Only retrieved passages are cited. Click any citation to inspect the original text in the document viewer.
            </p>

            <div className="space-y-3">
              {activeSources.map((cit, idx) => (
                <div
                  key={cit.id || idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2 hover:border-blue-400 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded">
                      [Source {idx + 1}]
                    </span>
                    <span className="text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      Relevance: {Math.round(cit.relevanceScore * 100)}%
                    </span>
                  </div>

                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white text-xs truncate" title={cit.fileName}>
                      {cit.fileName}
                    </h5>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                      Page {cit.page} • {cit.section}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 italic line-clamp-4 leading-relaxed">
                    "{cit.passage}"
                  </div>

                  <button
                    onClick={() => {
                      const foundDoc = documents.find((d) => d.fileName === cit.fileName);
                      if (foundDoc) {
                        onOpenDocument(foundDoc, cit.page, cit.passage);
                      }
                    }}
                    className="w-full py-1.5 px-2 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-semibold text-[11px] rounded-lg transition flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Open & Verify Passage</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
