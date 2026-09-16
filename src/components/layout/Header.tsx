import React, { useState } from 'react';
import {
  Search,
  Briefcase,
  Bell,
  ChevronDown,
  UserCheck,
  Shield,
  Sparkles,
  Database
} from 'lucide-react';
import { LegalCase, User, UserRole } from '../../types';
import { CURRENT_USERS } from '../../data/mockData';

interface HeaderProps {
  activeCase: LegalCase;
  allCases: LegalCase[];
  onSelectCase: (c: LegalCase) => void;
  currentUser: User;
  onSwitchUser: (u: User) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNewCase: () => void;
  onOpenUpload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCase,
  allCases,
  onSelectCase,
  currentUser,
  onSwitchUser,
  searchQuery,
  onSearchChange,
  onOpenNewCase,
  onOpenUpload
}) => {
  const [showCaseMenu, setShowCaseMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header id="main-header" className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Active Case Selector & Quick Actions */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative">
            <button
              id="case-selector-btn"
              onClick={() => setShowCaseMenu(!showCaseMenu)}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-lg text-left transition border border-slate-200 dark:border-slate-700"
              title="Click to switch active commercial dispute case"
            >
              <div className="w-6 h-6 rounded bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 max-w-[220px] sm:max-w-[320px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Current Case:</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-mono rounded">
                    {activeCase.caseId}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                  {activeCase.caseName}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            </button>

            {showCaseMenu && (
              <div
                id="case-dropdown-menu"
                className="absolute left-0 mt-1.5 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Select Active Case</span>
                  <button
                    onClick={() => {
                      setShowCaseMenu(false);
                      onOpenNewCase();
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + New Case
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto py-1">
                  {allCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCase(c);
                        setShowCaseMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition flex items-start gap-2.5 ${
                        c.id === activeCase.id ? 'bg-blue-50/60 dark:bg-blue-950/30' : ''
                      }`}
                    >
                      <Briefcase className={`w-4 h-4 mt-0.5 shrink-0 ${c.id === activeCase.id ? 'text-blue-600' : 'text-slate-400'}`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{c.caseName}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                            {c.caseStatus}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {c.disputeType} • {c.courtTribunal}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-2">
                          <span>{c.documentCount} docs</span>
                          <span>•</span>
                          <span>{c.indexedChunkCount} indexed chunks</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search clauses, citations, documents, and cases..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right: RBAC Role Switcher & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Upload Button */}
          <button
            id="header-upload-btn"
            onClick={onOpenUpload}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              id="role-switcher-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs transition border border-slate-200 dark:border-slate-700"
              title="Switch user role to test RBAC authorization"
            >
              <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <div className="text-left hidden lg:block">
                <span className="text-[10px] text-slate-500 block leading-none">Role</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs leading-tight">
                  {currentUser.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div
                id="user-role-menu"
                className="absolute right-0 mt-1.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50"
              >
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Switch User Role (RBAC Demo)</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">Test Admin, Lawyer, Researcher, or Viewer capabilities</p>
                </div>
                {CURRENT_USERS.map((usr) => (
                  <button
                    key={usr.id}
                    onClick={() => {
                      onSwitchUser(usr);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between ${
                      usr.id === currentUser.id ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-semibold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-slate-800 dark:text-slate-200">{usr.name}</div>
                      <div className="text-[11px] text-slate-500">{usr.role} • {usr.organization.split(' ')[0]}</div>
                    </div>
                    {usr.id === currentUser.id && <UserCheck className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications button */}
          <div className="relative">
            <button
              id="notifications-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition relative"
              title="System Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
            </button>

            {showNotifications && (
              <div
                id="notifications-popover"
                className="absolute right-0 mt-1.5 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 text-xs"
              >
                <div className="px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Audit & System Alerts</span>
                  <span className="text-[10px] text-blue-600 font-normal">Mark all read</span>
                </div>
                <div className="py-1">
                  <div className="px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <p className="font-medium text-slate-800 dark:text-slate-200">Indexed Document Batch</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">84 chunks generated and indexed in Vector Store for Master_Supply_Agreement_2023.pdf</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">15 mins ago</span>
                  </div>
                  <div className="px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                    <p className="font-medium text-slate-800 dark:text-slate-200">Lawyer Review Completed</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Eleanor Vance verified citation links for Buyer Cover Rights research.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="w-7 h-7 rounded-full bg-slate-800 text-white dark:bg-blue-600 text-xs font-semibold flex items-center justify-center">
              {currentUser.avatar || currentUser.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="hidden xl:block text-left">
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block truncate max-w-[130px] leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-500 block leading-tight">
                {currentUser.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
