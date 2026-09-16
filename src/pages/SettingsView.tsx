import React, { useState } from 'react';
import {
  Settings,
  Database,
  Cpu,
  Shield,
  Layers,
  Save,
  CheckCircle2,
  Lock,
  Key
} from 'lucide-react';
import { User } from '../types';

interface SettingsViewProps {
  currentUser: User;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentUser }) => {
  const [vectorIndexName, setVectorIndexName] = useState('legal_document_vector_index');
  const [similarityThreshold, setSimilarityThreshold] = useState('0.78');
  const [chunkSize, setChunkSize] = useState('500');
  const [chunkOverlap, setChunkOverlap] = useState('50');
  const [modelName, setModelName] = useState('gemini-2.5-flash');
  const [embeddingModel, setEmbeddingModel] = useState('text-embedding-004');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div id="settings-view" className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">System & RAG Pipeline Configuration</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Vector database parameters, semantic chunking boundaries, and legal safety thresholds
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* MongoDB Vector Search Settings */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Database className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              MongoDB Atlas Vector Search Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Vector Index Identifier
              </label>
              <input
                type="text"
                value={vectorIndexName}
                onChange={(e) => setVectorIndexName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Cosine Similarity Score Cutoff
              </label>
              <input
                type="text"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Inference & Embedding Models */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Cpu className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              AI Engine & Grounding Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Generative LLM Model
              </label>
              <select
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Optimized for Low Latency Legal RAG)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Complex Multi-Instrument Arbitration)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Embedding Model (Vector Space)
              </label>
              <select
                value={embeddingModel}
                onChange={(e) => setEmbeddingModel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
              >
                <option value="text-embedding-004">Google text-embedding-004 (768 dimensions)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Text Chunking Strategy */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-purple-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Document Chunking Strategy
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Chunk Token Target Size
              </label>
              <input
                type="number"
                value={chunkSize}
                onChange={(e) => setChunkSize(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-mono text-[11px]"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Recommended for legal contracts: 400-600 tokens</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Boundary Semantic Overlap (Tokens)
              </label>
              <input
                type="number"
                value={chunkOverlap}
                onChange={(e) => setChunkOverlap(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-mono text-[11px]"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Preserves context across section headers</span>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pipeline configuration updated successfully!</span>
            </div>
          ) : (
            <span className="text-slate-400 text-[11px]">Configuration changes apply to all newly ingested documents.</span>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
