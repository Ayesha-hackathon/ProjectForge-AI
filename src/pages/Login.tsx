import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Cpu, ArrowRight, ShieldCheck, Mail, Lock, User, School, Sparkles } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // States: 'signin' | 'signup' | 'forgot'
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'signup') {
      setMode('signup');
    } else {
      setMode('signin');
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setSuccessMsg('Reset link sent to your registered email address!');
      setTimeout(() => {
        setSuccessMsg('');
        setMode('signin');
      }, 3000);
      return;
    }

    // Direct redirection to simulate login success
    setSuccessMsg(mode === 'signup' ? 'Account constructed successfully!' : 'Access granted!');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="bg-primary-bg min-h-screen text-black flex items-center justify-center p-6 font-sans relative">
      {/* Background Decorative Vector Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8e3db_1px,transparent_1px),linear-gradient(to_bottom,#e8e3db_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-accent text-white shadow-lg shadow-primary-accent/10 mb-4 cursor-pointer" onClick={() => navigate('/')}>
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-2xl tracking-tight text-black">ProjectForge AI</h2>
          <p className="text-xs text-black/50 mt-1.5">From Idea to Engineering Blueprint</p>
        </div>

        {/* Auth Card */}
        <motion.div 
          layout
          className="bg-white border border-border-custom rounded-2xl p-8 shadow-sm"
        >
          {successMsg ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto border border-green-100">
                <ShieldCheck className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="font-display font-semibold text-base text-black">{successMsg}</h3>
              <p className="text-xs text-black/40">Synchronizing workspace workspace configuration...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display font-bold text-lg text-black mb-1">
                {mode === 'signin' && 'Welcome Back'}
                {mode === 'signup' && 'Create Your Portfolio'}
                {mode === 'forgot' && 'Account Recovery'}
              </h3>
              <p className="text-xs text-black/50 mb-6">
                {mode === 'signin' && 'Sign in to access your saved blueprint repositories.'}
                {mode === 'signup' && 'Equip yourself with structured technical blueprints.'}
                {mode === 'forgot' && 'Provide your email to generate a custom recovery link.'}
              </p>

              {mode === 'signup' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-black/35" />
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Ayesha Patnaik"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black placeholder:text-black/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Engineering College</label>
                    <div className="relative">
                      <School className="absolute left-3.5 top-3 w-4 h-4 text-black/35" />
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. National Institute of Tech"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black placeholder:text-black/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Branch Department</label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black"
                    >
                      <option value="CSE">Computer Science (CSE)</option>
                      <option value="ECE">Electronics & Communication (ECE)</option>
                      <option value="EEE">Electrical & Electronics (EEE)</option>
                      <option value="EIE">Electronics & Instrumentation (EIE)</option>
                      <option value="Mechanical">Mechanical Engineering</option>
                    </select>
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-black/35" />
                  <input 
                    type="email" 
                    required
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black placeholder:text-black/30"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-black/60 uppercase tracking-wider">Password</label>
                    {mode === 'signin' && (
                      <button 
                        type="button" 
                        onClick={() => setMode('forgot')}
                        className="text-[10px] text-primary-accent hover:text-dark-accent font-semibold transition-colors"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-black/35" />
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-primary-bg border border-border-custom rounded-xl text-xs font-medium focus:outline-none focus:border-primary-accent transition-all text-black placeholder:text-black/30"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-primary-accent hover:bg-dark-accent text-white font-semibold rounded-xl text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>
                  {mode === 'signin' && 'Sign In to Workspace'}
                  {mode === 'signup' && 'Construct Portfolio'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Navigation triggers */}
              <div className="pt-4 border-t border-border-custom text-center text-[11px] text-black/50 space-y-1">
                {mode === 'signin' && (
                  <p>
                    Don't have an engineering portfolio yet?{' '}
                    <button 
                      type="button" 
                      onClick={() => setMode('signup')}
                      className="text-primary-accent font-semibold hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                )}
                {mode === 'signup' && (
                  <p>
                    Already possess a portfolio workspace?{' '}
                    <button 
                      type="button" 
                      onClick={() => setMode('signin')}
                      className="text-primary-accent font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                )}
                {mode === 'forgot' && (
                  <p>
                    Remembered your password?{' '}
                    <button 
                      type="button" 
                      onClick={() => setMode('signin')}
                      className="text-primary-accent font-semibold hover:underline"
                    >
                      Back to Sign In
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </motion.div>

        {/* Floating security guarantee */}
        <div className="flex items-center justify-center gap-1.5 mt-6 text-[10px] text-black/40">
          <ShieldCheck className="w-3.5 h-3.5 text-primary-accent" />
          <span>Local Sandbox Engine • Security Vetted Academic Workspace</span>
        </div>
      </div>
    </div>
  );
}
