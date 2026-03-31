"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Map } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-100 selection:bg-blue-200">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <Map className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="text-xl font-bold text-white tracking-tight hover:text-blue-100 transition-colors">CareerWay</Link>
            </div>
            <div>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-slate-900"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Login Card */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 p-8 sm:p-10 border border-slate-200">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
              <Map className="w-7 h-7 text-white" />
            </div>
            
            {/* Headers */}
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Welcome back
            </h1>
            <p className="text-slate-500 mb-8 leading-relaxed max-w-xs">
              Sign in to access your roadmaps and track your progress
            </p>

            {/* Google Sign In Button */}
            <button 
              onClick={() => signIn("google", { callbackUrl: "/roadmap" })}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 active:scale-[0.98] shadow-sm"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            {/* Terms Footer */}
            <p className="mt-8 text-xs text-slate-400">
              By signing in you agree to our{" "}
              <Link href="#" className="font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
