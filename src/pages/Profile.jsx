import React from 'react';
import Sidebar from '../components/Sidebar';
import { User, Mail, Shield, GraduationCap, MapPin, Camera } from 'lucide-react';

const Profile = () => {
  const profileData = {
    name: "Yogesh",
    email: "yogesh@university.edu",
    role: "Student",
    department: "Computer Science",
    batch: "2022-2026",
    location: "Campus Block A",
  };

  return (
    <div className="flex bg-background min-h-screen text-white">
      <Sidebar role={profileData.role} />
      
      <main className="flex-1 ml-[260px] p-10 max-w-[1000px] mx-auto">
        <header className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
          <p className="text-gray-500">Manage your university credentials and person settings.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar and Basic Info */}
          <div className="md:col-span-1 space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="bg-secondary border border-border rounded-3xl p-8 flex flex-col items-center text-center">
              <div className="relative group mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-black border-2 border-white/10 flex items-center justify-center text-4xl font-black text-white overflow-hidden ring-4 ring-transparent hover:ring-white/5 transition-all">
                  YG
                </div>
                <button className="absolute bottom-0 right-0 p-2.5 bg-white text-black rounded-full shadow-xl hover:scale-110 transition-all">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
              <p className="text-gray-500 text-sm uppercase tracking-widest font-bold mb-6">{profileData.role}</p>
              
              <div className="w-full h-px bg-border mb-6" />
              
              <div className="w-full space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <MapPin size={16} />
                  {profileData.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <GraduationCap size={16} />
                  {profileData.department}
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em] mb-4">Account Security</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-3 rounded-xl hover:bg-secondary transition-all text-sm font-medium border border-transparent hover:border-white/10">Change Password</button>
                <button className="w-full text-left p-3 rounded-xl hover:bg-secondary transition-all text-sm font-medium border border-transparent hover:border-white/10">Two-Factor Auth</button>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-2 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="bg-secondary/40 border border-border rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-8">Personal Details</h3>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest pl-1">Name</p>
                  <p className="bg-background/50 border border-border p-3.5 rounded-xl text-sm font-medium">{profileData.name}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest pl-1">Email</p>
                  <p className="bg-background/50 border border-border p-3.5 rounded-xl text-sm font-medium">{profileData.email}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest pl-1">Department</p>
                  <p className="bg-background/50 border border-border p-3.5 rounded-xl text-sm font-medium">{profileData.department}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest pl-1">Batch</p>
                  <p className="bg-background/50 border border-border p-3.5 rounded-xl text-sm font-medium">{profileData.batch}</p>
                </div>
              </div>

              <div className="mt-12 flex justify-end">
                <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all shadow-lg">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
