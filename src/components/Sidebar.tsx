import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FilePlus, 
  History, 
  Settings as SettingsIcon, 
  LogOut, 
  Cpu, 
  Wrench,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  user: UserProfile;
  onLogout: () => void;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Blueprint', path: '/wizard', icon: FilePlus, highlight: true },
    { name: 'Project History', path: '/history', icon: History },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border-custom flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Logo */}
      <div className="p-6 border-b border-border-custom flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-accent flex items-center justify-center text-white shadow-md shadow-primary-accent/10">
          <Cpu className="w-5.5 h-5.5 animate-pulse" />
        </div>
        <div>
          <h1 className="font-display font-semibold text-base tracking-tight text-black flex items-center gap-1.5">
            ProjectForge <span className="text-primary-accent text-xs bg-primary-accent/10 px-1.5 py-0.5 rounded-md font-sans">AI</span>
          </h1>
          <p className="text-[10px] text-black/50 font-sans tracking-tight">Engineering Blueprints</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 mb-2 text-[11px] font-semibold text-black/40 tracking-wider uppercase">
          Workspace
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary-accent/10 text-primary-accent font-semibold' 
                  : 'text-black/70 hover:bg-primary-bg hover:text-black'
                }
              `}
            >
              <Icon className={`w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-105 ${item.highlight ? 'text-primary-accent' : ''}`} />
              <span className="flex-1">{item.name}</span>
              {item.highlight && (
                <span className="flex items-center gap-0.5 text-[10px] bg-primary-accent/10 text-primary-accent px-1.5 py-0.5 rounded-full font-sans font-semibold animate-pulse">
                  <Sparkles className="w-2.5 h-2.5" />
                  New
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer User Info */}
      <div className="p-4 border-t border-border-custom bg-primary-bg/50">
        <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-border-custom">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-10 h-10 rounded-lg object-cover border border-border-custom"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-black truncate">{user.name}</h4>
            <p className="text-[10px] text-black/50 truncate font-mono">{user.branch} • {user.college.split(' ')[0]}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200/50 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
