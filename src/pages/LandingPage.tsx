import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Cpu, 
  Wrench, 
  Lightbulb, 
  Sparkles, 
  Award, 
  BookOpen, 
  Compass, 
  Activity, 
  ShieldAlert, 
  FileText, 
  HelpCircle, 
  Plus, 
  Minus,
  CheckCircle2
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'CSE' | 'ECE' | 'EEE' | 'EIE' | 'Mechanical'>('CSE');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const branches = [
    {
      id: 'CSE' as const,
      name: 'Computer Science',
      desc: 'Distributed systems, AI agents, mesh clusters, web services, database architectures.',
      icon: Cpu,
      exampleIdea: 'Decentralized Edge-AI Mesh for Smart Grid Real-time Loading Optimization',
      techs: ['Python', 'Docker', 'WebAssembly', 'gRPC', 'PostgreSQL']
    },
    {
      id: 'ECE' as const,
      name: 'Electronics & Comm.',
      desc: 'Sub-GHz communication layers, optical spectroscopy, wearable medical telemetries, circuit routing.',
      icon: Compass,
      exampleIdea: 'Wearable Sub-GigaHertz Non-Invasive Continuous Glucose Monitor Shield',
      techs: ['STM32 Firmware', 'Sub-GHz RF', 'FreeRTOS', 'KiCad PCB']
    },
    {
      id: 'EEE' as const,
      name: 'Electrical & Electronics',
      desc: 'Dual Active Bridge power topologies, grid-tied inverter loops, silicon-carbide switching dynamics.',
      icon: Activity,
      exampleIdea: 'Autonomous Grid-Tied Bidirectional Smart EV Charger Terminal',
      techs: ['C2000 DSP', 'SiC MOSFETs', 'Plecs Simulink', 'Modbus']
    },
    {
      id: 'EIE' as const,
      name: 'Electronics & Inst.',
      desc: 'MEMS transducers, analog instrumentation filters, industrial telemetry, cross-correlation nodes.',
      icon: Wrench,
      exampleIdea: 'MEMS-Based Real-time Pipeline Acoustic Leak Telemetry Array',
      techs: ['Acoustic MEMS', 'Instr. Amps', 'LoRaWAN API', 'Rust Embedded']
    },
    {
      id: 'Mechanical' as const,
      name: 'Mechanical Eng.',
      desc: 'Generative topology, finite element static stress analysis, compliant lattice landing gears.',
      icon: Lightbulb,
      exampleIdea: 'AI-Optimized Generative Design Tri-Copter UAV & Compliant Lattices',
      techs: ['Fusion 360', 'ANSYS FEA', '3D Slicing', 'Carbon Fiber']
    }
  ];

  const features = [
    {
      title: 'Multidisciplinary Core Match',
      desc: 'Tailor technical stacks explicitly across 5 core engineering branches with specialized hardware selection.',
      icon: BookOpen
    },
    {
      title: 'Structured Hardware Sizing',
      desc: 'Get exact specifications for microcontrollers, sensors, power converters, and materials with estimated budgets.',
      icon: Wrench
    },
    {
      title: 'Iterative Risk & Mitigation',
      desc: 'Gain advanced system insight on EMI shielding, skin thermal shifts, and mechanical delaminations with precise safety fixes.',
      icon: ShieldAlert
    },
    {
      title: 'Patent Potential Estimation',
      desc: 'Receive expert analysis on structural novelty and patentability vectors to back up your engineering submissions.',
      icon: Award
    }
  ];

  const faqItems = [
    {
      q: 'Does ProjectForge AI generate mock or fake project data?',
      a: 'Absolutely not. ProjectForge AI models actual industry blueprints, matching real-world sensors, MCU architectures (like STM32, TI DSP), and state-of-the-art frameworks (such as PyTorch Mobile, FreeRTOS, and Embedded Rust) so students learn high-fidelity engineering practices.'
    },
    {
      q: 'Which engineering departments are fully supported?',
      a: 'We offer specialized blueprints for Computer Science Engineering (CSE), Electronics & Communication (ECE), Electrical & Electronics (EEE), Electronics & Instrumentation (EIE), and Mechanical Engineering. You can even combine ideas across boundaries!'
    },
    {
      q: 'Can I customize the generated budget and timeline?',
      a: 'Yes, our Blueprint Wizard allows you to define custom limits for your project budget (from ultra-cheap to industrial-funded), available timeline, team size, skill levels, and pre-existing lab resources to tailor the blueprint.'
    },
    {
      q: 'Is it possible to download the blueprint as a PDF or export details?',
      a: 'Yes! The Results page provides a professional "Download PDF" template print system alongside an "Ask AI" companion box to delve into specific schematic questions.'
    }
  ];

  return (
    <div className="bg-primary-bg min-h-screen text-black flex flex-col font-sans selection:bg-primary-accent/15">
      {/* Header / Nav */}
      <nav className="border-b border-border-custom bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-accent flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-black">
              ProjectForge <span className="text-primary-accent text-xs bg-primary-accent/10 px-1.5 py-0.5 rounded-md font-sans">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-black/70 hover:text-black transition-colors px-3 py-1.5"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/login?mode=signup')}
              className="px-4 py-2 bg-primary-accent hover:bg-dark-accent text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8e3db_1px,transparent_1px),linear-gradient(to_bottom,#e8e3db_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-accent/10 border border-primary-accent/25 rounded-full text-xs font-semibold text-primary-accent mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Engineering Specification Engine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-[1.1] mb-6"
          >
            From raw project idea to a <br className="hidden sm:block" />
            <span className="text-primary-accent">detailed engineering blueprint</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-black/60 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Stop guessing your technology stack, microcontroller interfaces, and budgets. Input your concepts to instantly receive rigorous, student-ready architectural designs, hardware schemas, and patent analyses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-6 py-3.5 bg-primary-accent hover:bg-dark-accent text-white font-semibold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-primary-accent/10 cursor-pointer"
            >
              <span>Build Your First Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#branches"
              className="w-full sm:w-auto px-6 py-3.5 bg-white border border-border-custom hover:bg-primary-bg text-black font-semibold rounded-xl text-sm transition-all duration-200 text-center"
            >
              Explore Branch Specialties
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust Quote / Stats Section */}
      <section className="py-12 border-y border-border-custom bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-extrabold text-black">5+</h3>
            <p className="text-xs text-black/50 font-medium uppercase tracking-wider mt-1">Core Branches</p>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-black">100%</h3>
            <p className="text-xs text-black/50 font-medium uppercase tracking-wider mt-1">No-Code Frontend</p>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-black">Premium</h3>
            <p className="text-xs text-black/50 font-medium uppercase tracking-wider mt-1">Apple Aesthetic</p>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-black">Pre-Vetted</h3>
            <p className="text-xs text-black/50 font-medium uppercase tracking-wider mt-1">Hardware Bills</p>
          </div>
        </div>
      </section>

      {/* Engineering Branches Section */}
      <section id="branches" className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black mb-4">
            Engineered Across All Core Disciplines
          </h2>
          <p className="text-sm text-black/60">
            Select your discipline to see the caliber of architectural planning, software selection, and hardware bills generated by ProjectForge AI.
          </p>
        </div>

        {/* Branch Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {branches.map((b) => {
            const Icon = b.icon;
            return (
              <button
                key={b.id}
                onClick={() => setActiveTab(b.id)}
                className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                  activeTab === b.id
                    ? 'bg-primary-accent border-primary-accent text-white shadow-sm shadow-primary-accent/15'
                    : 'bg-white border-border-custom hover:border-black/30 text-black/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{b.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Body */}
        <div className="bg-white border border-border-custom rounded-2xl p-8 shadow-sm">
          {branches.map((b) => {
            if (b.id !== activeTab) return null;
            const Icon = b.icon;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-5">
                  <div className="w-12 h-12 bg-primary-accent/10 rounded-xl flex items-center justify-center text-primary-accent">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-black">{b.name} Engineering Domain</h3>
                  <p className="text-sm text-black/60 leading-relaxed">{b.desc}</p>

                  <div className="p-4.5 bg-primary-bg rounded-xl border border-border-custom space-y-2">
                    <span className="text-[10px] font-bold text-primary-accent tracking-wider uppercase">Example Generated Idea</span>
                    <h4 className="text-xs font-bold text-black leading-tight">{b.exampleIdea}</h4>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-primary-bg border border-border-custom rounded-xl p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black/40">Standard Stack Specs</h4>
                  <div className="flex flex-wrap gap-2">
                    {b.techs.map((t) => (
                      <span key={t} className="px-3 py-1.5 bg-white border border-border-custom rounded-lg text-xs font-medium text-black/80 font-mono shadow-2xs">
                        {t}
                      </span>
                    ))}
                  </div>

                  <hr className="border-border-custom" />

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-primary-accent shrink-0" />
                      <span className="text-xs text-black/70 font-medium">Auto-calculates power, pin configurations & PCB lines</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-primary-accent shrink-0" />
                      <span className="text-xs text-black/70 font-medium">Provides safety-critical firmware blocks & multi-thread handlers</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-primary-accent shrink-0" />
                      <span className="text-xs text-black/70 font-medium">Mitigates signal attenuation, EMI, and physical stress failures</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-24 bg-white border-t border-border-custom">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black mb-4">
              Engineered with Absolute Rigor
            </h2>
            <p className="text-sm text-black/60">
              Other AI tools output basic generic text blocks. ProjectForge AI models technical interfaces, risk factors, and budgets with proper engineering precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="p-6 bg-primary-bg rounded-2xl border border-border-custom hover:border-primary-accent/50 hover:shadow-xs transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-10 h-10 bg-white border border-border-custom rounded-xl flex items-center justify-center text-primary-accent group-hover:bg-primary-accent group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-sm text-black">{f.title}</h3>
                    <p className="text-xs text-black/65 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black mb-4">
            The Blueprint Fabrication Pipeline
          </h2>
          <p className="text-sm text-black/60">
            A linear, distraction-free workflow that converts fleeting engineering thoughts into technical guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-14 left-24 right-24 h-0.5 bg-border-custom z-0" />

          {[
            {
              step: '01',
              title: 'Detail Your Parameters',
              desc: 'Select your core branch, timeline limits, component budget ceilings, available team skills, and target domain.'
            },
            {
              step: '02',
              title: 'Forge Technical Blueprint',
              desc: 'Our engine processes requirements and designs the hardware schematics, firmware modules, and core software structures.'
            },
            {
              step: '03',
              title: 'Validate & Present',
              desc: 'Review patent eligibility ratings, dynamic health statistics, active safety mitigations, and export full PDF specs.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-border-custom rounded-2xl p-8 relative z-10 text-center flex flex-col justify-between h-full group hover:shadow-xs transition-all">
              <div>
                <span className="font-mono text-3xl font-bold text-primary-accent/20 group-hover:text-primary-accent/40 transition-colors block mb-4">{item.step}</span>
                <h3 className="font-display text-base font-bold text-black mb-3">{item.title}</h3>
                <p className="text-xs text-black/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white border-y border-border-custom px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black mb-4">
              Praised by Engineering Scholars
            </h2>
            <p className="text-sm text-black/60">
              Students and professors from top universities use ProjectForge AI to frame thesis scopes and validate final-year projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "“ProjectForge saved our team three weeks of hardware testing. The MEMS acoustics selection and high-pass frequency calculation instructions were perfectly suited to our pipeline sensor board.”",
                author: "Vikram R. Sridhar",
                role: "Instrumentation Student",
                college: "NIT Trichy"
              },
              {
                text: "“The Apple-like clean dashboard of ProjectForge is a breath of fresh air. Getting silicon-carbide MOSFET recommendations with exact safety-critical gate-driver specs feels extremely professional.”",
                author: "Pooja Deshmukh",
                role: "Electrical & Power Major",
                college: "BITS Pilani"
              },
              {
                text: "“As a CSE student, planning microcontrollers and RF impedance triggers for our IoT grid was highly confusing. ProjectForge bridged the gap between code design and embedded hardware.”",
                author: "Ananya Mehta",
                role: "Computer Science Scholar",
                college: "IIT Bombay"
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-primary-bg border border-border-custom rounded-2xl p-6 flex flex-col justify-between">
                <p className="text-xs text-black/75 italic leading-relaxed mb-6">
                  {t.text}
                </p>
                <div>
                  <h4 className="text-xs font-bold text-black">{t.author}</h4>
                  <p className="text-[10px] text-black/50 font-medium">{t.role} • {t.college}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-3xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black mb-4">
            Frequently Asked Queries
          </h2>
          <p className="text-sm text-black/60">
            Everything you need to know about ProjectForge’s architectural limits.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className="border border-border-custom rounded-xl bg-white overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-xs sm:text-sm text-black hover:bg-primary-bg transition-colors"
              >
                <span>{item.q}</span>
                {openFaq === idx ? (
                  <Minus className="w-4 h-4 text-primary-accent" />
                ) : (
                  <Plus className="w-4 h-4 text-black/60" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-black/60 border-t border-border-custom/50 leading-relaxed bg-primary-bg/25">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-custom bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary-accent flex items-center justify-center text-white font-bold text-xs shadow-xs">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <span className="font-display font-semibold text-sm tracking-tight text-black">
              ProjectForge <span className="text-primary-accent font-sans">AI</span>
            </span>
          </div>

          <p className="text-xs text-black/40 font-mono">
            Designed to support Indian and global Engineering Students. No backend or API connection active.
          </p>

          <div className="flex items-center gap-4 text-xs text-black/50 font-medium">
            <a href="#branches" className="hover:text-black transition-colors">Specialties</a>
            <span>•</span>
            <span className="cursor-pointer" onClick={() => navigate('/login')}>Sign In</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
