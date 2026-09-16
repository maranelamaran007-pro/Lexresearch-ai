import {
  LegalCase,
  LegalDocument,
  DocumentChunk,
  ResearchAnswer,
  SavedResearchItem,
  LegalIssue,
  ClauseAnalysisResult,
  DocumentComparisonResult,
  AuditLogEntry,
  User
} from '../types';

export const CURRENT_USERS: User[] = [
  {
    id: 'usr-001',
    name: 'Eleanor Vance, Esq.',
    email: 'e.vance@lexresearch.legal',
    role: 'Lawyer',
    organization: 'Vance & Sterling Commercial Litigators',
    avatar: 'EV'
  },
  {
    id: 'usr-002',
    name: 'David Chen',
    email: 'd.chen@lexresearch.legal',
    role: 'Legal Researcher',
    organization: 'Vance & Sterling Commercial Litigators',
    avatar: 'DC'
  },
  {
    id: 'usr-003',
    name: 'Marcus Sterling',
    email: 'm.sterling@lexresearch.legal',
    role: 'Admin',
    organization: 'Vance & Sterling Commercial Litigators',
    avatar: 'MS'
  },
  {
    id: 'usr-004',
    name: 'Sophia Patel',
    email: 's.patel@client-counsel.com',
    role: 'Viewer',
    organization: 'ABC Corp In-House Counsel',
    avatar: 'SP'
  }
];

export const MOCK_CASES: LegalCase[] = [
  {
    id: 'case-001',
    caseId: 'COM-2025-88412',
    caseName: 'ABC Manufacturing vs XYZ Supplies Ltd',
    caseNumber: 'Index No. 652891/2025',
    clientOrganization: 'ABC Precision Manufacturing Corp',
    opposingParty: 'XYZ Industrial Supplies Ltd',
    disputeType: 'Supply Agreement Dispute',
    jurisdiction: 'New York (State)',
    courtTribunal: 'Supreme Court of the State of New York, Commercial Division',
    caseStatus: 'Active',
    description: 'Dispute arising from alleged chronic shipment defaults, unilateral price escalations, and unfulfilled component warranties under the Master Industrial Component Supply Agreement of March 2023.',
    claimAmount: '$4,850,000 USD',
    leadCounsel: 'Eleanor Vance, Esq.',
    documentCount: 6,
    indexedChunkCount: 148,
    createdDate: '2025-01-14',
    updatedDate: '2025-02-28'
  },
  {
    id: 'case-002',
    caseId: 'DEL-CH-2024-3392',
    caseName: 'Apex Cloud Infrastructure vs Horizon Financial Tech',
    caseNumber: 'C.A. No. 2024-0812-JTL',
    clientOrganization: 'Apex Enterprise Cloud Services Inc',
    opposingParty: 'Horizon Global Financial Technologies Ltd',
    disputeType: 'Breach of Contract',
    jurisdiction: 'Delaware',
    courtTribunal: 'Court of Chancery of the State of Delaware',
    caseStatus: 'Researching',
    description: 'Litigation concerning premature contract termination, multi-region high availability Service Level Agreement (SLA) penalty withholding, and disputed transition fees amounting to $12.4M.',
    claimAmount: '$12,400,000 USD',
    leadCounsel: 'Gregory Thorne, Esq.',
    documentCount: 4,
    indexedChunkCount: 92,
    createdDate: '2024-11-04',
    updatedDate: '2025-02-20'
  },
  {
    id: 'case-003',
    caseId: 'ARB-2025-1109',
    caseName: 'Meridian BioTech vs Vantage Pharma Ventures',
    caseNumber: 'ICC Case No. 28941/MHM',
    clientOrganization: 'Meridian Therapeutics & Diagnostics SA',
    opposingParty: 'Vantage Global Pharma Holdings Corp',
    disputeType: 'Partnership Dispute',
    jurisdiction: 'International / Switzerland',
    courtTribunal: 'ICC International Court of Arbitration (Geneva Seat)',
    caseStatus: 'Under Review',
    description: 'Cross-border arbitration concerning co-development milestone payments, patent maintenance fee allocations, and exclusive territorial commercialization rights in the EU and APAC.',
    claimAmount: '$28,000,000 USD',
    leadCounsel: 'Eleanor Vance, Esq.',
    documentCount: 5,
    indexedChunkCount: 174,
    createdDate: '2025-02-02',
    updatedDate: '2025-03-01'
  }
];

