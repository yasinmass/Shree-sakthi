import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ChevronDown } from 'lucide-react';
import Squares from '../components/Squares';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Student'
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-background overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Squares 
          speed={0.5}
          squareSize={40}
          direction='diagonal'
          borderColor='#1a1a1a'
          hoverFillColor='#111'
        />
      </div>
      
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-secondary/40 border border-border rounded-2xl shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] overflow-hidden p-10 backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-green-500 mb-2 tracking-tight italic">Responsive <span className="text-white not-italic">formaly</span></h1>
            <p className="text-gray-500 text-sm font-medium">Join the next-gen AI network</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-background text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/30 transition-all text-sm"
                  placeholder="Yogesh"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-600" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-background text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/30 transition-all text-sm"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-600" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-background text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/30 transition-all text-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Role</label>
              <div className="relative">
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="block w-full px-4 py-3 border border-border rounded-xl bg-background text-white appearance-none focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/30 transition-all text-sm"
                >
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="HOD">HOD</option>
                  <option value="Admin">Admin</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold bg-white text-black hover:bg-gray-200 focus:outline-none transition-all mt-4"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-white hover:underline uppercase tracking-tight ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
