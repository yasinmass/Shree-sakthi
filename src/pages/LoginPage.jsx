import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Github } from 'lucide-react';
import Squares from '../components/Squares';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate auth for demo
    if (email.includes('student')) navigate('/student');
    else if (email.includes('faculty')) navigate('/faculty');
    else if (email.includes('hod')) navigate('/hod');
    else navigate('/admin');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-background overflow-hidden">
      <Squares 
        speed={0.5}
        squareSize={40}
        direction='diagonal'
        borderColor='#1a1a1a'
        hoverFillColor='#222'
      />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-8 backdrop-blur-sm bg-opacity-80">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to University AI Agent System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-secondary text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                  placeholder="admin@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-secondary text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border bg-secondary text-white focus:ring-white/20"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-white hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold bg-white text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all"
            >
              <LogIn className="h-5 w-5" />
              Sign In
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-border rounded-xl text-sm font-medium text-white bg-secondary hover:bg-border transition-all">
                <Github className="h-5 w-5" />
                GitHub SSO
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-white hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
