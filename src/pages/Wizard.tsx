import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Cpu, 
  Wrench, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Layers, 
  Lightbulb, 
  FileText 
} from 'lucide-react';
import { EngineeringBranch } from '../types';

interface WizardProps {
  onAddBlueprint: (bp: {
    name: string;
    branch: EngineeringBranch;
    domain: string;
    idea: string;
    timeline: string;
    budget: string;
    teamSize: string;
    skillLevel: string;
    resources: string;
  }) => string; // returns generated id
}

export default function Wizard({ onAddBlueprint }: WizardProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form states
  const [name, setName] = useState('');
  const [branch, setBranch] = useState<EngineeringBranch>('CSE');
  const [domain, setDomain] = useState('');
  const [idea, setIdea] = useState('');
  const [timeline, setTimeline] = useState('6 Months');
  const [budget, setBudget] = useState('$1,200');
  const [teamSize, setTeamSize] = useState('3 Members');
  const [skillLevel, setSkillLevel] = useState('Advanced');
  const [resources, setResources] = useState('Standard laboratory instruments, microcontrollers');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !idea || !domain) {
      alert('Please complete all fields to generate the blueprint.');
      return;
    }

    const newId = onAddBlueprint({
      name,
      branch,
      domain,
      idea,
      timeline,
      budget,
      teamSize,
      skillLevel,
      resources
    });

    // Take them straight to results
    navigate(`/results/${newId}`);
  };

  const branchPills: { id: EngineeringBranch; label: string }[] = [
    { id: 'CSE', label: 'Computer Science (CSE)' },
    { id: 'ECE', label: 'Electronics & Comm (ECE)' },
    { id: 'EEE', label: 'Electrical & Electronics (EEE)' },
    { id: 'EIE', label: 'Electronics & Inst (EIE)' },
    { id: 'Mechanical', label: 'Mechanical Eng' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-8 animate-fade-in">
      {/* Wizard Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="font-display font-bold text-xl text-black">Blueprint Fabrication Wizard</h2>
          <p className="text-xs text-black/45">Configure your academic parameters to compile pre-vetted hardware, software, and safety specifications.</p>
        </div>
        <div className="flex items-center gap-1.5 bg-primary-accent/15 text-primary-accent px-3 py-1.5 rounded-full text-[11px] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Frictionless Local Compiler</span>
        </div>
      </div>

      {/* Modern Stepper Indicator */}
      <div className="flex items-center gap-2">
        {[
          { num: 1, label: 'Core Scope' },
          { num: 2, label: 'Constraint Boundaries' },
          { num: 3, label: 'Core Statement' }
        ].map((s) => (
          <div key={s.num} className="flex-1 flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
              step >= s.num 
                ? 'bg-primary-accent border-primary-accent text-white' 
                : 'bg-white border-border-custom text-black/30'
            }`}>
              {s.num}
            </div>
            <span className={`text-[11px] font-semibold transition-colors ${
              step >= s.num ? 'text-black' : 'text-black/35'
            }`}>
              {s.label}
            </span>
            {s.num < 3 && <div className="flex-1 h-px bg-border-custom" />}
          </div>
        ))}
      </div>

      {/* Main Form Stepper Container */}
      <div className="bg-white border border-border-custom rounded-2xl p-8 shadow-2xs">
        <form onSubmit={handleGenerate} className="space-y-6">
          
          {/* STEP 1: Core parameters */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-sm text-black">Scope and Identity</h3>
                <p className="text-xs text-black/50">Establish a clear name and select the correct syllabus discipline.</p>
              </div>

              {/* Project Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Project Name</label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3 w-4 h-4 text-black/35" />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Multi-spectral Non-invasive Glucometer"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black placeholder:text-black/30"
                  />
                </div>
              </div>

              {/* Engineering Branch Pills Selection */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Syllabus Branch Focus</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {branchPills.map((pill) => (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => setBranch(pill.id)}
                      className={`px-4 py-3 rounded-xl text-left text-xs font-semibold border transition-all flex items-center justify-between ${
                        branch === pill.id
                          ? 'bg-primary-accent/10 border-primary-accent text-primary-accent'
                          : 'bg-white border-border-custom hover:border-black/20 text-black/75'
                      }`}
                    >
                      <span>{pill.label}</span>
                      <Cpu className={`w-3.5 h-3.5 ${branch === pill.id ? 'opacity-100' : 'opacity-0'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Domain */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Target Domain Subsector</label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-3 w-4 h-4 text-black/35" />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Biophotonics & IoT telemetry, Power Electronics"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black placeholder:text-black/30"
                  />
                </div>
              </div>

              {/* Target Skill Level */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Team Skill Level Capacity</label>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black"
                >
                  <option value="Beginner">Beginner (Basic circuit breadboarding, standard Python code)</option>
                  <option value="Intermediate">Intermediate (Custom APIs, multi-layer standard PCBs, microcontrollers)</option>
                  <option value="Advanced">Advanced (DMA buffers, real-time operating systems, custom enclosures)</option>
                  <option value="Expert">Expert (Silicon-carbide switches, gRPC nodes, FPGA development, patents)</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Feasibility Boundaries */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-sm text-black">Feasibility boundaries</h3>
                <p className="text-xs text-black/50">Determine physical constraints and budget boundaries.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Timeline Option */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Timeline Allocation</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-black/35" />
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black"
                    >
                      <option value="3 Months">3 Months (Short prototype)</option>
                      <option value="6 Months">6 Months (Standard term)</option>
                      <option value="9 Months">9 Months (Full academic cycle)</option>
                      <option value="12 Months">12 Months (Thesis scale)</option>
                    </select>
                  </div>
                </div>

                {/* Budget ceiling */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Estimated Budget Ceiling</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-black/35" />
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black"
                    >
                      <option value="$250">$250 (Low cost / Breadboard)</option>
                      <option value="$500">$500 (Moderate hobbyist)</option>
                      <option value="$1,200">$1,200 (Advanced system)</option>
                      <option value="$3,000">$3,000+ (Industrial funded)</option>
                    </select>
                  </div>
                </div>

                {/* Team size */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Team Resource Size</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-4 h-4 text-black/35" />
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black"
                    >
                      <option value="1 Member">1 Member (Solo / Individual)</option>
                      <option value="2 Members">2 Members</option>
                      <option value="3 Members">3 Members (Recommended standard)</option>
                      <option value="4 Members">4 Members (Full-scale group)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Available Resources */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Pre-existing Lab Resources / Tools</label>
                <div className="relative">
                  <Wrench className="absolute left-3.5 top-3 w-4 h-4 text-black/35" />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Standard multimeters, CAD workstation, basic 3D printers, soldering kit"
                    value={resources}
                    onChange={(e) => setResources(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black placeholder:text-black/30"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Core Statement (Project Idea Description) */}
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-sm text-black">Project vision statement</h3>
                <p className="text-xs text-black/50">Describe the core problem, engineering methodology, and key goals of your proposed system.</p>
              </div>

              {/* Large project idea statement */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Engineering Concept & Desired Outcomes</label>
                <div className="relative">
                  <Lightbulb className="absolute left-3.5 top-3.5 w-4 h-4 text-primary-accent" />
                  <textarea 
                    rows={6}
                    required
                    placeholder="e.g. Design a non-invasive blood glucose band utilizing sub-GHz wireless transmitters combined with optical diodes. We want to process tissue light dispersion internally without cloud servers, protecting patients’ privacy..."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black placeholder:text-black/30 leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* Educational alert box */}
              <div className="p-4 bg-primary-accent/5 border border-primary-accent/15 rounded-xl space-y-1.5">
                <h4 className="text-[11px] font-bold text-primary-accent uppercase tracking-wider">Dynamic Sandbox Compilation</h4>
                <p className="text-[10px] text-black/60 leading-normal">
                  Our custom client compilation engine will parse your statement, identify essential physical ICs, select the appropriate software and firmware layers (e.g. FreeRTOS vs Docker, PyTorch vs Keil IDE), estimate feasibility ratings, and formulate a patent novelty preview. No API keys are needed.
                </p>
              </div>
            </motion.div>
          )}

          {/* Stepper Footer Controls */}
          <div className="pt-6 border-t border-border-custom flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`px-4 py-2 bg-white border border-border-custom rounded-xl text-xs font-bold text-black flex items-center gap-1.5 transition-all ${
                step === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-black/30 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={step === 1 ? !name || !domain : step === 2 ? !resources : false}
                className="px-4.5 py-2.5 bg-primary-accent hover:bg-dark-accent text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-3 bg-primary-accent hover:bg-dark-accent text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-primary-accent/10"
              >
                <Sparkles className="w-4 h-4" />
                <span>Forge Technical Blueprint</span>
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