export const MOCK_DOCUMENTS: LegalDocument[] = [
  {
    id: 'doc-001',
    documentId: 'DOC-ABC-01',
    caseId: 'case-001',
    caseName: 'ABC Manufacturing vs XYZ Supplies Ltd',
    fileName: 'Master_Supply_Agreement_2023.pdf',
    documentType: 'PDF',
    category: 'Contract',
    fileSize: '4.2 MB',
    uploadedBy: 'David Chen',
    uploadDate: '2025-01-15',
    processingStatus: 'INDEXED',
    pageCount: 38,
    chunkCount: 84,
    indexedStatus: true,
    contentSnippet: 'This Master Component Supply Agreement ("Agreement") is made effective as of March 15, 2023, by and between ABC Precision Manufacturing Corp and XYZ Industrial Supplies Ltd.',
    fullText: `MASTER COMPONENT SUPPLY AGREEMENT
Dated March 15, 2023
Between ABC Precision Manufacturing Corp ("Buyer") and XYZ Industrial Supplies Ltd ("Supplier")

SECTION 1. DEFINITIONS AND INTERPRETATION
1.1 "Delivery Schedule" means the binding monthly delivery dates specified in Schedule B.
1.2 "Material Default" includes failure to deliver conforming products within five (5) business days of the required Delivery Date.

SECTION 4. DELIVERY, TITLE, AND DELAY
4.1 On-Time Delivery Guarantee. Time is of the essence with respect to Supplier's delivery obligations. In the event of any anticipated delay, Supplier shall notify Buyer in writing within twenty-four (24) hours.
4.2 Delay Liquidated Damages. For each calendar day of unexcused delay beyond the scheduled Delivery Date, Supplier shall credit Buyer 0.75% of the aggregate value of the delayed shipment, capped at a maximum of fifteen percent (15%) of the relevant purchase order value.

SECTION 8. PRICING AND PAYMENT TERMS
8.1 Fixed Unit Price. Unit pricing set forth in Schedule A shall remain fixed for twenty-four (24) months from the Effective Date. Neither raw material index adjustments nor currency fluctuations shall permit unilateral price renegotiation without Buyer's prior written consent.
8.2 Payment Schedule. Buyer shall remit payment Net 45 days following receipt and quality acceptance of each conforming shipment.

SECTION 12. DEFAULT, TERMINATION, AND REMEDIES
12.1 Termination for Cause. Either party may terminate this Agreement immediately upon written notice if:
(a) The other party commits a Material Breach and fails to cure such breach within thirty (30) calendar days after receiving written notice specifying the breach;
(b) The other party becomes insolvent or enters into receivership or liquidation proceedings.
12.2 Buyer's Cumulative Remedies. In the event Supplier fails to deliver conforming Goods within ten (10) days of the cure notice, Buyer shall have the right to:
(i) Procure substitute replacement components from alternative third-party vendors ("Cover") and recover all commercially reasonable cover damages and excess costs from Supplier;
(ii) Withhold further payments under any pending purchase orders until damages are satisfied;
(iii) Demand immediate reimbursement for assembly line shutdown damages incurred by Buyer directly attributable to Supplier's breach.
12.3 Limitation of Liability Exception. The liability cap in Section 14 shall expressly not apply to claims arising under Section 12.2 (Cover and Direct Shutdown Costs) or gross negligence.

SECTION 15. GOVERNING LAW AND DISPUTE RESOLUTION
15.1 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of New York, without regard to conflicts of law principles.
15.2 Exclusive Forum. The Commercial Division of the Supreme Court of the State of New York located in New York County shall have exclusive jurisdiction over any proceeding arising out of or related to this Agreement.`
  },
  {
    id: 'doc-002',
    documentId: 'DOC-ABC-02',
    caseId: 'case-001',
    caseName: 'ABC Manufacturing vs XYZ Supplies Ltd',
    fileName: 'Amendment_No_1_Price_and_Volume.pdf',
    documentType: 'PDF',
    category: 'Amendment',
    fileSize: '1.1 MB',
    uploadedBy: 'David Chen',
    uploadDate: '2025-01-16',
    processingStatus: 'INDEXED',
    pageCount: 6,
    chunkCount: 18,
    indexedStatus: true,
    contentSnippet: 'Amendment No. 1 to Master Component Supply Agreement modifying Schedule A Volume thresholds and emergency delivery protocols, dated November 10, 2023.',
    fullText: `AMENDMENT NO. 1 TO MASTER COMPONENT SUPPLY AGREEMENT
Dated November 10, 2023
Parties: ABC Precision Manufacturing Corp and XYZ Industrial Supplies Ltd

RECITALS
WHEREAS, Buyer and Supplier entered into the Master Component Supply Agreement dated March 15, 2023 (the "Agreement");
WHEREAS, Buyer requested an increased delivery volume of Grade-A hydraulic actuator assemblies;

NOW THEREFORE, the parties agree as follows:
1. Schedule A Revision. The monthly minimum supply quota for Part #HYD-990 is increased from 10,000 units to 18,000 units commencing January 1, 2024.
2. Revised Notice Period for Cure. Section 12.1(a) of the Agreement is hereby amended solely with respect to Grade-A hydraulic components: The cure period for repeated delivery defaults exceeding two (2) occurrences in any rolling ninety-day quarter is reduced from thirty (30) days to fifteen (15) calendar days.
3. Ratification. In all other respects, the terms and conditions of the Master Agreement remain in full force and effect.`
  },
  {
    id: 'doc-003',
    documentId: 'DOC-ABC-03',
    caseId: 'case-001',
    caseName: 'ABC Manufacturing vs XYZ Supplies Ltd',
    fileName: 'Notice_of_Material_Default_and_Cover.pdf',
    documentType: 'PDF',
    category: 'Notice',
    fileSize: '820 KB',
    uploadedBy: 'Eleanor Vance, Esq.',
    uploadDate: '2025-01-20',
    processingStatus: 'INDEXED',
    pageCount: 4,
    chunkCount: 14,
    indexedStatus: true,
    contentSnippet: 'Formal Notice of Material Breach, Demand for Immediate Cure, and Reservation of Right to Procure Substitute Cover under Section 12.2, sent December 18, 2024.',
    fullText: `VIA CERTIFIED MAIL AND SECURE ELECTRONIC DELIVERY
December 18, 2024

To: Board of Directors & General Counsel
XYZ Industrial Supplies Ltd
100 Industrial Parkway, Buffalo, NY

Re: FORMAL NOTICE OF MATERIAL BREACH, DEMAND FOR IMMEDIATE CURE, AND RESERVATION OF RIGHTS (MASTER COMPONENT SUPPLY AGREEMENT)

Dear Counsel,
We represent ABC Precision Manufacturing Corp ("ABC"). Please direct all future correspondence regarding this matter to our office.
As of the date of this letter, XYZ Industrial Supplies Ltd ("XYZ") has failed to deliver Batch #OCT-2024 (18,000 units) and Batch #NOV-2024 (18,000 units) of hydraulic actuators, representing 64 consecutive days of unexcused default.

Pursuant to Section 12.1(a) as amended by Amendment No. 1, XYZ has fifteen (15) calendar days from receipt of this notice to cure the delivery default by delivering 36,000 certified conforming units to ABC's Rochester facility.
Failure to effectuate full cure on or before January 2, 2025, will result in immediate termination of the Agreement for cause and invocation of Buyer's Cover remedies under Section 12.2, including holding XYZ liable for the approximately $2,420,000 cover price differential incurred from alternative supplier Delta Precision.`
  },
  {
    id: 'doc-004',
    documentId: 'DOC-ABC-04',
    caseId: 'case-001',
    caseName: 'ABC Manufacturing vs XYZ Supplies Ltd',
    fileName: 'Delta_Precision_Cover_Purchase_Orders.pdf',
    documentType: 'PDF',
    category: 'Evidence',
    fileSize: '3.4 MB',
    uploadedBy: 'David Chen',
    uploadDate: '2025-01-28',
    processingStatus: 'INDEXED',
    pageCount: 12,
    chunkCount: 32,
    indexedStatus: true,
    contentSnippet: 'Executed Emergency Purchase Orders and Invoices from Delta Precision Components for expedited delivery of substitute actuators to mitigate plant stoppage.',
    fullText: `DELTA PRECISION COMPONENTS LLC - EMERGENCY PURCHASE CONTRACT & COVER INVOICES
Purchaser: ABC Precision Manufacturing Corp
Invoice Date: January 8, 2025
Item: Hydraulic Actuator Assemblies (Equivalent to Part #HYD-990)
Total Expedited Unit Price: $148.50 per unit (Contracted XYZ Price: $81.20 per unit)
Total Cover Expenditure: $5,346,000.00
Net Cover Differential Surcharges Claimed: $2,422,800.00`
  },
  {
    id: 'doc-005',
    documentId: 'DOC-APX-01',
    caseId: 'case-002',
    caseName: 'Apex Cloud Infrastructure vs Horizon Financial Tech',
    fileName: 'Master_Cloud_Services_SLA_Agreement.pdf',
    documentType: 'PDF',
    category: 'Contract',
    fileSize: '6.1 MB',
    uploadedBy: 'David Chen',
    uploadDate: '2024-11-10',
    processingStatus: 'INDEXED',
    pageCount: 52,
    chunkCount: 92,
    indexedStatus: true,
    contentSnippet: 'Enterprise Cloud Infrastructure Hosting & 99.999% High-Availability Financial Tier SLA Agreement with Delaware choice of forum.',
    fullText: `APEX ENTERPRISE CLOUD MASTER SERVICES AGREEMENT & SLA
Jurisdiction: State of Delaware
Section 9. Availability SLA. Apex guarantees monthly multi-region uptime of not less than 99.99%. Service credits constitute Customer's sole and exclusive financial remedy for SLA failures, unless caused by gross negligence.`
  },
  {
    id: 'doc-006',
    documentId: 'DOC-ABC-05',
    caseId: 'case-001',
    caseName: 'ABC Manufacturing vs XYZ Supplies Ltd',
    fileName: 'Expert_Quality_Inspection_Report.docx',
    documentType: 'DOCX',
    category: 'Evidence',
    fileSize: '2.8 MB',
    uploadedBy: 'David Chen',
    uploadDate: '2025-02-14',
    processingStatus: 'PROCESSING',
    pageCount: 22,
    chunkCount: 0,
    indexedStatus: false,
    contentSnippet: 'Independent metallurgical inspection analysis showing seal micro-fractures in XYZ hydraulic actuators delivered in August 2024.'
  }
];

