import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ShieldCheck } from 'lucide-react';
import Squares from '../components/Squares';

const SignupPage = () => {
  const [role, setRole] = useState('Student');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/login');
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
      
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-8 backdrop-blur-sm bg-opacity-80">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Join the next-gen University Management System</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-secondary text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                    placeholder="john@university.edu"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Select Role</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Student', 'Faculty', 'HOD', 'Admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                      role === r 
                        ? 'bg-white text-black border-white font-semibold' 
                        : 'bg-secondary text-gray-400 border-border hover:border-gray-500'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-secondary text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-border bg-secondary text-white focus:ring-white/20"
                />
              </div>
              <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
                I agree to the <a href="#" className="text-white hover:underline">Terms of Service</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold bg-white text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all"
            >
              <UserPlus className="h-5 w-5" />
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-white hover:underline">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
