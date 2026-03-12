import React from 'react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { 
  User, 
  BookOpen, 
  Calendar, 
  FileText, 
  PieChart,
  Zap 
} from 'lucide-react';

const StudentDashboard = () => {
  const agents = [
    {
      id: 'student-profile',
      name: 'Student Management Agent',
      description: 'View and manage your academic profile, person details and enrollment status.',
      icon: User
    },
    {
      id: 'enrolled-courses',
      name: 'Course & Curriculum Agent',
      description: 'Access your currently enrolled courses, syllabi, and learning resources.',
      icon: BookOpen
    },
    {
      id: 'view-attendance',
      name: 'Attendance & Schedule Agent',
      description: 'Monitor your attendance records and upcoming class schedules across all courses.',
      icon: Calendar
    },
    {
      id: 'view-results',
      name: 'Examination & Results Agent',
      description: 'Check your latest exam results, grade sheets, and performance history.',
      icon: FileText
    },
    {
      id: 'personal-analytics',
      name: 'Analytics Agent',
      description: 'Deep dive into your learning patterns and academic performance insights.',
      icon: PieChart
    }
  ];

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar role="Student" />
      
      <main className="flex-1 ml-64 p-10">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Academic Dashboard</h1>
          <p className="text-gray-400">Welcome back, Student. Your AI agents are ready.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-all group">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center border border-border group-hover:border-white/20">
                    <Zap size={18} className="text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">AI Agent updated your attendance record</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