export const MOCK_CHUNKS: DocumentChunk[] = [
  {
    chunkId: 'chk-001-1',
    documentId: 'doc-001',
    caseId: 'case-001',
    fileName: 'Master_Supply_Agreement_2023.pdf',
    pageNumber: 12,
    section: 'Section 4.2 - Delay Liquidated Damages',
    chunkIndex: 12,
    text: 'For each calendar day of unexcused delay beyond the scheduled Delivery Date, Supplier shall credit Buyer 0.75% of the aggregate value of the delayed shipment, capped at a maximum of fifteen percent (15%) of the relevant purchase order value.'
  },
  {
    chunkId: 'chk-001-2',
    documentId: 'doc-001',
    caseId: 'case-001',
    fileName: 'Master_Supply_Agreement_2023.pdf',
    pageNumber: 18,
    section: 'Section 12.1 - Termination for Cause',
    chunkIndex: 28,
    text: 'Either party may terminate this Agreement immediately upon written notice if the other party commits a Material Breach and fails to cure such breach within thirty (30) calendar days after receiving written notice specifying the breach.'
  },
  {
    chunkId: 'chk-001-3',
    documentId: 'doc-001',
    caseId: 'case-001',
    fileName: 'Master_Supply_Agreement_2023.pdf',
    pageNumber: 19,
    section: "Section 12.2 - Buyer's Cumulative Remedies & Cover",
    chunkIndex: 29,
    text: "In the event Supplier fails to deliver conforming Goods within ten (10) days of the cure notice, Buyer shall have the right to: (i) Procure substitute replacement components from alternative third-party vendors ('Cover') and recover all commercially reasonable cover damages and excess costs from Supplier; (ii) Withhold further payments under any pending purchase orders until damages are satisfied; (iii) Demand immediate reimbursement for assembly line shutdown damages incurred by Buyer directly attributable to Supplier's breach."
  },
  {
    chunkId: 'chk-001-4',
    documentId: 'doc-001',
    caseId: 'case-001',
    fileName: 'Master_Supply_Agreement_2023.pdf',
    pageNumber: 20,
    section: 'Section 12.3 - Limitation of Liability Exclusion',
    chunkIndex: 30,
    text: 'The liability cap in Section 14 shall expressly not apply to claims arising under Section 12.2 (Cover and Direct Shutdown Costs) or gross negligence.'
  },
  {
    chunkId: 'chk-002-1',
    documentId: 'doc-002',
    caseId: 'case-001',
    fileName: 'Amendment_No_1_Price_and_Volume.pdf',
    pageNumber: 4,
    section: 'Section 2 - Revised Notice Period for Cure',
    chunkIndex: 4,
    text: 'Section 12.1(a) of the Agreement is hereby amended solely with respect to Grade-A hydraulic components: The cure period for repeated delivery defaults exceeding two (2) occurrences in any rolling ninety-day quarter is reduced from thirty (30) days to fifteen (15) calendar days.'
  },
  {
    chunkId: 'chk-003-1',
    documentId: 'doc-003',
    caseId: 'case-001',
    fileName: 'Notice_of_Material_Default_and_Cover.pdf',
    pageNumber: 2,
    section: 'Demand for Cure and Cover Warning',
    chunkIndex: 2,
    text: "Pursuant to Section 12.1(a) as amended by Amendment No. 1, XYZ has fifteen (15) calendar days from receipt of this notice to cure the delivery default by delivering 36,000 certified conforming units to ABC's Rochester facility. Failure to effectuate full cure on or before January 2, 2025, will result in immediate termination of the Agreement for cause and invocation of Buyer's Cover remedies under Section 12.2."
  }
];

