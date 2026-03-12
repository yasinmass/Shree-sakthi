import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  UserCircle, 
  LogOut,
  Shield,
  MessageSquarePlus,
  Home
} from 'lucide-react';

const Sidebar = ({ role = "Student" }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard || Home },
    { name: 'Agents', path: '/agents', icon: Shield || Users },
    { name: 'Profile', path: '/profile', icon: UserCircle || Users },
  ];

  return (
    <aside className="w-[260px] min-h-screen bg-secondary border-r border-border flex flex-col fixed left-0 top-0 z-50 transition-all duration-300">
      <div className="p-4 flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-2 mb-8 mt-2">
          <img src="/erp-green.png" alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-green-500 font-bold text-xl tracking-tight hidden sm:block italic">Responsive<span className="text-gray-400 font-normal ml-1">formaly</span></span>
        </div>

        {/* New Chat Button Style */}
        <NavLink 
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold mb-6 bg-card border border-border text-white hover:bg-accent transition-all group shadow-sm hover:shadow-[0_0_15px_-5px_rgba(255,255,255,0.1)]"
        >
          <MessageSquarePlus size={18} className="text-gray-400 group-hover:text-white" />
          New Agent Query
        </NavLink>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1">
          <div className="px-2 mb-2">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Menu</p>
          </div>
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
            >
              {({ isActive }) => (
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group
                  ${isActive 
                    ? 'bg-accent/50 text-white border border-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-accent'}
                `}>
                  <item.icon size={18} className={`${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'} transition-colors`} />
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profile / Bottom Section */}
        <div className="mt-auto space-y-4 pt-4 border-t border-border">
          <div className="bg-card/50 rounded-2xl p-4 border border-border hover:border-white/10 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black border border-border overflow-hidden ring-0 group-hover:ring-2 ring-white/20 transition-all">
                <div className="w-full h-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                  YG
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">Yogesh</p>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{role}</p>
              </div>
            </div>
          </div>
          
          <NavLink 
            to="/login" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-white hover:bg-background transition-all w-full"
          >
            <LogOut size={18} />
            Sign Out
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
