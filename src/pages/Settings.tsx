import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  User, 
  Settings as SettingsIcon, 
  Palette, 
  HelpCircle, 
  Check, 
  LogOut, 
  Cpu, 
  School,
  Sparkles,
  BookOpen,
  Mail,
  RotateCcw
} from 'lucide-react';
import { UserProfile, EngineeringBranch } from '../types';

interface SettingsProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
  onResetData: () => void;
}

export default function Settings({ user, onUpdateUser, onLogout, onResetData }: SettingsProps) {
  const navigate = useNavigate();

  // Profile form states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [college, setCollege] = useState(user.college);
  const [branch, setBranch] = useState<EngineeringBranch>(user.branch);
  const [theme, setTheme] = useState<'Light' | 'Warm Slate'>(user.theme);

  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'theme' | 'about'>('profile');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      college,
      branch,
      theme
    });
    setSuccessMsg('Workspace profile updated successfully!');
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to restore the default blueprints and profile data? This will clear any newly forged specs.')) {
      onResetData();
      // Reload values
      setName(user.name);
      setEmail(user.email);
      setCollege(user.college);
      setBranch(user.branch);
      setTheme(user.theme);
      setSuccessMsg('Default blueprints restored.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-8 animate-fade-in">
      {/* Title Header */}
      <div className="space-y-1">
        <h2 className="font-display font-bold text-xl text-black">Workspace Settings</h2>
        <p className="text-xs text-black/45">Configure your student profile, design theme settings, and workspace preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Sub-Tab Controller (Col 4) */}
        <div className="md:col-span-4 bg-white border border-border-custom rounded-2xl p-4 shadow-3xs space-y-1">
          {[
            { id: 'profile' as const, label: 'Profile Information', icon: User },
            { id: 'theme' as const, label: 'Theme & Aesthetics', icon: Palette },
            { id: 'about' as const, label: 'About ProjectForge', icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                  activeSubTab === tab.id 
                    ? 'bg-primary-accent/10 text-primary-accent' 
                    : 'text-black/60 hover:bg-primary-bg hover:text-black'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <hr className="border-border-custom my-3" />

          {/* Destructive reset trigger */}
          <button
            onClick={handleReset}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left text-black/50 hover:bg-primary-bg hover:text-black transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Database</span>
          </button>
        </div>

        {/* Right Active Sub-Tab Container (Col 8) */}
        <div className="md:col-span-8 bg-white border border-border-custom rounded-2xl p-8 shadow-3xs min-h-96">
          
          {/* PROFILE SECTION */}
          {activeSubTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-black">Profile Information</h3>
                <p className="text-xs text-black/45">Update your academic identity to format generated documents.</p>
              </div>

              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-black/60 uppercase tracking-wider block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-black/30" />
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent text-black"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-black/60 uppercase tracking-wider block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-black/30" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent text-black"
                    />
                  </div>
                </div>

                {/* Engineering College */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-black/60 uppercase tracking-wider block">College / University</label>
                  <div className="relative">
                    <School className="absolute left-3.5 top-3 w-4 h-4 text-black/30" />
                    <input 
                      type="text" 
                      required
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent text-black"
                    />
                  </div>
                </div>

                {/* Branch Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-black/60 uppercase tracking-wider block">Engineering Branch Focus</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent text-black"
                  >
                    <option value="CSE">Computer Science (CSE)</option>
                    <option value="ECE">Electronics & Comm (ECE)</option>
                    <option value="EEE">Electrical & Electronics (EEE)</option>
                    <option value="EIE">Electronics & Inst (EIE)</option>
                    <option value="Mechanical">Mechanical Engineering</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-border-custom">
                <button
                  type="submit"
                  className="px-4.5 py-2.5 bg-primary-accent hover:bg-dark-accent text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  Save Workspace Changes
                </button>
              </div>
            </form>
          )}

          {/* THEME & AESTHETICS SECTION */}
          {activeSubTab === 'theme' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-black">Workspace Theme</h3>
                <p className="text-xs text-black/45">Configure visual layouts for high readability.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'Warm Slate' as const, name: 'Warm Slate', desc: 'Premium off-white cream and deep bronze outlines.', active: theme === 'Warm Slate', bg: 'bg-[#FAF8F5]' },
                  { id: 'Light' as const, name: 'Minimal Stark', desc: 'Pure neutral white and charcoal outlines.', active: theme === 'Light', bg: 'bg-white' }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => {
                      setTheme(th.id);
                      onUpdateUser({ ...user, theme: th.id });
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all space-y-3 cursor-pointer ${
                      th.active 
                        ? 'border-primary-accent bg-primary-accent/5' 
                        : 'border-border-custom hover:border-black/20 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black">{th.name}</span>
                      {th.active && <div className="w-5 h-5 rounded-full bg-primary-accent flex items-center justify-center text-white"><Check className="w-3 h-3" /></div>}
                    </div>
                    <p className="text-[10px] text-black/50 leading-normal">{th.desc}</p>
                    <div className={`h-8 w-full ${th.bg} rounded-md border border-border-custom/50`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ABOUT SECTION */}
          {activeSubTab === 'about' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-black">About ProjectForge AI</h3>
                <p className="text-xs text-black/45">Core details behind the compilation engine.</p>
              </div>

              <div className="p-5 bg-primary-bg rounded-2xl border border-border-custom space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-accent flex items-center justify-center text-white">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-black">ProjectForge AI Core Compiler</h4>
                    <p className="text-[10px] text-black/40">Version 1.4.2 • Stable Client Release</p>
                  </div>
                </div>

                <p className="text-xs text-black/65 leading-relaxed">
                  ProjectForge AI is a specialized specification-generation engine created exclusively to assist engineering students globally in structuring academic project proposals, lab blueprints, and final-year thesis papers.
                </p>

                <p className="text-xs text-black/65 leading-relaxed">
                  The software focuses on five primary engineering branches, translating high-level ideas into pre-vetted bills of materials (BOM), system flowcharts, risk mitigation structures, and potential patent claim briefs.
                </p>
              </div>

              {/* Developer notice */}
              <div className="text-[10px] text-black/40 text-center font-mono">
                No active external API connections. Sandboxed Frontend Prototyping Mode.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
