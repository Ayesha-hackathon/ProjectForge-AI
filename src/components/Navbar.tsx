import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Plus, 
  Sparkles, 
  HelpCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  title: string;
}

export default function Navbar({ user, title }: NavbarProps) {
  const navigate = useNavigate();

  // Format today's date elegantly
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="h-16 border-b border-border-custom bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Breadcrumbs or Page Title */}
      <div className="flex items-center gap-2">
        <span className="text-black/40 text-xs font-medium uppercase tracking-wider font-sans">ProjectForge AI</span>
        <span className="text-black/30 font-light text-sm">/</span>
        <h2 className="font-display font-semibold text-base tracking-tight text-black">{title}</h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Dynamic status chip showing user's current branch focus */}
        <div className="hidden md:flex items-center gap-1.5 bg-primary-accent/10 text-primary-accent px-2.5 py-1 rounded-full text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-accent animate-ping" />
          <span className="font-mono">{user.branch} Portal</span>
        </div>

        {/* Date visual */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-black/50 bg-primary-bg px-2.5 py-1 rounded-lg border border-border-custom">
          <Clock className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>

        {/* Separator */}
        <div className="h-4 w-px bg-border-custom" />

        {/* Premium Action Trigger */}
        <button
          onClick={() => navigate('/wizard')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-accent hover:bg-dark-accent text-white text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Forge Blueprint</span>
        </button>
      </div>
    </header>
  );
}
