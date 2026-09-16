import React, { useState } from 'react';
import { X, Briefcase, Plus, AlertCircle } from 'lucide-react';
import { DisputeType, LegalCase } from '../../types';

interface CreateCaseModalProps {
  onClose: () => void;
  onCreateCase: (newCase: LegalCase) => void;
}

const DISPUTE_TYPES: DisputeType[] = [
  'Breach of Contract',
  'Payment Dispute',
  'Partnership Dispute',
  'Shareholder Dispute',
  'Intellectual Property Dispute',
  'Employment Contract Dispute',
  'Supply Agreement Dispute',
  'Construction Dispute',
  'Insurance Dispute',
  'Other'
];

export const CreateCaseModal: React.FC<CreateCaseModalProps> = ({ onClose, onCreateCase }) => {
  const [caseName, setCaseName] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [clientOrganization, setClientOrganization] = useState('');
  const [opposingParty, setOpposingParty] = useState('');
  const [disputeType, setDisputeType] = useState<DisputeType>('Supply Agreement Dispute');
  const [jurisdiction, setJurisdiction] = useState('New York (State)');
  const [courtTribunal, setCourtTribunal] = useState('Supreme Court of the State of New York, Commercial Division');
  const [description, setDescription] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseName.trim() || !clientOrganization.trim() || !opposingParty.trim()) {
      setError('Please fill in all mandatory case identification fields.');
      return;
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newCase: LegalCase = {
      id: `case-${Date.now()}`,
      caseId: `COM-2025-${randomSuffix}`,
      caseName: caseName.trim(),
      caseNumber: caseNumber.trim() || `Index No. ${randomSuffix}/2025`,
      clientOrganization: clientOrganization.trim(),
      opposingParty: opposingParty.trim(),
      disputeType,
      jurisdiction: jurisdiction.trim(),
      courtTribunal: courtTribunal.trim(),
      caseStatus: 'Researching',
      description: description.trim() || 'Active commercial litigation case filed for contract analysis and document discovery.',
      claimAmount: claimAmount.trim() || '$1,000,000 USD',
      leadCounsel: 'Eleanor Vance, Esq.',
      documentCount: 0,
      indexedChunkCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0]
    };

    onCreateCase(newCase);
    onClose();
  };

  return (
    <div id="create-case-backdrop" className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div id="create-case-modal" className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">Create Commercial Dispute Case</h3>
              <p className="text-xs text-slate-400">Initialize a matter workspace for document indexing and grounded RAG research</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto text-xs">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg flex items-center gap-2 text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Case Name / Style of Cause *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Acme Industrial Corp vs Global Components Ltd"
              value={caseName}
              onChange={(e) => setCaseName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Client / Represented Entity *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Industrial Corp"
                value={clientOrganization}
                onChange={(e) => setClientOrganization(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Opposing Party *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Global Components Ltd"
                value={opposingParty}
                onChange={(e) => setOpposingParty(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Dispute Type *
              </label>
              <select
                value={disputeType}
                onChange={(e) => setDisputeType(e.target.value as DisputeType)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              >
                {DISPUTE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Docket / Case Number
              </label>
              <input
                type="text"
                placeholder="e.g. Index No. 654210/2025"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Jurisdiction
              </label>
              <input
                type="text"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Court or Arbitration Tribunal
              </label>
              <input
                type="text"
                value={courtTribunal}
                onChange={(e) => setCourtTribunal(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Claim / Disputed Amount
              </label>
              <input
                type="text"
                placeholder="e.g. $5,200,000 USD"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Initial Status
              </label>
              <input
                type="text"
                disabled
                value="Researching (Default)"
                className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Matter Description / Summary
            </label>
            <textarea
              rows={3}
              placeholder="Provide background regarding contractual agreements, claimed breaches, notice dates, and anticipated relief sought..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Case Workspace</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
