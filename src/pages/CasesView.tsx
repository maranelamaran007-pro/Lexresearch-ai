import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Scale,
  Calendar,
  Building2,
  DollarSign
} from 'lucide-react';
import { LegalCase, DisputeType, CaseStatus, ActiveNavTab, User } from '../types';

interface CasesViewProps {
  cases: LegalCase[];
  activeCase: LegalCase;
  onSelectCase: (c: LegalCase) => void;
  onNavigate: (tab: ActiveNavTab) => void;
  onOpenNewCase: () => void;
  currentUser: User;
}

export const CasesView: React.FC<CasesViewProps> = ({
  cases,
  activeCase,
  onSelectCase,
  onNavigate,
  onOpenNewCase,
  currentUser
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [selectedCaseDetail, setSelectedCaseDetail] = useState<LegalCase | null>(null);

  const filteredCases = cases.filter((c) => {
    const matchesType = filterType === 'ALL' || c.disputeType === filterType;
    const matchesStatus = filterStatus === 'ALL' || c.caseStatus === filterStatus;
    const matchesSearch =
      search === '' ||
      c.caseName.toLowerCase().includes(search.toLowerCase()) ||
      c.caseId.toLowerCase().includes(search.toLowerCase()) ||
      c.clientOrganization.toLowerCase().includes(search.toLowerCase()) ||
      c.opposingParty.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const canCreateCase = currentUser.role !== 'Viewer';

  return (
    <div id="cases-management-view" className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Commercial Dispute Workspaces</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organize dispute documents, isolate case memory, and run grounded vector research across matters
          </p>
        </div>

        {canCreateCase && (
          <button
            id="create-new-case-btn"
            onClick={onOpenNewCase}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-1.5 shadow-sm shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Case</span>
          </button>
        )}
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by case name, docket number, client, or opposing party..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Dispute Types</option>
            <option value="Breach of Contract">Breach of Contract</option>
            <option value="Supply Agreement Dispute">Supply Agreement</option>
            <option value="Partnership Dispute">Partnership Dispute</option>
            <option value="Payment Dispute">Payment Dispute</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Researching">Researching</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCases.map((c) => {
          const isCurrentActive = c.id === activeCase.id;
          return (
            <div
              key={c.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition hover:shadow-md ${
                isCurrentActive
                  ? 'border-blue-500 ring-1 ring-blue-500/30 dark:border-blue-500'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {c.caseId}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      c.caseStatus === 'Active'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    {c.caseStatus}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                  {c.caseName}
                </h3>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                  {c.caseNumber}
                </p>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Client: <strong className="text-slate-800 dark:text-slate-200">{c.clientOrganization}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Opposing: <strong className="text-slate-800 dark:text-slate-200">{c.opposingParty}</strong></span>
                  </div>
                  {c.claimAmount && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate font-semibold text-emerald-700 dark:text-emerald-300">Claim: {c.claimAmount}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  {c.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span>{c.documentCount} docs</span>
                  <span>•</span>
                  <span>{c.indexedChunkCount} chunks</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectCase(c)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                      isCurrentActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {isCurrentActive ? 'Active Workspace' : 'Select Case'}
                  </button>
                  <button
                    onClick={() => {
                      onSelectCase(c);
                      onNavigate('research');
                    }}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition"
                    title="Launch research query"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
