import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import PaymentButton from "@/components/PaymentButton"
import {
  Map,
  Trophy,
  Flame,
  Crown,
  PlayCircle,
  LayoutDashboard,
  Settings,
  Compass,
  ChevronRight,
  Sparkles
} from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  // Use the paymentStatus or role from your session if available
  // E.g., const isPro = session.user.paymentStatus === "PAID";
  const isPro = (session.user as any)?.paymentStatus === "PAID" || false;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* 1. Hero Welcome Section */}
      <section className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="shrink-0 relative">
            {session.user?.image ? (
              <Image 
                src={session.user.image} 
                alt="Profile photo" 
                width={80} 
                height={80} 
                className="rounded-full border-4 border-slate-800 shadow-xl"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-slate-800 shadow-xl">
                {session.user?.name?.charAt(0) || "U"}
              </div>
            )}
            
            {/* Pro Badge overlay */}
            {isPro && (
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 p-1.5 rounded-full border-2 border-slate-900 shadow-lg" title="Pro Member">
                <Crown className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              Welcome back, {session.user?.name?.split(" ")[0] || "Learner"}!
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                isPro 
                  ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" 
                  : "bg-blue-500/10 text-blue-400 border-blue-500/20"
              }`}>
                {isPro ? "PRO MEMBER" : "FREE PLAN"}
              </span>
              <span className="text-slate-400 text-sm hidden sm:inline-block">
                {session.user?.email}
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 space-y-8">
        
        {/* 2. Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Map className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Roadmaps Started</p>
              <p className="text-2xl font-bold text-slate-900">1</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Topics Completed</p>
              <p className="text-2xl font-bold text-slate-900">0</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-slate-900">0 <span className="text-sm font-medium text-slate-500">days</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Plan</p>
              <p className={`text-xl font-bold ${isPro ? "text-yellow-600" : "text-blue-600"}`}>
                {isPro ? "Pro" : "Free"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Column - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 3. My Roadmaps Section */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-blue-600" />
                  Continue Learning
                </h2>
              </div>
              
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Map className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">AI Engineer</h3>
                      <p className="text-sm text-slate-500 font-medium">15 sections • 0 completed</p>
                    </div>
                  </div>
                  <Link href="/roadmap/ai-engineer" className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 group">
                    Continue Journey
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-blue-600">0% Complete</span>
                    <span className="text-slate-400">Next: AI Basics + Python</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full w-0 transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Upgrade to Pro Banner (Conditional) */}
            {!isPro && (
              <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden group">
                {/* Decorative background gradients */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-colors pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                      <Crown className="w-3.5 h-3.5" /> Recommended
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Unlock the full AI Engineer roadmap</h3>
                    <p className="text-slate-400 max-w-md text-sm leading-relaxed">
                      Get access to all 15 sections, curated course links, exclusive projects, and interactive progress tracking.
                    </p>
                  </div>
                  <PaymentButton />
                </div>
              </div>
            )}
            
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-8">
            
            {/* 5. Quick Links */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-500" />
                Quick Links
              </h2>
              
              <ul className="space-y-2">
                <li>
                  <Link href="/roadmap" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center shrink-0 transition-colors">
                      <LayoutDashboard className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="font-semibold text-sm">Browse Roadmaps</span>
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap/ai-engineer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center shrink-0 transition-colors">
                      <Map className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="font-semibold text-sm">AI Engineer Roadmap</span>
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center shrink-0 transition-colors">
                      <Settings className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="font-semibold text-sm">Account Settings</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support / Help Feature */}
            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 mb-2">Need help?</h3>
              <p className="text-sm text-blue-700 mb-4">Join our community Discord or check out the FAQs for guidance.</p>
              <Link href="#" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                Contact Support &rarr;
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
