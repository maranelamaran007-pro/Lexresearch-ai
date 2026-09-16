import React from 'react';
import {
  Briefcase,
  FileText,
  Sparkles,
  Bookmark,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Layers,
  Search,
  ExternalLink,
  Plus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import {
  LegalCase,
  LegalDocument,
  ResearchAnswer,
  ActiveNavTab,
  User
} from '../types';
import {
  MOCK_ACTIVITY_CHART_DATA,
  MOCK_DISPUTE_DISTRIBUTION
} from '../data/mockData';

interface DashboardProps {
  cases: LegalCase[];
  documents: LegalDocument[];
  researchHistory: ResearchAnswer[];
  activeCase: LegalCase;
  onSelectCase: (c: LegalCase) => void;
  onNavigate: (tab: ActiveNavTab) => void;
  onOpenNewCase: () => void;
  onOpenUpload: () => void;
  onOpenDocument: (doc: LegalDocument, page?: number, passage?: string) => void;
  currentUser: User;
}

export const Dashboard: React.FC<DashboardProps> = ({
  cases,
  documents,
  researchHistory,
  activeCase,
  onSelectCase,
  onNavigate,
  onOpenNewCase,
  onOpenUpload,
  onOpenDocument,
  currentUser
}) => {
  const activeCasesCount = cases.filter((c) => c.caseStatus === 'Active' || c.caseStatus === 'Researching').length;
  const indexedDocsCount = documents.filter((d) => d.processingStatus === 'INDEXED').length;
  const pendingDocsCount = documents.filter((d) => d.processingStatus === 'PROCESSING' || d.processingStatus === 'UPLOADED').length;

  const kpis = [
    {
      id: 'kpi-cases',
      label: 'Total Cases',
      value: cases.length,
      subtext: `${activeCasesCount} active disputes`,
      icon: Briefcase,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40'
    },
    {
      id: 'kpi-docs',
      label: 'Total Documents',
      value: documents.length,
      subtext: `${indexedDocsCount} fully indexed in vector DB`,
      icon: FileText,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      id: 'kpi-queries',
      label: 'Research Queries',
      value: 42,
      subtext: '100% grounded with citations',
      icon: Sparkles,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/40'
    },
    {
      id: 'kpi-saved',
      label: 'Saved & Verified',
      value: 12,
      subtext: 'Reviewed by qualified counsel',
      icon: Bookmark,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40'
    },
    {
      id: 'kpi-pending',
      label: 'Pending Queue',
      value: pendingDocsCount,
      subtext: pendingDocsCount > 0 ? 'Document processing active' : 'All documents indexed',
      icon: Clock,
      color: pendingDocsCount > 0 ? 'text-amber-600' : 'text-slate-600',
      bg: pendingDocsCount > 0 ? 'bg-amber-50 dark:bg-amber-950/40' : 'bg-slate-100 dark:bg-slate-800'
    }
  ];

  return (
    <div id="dashboard-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Legal Research Command Center
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              RAG v1.0
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Logged in as <strong className="text-slate-700 dark:text-slate-300">{currentUser.name}</strong> ({currentUser.role}) • {currentUser.organization}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            id="quick-new-case-btn"
            onClick={onOpenNewCase}
            className="px-3.5 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span>New Case</span>
          </button>
          <button
            id="quick-upload-doc-btn"
            onClick={onOpenUpload}
            className="px-3.5 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span>Upload Document</span>
          </button>
          <button
            id="quick-start-research-btn"
            onClick={() => onNavigate('research')}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-1.5 shadow-sm shadow-blue-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Research Query</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              id={kpi.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{kpi.label}</span>
                <div className={`p-1.5 rounded-lg ${kpi.bg}`}>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{kpi.value}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{kpi.subtext}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Research Activity & Citation Trends (2 columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Research Queries & Retrieved Citations</h3>
              <p className="text-xs text-slate-500">7-day grounded RAG retrieval and citation grounding activity</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-slate-600 dark:text-slate-400">Queries</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600 dark:text-slate-400">Citations Grounded</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ACTIVITY_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCitations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#64748B" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#F8FAFC',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="queries" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorQueries)" name="RAG Queries" />
                <Area type="monotone" dataKey="retrievedCitations" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorCitations)" name="Citations" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Commercial Dispute Distribution (1 column) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Matters by Dispute Type</h3>
            <p className="text-xs text-slate-500">Commercial dispute classification across active portfolios</p>
          </div>

          <div className="h-48 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DISPUTE_DISTRIBUTION} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 10 }} stroke="#64748B" />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Portfolio Share']}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#FFF'
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {MOCK_DISPUTE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Primary Category: Supply Disputes (35%)</span>
            <span className="text-blue-600 font-medium cursor-pointer" onClick={() => onNavigate('cases')}>View All Cases →</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Recent Cases & Document Ingestion Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Active Cases (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Commercial Dispute Workspaces</h3>
              <p className="text-xs text-slate-500">Active commercial litigation cases under research</p>
            </div>
            <button
              onClick={() => onNavigate('cases')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <span>Manage Cases</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {cases.map((c) => {
              const isSelected = c.id === activeCase.id;
              return (
                <div
                  key={c.id}
                  className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {c.caseId}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {c.caseName}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                        {c.caseStatus}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {c.description}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                      <span>Tribunal: <strong className="text-slate-600 dark:text-slate-300">{c.courtTribunal.split(',')[0]}</strong></span>
                      <span>Dispute: <strong className="text-slate-600 dark:text-slate-300">{c.disputeType}</strong></span>
                      <span>Docs: <strong className="text-slate-600 dark:text-slate-300">{c.documentCount}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onSelectCase(c)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {isSelected ? 'Active Context' : 'Set as Active'}
                    </button>
                    <button
                      onClick={() => {
                        onSelectCase(c);
                        onNavigate('research');
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition"
                      title="Launch research query for this case"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Document Processing Pipeline & Status (1 col) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Document Pipeline Status</h3>
              <p className="text-xs text-slate-500">Vector indexing & text extraction health</p>
            </div>
            <button
              onClick={() => onNavigate('documents')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              All Docs →
            </button>
          </div>

          <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-80">
            {documents.slice(0, 5).map((doc) => {
              const isIndexed = doc.processingStatus === 'INDEXED';
              const isProcessing = doc.processingStatus === 'PROCESSING';

              return (
                <div
                  key={doc.id}
                  onClick={() => onOpenDocument(doc)}
                  className="p-3 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/60 cursor-pointer transition flex items-start gap-3"
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {doc.fileName}
                      </p>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                          isIndexed
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : isProcessing
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 animate-pulse'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {doc.processingStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {doc.caseName.split('vs')[0]} • {doc.fileSize} • {doc.pageCount} pages
                    </p>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>{doc.chunkCount} vector chunks</span>
                      <span className="text-blue-600 font-medium">Click to inspect</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 rounded-b-2xl text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium mb-1">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pipeline Configuration</span>
            </div>
            <p>Chunk Size: 500 tokens • Overlap: 50 tokens • Cosine Similarity Threshold: 0.78</p>
          </div>
        </div>
      </div>

      {/* Recent Research Questions Preview */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recent Grounded Research Sessions</h3>
            <p className="text-xs text-slate-500">Commercial dispute queries answered with retrieved document passages</p>
          </div>
          <button
            onClick={() => onNavigate('research')}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <span>Open Assistant</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {researchHistory.slice(0, 3).map((res) => (
            <div key={res.id} className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {res.caseName.split('vs')[0].trim()}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(res.timestamp).toLocaleDateString()}
                    </span>
                    {res.reviewedByLawyer && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Counsel Verified</span>
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white mt-1">
                    "{res.question}"
                  </h4>
                </div>
                <button
                  onClick={() => onNavigate('research')}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-medium text-xs rounded-lg transition shrink-0"
                >
                  View Full RAG Analysis
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                <strong className="text-slate-900 dark:text-white">Short Answer: </strong>
                {res.shortAnswer}
              </p>

              {/* Citations Preview Strip */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] font-medium text-slate-500">Supporting Citations:</span>
                {res.supportingSources.map((cit) => (
                  <button
                    key={cit.id}
                    onClick={() => {
                      const foundDoc = documents.find((d) => d.fileName === cit.fileName);
                      if (foundDoc) {
                        onOpenDocument(foundDoc, cit.page, cit.passage);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 border border-slate-200 dark:border-slate-700 rounded-md text-[11px] text-slate-700 dark:text-slate-300 transition"
                  >
                    <FileText className="w-3 h-3 text-blue-600" />
                    <span className="font-medium truncate max-w-[140px]">{cit.fileName}</span>
                    <span className="text-[10px] text-slate-400">p.{cit.page}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">{Math.round(cit.relevanceScore * 100)}%</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
