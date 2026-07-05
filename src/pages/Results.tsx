import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  Wrench, 
  Cpu, 
  BookOpen, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Download,
  Award,
  Calendar,
  Clock,
  ExternalLink,
  Zap,
  HelpCircle,
  Copy,
  Printer
} from 'lucide-react';
import { Blueprint } from '../types';

interface ResultsProps {
  blueprints: Blueprint[];
}

export default function Results({ blueprints }: ResultsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the selected blueprint, default to first or fall back
  const blueprint = blueprints.find(bp => bp.id === id) || blueprints[0];

  // Ask AI state
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { 
      sender: 'ai', 
      text: `Hello! I have generated the complete engineering specifications for "${blueprint?.name || 'this project'}". Ask me anything about configuring the analog filters, microcontrollers, container layers, or the patentability analysis.` 
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [activeTab, setActiveTab] = useState<'Hardware' | 'Software' | 'Architecture'>('Hardware');

  if (!blueprint) {
    return (
      <div className="text-center py-20 bg-white border border-border-custom rounded-2xl m-8 space-y-4">
        <AlertTriangle className="w-12 h-12 text-primary-accent mx-auto" />
        <h3 className="font-display font-bold text-lg text-black">Blueprint Not Found</h3>
        <p className="text-xs text-black/45">The requested architectural blueprint could not be resolved.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-primary-accent text-white text-xs font-semibold rounded-xl"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputVal('');

    // Formulate a custom highly-realistic technical answer based on the user's input and the blueprint branch
    setTimeout(() => {
      let aiText = '';
      const lowercaseUser = userText.toLowerCase();

      if (lowercaseUser.includes('adc') || lowercaseUser.includes('interrupt') || lowercaseUser.includes('sensor')) {
        aiText = `For the ${blueprint.branch} architecture, configure the ADC using Direct Memory Access (DMA) circular buffering. In firmware, enable the Conversion Complete (CC) interrupt. This keeps CPU usage under 5% during high-frequency telemetry. Here is the suggested register setup:
\`\`\`c
// STM32 ADC DMA configuration snippet
hadc1.Instance = ADC1;
hadc1.Init.DMAContinuousRequests = ENABLE;
hadc1.Init.ContinuousConvMode = ENABLE;
HAL_ADC_Start_DMA(&hadc1, (uint32_t*)adc_raw_buffer, BUFFER_SIZE);
\`\`\``;
      } else if (lowercaseUser.includes('patent') || lowercaseUser.includes('novelty') || lowercaseUser.includes('claim')) {
        aiText = `Our patent eligibility analysis highlights the combination of low-power radio communication with multi-spectral optical diodes in the "${blueprint.name}". Focus your patent claim specifically on the localized "dual-active-bridge load balancing algorithm" (Claim 1) and the autonomous hardware fail-safe switches (Claim 2).`;
      } else if (lowercaseUser.includes('error') || lowercaseUser.includes('noise') || lowercaseUser.includes('shield')) {
        aiText = `To mitigate EMI/EMC high-frequency interference on your ${blueprint.hardware[0] || 'mcu'}, we recommend isolating the analog trace loop with a 4-layer PCB layout. Dedicate Layer 2 exclusively as a solid Ground Plane (GND), and place 0.1uF decoupling capacitors immediately adjacent to pin power lines.`;
      } else {
        aiText = `Regarding your inquiry on "${userText}": In a ${blueprint.branch} environment utilizing ${blueprint.techStack[0]}, we must ensure tight signal calibration. We recommend testing the transient responses in MATLAB/Simulink first, then configuring the physical layout using the pre-vetted hardware list: ${blueprint.hardware.slice(0, 2).join(', ')}. Let me know if you would like me to output the complete pin mapping!`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const getBranchColor = (branch: string) => {
    switch(branch) {
      case 'CSE': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'ECE': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'EEE': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'EIE': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Mechanical': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="space-y-8 p-8 animate-fade-in print:p-0 print:bg-white print:text-black">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-black/50 hover:text-black transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick Print / Download Button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white border border-border-custom hover:border-black/30 rounded-xl text-xs font-bold text-black flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-black/50" />
            <span>Download PDF Specs</span>
          </button>
          
          <div className="bg-primary-accent text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Compiled Successfully</span>
          </div>
        </div>
      </div>

      {/* PRINT-ONLY HEADER */}
      <div className="hidden print:block space-y-2 border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">ProjectForge AI Blueprint Spec Sheet</h1>
        <p className="text-sm font-mono text-gray-600">Generated on: {new Date().toLocaleDateString('en-US')} | Verified Local Schema</p>
        <p className="text-xs text-gray-500">Project Name: {blueprint.name}</p>
        <p className="text-xs text-gray-500">Engineering Branch: {blueprint.branch} | Domain: {blueprint.domain}</p>
      </div>

      {/* Main Title Banner */}
      <div className="bg-white border border-border-custom rounded-2xl p-6 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`px-2.5 py-0.5 border rounded-md text-[10px] font-bold uppercase tracking-wider ${getBranchColor(blueprint.branch)}`}>
            {blueprint.branch}
          </span>
          <span className="text-[10px] text-black/45 font-mono">ID: {blueprint.id}</span>
          <span className="text-[10px] text-black/30">•</span>
          <span className="text-[10px] text-black/50 font-medium font-mono">Timeline Budget Constraints: {blueprint.timeline} / {blueprint.budget}</span>
        </div>
        
        <h2 className="font-display font-bold text-xl sm:text-2xl text-black tracking-tight">
          {blueprint.name}
        </h2>
        <p className="text-xs text-black/65 leading-relaxed max-w-3xl">
          {blueprint.idea}
        </p>
      </div>

      {/* Grid Row 1: Health Gauges & Patent Score (Bento Box) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Health Score Box */}
        <div className="bg-white border border-border-custom rounded-2xl p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-black/40">Blueprint Health Rating</h4>
            <p className="text-xs text-black/50">Structural feasibility & design checklist compliance.</p>
          </div>
          
          <div className="flex items-center gap-4 py-2">
            <div className="relative flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="32" className="stroke-border-custom fill-none" strokeWidth="6" />
                <circle cx="40" cy="40" r="32" className="stroke-emerald-500 fill-none" strokeWidth="6" strokeDasharray="201" strokeDashoffset={201 - (201 * (blueprint.healthScore / 100))} strokeLinecap="round" />
              </svg>
              <span className="absolute text-base font-bold text-black font-display">{blueprint.healthScore}%</span>
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Excellent Architecture
              </p>
              <p className="text-[10px] text-black/50 mt-1 leading-normal">Meets standard industry pin layout margins and power budgets.</p>
            </div>
          </div>
        </div>

        {/* Novelty Score Box */}
        <div className="bg-white border border-border-custom rounded-2xl p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-black/40">Patent Novelty Index</h4>
            <p className="text-xs text-black/50">Likelihood of patent eligibility under IEEE guidelines.</p>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="relative flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="32" className="stroke-border-custom fill-none" strokeWidth="6" />
                <circle cx="40" cy="40" r="32" className="stroke-primary-accent fill-none" strokeWidth="6" strokeDasharray="201" strokeDashoffset={201 - (201 * (blueprint.noveltyScore / 100))} strokeLinecap="round" />
              </svg>
              <span className="absolute text-base font-bold text-black font-display">{blueprint.noveltyScore}%</span>
            </div>
            <div>
              <p className="text-xs font-bold text-primary-accent flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Highly Patentable
              </p>
              <p className="text-[10px] text-black/50 mt-1 leading-normal">Combines localized multi-wavelength arrays with low power telemetry.</p>
            </div>
          </div>
        </div>

        {/* Difficulty Box */}
        <div className="bg-white border border-border-custom rounded-2xl p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-black/40">Implementation Difficulty</h4>
            <p className="text-xs text-black/50">Based on team skill limitations.</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-black">
              <span>{blueprint.difficulty} Rating</span>
              <span className="text-[10px] text-black/45 font-mono">Skills required</span>
            </div>
            
            <div className="h-2 w-full bg-primary-bg rounded-full overflow-hidden border border-border-custom/30">
              <div 
                className={`h-full rounded-full ${
                  blueprint.difficulty === 'Easy' ? 'bg-green-500 w-1/4' :
                  blueprint.difficulty === 'Medium' ? 'bg-yellow-500 w-2/4' :
                  blueprint.difficulty === 'Hard' ? 'bg-orange-500 w-3/4' : 'bg-red-500 w-full'
                }`}
              />
            </div>
            <p className="text-[10px] text-black/50 leading-normal">
              Recommended for: {blueprint.difficulty === 'Expert' ? 'Final-year research thesis.' : 'Standard lab evaluation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid Row 2: Technology Tabs & Architecture Block Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Technology Specs Tabs (Col 7) */}
        <div className="lg:col-span-7 bg-white border border-border-custom rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-border-custom pb-3">
            <h3 className="font-display font-bold text-sm text-black">Vetted Component Layout</h3>
            
            {/* Tab Controllers */}
            <div className="flex gap-1 bg-primary-bg p-1 rounded-lg border border-border-custom">
              {['Hardware', 'Software', 'Architecture'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-white text-black shadow-2xs border border-border-custom/40' 
                      : 'text-black/50 hover:text-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Contents */}
          <div className="min-h-72">
            {activeTab === 'Hardware' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-4 bg-primary-bg/50 rounded-xl border border-border-custom space-y-2">
                  <span className="text-[9px] font-bold text-primary-accent uppercase tracking-wider">Bill of Materials (BOM)</span>
                  <p className="text-[11px] text-black/60 leading-normal">Sourced explicitly to maintain low-cost parameters within your {blueprint.budget} budget ceiling.</p>
                </div>

                <div className="space-y-2">
                  {blueprint.hardware.map((hw, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-border-custom/50 rounded-lg bg-white hover:border-black/15 transition-all text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-primary-accent" />
                        <span className="font-mono text-black font-semibold">{hw}</span>
                      </div>
                      <span className="text-[10px] bg-primary-bg border border-border-custom text-black/50 px-2 py-0.5 rounded-md font-sans font-medium">Verified Spec</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'Software' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-4 bg-primary-bg/50 rounded-xl border border-border-custom space-y-2">
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">Frameworks & Operating Libraries</span>
                  <p className="text-[11px] text-black/60 leading-normal">Software libraries pre-selected for maximum firmware compatibility and standard multi-threading.</p>
                </div>

                <div className="space-y-2">
                  {blueprint.software.map((sw, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-border-custom/50 rounded-lg bg-white hover:border-black/15 transition-all text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-mono text-black font-semibold">{sw}</span>
                      </div>
                      <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-600 px-2 py-0.5 rounded-md font-mono">Ready</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'Architecture' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center py-6">
                <div className="w-12 h-12 bg-primary-accent/10 rounded-full flex items-center justify-center mx-auto text-primary-accent">
                  <Layers className="w-5 h-5 animate-pulse" />
                </div>
                <div className="space-y-1.5 max-w-sm mx-auto">
                  <h4 className="text-xs font-bold text-black">Decentralized Signal Processing Layout</h4>
                  <p className="text-[11px] text-black/50 leading-relaxed">
                    Processes dynamic sensor arrays in localized DMA loops. Raw calculations are compiled directly inside the MCU to reduce data lag.
                  </p>
                </div>

                {/* Micro CSS Visual Diagram */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 bg-primary-bg/50 p-4 rounded-xl border border-border-custom max-w-md mx-auto">
                  <div className="px-3 py-2 bg-white border border-border-custom rounded-lg text-[10px] font-mono font-semibold text-black">
                    SENSORS (Analog)
                  </div>
                  <ArrowLeft className="w-4 h-4 text-black/40 transform rotate-180 hidden sm:block" />
                  <div className="px-3 py-2 bg-primary-accent text-white rounded-lg text-[10px] font-mono font-bold">
                    MCU INTERRUPT LOOP
                  </div>
                  <ArrowLeft className="w-4 h-4 text-black/40 transform rotate-180 hidden sm:block" />
                  <div className="px-3 py-2 bg-black text-white rounded-lg text-[10px] font-mono font-semibold">
                    LOCAL APP (React)
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Dynamic Vector/CSS Architecture Box (Col 5) */}
        <div className="lg:col-span-5 bg-white border border-border-custom rounded-2xl p-6 shadow-2xs space-y-5">
          <div>
            <h3 className="font-display font-bold text-sm text-black">System Signal Flow Map</h3>
            <p className="text-xs text-black/40 font-medium">Visual architecture model formulated by the compiler.</p>
          </div>

          {/* Breathtaking CSS Schematic Model */}
          <div className="p-4 bg-primary-bg rounded-xl border border-border-custom flex flex-col items-center justify-center min-h-72 space-y-4">
            <div className="relative w-full max-w-xs p-4 bg-white border border-border-custom rounded-xl space-y-3 shadow-3xs">
              <span className="text-[8px] font-mono font-bold text-primary-accent uppercase">Core Signal Path</span>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-primary-bg border border-border-custom rounded-md text-[10px]">
                  <span className="font-mono text-black">ADC Sampling</span>
                  <span className="text-emerald-600 font-semibold font-mono">44.1 kHz</span>
                </div>
                
                <div className="w-full flex justify-center py-1">
                  <div className="h-4 w-0.5 bg-primary-accent border-dashed border-r border-primary-accent/40" />
                </div>

                <div className="flex items-center justify-between p-2 bg-primary-accent/10 border border-primary-accent/20 rounded-md text-[10px]">
                  <span className="font-mono text-primary-accent font-semibold">Digital Noise Filter</span>
                  <span className="text-primary-accent font-mono">IIR/FIR</span>
                </div>

                <div className="w-full flex justify-center py-1">
                  <div className="h-4 w-0.5 bg-primary-accent border-dashed border-r border-primary-accent/40" />
                </div>

                <div className="flex items-center justify-between p-2 bg-black text-white rounded-md text-[10px]">
                  <span className="font-mono">Local State Model</span>
                  <span className="text-amber-500 font-semibold font-mono">Raft/Consensus</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-center text-black/55 leading-normal max-w-xs">
              This signal architecture maximizes physical transceiver standby lifecycles by batching measurements into isolated 50ms periods.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Row 3: Timeline Cards & Risk Matrices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timeline Steps */}
        <div className="bg-white border border-border-custom rounded-2xl p-6 shadow-2xs space-y-4">
          <div>
            <h3 className="font-display font-bold text-sm text-black">Milestone Sizing Pipeline</h3>
            <p className="text-xs text-black/40">Step-by-step physical and software task allocation.</p>
          </div>

          <div className="space-y-3">
            {blueprint.timelineSteps.map((step, idx) => (
              <div key={idx} className="p-4 border border-border-custom/60 rounded-xl bg-primary-bg/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-black">{step.phase}</h4>
                  <span className="text-[10px] bg-primary-accent/10 text-primary-accent border border-primary-accent/20 px-2 py-0.5 rounded-md font-mono font-bold">
                    {step.duration}
                  </span>
                </div>
                <ul className="space-y-1">
                  {step.tasks.map((task, tidx) => (
                    <li key={tidx} className="text-[11px] text-black/60 flex items-start gap-1.5 leading-relaxed">
                      <span className="text-primary-accent shrink-0 mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Assessment Box */}
        <div className="bg-white border border-border-custom rounded-2xl p-6 shadow-2xs space-y-4">
          <div>
            <h3 className="font-display font-bold text-sm text-black">Active Safety & Mitigation Matrix</h3>
            <p className="text-xs text-black/40">Hardware fail-safes pre-modeled by the simulation engine.</p>
          </div>

          <div className="space-y-3">
            {blueprint.risks.map((risk, idx) => (
              <div key={idx} className="p-4 border border-border-custom/60 rounded-xl bg-red-50/20 border-red-200/20 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    {risk.title}
                  </h4>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                    risk.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {risk.severity} Severity
                  </span>
                </div>
                <p className="text-[11px] text-black/65 leading-relaxed">
                  <span className="font-bold text-black/80">Mitigation: </span>
                  {risk.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Row 4: Future Scope, Patent analysis, and Ask AI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Future Scope & Patents (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Patent analysis */}
          <div className="bg-white border border-border-custom rounded-2xl p-6 shadow-2xs space-y-4">
            <h3 className="font-display font-bold text-sm text-black flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-accent" />
              <span>Patentability Assessment</span>
            </h3>
            <p className="text-xs text-black/70 leading-relaxed bg-primary-bg p-4 rounded-xl border border-border-custom font-medium">
              {blueprint.patentPotential}
            </p>
          </div>

          {/* Future Scope */}
          <div className="bg-white border border-border-custom rounded-2xl p-6 shadow-2xs space-y-3">
            <h3 className="font-display font-bold text-sm text-black">Next-Generation Scale Scope</h3>
            <p className="text-xs text-black/45">Post-prototype optimization suggestions.</p>
            <div className="space-y-2.5 pt-2">
              {blueprint.futureScope.map((scope, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-black/70">
                  <CheckCircle2 className="w-4 h-4 text-primary-accent shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{scope}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Ask AI Panel (Col 7) */}
        <div className="lg:col-span-7 bg-white border border-border-custom rounded-2xl p-6 shadow-2xs flex flex-col h-112 print:hidden">
          <div className="border-b border-border-custom pb-3">
            <h3 className="font-display font-bold text-sm text-black flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-primary-accent" />
              <span>Ask AI Workspace Companion</span>
            </h3>
            <p className="text-xs text-black/40">Inquire about register definitions, schematics, or calibration algorithms.</p>
          </div>

          {/* Messages Console Box */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'self-end items-end ml-auto' : 'self-start items-start'
                }`}
              >
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-primary-accent text-white rounded-br-none' 
                    : 'bg-primary-bg text-black rounded-bl-none border border-border-custom font-medium'
                }`}>
                  {msg.text.includes('```') ? (
                    <div className="space-y-2">
                      <p>{msg.text.split('```')[0]}</p>
                      <pre className="bg-black/90 text-amber-500 font-mono text-[10px] p-3 rounded-lg overflow-x-auto">
                        {msg.text.split('```')[1].replace('c\n', '')}
                      </pre>
                    </div>
                  ) : msg.text}
                </div>
                <span className="text-[9px] text-black/30 font-mono mt-1 px-1.5">
                  {msg.sender === 'user' ? 'Student Workspace' : 'Forge AI'}
                </span>
              </div>
            ))}
          </div>

          {/* Input Chat form */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-border-custom flex gap-2">
            <input 
              type="text" 
              placeholder="e.g. How do I configure the registers for low pass filtration?"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs focus:outline-none focus:border-primary-accent text-black placeholder:text-black/35 font-medium"
            />
            <button
              type="submit"
              className="p-2.5 bg-primary-accent hover:bg-dark-accent text-white rounded-xl transition-colors shrink-0 flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
