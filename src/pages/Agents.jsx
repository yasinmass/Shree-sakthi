import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { Plus, Search, X, Loader2, Bot, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getAgents, createAgent, deleteAgent } from '../api/axios';
import { useAuth } from '../context/AuthContext';

// ─── Create Agent Modal ────────────────────────────────────────────────────
const CreateAgentModal = ({ onClose, onCreated, userEmail, userRole }) => {
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = purpose.trim();
    if (!trimmed) return;

    setLoading(true);
    setError('');

    try {
      const res = await createAgent(trimmed, userEmail, userRole);
      onCreated(res.data);
      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.purpose?.[0] ||
        'Failed to create agent. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Create New Agent</h2>
              <p className="text-xs text-gray-500 mt-0.5">Powered by local Ollama AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-xl bg-secondary border border-border flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-40"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Describe what this agent should do
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              disabled={loading}
              rows={4}
              className="w-full bg-secondary border border-border rounded-2xl py-3 px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-all resize-none disabled:opacity-50"
              placeholder="e.g. manage student attendance records and alert faculty when students drop below 75%..."
              autoFocus
            />
            <p className="text-xs text-gray-600 mt-1.5">
              Be specific — Ollama will auto-generate the agent's name, description, and system prompt.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Loading hint */}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Loader2 size={14} className="animate-spin" />
              Ollama is designing your agent… this might take a few moments
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 bg-secondary border border-border rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !purpose.trim()}
              className="flex-1 py-3 bg-white text-black rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Create Agent
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Toast Notification ───────────────────────────────────────────────────
const Toast = ({ message, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-card border border-green-500/30 rounded-2xl text-green-400 text-sm font-semibold shadow-xl animate-in slide-in-from-bottom-4 duration-300">
      <CheckCircle2 size={18} />
      {message}
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────
const EmptyState = ({ onCreateClick }) => (
  <div className="flex flex-col items-center justify-center py-28 text-center animate-in fade-in duration-500">
    <div className="w-20 h-20 rounded-3xl bg-secondary border border-border flex items-center justify-center mb-6">
      <Bot size={36} className="text-gray-600" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">No agents yet</h3>
    <p className="text-gray-500 text-sm max-w-xs mb-8 leading-relaxed">
      Create your first AI agent. Describe its purpose and Ollama will configure it automatically.
    </p>
    <button
      onClick={onCreateClick}
      className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-all shadow-lg"
    >
      <Plus size={18} />
      Create Your First Agent
    </button>
  </div>
);

// ─── Domain → icon name mapping ───────────────────────────────────────────
const DOMAIN_ICON = {
  student:    'User',
  faculty:    'User',
  attendance: 'Calendar',
  exam:       'FileText',
  course:     'BookOpen',
  analytics:  'PieChart',
};

/** Format ISO date to a human-readable relative string */
const formatAge = (isoString) => {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 60)  return `${mins} min${mins !== 1 ? 's' : ''} ago`;
  if (hours < 24)  return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days  < 7)   return `${days} day${days !== 1 ? 's' : ''} ago`;
  return new Date(isoString).toLocaleDateString();
};

// ─── Main Agents Page ─────────────────────────────────────────────────────
const Agents = () => {
  const { user } = useAuth();
  const [agents,      setAgents]      = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [fetchError,  setFetchError]  = useState('');
  const [search,      setSearch]      = useState('');
  const [showModal,   setShowModal]   = useState(false);
  const [toast,       setToast]       = useState('');
  const [deletingId,  setDeletingId]  = useState(null);

  // ── Fetch agents on mount ────────────────────────────────────────────────
  const loadAgents = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    setFetchError('');
    try {
      const res = await getAgents(user.email);
      setAgents(res.data);
    } catch (err) {
      setFetchError('Could not connect to the backend. Is Django running on port 8000?');
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => { loadAgents(); }, [loadAgents]);

  // ── Handle new agent created ─────────────────────────────────────────────
  const handleCreated = (newAgent) => {
    setAgents((prev) => [newAgent, ...prev]);
    setToast(`"${newAgent.name}" created successfully!`);
  };

  // ── Handle delete ────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this agent? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await deleteAgent(id);
      setAgents((prev) => prev.filter((a) => a.id !== id));
      setToast('Agent deleted.');
    } catch {
      alert('Failed to delete agent. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // ── Filter by search ─────────────────────────────────────────────────────
  const filtered = agents.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.description.toLowerCase().includes(search.toLowerCase()) ||
    a.domain.toLowerCase().includes(search.toLowerCase())
  );

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex bg-background min-h-screen text-white">
      <Sidebar role="Admin" />

      <main className="flex-1 ml-[260px] p-10 max-w-[1400px]">
        {/* ── Header ── */}
        <header className="flex justify-between items-end mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">My Agents</h1>
            <p className="text-gray-500">
              {loading
                ? 'Loading agents…'
                : `${agents.length} agent${agents.length !== 1 ? 's' : ''} configured`}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-all shadow-lg"
          >
            <Plus size={18} />
            Create New Agent
          </button>
        </header>

        {/* ── Search & Filter bar ── */}
        <div className="flex gap-4 mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-white/20 transition-all"
              placeholder="Search agents by name, description or domain…"
            />
          </div>
          <button className="px-6 py-3 bg-secondary border border-border rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all">
            All Domains
          </button>
        </div>

        {/* ── States ── */}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card border border-border rounded-3xl p-8 animate-pulse">
                <div className="w-12 h-12 rounded-2xl bg-secondary mb-6" />
                <div className="h-5 bg-secondary rounded-lg mb-3 w-3/4" />
                <div className="h-3 bg-secondary rounded mb-2 w-full" />
                <div className="h-3 bg-secondary rounded mb-8 w-2/3" />
                <div className="h-4 bg-secondary rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && fetchError && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
              <AlertCircle size={28} className="text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Connection Error</h3>
            <p className="text-red-400/80 text-sm max-w-sm mb-6">{fetchError}</p>
            <button
              onClick={loadAgents}
              className="px-5 py-2.5 bg-secondary border border-border rounded-xl text-sm font-bold text-white hover:border-white/20 transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !fetchError && agents.length === 0 && (
          <EmptyState onCreateClick={() => setShowModal(true)} />
        )}

        {/* No search results */}
        {!loading && !fetchError && agents.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-gray-500">No agents match "<span className="text-white">{search}</span>"</p>
            <button onClick={() => setSearch('')} className="mt-3 text-sm text-gray-400 hover:text-white underline">
              Clear search
            </button>
          </div>
        )}

        {/* Agent grid */}
        {!loading && !fetchError && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {filtered.map((agent) => (
              <AgentCard
                key={agent.id}
                id={agent.id}
                name={agent.name}
                description={agent.description}
                iconName={DOMAIN_ICON[agent.domain] || 'User'}
                createdAt={formatAge(agent.created_at)}
                onDelete={() => handleDelete(agent.id)}
                isDeleting={deletingId === agent.id}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Create Modal ── */}
      {showModal && (
        <CreateAgentModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
          userEmail={user?.email}
          userRole={user?.role}
        />
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  );
};

export default Agents;
