import React from 'react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { 
  Users, 
  UserSquare2, 
  Layers, 
  Activity, 
  BarChart, 
  Globe,
  ShieldCheck,
  Server
} from 'lucide-react';

const AdminDashboard = () => {
  const agents = [
    {
      id: 'admin-students',
      name: 'Student Management Agent',
      description: 'Global control over all student records, admissions, and database integrity.',
      icon: Users
    },
    {
      id: 'admin-faculty',
      name: 'Faculty Management Agent',
      description: 'Master management of all faculty members, payroll systems, and evaluations.',
      icon: UserSquare2
    },
    {
      id: 'admin-curriculum',
      name: 'Course & Curriculum Agent',
      description: 'University-wide curriculum orchestration, program development and accreditation.',
      icon: Layers
    },
    {
      id: 'admin-attendance',
      name: 'Attendance & Schedule Agent',
      description: 'Master scheduler and global attendance monitoring with automated reporting.',
      icon: Activity
    },
    {
      id: 'admin-results',
      name: 'Examination & Results Agent',
      description: 'Final authority on examination results, degree audits, and convocation lists.',
      icon: BarChart
    },
    {
      id: 'admin-analytics',
      name: 'Analytics Agent',
      description: 'High-level institutional research, budget forecasting and ROI analytics.',
      icon: Globe
    }
  ];

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar role="Admin" />
      
      <main className="flex-1 ml-64 p-10">
        <header className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Administration</h1>
            <p className="text-gray-400">Master control panel for University AI Infrastructure.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-secondary/50 border border-border rounded-xl px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-300">SYSTEM STATUS: ONLINE</span>
            </div>
            <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2">
              <Server size={14} /> SYS LOGS
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
