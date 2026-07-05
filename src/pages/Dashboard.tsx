import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Plus, 
  ArrowRight, 
  Award, 
  Settings as SettingsIcon, 
  Wrench, 
  Cpu, 
  History, 
  Sparkles, 
  Layers,
  Activity,
  Calendar,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import { Blueprint } from '../types';

interface DashboardProps {
  blueprints: Blueprint[];
  onOpenBlueprint: (id: string) => void;
  onCloneBlueprint: (id: string) => void;
  onDeleteBlueprint: (id: string) => void;
}

export default function Dashboard({ 
  blueprints, 
  onOpenBlueprint, 
  onCloneBlueprint, 
  onDeleteBlueprint 
}: DashboardProps) {
  const navigate = useNavigate();

  // Compute actual metrics based on the blueprints state
  const totalCount = blueprints.length;
  
  const avgPatentRating = totalCount > 0 
    ? Math.round(blueprints.reduce((acc, curr) => {
        const score = curr.noveltyScore; // use novelty as proxy
        return acc + score;
      }, 0) / totalCount)
    : 0;

  const expertCount = blueprints.filter(bp => bp.difficulty === 'Expert' || bp.difficulty === 'Hard').length;

  const avgHealth = totalCount > 0 
    ? Math.round(blueprints.reduce((acc, curr) => acc + curr.healthScore, 0) / totalCount)
    : 0;

  // Branch counters for custom SVG chart
  const branchCounts = blueprints.reduce((acc, bp) => {
    acc[bp.branch] = (acc[bp.branch] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentProjects = [...blueprints]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

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
    <div className="space-y-8 animate-fade-in p-8">
      {/* Banner / Premium CTA */}
      <div className="bg-gradient-to-r from-black via-[#2C241E] to-black rounded-2xl p-8 text-white relative overflow-hidden shadow-sm border border-border-custom/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-accent/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-dark-accent/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-accent/20 border border-primary-accent/30 text-primary-accent rounded-md text-[10px] font-bold tracking-wider uppercase font-mono">
            <Sparkles className="w-3 h-3" />
            V1.4 Release Active
          </span>
          <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight leading-snug">
            Construct professional hardware specs, software containers, and patents.
          </h2>
          <p className="text-xs text-white/70 leading-relaxed">
            Specify physical limitations, team size, and target domains in the step-by-step wizard to formulate pre-vetted bills of materials, signal filtering configurations, and software frameworks.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/wizard')}
              className="px-4.5 py-2.5 bg-primary-accent hover:bg-dark-accent text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Initialize Blueprint Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Blueprints Forged',
            value: totalCount,
            sub: 'Active repositories',
            icon: Layers,
            color: 'text-primary-accent'
          },
          {
            title: 'Avg Patent Potential',
            value: `${avgPatentRating}%`,
            sub: 'Novelty & Utility metric',
            icon: Award,
            color: 'text-amber-500'
          },
          {
            title: 'High Complexity Projects',
            value: expertCount,
            sub: 'Expert & Hard stacks',
            icon: Cpu,
            color: 'text-purple-500'
          },
          {
            title: 'Avg Quality Score',
            value: `${avgHealth}%`,
            sub: 'Structural feasibility score',
            icon: Activity,
            color: 'text-emerald-500'
          }
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white border border-border-custom p-6 rounded-2xl shadow-2xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-wider">{card.title}</p>
                <h3 className="font-display text-2xl font-bold text-black tracking-tight">{card.value}</h3>
                <p className="text-[10px] text-black/50 font-medium">{card.sub}</p>
              </div>
              <div className={`w-11 h-11 bg-primary-bg rounded-xl border border-border-custom flex items-center justify-center ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Sections: Left: Recent Projects, Right: Branch Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Blueprints */}
        <div className="lg:col-span-8 bg-white border border-border-custom rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-sm text-black">Recent Blueprint Specs</h3>
              <p className="text-xs text-black/40">Open, duplicate, or delete your latest generated engineering outlines.</p>
            </div>
            <button
              onClick={() => navigate('/history')}
              className="text-xs font-semibold text-primary-accent hover:text-dark-accent transition-colors flex items-center gap-1"
            >
              <span>View History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {recentProjects.length > 0 ? (
              recentProjects.map((bp) => (
                <div 
                  key={bp.id} 
                  className="p-5 border border-border-custom hover:border-black/20 rounded-xl bg-primary-bg/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 max-w-lg">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 border rounded-md text-[9px] font-mono font-bold uppercase ${getBranchColor(bp.branch)}`}>
                        {bp.branch}
                      </span>
                      <span className="text-[10px] text-black/40 font-mono">
                        {new Date(bp.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-[10px] text-black/40">•</span>
                      <span className="text-[10px] text-black/50 font-medium">Difficulty: {bp.difficulty}</span>
                    </div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-black hover:text-primary-accent cursor-pointer truncate" onClick={() => onOpenBlueprint(bp.id)}>
                      {bp.name}
                    </h4>
                    <p className="text-xs text-black/60 truncate line-clamp-1">
                      {bp.idea}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenBlueprint(bp.id)}
                      className="px-3 py-1.5 bg-white border border-border-custom hover:border-black/30 rounded-lg text-[11px] font-bold text-black transition-all cursor-pointer"
                    >
                      Open Specs
                    </button>
                    <button
                      onClick={() => onCloneBlueprint(bp.id)}
                      className="px-3 py-1.5 bg-white border border-border-custom hover:border-black/30 rounded-lg text-[11px] font-bold text-black/70 hover:text-black transition-all cursor-pointer"
                      title="Duplicate Blueprint"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={() => onDeleteBlueprint(bp.id)}
                      className="p-1.5 text-black/40 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                      title="Delete Blueprint"
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-border-custom rounded-xl space-y-4 bg-primary-bg/10">
                <div className="w-10 h-10 bg-primary-bg rounded-full flex items-center justify-center mx-auto text-black/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-black">No Blueprints Forged Yet</h4>
                  <p className="text-[11px] text-black/40">You haven't generated any engineering blueprints in this session.</p>
                </div>
                <button
                  onClick={() => navigate('/wizard')}
                  className="px-4 py-2 bg-primary-accent hover:bg-dark-accent text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Forge Your First Blueprint</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Branch Distribution & Guidelines */}
        <div className="lg:col-span-4 space-y-6">
          {/* Branch metrics card */}
          <div className="bg-white border border-border-custom rounded-2xl p-6 shadow-2xs space-y-5">
            <div>
              <h3 className="font-display font-bold text-sm text-black">Discipline Allocation</h3>
              <p className="text-xs text-black/40">Distribution of blueprints across sectors.</p>
            </div>

            {/* Custom SVG Donut / Gauge */}
            <div className="flex items-center justify-center py-4 relative">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  className="stroke-border-custom fill-none"
                  strokeWidth="10"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  className="stroke-primary-accent fill-none"
                  strokeWidth="10"
                  strokeDasharray="364"
                  strokeDashoffset={totalCount > 0 ? 364 - (364 * (avgHealth / 100)) : 364}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-extrabold text-black font-display">{avgHealth || 0}%</span>
                <span className="block text-[9px] font-bold text-black/40 uppercase tracking-widest">Avg Feasibility</span>
              </div>
            </div>

            {/* Micro pills displaying counts */}
            <div className="space-y-2">
              {['CSE', 'ECE', 'EEE', 'EIE', 'Mechanical'].map((br) => {
                const count = branchCounts[br] || 0;
                const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
                return (
                  <div key={br} className="flex items-center justify-between text-xs font-medium">
                    <span className="text-black/60 font-mono">{br}</span>
                    <div className="flex-1 mx-3 h-1.5 bg-primary-bg rounded-full overflow-hidden border border-border-custom/30">
                      <div 
                        className="h-full bg-primary-accent rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-black/80 font-mono font-semibold w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guidelines Sidebar box */}
          <div className="bg-primary-accent/5 border border-primary-accent/20 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold text-primary-accent flex items-center gap-1.5">
              <Wrench className="w-4 h-4" />
              <span>Syllabus Integration</span>
            </h4>
            <p className="text-xs text-black/75 leading-relaxed">
              Every blueprint outputs standard architectural formatting matching final-year review committee criteria in leading technological universities. Use these specifications to fast-track your laboratory prototyping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
