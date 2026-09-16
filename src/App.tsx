import React, { useState } from 'react';
import {
  ActiveNavTab,
  LegalCase,
  LegalDocument,
  ResearchAnswer,
  SavedResearchItem,
  User
} from './types';
import {
  CURRENT_USERS,
  MOCK_CASES,
  MOCK_DOCUMENTS,
  MOCK_RESEARCH_HISTORY,
  MOCK_SAVED_RESEARCH
} from './data/mockData';
import { LegalDisclaimerBanner } from './components/common/LegalDisclaimerBanner';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { CasesView } from './pages/CasesView';
import { DocumentsView } from './pages/DocumentsView';
import { ResearchAssistantView } from './pages/ResearchAssistantView';
import { LegalIssuesView } from './pages/LegalIssuesView';
import { ClauseAnalyzerView } from './pages/ClauseAnalyzerView';
import { CompareView } from './pages/CompareView';
import { SavedResearchView } from './pages/SavedResearchView';
import { HistoryView } from './pages/HistoryView';
import { AuditLogsView } from './pages/AuditLogsView';
import { SettingsView } from './pages/SettingsView';
import { CreateCaseModal } from './components/common/CreateCaseModal';
import { UploadDocumentModal } from './components/common/UploadDocumentModal';
import { DocumentViewerModal } from './components/common/DocumentViewerModal';

