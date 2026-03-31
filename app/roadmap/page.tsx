import Link from "next/link";
import { 
  Map, 
  BrainCircuit, 
  Code, 
  BarChart, 
  Cloud, 
  Settings, 
  Shield, 
  Search,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  Lock
} from "lucide-react";

// The roadmaps data for dynamically rendering the grid
const cards = [
  {
    id: 1,
    title: "AI Engineer",
    description: "Master Machine Learning, Deep Learning, Gen AI and become a job-ready AI Engineer",
    icon: <BrainCircuit className="w-8 h-8 text-blue-600" />,
    iconBg: "bg-blue-100",
    badges: ["32 Weeks", "Beginner Friendly"],
    stats: ["15 Sections", "Free + Pro"],
    isAvailable: true,
    link: "/roadmap/ai-engineer"
  },
  {
    id: 2,
    title: "Web Developer",
    description: "From HTML basics to full-stack development with React, Node.js and databases",
    icon: <Code className="w-8 h-8 text-purple-600" />,
    iconBg: "bg-purple-100",
    badges: ["24 Weeks", "Beginner Friendly"],
    stats: ["12 Sections", "Free + Pro"],
    isAvailable: false,
    link: "#"
  },
  {
    id: 3,
    title: "Data Scientist",
    description: "Learn data analysis, visualization, statistical modeling and business insights",
    icon: <BarChart className="w-8 h-8 text-green-600" />,
    iconBg: "bg-green-100",
    badges: ["20 Weeks", "Intermediate"],
    stats: ["10 Sections", "Free + Pro"],
    isAvailable: false,
    link: "#"
  },
  {
    id: 4,
    title: "Cloud Engineer",
    description: "Master AWS, Azure and GCP to build and deploy scalable cloud infrastructure",
    icon: <Cloud className="w-8 h-8 text-cyan-600" />,
    iconBg: "bg-cyan-100",
    badges: ["16 Weeks", "Intermediate"],
    stats: ["8 Sections", "Free + Pro"],
    isAvailable: false,
    link: "#"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    description: "CI/CD pipelines, Docker, Kubernetes, monitoring and infrastructure as code",
    icon: <Settings className="w-8 h-8 text-orange-600" />,
    iconBg: "bg-orange-100",
    badges: ["20 Weeks", "Intermediate"],
    stats: ["10 Sections", "Free + Pro"],
    isAvailable: false,
    link: "#"
  },
  {
    id: 6,
    title: "Cybersecurity Engineer",
    description: "Network security, ethical hacking, penetration testing and security operations",
    icon: <Shield className="w-8 h-8 text-red-600" />,
    iconBg: "bg-red-100",
    badges: ["28 Weeks", "Intermediate"],
    stats: ["14 Sections", "Free + Pro"],
    isAvailable: false,
    link: "#"
  }
];

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">

      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-sm">
            Explore Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Roadmaps</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Choose your career path and get a structured step-by-step learning guide
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search roadmaps..." 
              className="w-full bg-slate-800/80 backdrop-blur-md border border-slate-700 text-white placeholder-slate-400 rounded-full py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-xl"
            />
          </div>

          {/* Filter Badges */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mt-8">
            {["All", "Tech", "AI/ML", "Web Dev", "Data", "Cloud"].map((filter, i) => (
              <button 
                key={filter} 
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  i === 0 
                    ? "bg-blue-600 text-white border-transparent cursor-default shadow-md shadow-blue-600/20" 
                    : "bg-slate-800/60 text-slate-300 border border-slate-700 hover:bg-slate-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`bg-white rounded-2xl border border-slate-200 p-8 flex flex-col ${
                card.isAvailable 
                  ? "shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group" 
                  : "opacity-60 grayscale cursor-not-allowed"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start gap-5 mb-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{card.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {card.badges.map((badge, idx) => (
                      <span key={idx} className="text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200/60 px-2 py-1 rounded-md flex items-center gap-1.5">
                        {idx === 0 ? <Clock className="w-3 h-3 text-slate-400" /> : <Sparkles className="w-3 h-3 text-yellow-500" />}
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Description */}
              <p className="text-slate-600 text-[15px] leading-relaxed flex-1 mb-8">
                {card.description}
              </p>

              {/* Stats Row (Only for Available) */}
              {card.isAvailable && (
                <div className="flex items-center gap-5 text-sm font-semibold text-slate-500 mb-8 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-500" />
                    {card.stats[0]}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-orange-400" />
                    {card.stats[1]}
                  </div>
                </div>
              )}
              {!card.isAvailable && <div className="mt-8 border-t border-slate-50"></div>}

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between mt-auto">
                {card.isAvailable ? (
                  <>
                    <span className="px-3.5 py-1.5 bg-green-100 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wide rounded-full">
                      Available Now
                    </span>
                    <Link href={card.link} className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors overflow-hidden relative">
                      View Roadmap <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="px-3.5 py-1.5 bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wide rounded-full">
                      Coming Soon
                    </span>
                    <button disabled className="px-5 py-2.5 bg-slate-100 border border-slate-200 text-slate-400 rounded-xl text-sm font-semibold cursor-not-allowed">
                      Notify Me
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Banner Area */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 drop-shadow-sm">Can't find your career path?</h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            We're adding new roadmaps every month. Join our waitlist to get notified immediately when we launch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full sm:flex-1 bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-white placeholder-slate-400 rounded-full py-3.5 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-md"
            />
            <button className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* Shared Footer */}
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
