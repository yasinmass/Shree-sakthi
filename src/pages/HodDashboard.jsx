import React from 'react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { 
  Users, 
  UserSquare2, 
  Layers, 
  Activity, 
  BarChart, 
  Globe 
} from 'lucide-react';

const HodDashboard = () => {
  const agents = [
    {
      id: 'hod-all-students',
      name: 'Student Management Agent',
      description: 'Department-wide student data, enrollment trends, and academic standing monitoring.',
      icon: Users
    },
    {
      id: 'hod-faculty',
      name: 'Faculty Management Agent',
      description: 'Monitor faculty workload, course assignments, and departmental performance metrics.',
      icon: UserSquare2
    },
    {
      id: 'hod-curriculum',
      name: 'Course & Curriculum Agent',
      description: 'Review and manage departmental curriculum, course approvals, and academic planning.',
      icon: Layers
    },
    {
      id: 'hod-attendance',
      name: 'Attendance & Schedule Agent',
      description: 'Departmental attendance oversight, scheduling conflicts and resource allocation.',
      icon: Activity
    },
    {
      id: 'hod-results',
      name: 'Examination & Results Agent',
      description: 'Review department-wide examination results, grade distributions and moderation.',
      icon: BarChart
    },
    {
      id: 'hod-analytics',
      name: 'Analytics Agent',
      description: 'Comprehensive departmental analytics, research output, and strategic growth insights.',
      icon: Globe
    }
  ];

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar role="HOD" />
      
      <main className="flex-1 ml-64 p-10">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Departmental Overview</h1>
          <p className="text-gray-400">Strategic management and oversight for the Department of Artificial Intelligence.</p>
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

export default HodDashboard;