export default function App() {
  // Navigation & Workspace State
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('dashboard');
  const [activeCase, setActiveCase] = useState<LegalCase>(MOCK_CASES[0]);
  const [cases, setCases] = useState<LegalCase[]>(MOCK_CASES);
  const [documents, setDocuments] = useState<LegalDocument[]>(MOCK_DOCUMENTS);
  const [researchHistory, setResearchHistory] = useState<ResearchAnswer[]>(MOCK_RESEARCH_HISTORY);
  const [savedResearch, setSavedResearch] = useState<SavedResearchItem[]>(MOCK_SAVED_RESEARCH);
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USERS[0]); // Eleanor Vance (Lawyer)
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [showCreateCaseModal, setShowCreateCaseModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<LegalDocument | null>(null);
  const [viewingDocPage, setViewingDocPage] = useState<number>(1);
  const [viewingDocHighlight, setViewingDocHighlight] = useState<string>('');

  // Handlers
  const handleOpenDocument = (doc: LegalDocument, page?: number, passage?: string) => {
    setViewingDoc(doc);
    setViewingDocPage(page || 1);
    setViewingDocHighlight(passage || '');
  };

  const handleCreateCase = (newCase: LegalCase) => {
    setCases([newCase, ...cases]);
    setActiveCase(newCase);
    setActiveTab('cases');
  };

  const handleUploadComplete = (newDoc: LegalDocument) => {
    setDocuments([newDoc, ...documents]);
    // update target case doc count
    setCases(
      cases.map((c) =>
        c.id === newDoc.caseId
          ? {
              ...c,
              documentCount: c.documentCount + 1,
              indexedChunkCount: c.indexedChunkCount + newDoc.chunkCount
            }
          : c
      )
    );
    if (activeCase.id === newDoc.caseId) {
      setActiveCase((prev) => ({
        ...prev,
        documentCount: prev.documentCount + 1,
        indexedChunkCount: prev.indexedChunkCount + newDoc.chunkCount
      }));
    }
  };

  const handleSaveResearch = (ans: ResearchAnswer, note?: string) => {
    const newItem: SavedResearchItem = {
      id: `saved-${Date.now()}`,
      title: `${ans.question.substring(0, 48)}...`,
      caseId: ans.caseId,
      caseName: ans.caseName,
      question: ans.question,
      answerSummary: ans.shortAnswer,
      citations: ans.supportingSources,
      notes: note || 'Saved from interactive RAG research assistant.',
      createdBy: currentUser.name,
      createdAt: new Date().toISOString().split('T')[0],
      tags: ['Commercial Dispute', 'RAG Retrieval', 'Contract Analysis'],
      status: currentUser.role === 'Lawyer' ? 'Verified' : 'Pending Review'
    };
    setSavedResearch([newItem, ...savedResearch]);
    alert('Research answer saved to "Saved Research" portfolio!');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100 antialiased font-sans">
      {/* 1. Mandatory Legal Disclaimer Banner */}
      <LegalDisclaimerBanner variant="banner" />

      {/* 2. Main App Frame (Sidebar + Main Content Canvas) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          activeCase={activeCase}
          currentUser={currentUser}
        />

        {/* Content Shell */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar Header */}
          <Header
            activeCase={activeCase}
            allCases={cases}
            onSelectCase={setActiveCase}
            currentUser={currentUser}
            onSwitchUser={setCurrentUser}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenNewCase={() => setShowCreateCaseModal(true)}
            onOpenUpload={() => setShowUploadModal(true)}
          />

          {/* Router View Switcher */}
          <main className="flex-1 overflow-y-auto">
            {activeTab === 'dashboard' && (
              <Dashboard
                cases={cases}
                documents={documents}
                researchHistory={researchHistory}
                activeCase={activeCase}
                onSelectCase={setActiveCase}
                onNavigate={setActiveTab}
                onOpenNewCase={() => setShowCreateCaseModal(true)}
                onOpenUpload={() => setShowUploadModal(true)}
                onOpenDocument={handleOpenDocument}
                currentUser={currentUser}
              />
            )}

            {activeTab === 'cases' && (
              <CasesView
                cases={cases}
                activeCase={activeCase}
                onSelectCase={setActiveCase}
                onNavigate={setActiveTab}
                onOpenNewCase={() => setShowCreateCaseModal(true)}
                currentUser={currentUser}
              />
            )}

            {activeTab === 'documents' && (
              <DocumentsView
                documents={documents}
                activeCase={activeCase}
                onOpenDocument={handleOpenDocument}
                onOpenUpload={() => setShowUploadModal(true)}
                onNavigate={setActiveTab}
                userRole={currentUser.role}
              />
            )}

            {activeTab === 'research' && (
              <ResearchAssistantView
                activeCase={activeCase}
                allCases={cases}
                onSelectCase={setActiveCase}
                documents={documents}
                researchHistory={researchHistory}
                onSaveResearch={handleSaveResearch}
                onOpenDocument={handleOpenDocument}
                currentUser={currentUser}
              />
            )}

            {activeTab === 'legal-issues' && (
              <LegalIssuesView
                activeCase={activeCase}
                documents={documents}
                onOpenDocument={handleOpenDocument}
              />
            )}

            {activeTab === 'clause-analyzer' && (
              <ClauseAnalyzerView
                activeCase={activeCase}
                documents={documents}
                onOpenDocument={handleOpenDocument}
              />
            )}

            {activeTab === 'compare' && (
              <CompareView
                activeCase={activeCase}
                documents={documents}
                onOpenDocument={handleOpenDocument}
              />
            )}

            {activeTab === 'saved-research' && (
              <SavedResearchView
                savedItems={savedResearch}
                onOpenDocument={handleOpenDocument}
                documents={documents}
                userRole={currentUser.role}
                onDeleteItem={(id) => setSavedResearch(savedResearch.filter((i) => i.id !== id))}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                history={researchHistory}
                onOpenDocument={handleOpenDocument}
                documents={documents}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'audit-logs' && (
              <AuditLogsView currentUser={currentUser} />
            )}

            {activeTab === 'settings' && (
              <SettingsView currentUser={currentUser} />
            )}
          </main>
        </div>
      </div>

      {/* 3. Global Modals */}
      {showCreateCaseModal && (
        <CreateCaseModal
          onClose={() => setShowCreateCaseModal(false)}
          onCreateCase={handleCreateCase}
        />
      )}

      {showUploadModal && (
        <UploadDocumentModal
          activeCase={activeCase}
          allCases={cases}
          onClose={() => setShowUploadModal(false)}
          onUploadComplete={handleUploadComplete}
        />
      )}

      {viewingDoc && (
        <DocumentViewerModal
          document={viewingDoc}
          initialPage={viewingDocPage}
          highlightPassage={viewingDocHighlight}
          onClose={() => setViewingDoc(null)}
          userRole={currentUser.role}
        />
      )}
    </div>
  );
}
