import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Map, BookOpen, BrainCircuit, Code2, BarChart3, Globe, Sparkles } from "lucide-react";
import PaymentButton from "@/components/PaymentButton";

export default async function Home() {
  const session = await auth();
  let isPaid = false;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { isPaid: true }
    });
    isPaid = user?.isPaid || false;
  }
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
            <SparklesIcon className="w-4 h-4" />
            <span>AI-Powered Career Navigation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-sm">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Perfect</span> Career Path
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-300 mb-10 leading-relaxed">
            Get structured roadmaps, curated resources and AI powered career guidance to navigate your professional journey with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={session ? "/dashboard" : "/roadmap"} className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group">
                {session ? "Go to Dashboard" : "Get Started Free"}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/roadmap" className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 text-base font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
                View Roadmaps
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to succeed</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We provide the tools, guidance, and resources to help you transition into your dream role faster.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Structured Roadmaps</h3>
              <p className="text-slate-600 leading-relaxed">
                Step-by-step guides for various career paths. Know exactly what to learn and in what order to maximize your time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Curated Free Resources</h3>
              <p className="text-slate-600 leading-relaxed">
                We've scoured the web for the best free courses, articles, and videos so you don't have to spend hours searching.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Career Guidance</h3>
              <p className="text-slate-600 leading-relaxed">
                Get personalized advice, interview prep, and resume reviews from our advanced AI mentor tailored to your goals.
              </p>
            </div>
          </div>
        </div>
      </section>
+
+      {/* Career Switch Highlight Section */}
+      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
+        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
+        
+        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
+          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
+            Already in Tech? <span className="text-blue-400">Switch Smarter</span>
+          </h2>
+          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed">
+            Skip what you already know. Learn only what's new. Save months of learning time with our tailored transition paths.
+          </p>
+
+          <div className="grid md:grid-cols-3 gap-6 mb-16">
+            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:border-blue-500/50 transition-all group">
+              <div className="flex items-center gap-3 mb-6">
+                <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
+                  <Code2 className="w-6 h-6" />
+                </div>
+                <span className="font-bold text-slate-200">SE → AI Engineer</span>
+              </div>
+              <p className="text-3xl font-extrabold text-white mb-2">Skip 4 weeks</p>
+              <p className="text-slate-400">Bypass Python basics & DSA modules entirely.</p>
+            </div>
+
+            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:border-indigo-500/50 transition-all group">
+              <div className="flex items-center gap-3 mb-6">
+                <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
+                  <BarChart3 className="w-6 h-6" />
+                </div>
+                <span className="font-bold text-slate-200">DA → AI Engineer</span>
+              </div>
+              <p className="text-3xl font-extrabold text-white mb-2">Skip 3 weeks</p>
+              <p className="text-slate-400">Bypass Mathematics & SQL foundational courses.</p>
+            </div>
+
+            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-left hover:border-purple-500/50 transition-all group">
+              <div className="flex items-center gap-3 mb-6">
+                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
+                  <Globe className="w-6 h-6" />
+                </div>
+                <span className="font-bold text-slate-200">Web Dev → AI Engineer</span>
+              </div>
+              <p className="text-3xl font-extrabold text-white mb-2">Skip 2 weeks</p>
+              <p className="text-slate-400">Bypass Git, HTML/CSS and basic DB concepts.</p>
+            </div>
+          </div>
+
+          <Link href="/career-switch">
+            <button className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-2 mx-auto shadow-2xl shadow-white/5 group">
+              Try Career Switch <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
+            </button>
+          </Link>
+        </div>
+      </section>
+
+      {/* Pricing Section - Only shown for non-Pro users */}
+      {!isPaid && (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-slate-900">Free Plan</h3>
                  <p className="text-slate-500 mt-2">Perfect for exploring career options.</p>
                  <div className="mt-6 flex items-baseline text-5xl font-extrabold">
                    ₹0
                    <span className="ml-1 text-xl font-medium text-slate-500">/forever</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1 text-slate-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                    <span>Access to basic syllabuses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                    <span>Community form access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-slate-300 shrink-0" />
                    <span className="text-slate-400">Full detailed roadmaps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-slate-300 shrink-0" />
                    <span className="text-slate-400">Curated resource links</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-slate-300 shrink-0" />
                    <span className="text-slate-400">Progress tracking</span>
                  </li>
                </ul>
                <Link href={session ? "/roadmap" : "/login"} className="w-full">
                  <button className="w-full py-4 px-6 rounded-full font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
                    {session ? "View Roadmaps" : "Get Started Free"}
                  </button>
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl shadow-blue-900/20 flex flex-col relative overflow-hidden transform md:-translate-y-4">
                {/* Popular badge */}
                <div className="absolute top-5 right-5">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-white">Pro Plan</h3>
                  <p className="text-slate-400 mt-2">Everything you need to master your path.</p>
                  <div className="mt-6 flex items-baseline text-5xl font-extrabold text-white">
                    ₹1
                    <span className="ml-1 text-xl font-medium text-slate-400">/test</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                    <span>Access to basic syllabuses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                    <span>Community form access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                    <span className="text-white">Full detailed roadmaps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                    <span className="text-white">Curated resource links (Courses, etc)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                    <span className="text-white">Interactive progress tracker</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                    <span className="text-white">AI Career Guidance</span>
                  </li>
                </ul>
                <PaymentButton className="w-full py-4 px-6 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30">
                  Upgrade to Pro
                </PaymentButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <Map className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">CareerWay</span>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <div className="text-slate-500 text-sm">
            © 2025 CareerWay. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}
