import React from 'react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Agents = () => {
  const agents = [
    {
      id: 'student-profile-1',
      name: 'Academic Profile Analyst',
      description: 'Analyze your current academic standing, CGPA trends and credit completion status.',
      iconName: 'User',
      createdAt: '2 hours ago'
    },
    {
      id: 'attendance-bot',
      name: 'Attendance Guard',
      description: 'Monitor daily attendance and get alerts for low attendance thresholds.',
      iconName: 'Calendar',
      createdAt: 'Yesterday'
    },
    {
      id: 'result-master',
      name: 'Examination Assistant',
      description: 'Instant queries for internal marks, semester results and grade history.',
      iconName: 'FileText',
      createdAt: '3 days ago'
    },
    {
      id: 'elective-guide',
      name: 'Course & Elective Guide',
      description: 'AI recommendation engine for selecting elective courses based on your interests.',
      iconName: 'BookOpen',
      createdAt: '1 week ago'
    }
  ];

  return (
    <div className="flex bg-background min-h-screen text-white">
      <Sidebar role="Student" />
      
      <main className="flex-1 ml-[260px] p-10 max-w-[1400px]">
        <header className="flex justify-between items-end mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">My Agents</h1>
            <p className="text-gray-500">Manage and interact with your custom AI academic instances.</p>
          </div>
          <Link 
            to="/dashboard"
            className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-all shadow-lg"
          >
            <Plus size={18} />
            Create New Agent
          </Link>
        </header>

        {/* Filters and Search */}
        <div className="flex gap-4 mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input 
              className="w-full bg-secondary border border-border rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-white/20 transition-all"
              placeholder="Search your agents..."
            />
          </div>
          <button className="px-6 py-3 bg-secondary border border-border rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-all">
            All Categories
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {agents.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Agents;