export const MOCK_RESEARCH_HISTORY: ResearchAnswer[] = [
  {
    id: 'res-001',
    sessionId: 'ses-101',
    caseId: 'case-001',
    caseName: 'ABC Manufacturing vs XYZ Supplies Ltd',
    question: 'What contractual remedies are available to the buyer if the supplier fails to deliver conforming parts?',
    shortAnswer: 'Under Section 12.2 of the Master Agreement, the buyer has the contractual right to procure substitute replacement components from alternative suppliers ("Cover") and recover all commercially reasonable cover damages and excess costs from the supplier. Additionally, the buyer may withhold pending purchase order payments and claim direct assembly line shutdown damages.',
    relevantProvisions: [
      'Master Supply Agreement 2023, Section 12.1 (Termination for Cause)',
      'Master Supply Agreement 2023, Section 12.2 (Cumulative Remedies & Cover)',
      'Master Supply Agreement 2023, Section 12.3 (Limitation of Liability Carve-out)',
      'Amendment No. 1, Section 2 (Shortened 15-day cure period for repeat hydraulic defaults)'
    ],
    analysis: 'The contractual scheme grants ABC Precision Manufacturing aggressive cumulative remedies upon an uncured material default. Under Section 12.2(i), ABC is expressly authorized to obtain cover without forfeiting other damages. Significantly, Section 12.3 contains an explicit carve-out removing cover damages and assembly line shutdown costs from the general liability cap found in Section 14. Furthermore, Amendment No. 1 reduced the applicable cure window from 30 days to 15 calendar days for repeat delivery failures involving hydraulic assemblies.',
    supportingSources: [
      {
        id: 'cit-001',
        documentId: 'doc-001',
        fileName: 'Master_Supply_Agreement_2023.pdf',
        page: 19,
        section: 'Section 12.2 (Buyer Cumulative Remedies)',
        passage: 'In the event Supplier fails to deliver conforming Goods within ten (10) days of the cure notice, Buyer shall have the right to: (i) Procure substitute replacement components from alternative third-party vendors ("Cover") and recover all commercially reasonable cover damages and excess costs from Supplier; (ii) Withhold further payments under any pending purchase orders until damages are satisfied; (iii) Demand immediate reimbursement for assembly line shutdown damages...',
        relevanceScore: 0.96
      },
      {
        id: 'cit-002',
        documentId: 'doc-001',
        fileName: 'Master_Supply_Agreement_2023.pdf',
        page: 20,
        section: 'Section 12.3 (Limitation of Liability Exclusion)',
        passage: 'The liability cap in Section 14 shall expressly not apply to claims arising under Section 12.2 (Cover and Direct Shutdown Costs) or gross negligence.',
        relevanceScore: 0.91
      },
      {
        id: 'cit-003',
        documentId: 'doc-002',
        fileName: 'Amendment_No_1_Price_and_Volume.pdf',
        page: 4,
        section: 'Section 2 (Cure Period Modification)',
        passage: 'The cure period for repeated delivery defaults exceeding two (2) occurrences in any rolling ninety-day quarter is reduced from thirty (30) days to fifteen (15) calendar days.',
        relevanceScore: 0.88
      }
    ],
    uncertaintyLimitations: 'The Master Agreement does not define the procedural standard for proving that substitute cover was procured under "commercially reasonable" conditions under NY UCC § 2-712. Documentary verification of alternative bids will be necessary to substantiate the $148.50 per unit cover price paid to Delta Precision.',
    confidence: 'High',
    disclaimer: 'AI-generated legal research support only. This output is not legal advice and should be independently verified by a qualified legal professional.',
    timestamp: '2025-02-28T14:22:10Z',
    isSaved: true,
    reviewedByLawyer: true,
    lawyerNotes: 'Confirmed against NY UCC § 2-712 cover standards. Make sure to prepare comparative market quotes for Delta Precision invoices to defend against XYZ reasonableness challenge.'
  },
  {
    id: 'res-002',
    sessionId: 'ses-102',
    caseId: 'case-001',
    caseName: 'ABC Manufacturing vs XYZ Supplies Ltd',
    question: 'Can the supplier raise raw material inflation as an excuse to avoid fixed pricing obligations?',
    shortAnswer: 'No. Section 8.1 of the Master Agreement explicitly provides that unit pricing remains fixed for twenty-four (24) months from the Effective Date, and expressly stipulates that neither raw material index adjustments nor currency fluctuations permit unilateral price renegotiation without the buyer’s prior written consent.',
    relevantProvisions: [
      'Master Supply Agreement 2023, Section 8.1 (Fixed Unit Price)',
      'Master Supply Agreement 2023, Section 15.1 (NY Governing Law)'
    ],
    analysis: 'Under Section 8.1, the parties expressly allocated the risk of market and raw material price volatility to the Supplier. Under prevailing New York commercial law, price fluctuations or market increases do not constitute commercial impracticability or force majeure unless unforeseeable and catastrophic, and here the contract explicitly anticipated index fluctuations and foreclosed unilateral price modification.',
    supportingSources: [
      {
        id: 'cit-004',
        documentId: 'doc-001',
        fileName: 'Master_Supply_Agreement_2023.pdf',
        page: 15,
        section: 'Section 8.1 (Pricing and Payment Terms)',
        passage: 'Unit pricing set forth in Schedule A shall remain fixed for twenty-four (24) months from the Effective Date. Neither raw material index adjustments nor currency fluctuations shall permit unilateral price renegotiation without Buyer’s prior written consent.',
        relevanceScore: 0.95
      }
    ],
    uncertaintyLimitations: 'The available case documents do not contain any formal force majeure notice served by XYZ citing government embargoes or supply chain crises. If such a notice was served, review under Section 16 (Force Majeure) would be required.',
    confidence: 'High',
    disclaimer: 'AI-generated legal research support only. This output is not legal advice and should be independently verified by a qualified legal professional.',
    timestamp: '2025-02-27T10:15:40Z',
    isSaved: true,
    reviewedByLawyer: false
  },
  {
    id: 'res-003',
    sessionId: 'ses-103',
    caseId: 'case-002',
    caseName: 'Apex Cloud Infrastructure vs Horizon Financial Tech',
    question: 'Are service credits the customer’s sole financial remedy for cloud downtime?',
    shortAnswer: 'According to Section 9 of the Apex Enterprise Cloud Agreement, service credits constitute the customer’s sole and exclusive financial remedy for SLA failures, except where the outage was caused by gross negligence.',
    relevantProvisions: [
      'Master Cloud Services SLA Agreement, Section 9 (Availability SLA)',
      'Master Cloud Services SLA Agreement, Section 14 (Exclusive Remedy Clause)'
    ],
    analysis: 'The agreement limits downtime liability to pre-calculated service credits. However, Delaware law scrutinizes sole-remedy clauses if the contracted service fails of its essential purpose or if willful misconduct/gross negligence is pled with particularity.',
    supportingSources: [
      {
        id: 'cit-005',
        documentId: 'doc-005',
        fileName: 'Master_Cloud_Services_SLA_Agreement.pdf',
        page: 24,
        section: 'Section 9 (Availability SLA)',
        passage: 'Service credits constitute Customer’s sole and exclusive financial remedy for SLA failures, unless caused by gross negligence.',
        relevanceScore: 0.93
      }
    ],
    uncertaintyLimitations: 'Documentary evidence regarding root causes of the November 2024 14-hour outage has not yet been produced in discovery.',
    confidence: 'Medium',
    disclaimer: 'AI-generated legal research support only. This output is not legal advice and should be independently verified by a qualified legal professional.',
    timestamp: '2025-02-25T16:04:12Z',
    isSaved: false,
    reviewedByLawyer: true
  }
];

