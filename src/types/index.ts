export type UserRole = 'Admin' | 'Legal Researcher' | 'Lawyer' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatar?: string;
}

export type DisputeType =
  | 'Breach of Contract'
  | 'Payment Dispute'
  | 'Partnership Dispute'
  | 'Shareholder Dispute'
  | 'Intellectual Property Dispute'
  | 'Employment Contract Dispute'
  | 'Supply Agreement Dispute'
  | 'Construction Dispute'
  | 'Insurance Dispute'
  | 'Other';

export type CaseStatus =
  | 'Researching'
  | 'Active'
  | 'Under Review'
  | 'Resolved'
  | 'Archived';

export interface LegalCase {
  id: string;
  caseId: string; // e.g. COM-2025-88412
  caseName: string;
  caseNumber: string;
  clientOrganization: string;
  opposingParty: string;
  disputeType: DisputeType;
  jurisdiction: string;
  courtTribunal: string;
  caseStatus: CaseStatus;
  description: string;
  claimAmount?: string;
  leadCounsel?: string;
  documentCount: number;
  indexedChunkCount: number;
  createdDate: string;
  updatedDate: string;
}

export type DocumentProcessingStatus = 'UPLOADED' | 'PROCESSING' | 'INDEXED' | 'FAILED';

export interface LegalDocument {
  id: string;
  documentId: string;
  caseId: string;
  caseName: string;
  fileName: string;
  documentType: 'PDF' | 'DOCX' | 'TXT';
  category: 'Contract' | 'Amendment' | 'Notice' | 'Correspondence' | 'Court Order' | 'Arbitration Brief' | 'Evidence';
  fileSize: string;
  uploadedBy: string;
  uploadDate: string;
  processingStatus: DocumentProcessingStatus;
  pageCount: number;
  chunkCount: number;
  indexedStatus: boolean;
  contentSnippet?: string;
  fullText?: string;
  rawUrl?: string;
}

export interface DocumentChunk {
  chunkId: string;
  documentId: string;
  caseId: string;
  fileName: string;
  pageNumber: number;
  section: string;
  chunkIndex: number;
  text: string;
  relevanceScore?: number;
}

export interface Citation {
  id: string;
  documentId: string;
  fileName: string;
  page: number;
  section: string;
  passage: string;
  relevanceScore: number;
}

export type ResearchMode =
  | 'Case Document Search'
  | 'Contract Analysis'
  | 'Legal Issue Identification'
  | 'Clause Analysis'
  | 'Document Summary'
  | 'Document Comparison';

export interface ResearchAnswer {
  id: string;
  sessionId: string;
  caseId: string;
  caseName: string;
  question: string;
  shortAnswer: string;
  relevantProvisions: string[];
  analysis: string;
  supportingSources: Citation[];
  uncertaintyLimitations: string;
  confidence: 'High' | 'Medium' | 'Low';
  disclaimer: string;
  timestamp: string;
  isSaved?: boolean;
  reviewedByLawyer?: boolean;
  lawyerNotes?: string;
}

export interface SavedResearchItem {
  id: string;
  title: string;
  caseId: string;
  caseName: string;
  question: string;
  answerSummary: string;
  citations: Citation[];
  notes: string;
  createdBy: string;
  createdAt: string;
  tags: string[];
  status: 'Verified' | 'Pending Review' | 'Draft';
}

export interface LegalIssue {
  id: string;
  caseId: string;
  issue: string;
  category: string;
  relevantDocument: string;
  page: number;
  section: string;
  supportingPassage: string;
  confidence: 'High' | 'Medium' | 'Low';
  whyRelevant: string;
  suggestedAction: string;
}

export interface ClauseAnalysisResult {
  id: string;
  clauseTitle: string;
  sourceDoc: string;
  page: number;
  rawText: string;
  plainSummary: string;
  partiesAffected: string[];
  mainObligation: string;
  conditions: string[];
  exceptions: string[];
  potentialRisks: string[];
  relatedClauses: string[];
  citation: Citation;
}

export interface DocumentComparisonResult {
  doc1Name: string;
  doc2Name: string;
  addedClauses: { section: string; title: string; text: string; impact: string }[];
  removedClauses: { section: string; title: string; text: string; impact: string }[];
  modifiedClauses: { section: string; title: string; before: string; after: string; variance: string }[];
  keyDifferencesSummary: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: 'Login' | 'Logout' | 'Case Creation' | 'Document Upload' | 'Document Deletion' | 'Vector Search Query' | 'Document Access' | 'Saved Research' | 'User Permission Change';
  resourceType: 'Case' | 'Document' | 'Research' | 'User' | 'System';
  resourceId: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export type ActiveNavTab =
  | 'dashboard'
  | 'cases'
  | 'documents'
  | 'research'
  | 'legal-issues'
  | 'clause-analyzer'
  | 'compare'
  | 'saved-research'
  | 'history'
  | 'audit-logs'
  | 'settings';
