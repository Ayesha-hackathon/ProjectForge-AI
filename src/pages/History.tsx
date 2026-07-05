import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Search, 
  Layers, 
  Trash2, 
  Copy, 
  ExternalLink, 
  Filter,
  SlidersHorizontal,
  Plus,
  Activity,
  Award,
  Calendar,
  Sparkles,
  HeartCrack,
  AlertTriangle
} from 'lucide-react';
import { Blueprint, EngineeringBranch } from '../types';

interface HistoryProps {
  blueprints: Blueprint[];
  onOpenBlueprint: (id: string) => void;
  onCloneBlueprint: (id: string) => void;
  onDeleteBlueprint: (id: string) => void;
}

export default function History({ 
  blueprints, 
  onOpenBlueprint, 
  onCloneBlueprint, 
  onDeleteBlueprint 
}: HistoryProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<'All' | EngineeringBranch>('All');

  // Filter projects dynamically
  const filteredBlueprints = blueprints.filter((bp) => {
    const matchesSearch = bp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bp.idea.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bp.domain.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = selectedBranch === 'All' || bp.branch === selectedBranch;

    return matchesSearch && matchesBranch;
  });

  const getBranchColor = (branch: string) => {
    switch(branch) {
      case 'CSE': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'ECE': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'EEE': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'EIE': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Mechanical': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="space-y-8 p-8 animate-fade-in">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display font-bold text-xl text-black">Blueprint Historical Archive</h2>
          <p className="text-xs text-black/45">Review, filter, duplicate, or delete your generated engineering blueprint specifications.</p>
        </div>

        <button
          onClick={() => navigate('/wizard')}
          className="px-4 py-2 bg-primary-accent hover:bg-dark-accent text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Forge New Specs</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-border-custom p-4 rounded-2xl shadow-3xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input Box */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-black/30" />
            <input
              type="text"
              placeholder="Search blueprints by name, concept domain, or hardware tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent text-black placeholder:text-black/35 transition-all"
            />
          </div>

          {/* Sliders visual decorator */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-black/40 font-mono">
            <SlidersHorizontal className="w-4 h-4" />
            <span>{filteredBlueprints.length} matching</span>
          </div>
        </div>

        {/* Branch Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider mr-2">Discipline:</span>
          {(['All', 'CSE', 'ECE', 'EEE', 'EIE', 'Mechanical'] as const).map((branch) => (
            <button
              key={branch}
              onClick={() => setSelectedBranch(branch)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                selectedBranch === branch
                  ? 'bg-primary-accent/15 border-primary-accent text-primary-accent'
                  : 'bg-white border-border-custom hover:border-black/25 text-black/70'
              }`}
            >
              {branch}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Blueprint Cards */}
      {filteredBlueprints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlueprints.map((bp) => (
            <div 
              key={bp.id}
              className="bg-white border border-border-custom rounded-2xl p-6 shadow-3xs hover:border-black/15 transition-all flex flex-col justify-between space-y-5"
            >
              {/* Card Header metadata */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 border rounded-md text-[9px] font-bold uppercase ${getBranchColor(bp.branch)}`}>
                    {bp.branch}
                  </span>
                  
                  <span className="text-[10px] text-black/40 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(bp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 
                    onClick={() => onOpenBlueprint(bp.id)}
                    className="font-display font-bold text-xs sm:text-sm text-black hover:text-primary-accent cursor-pointer line-clamp-1"
                  >
                    {bp.name}
                  </h4>
                  <p className="text-[11px] font-mono text-black/40 font-medium truncate">{bp.domain}</p>
                </div>

                <p className="text-xs text-black/60 line-clamp-3 leading-relaxed">
                  {bp.idea}
                </p>
              </div>

              {/* Quality indicators inside card */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-primary-bg rounded-xl border border-border-custom/50">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-black/40 uppercase tracking-wider block">Feasibility</span>
                  <span className="text-xs font-bold text-black font-display flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-500" />
                    {bp.healthScore}%
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-black/40 uppercase tracking-wider block">Novelty Index</span>
                  <span className="text-xs font-bold text-black font-display flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-primary-accent" />
                    {bp.noveltyScore}%
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-border-custom/50">
                <button
                  onClick={() => onOpenBlueprint(bp.id)}
                  className="px-3.5 py-1.5 bg-white border border-border-custom hover:border-black/30 rounded-lg text-xs font-bold text-black transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Open Specs</span>
                  <ExternalLink className="w-3 h-3 text-black/40" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onCloneBlueprint(bp.id)}
                    className="p-1.5 hover:bg-primary-bg rounded-lg border border-transparent hover:border-border-custom text-black/40 hover:text-black transition-all cursor-pointer"
                    title="Duplicate Blueprint"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteBlueprint(bp.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100/50 text-black/40 hover:text-red-600 transition-all cursor-pointer"
                    title="Delete Blueprint"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border-custom rounded-2xl bg-white space-y-4">
          <div className="w-12 h-12 bg-primary-bg rounded-full flex items-center justify-center mx-auto text-black/30">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-black">No matching blueprints located</h4>
            <p className="text-xs text-black/45">Try adjusting your filters or refining your search parameters.</p>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedBranch('All');
            }}
            className="px-4 py-2 bg-primary-bg border border-border-custom rounded-xl text-xs font-bold text-black hover:border-black/30 transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