export const MOCK_SAVED_RESEARCH: SavedResearchItem[] = [
  {
    id: 'saved-001',
    title: 'Buyer Cover Rights & Liability Cap Exclusion Analysis',
    caseId: 'case-001',
    caseName: 'ABC Manufacturing vs XYZ Supplies Ltd',
    question: 'What contractual remedies are available to the buyer if the supplier fails to deliver conforming parts?',
    answerSummary: 'Section 12.2 authorizes Cover procurement with full recovery of excess costs and plant shutdown damages, explicitly carved out from Section 14 liability limits.',
    citations: [
      {
        id: 'cit-001',
        documentId: 'doc-001',
        fileName: 'Master_Supply_Agreement_2023.pdf',
        page: 19,
        section: 'Section 12.2',
        passage: 'Procure substitute replacement components from alternative third-party vendors ("Cover") and recover all commercially reasonable cover damages and excess costs from Supplier...',
        relevanceScore: 0.96
      }
    ],
    notes: 'Key argument for preliminary injunction & summary judgment on liability under NY UCC § 2-712.',
    createdBy: 'Eleanor Vance, Esq.',
    createdAt: '2025-02-28',
    tags: ['Cover Damages', 'UCC 2-712', 'Liability Carve-out', 'Breach of Supply'],
    status: 'Verified'
  },
  {
    id: 'saved-002',
    title: 'Fixed Pricing and Rejection of Inflation Defense',
    caseId: 'case-001',
    caseName: 'ABC Manufacturing vs XYZ Supplies Ltd',
    question: 'Can the supplier raise raw material inflation as an excuse to avoid fixed pricing obligations?',
    answerSummary: 'Section 8.1 fixes pricing for 24 months and bars raw material index adjustments from triggering unilateral renegotiation.',
    citations: [
      {
        id: 'cit-004',
        documentId: 'doc-001',
        fileName: 'Master_Supply_Agreement_2023.pdf',
        page: 15,
        section: 'Section 8.1',
        passage: 'Unit pricing set forth in Schedule A shall remain fixed for twenty-four (24) months...',
        relevanceScore: 0.95
      }
    ],
    notes: 'Precludes XYZ defense of commercial frustration/impracticability under NY law.',
    createdBy: 'David Chen',
    createdAt: '2025-02-27',
    tags: ['Pricing Terms', 'Commercial Impracticability', 'Inflation Clause'],
    status: 'Verified'
  }
];

