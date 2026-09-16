import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Sparkles,
  Scale,
  FileCheck2,
  GitCompare,
  Bookmark,
  Clock,
  ShieldCheck,
  Settings,
  Database,
  Cpu,
  Layers
} from 'lucide-react';
import { ActiveNavTab, LegalCase, User } from '../../types';

interface SidebarProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  activeCase: LegalCase;
  currentUser: User;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  activeCase,
  currentUser
}) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveNavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'cases' as ActiveNavTab,
      label: 'Cases',
      icon: Briefcase,
      badge: '3'
    },
    {
      id: 'documents' as ActiveNavTab,
      label: 'Documents',
      icon: FileText,
      badge: '6'
    },
    {
      id: 'research' as ActiveNavTab,
      label: 'Research Assistant',
      icon: Sparkles,
      badge: 'RAG',
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
    },
    {
      id: 'legal-issues' as ActiveNavTab,
      label: 'Legal Issues',
      icon: Scale,
      badge: '4'
    },
    {
      id: 'clause-analyzer' as ActiveNavTab,
      label: 'Clause Analyzer',
      icon: FileCheck2,
      badge: null
    },
    {
      id: 'compare' as ActiveNavTab,
      label: 'Compare Documents',
      icon: GitCompare,
      badge: null
    },
    {
      id: 'saved-research' as ActiveNavTab,
      label: 'Saved Research',
      icon: Bookmark,
      badge: '2'
    },
    {
      id: 'history' as ActiveNavTab,
      label: 'Research History',
      icon: Clock,
      badge: null
    },
    {
      id: 'audit-logs' as ActiveNavTab,
      label: 'Audit Trail & Logs',
      icon: ShieldCheck,
      badge: currentUser.role === 'Admin' ? 'Admin' : null,
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
    },
    {
      id: 'settings' as ActiveNavTab,
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside id="main-sidebar" className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none min-h-screen">
      {/* Brand & Logo */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white text-base tracking-tight">LexResearch</span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-1 py-0.2 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">AI</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide">Legal Commercial Dispute Intelligence</p>
        </div>
      </div>

      {/* Active Case Context Pill */}
      <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider flex items-center justify-between">
          <span>Active Dispute Context</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
        <div className="mt-1.5 p-2 bg-slate-800/80 rounded-lg border border-slate-700/60">
          <div className="flex items-center justify-between text-[11px] font-mono text-blue-400">
            <span>{activeCase.caseId}</span>
            <span className="text-[10px] px-1 bg-slate-700 text-slate-300 rounded">{activeCase.caseStatus}</span>
          </div>
          <p className="text-xs font-medium text-white truncate mt-0.5" title={activeCase.caseName}>
            {activeCase.caseName}
          </p>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
            <span>{activeCase.documentCount} documents</span>
            <span>{activeCase.indexedChunkCount} vector chunks</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav id="sidebar-navigation" className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
          Workspace Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-semibold ${
                    item.badgeColor || (isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300')
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* RAG Infrastructure Telemetry & Status */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50 text-[11px] space-y-1.5">
        <div className="flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vector Store</span>
          </div>
          <span className="font-mono text-emerald-400 text-[10px]">Atlas Vector</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Inference Engine</span>
          </div>
          <span className="font-mono text-blue-300 text-[10px]">Gemini 2.5 Flash</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Embedding Model</span>
          </div>
          <span className="font-mono text-purple-300 text-[10px]">text-embedding-004</span>
        </div>
      </div>
    </aside>
  );
};
