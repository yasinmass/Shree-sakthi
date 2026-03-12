import React from 'react';
import Sidebar from '../components/Sidebar';
import AgentCard from '../components/AgentCard';
import { 
  Users, 
  Settings, 
  CheckCircle, 
  UploadCloud, 
  TrendingUp 
} from 'lucide-react';

const FacultyDashboard = () => {
  const agents = [
    {
      id: 'faculty-students',
      name: 'Student Management Agent',
      description: 'View and manage student lists, profiles, and academic requests for your classes.',
      icon: Users
    },
    {
      id: 'manage-course',
      name: 'Course & Curriculum Agent',
      description: 'Update course content, manage syllabi, and organize curriculum materials.',
      icon: Settings
    },
    {
      id: 'mark-attendance',
      name: 'Attendance & Schedule Agent',
      description: 'Record daily attendance, manage class sessions and view schedule overrides.',
      icon: CheckCircle
    },
    {
      id: 'upload-marks',
      name: 'Examination & Results Agent',
      description: 'Upload internal marks, manage assessments, and verify final grade submissions.',
      icon: UploadCloud
    },
    {
      id: 'class-performance',
      name: 'Analytics Agent',
      description: 'Analyze overall class progress, identify struggling students and view grade distributions.',
      icon: TrendingUp
    }
  ];

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar role="Faculty" />
      
      <main className="flex-1 ml-64 p-10">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Faculty Portal</h1>
          <p className="text-gray-400">Manage your classes and students through AI-driven insights.</p>
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

export default FacultyDashboard;