export const MOCK_LEGAL_ISSUES: LegalIssue[] = [
  {
    id: 'iss-001',
    caseId: 'case-001',
    issue: 'Potential Breach of Contract via Chronic Late Delivery',
    category: 'Breach of Contract',
    relevantDocument: 'Master_Supply_Agreement_2023.pdf',
    page: 18,
    section: 'Section 4.1 & 12.1',
    supportingPassage: 'Time is of the essence with respect to Supplier’s delivery obligations... Material Default includes failure to deliver conforming products within five (5) business days of the required Delivery Date.',
    confidence: 'High',
    whyRelevant: 'XYZ accumulated 64 consecutive days of delivery default on batches #OCT-2024 and #NOV-2024, triggering material breach thresholds.',
    suggestedAction: 'Compile verified shipment receipt dates and production downtime logs to substantiate timeline in complaint.'
  },
  {
    id: 'iss-002',
    caseId: 'case-001',
    issue: 'Potential Enforceability of Cover Damages Claim under Section 12.2',
    category: 'Damages',
    relevantDocument: 'Notice_of_Material_Default_and_Cover.pdf',
    page: 2,
    section: 'Notice Section 3',
    supportingPassage: 'Failure to effectuate full cure on or before January 2, 2025, will result in immediate termination... and invocation of Buyer’s Cover remedies under Section 12.2.',
    confidence: 'High',
    whyRelevant: 'ABC incurred a $2.42M differential paying Delta Precision $148.50/unit; XYZ will dispute whether ABC acted in good faith without unreasonable delay.',
    suggestedAction: 'Secure market comparison data from at least two other accredited component suppliers to prove commercial reasonableness.'
  },
  {
    id: 'iss-003',
    caseId: 'case-001',
    issue: 'Potential Dispute Over 15-Day vs 30-Day Notice and Cure Validity',
    category: 'Termination',
    relevantDocument: 'Amendment_No_1_Price_and_Volume.pdf',
    page: 4,
    section: 'Section 2 (Cure Amendment)',
    supportingPassage: 'The cure period for repeated delivery defaults exceeding two (2) occurrences in any rolling ninety-day quarter is reduced from thirty (30) days to fifteen (15) calendar days.',
    confidence: 'Medium',
    whyRelevant: 'XYZ counsel may argue that the 15-day cure notice was defective if the prior defaults did not satisfy the specific two-occurrence rolling quarter definition.',
    suggestedAction: 'Audit the prior 90-day delivery logs for August and September 2024 to document earlier defaults.'
  },
  {
    id: 'iss-004',
    caseId: 'case-001',
    issue: 'Potential Unilateral Price Escalation & Extortion Claim',
    category: 'Liability',
    relevantDocument: 'Master_Supply_Agreement_2023.pdf',
    page: 15,
    section: 'Section 8.1',
    supportingPassage: 'Neither raw material index adjustments nor currency fluctuations shall permit unilateral price renegotiation without Buyer’s prior written consent.',
    confidence: 'High',
    whyRelevant: 'XYZ withheld November shipments while demanding an unagreed 28% surcharge due to aluminum ingot tariff increases.',
    suggestedAction: 'Deposition preparation regarding XYZ email admissions of supply withholding.'
  }
];

