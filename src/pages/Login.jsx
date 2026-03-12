import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import Squares from '../components/Squares';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate navigation to dashboard
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
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-green-500 mb-3 tracking-tight italic">Responsive <span className="text-white not-italic">formaly</span></h1>
            <p className="text-gray-500 text-sm font-medium">Professional AI Agent Platform</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-600" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-background text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/30 transition-all text-sm"
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
                <a href="#" className="text-[11px] font-bold text-white uppercase tracking-widest hover:underline opacity-50 hover:opacity-100 transition-all">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-600" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-background text-white placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/30 transition-all text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold bg-white text-black hover:bg-gray-200 focus:outline-none transition-all mt-4"
            >
              Sign In
              <LogIn className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-white hover:underline uppercase tracking-tight ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
