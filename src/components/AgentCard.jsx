import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  BookOpen, 
  Calendar, 
  FileText, 
  PieChart,
  ArrowUpRight,
  Clock
} from 'lucide-react';

const icons = {
  User,
  BookOpen,
  Calendar,
  FileText,
  PieChart
};

const AgentCard = ({ id, name, description, iconName, createdAt }) => {
  const Icon = icons[iconName] || icons.User;

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-white/20 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative flex flex-col h-full bg-card border border-border rounded-3xl p-8 hover:border-white/10 transition-all duration-300">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border group-hover:border-white/20 transition-all">
            <Icon size={24} className="text-gray-500 group-hover:text-white transition-colors" />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest pl-2">
            <Clock size={12} />
            {createdAt}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform">
          {name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
          {description}
        </p>

        <Link
          to={`/agents/${id}/chat`}
          className="inline-flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest hover:gap-3 transition-all"
        >
          Open Interface
          <ArrowUpRight size={16} className="text-gray-600" />
        </Link>
      </div>
    </div>
  );
};

export default AgentCard;