export const MOCK_CLAUSE_ANALYSIS: ClauseAnalysisResult = {
  id: 'cls-001',
  clauseTitle: "Section 12.2 – Buyer's Cumulative Remedies & Cover Right",
  sourceDoc: 'Master_Supply_Agreement_2023.pdf',
  page: 19,
  rawText: `In the event Supplier fails to deliver conforming Goods within ten (10) days of the cure notice, Buyer shall have the right to: (i) Procure substitute replacement components from alternative third-party vendors ("Cover") and recover all commercially reasonable cover damages and excess costs from Supplier; (ii) Withhold further payments under any pending purchase orders until damages are satisfied; (iii) Demand immediate reimbursement for assembly line shutdown damages incurred by Buyer directly attributable to Supplier's breach.`,
  plainSummary: 'If the supplier does not fix delivery defects within 10 days after a cure notice, the buyer can buy replacement parts from another company and charge the difference to the supplier, hold back any pending payments, and demand reimbursement for factory downtime.',
  partiesAffected: ['ABC Precision Manufacturing Corp (Buyer)', 'XYZ Industrial Supplies Ltd (Supplier)'],
  mainObligation: 'Supplier is obligated to indemnify and reimburse Buyer for all excess costs of buying replacement goods and direct factory shutdown losses.',
  conditions: [
    'Supplier must have failed to deliver conforming goods within 10 days after the formal cure notice.',
    'Replacement parts must be procured under commercially reasonable terms without undue delay.'
  ],
  exceptions: [
    'Does not apply if supplier delay was excused by an approved Section 16 Force Majeure event.'
  ],
  potentialRisks: [
    'Supplier may argue substitute price ($148.50) was inflated and not commercially reasonable under NY UCC § 2-712.',
    'Shutdown damage calculations can be challenged as speculative if indirect overhead is co-mingled.'
  ],
  relatedClauses: [
    'Section 4.2 – Delay Liquidated Damages',
    'Section 8.2 – Payment Terms & Withholding Rights',
    'Section 12.3 – Carve-out from General Limitation of Liability Cap',
    'Section 14 – Limitation of Liability ($1M General Cap)'
  ],
  citation: {
    id: 'cit-001',
    documentId: 'doc-001',
    fileName: 'Master_Supply_Agreement_2023.pdf',
    page: 19,
    section: 'Section 12.2',
    passage: 'Procure substitute replacement components from alternative third-party vendors ("Cover") and recover all commercially reasonable cover damages and excess costs from Supplier...',
    relevanceScore: 0.98
  }
};

export const MOCK_COMPARISON_RESULT: DocumentComparisonResult = {
  doc1Name: 'Master_Supply_Agreement_2023.pdf (Original)',
  doc2Name: 'Amendment_No_1_Price_and_Volume.pdf (Amended)',
  keyDifferencesSummary: 'Amendment No. 1 substantially altered delivery volume obligations (80% increase in hydraulic actuators) and drastically shortened the default cure period from 30 days to 15 days for chronic repeat delivery failures.',
  addedClauses: [
    {
      section: 'Section 1 (Revised Schedule A Quotas)',
      title: 'Increased Hydraulic Minimum Volume',
      text: 'Monthly minimum supply quota for Part #HYD-990 increased from 10,000 units to 18,000 units commencing January 1, 2024.',
      impact: 'Significantly expands the exposure and potential breach damages in the event of supply shortfall.'
    }
  ],
  removedClauses: [],
  modifiedClauses: [
    {
      section: 'Section 12.1(a) Cure Period',
      title: 'Notice and Cure Duration for Repeat Defaults',
      before: 'Cure period: Thirty (30) calendar days after receiving written notice specifying the breach.',
      after: 'Cure period: Reduced from thirty (30) days to fifteen (15) calendar days for repeat defaults exceeding two occurrences in a rolling 90-day period.',
      variance: 'Shortened response window by 50%, accelerating buyer’s entitlement to terminate and seek cover.'
    }
  ]
};

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    userId: 'usr-001',
    userName: 'Eleanor Vance, Esq.',
    userRole: 'Lawyer',
    action: 'Vector Search Query',
    resourceType: 'Research',
    resourceId: 'res-001',
    details: 'Executed semantic vector search: "What contractual remedies are available to the buyer if the supplier fails to deliver conforming parts?"',
    ipAddress: '192.168.1.45',
    timestamp: '2025-02-28 14:22:10'
  },
  {
    id: 'aud-002',
    userId: 'usr-001',
    userName: 'Eleanor Vance, Esq.',
    userRole: 'Lawyer',
    action: 'Saved Research',
    resourceType: 'Research',
    resourceId: 'saved-001',
    details: 'Saved and verified research analysis with legal counsel annotations for NY UCC § 2-712.',
    ipAddress: '192.168.1.45',
    timestamp: '2025-02-28 14:25:34'
  },
  {
    id: 'aud-003',
    userId: 'usr-002',
    userName: 'David Chen',
    userRole: 'Legal Researcher',
    action: 'Document Upload',
    resourceType: 'Document',
    resourceId: 'doc-004',
    details: 'Uploaded Delta_Precision_Cover_Purchase_Orders.pdf (3.4 MB) under Case COM-2025-88412.',
    ipAddress: '192.168.1.52',
    timestamp: '2025-01-28 11:14:02'
  },
  {
    id: 'aud-004',
    userId: 'usr-003',
    userName: 'Marcus Sterling',
    userRole: 'Admin',
    action: 'Case Creation',
    resourceType: 'Case',
    resourceId: 'case-001',
    details: 'Created commercial dispute case: ABC Manufacturing vs XYZ Supplies Ltd (COM-2025-88412).',
    ipAddress: '192.168.1.10',
    timestamp: '2025-01-14 09:30:00'
  },
  {
    id: 'aud-005',
    userId: 'usr-001',
    userName: 'Eleanor Vance, Esq.',
    userRole: 'Lawyer',
    action: 'Document Access',
    resourceType: 'Document',
    resourceId: 'doc-001',
    details: 'Opened Master_Supply_Agreement_2023.pdf for passage verification at Page 19.',
    ipAddress: '192.168.1.45',
    timestamp: '2025-02-28 14:23:45'
  }
];

export const MOCK_ACTIVITY_CHART_DATA = [
  { date: 'Feb 22', queries: 8, indexedPages: 38, retrievedCitations: 19 },
  { date: 'Feb 23', queries: 14, indexedPages: 45, retrievedCitations: 34 },
  { date: 'Feb 24', queries: 21, indexedPages: 92, retrievedCitations: 52 },
  { date: 'Feb 25', queries: 19, indexedPages: 64, retrievedCitations: 46 },
  { date: 'Feb 26', queries: 28, indexedPages: 110, retrievedCitations: 71 },
  { date: 'Feb 27', queries: 35, indexedPages: 135, retrievedCitations: 89 },
  { date: 'Feb 28', queries: 42, indexedPages: 154, retrievedCitations: 104 }
];

export const MOCK_DISPUTE_DISTRIBUTION = [
  { name: 'Supply Agreement', count: 4, value: 35, color: '#2563EB' },
  { name: 'Breach of Contract', count: 3, value: 25, color: '#0D9488' },
  { name: 'Partnership Dispute', count: 2, value: 20, color: '#7C3AED' },
  { name: 'IP Licensing', count: 2, value: 12, color: '#D97706' },
  { name: 'Other', count: 1, value: 8, color: '#64748B' }
];
