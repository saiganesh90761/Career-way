"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Code2, 
  BarChart3, 
  Globe, 
  Terminal, 
  BookOpen, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Check,
  Brain,
  Zap,
  Target,
  Search,
  CheckCircle,
  Clock,
  Book,
  ChevronRight
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// --- Types ---
interface Role {
  id: string;
  title: string;
  icon: LucideIcon;
  skills: string[];
  displaySkills: string[];
}

interface RoadmapSection {
  id: number;
  title: string;
  topics: string[];
  requiredSkills: string[]; // Skills that, if known, cover parts of this section
  fullCoverSkills?: string[]; // If known, entire section is skipped
}

// --- Data ---

const roles: Role[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    icon: Code2,
    skills: ["python", "dsa", "git", "sql", "algorithms", "oop", "problem solving", "data structures"],
    displaySkills: ["Python", "DSA", "Git", "SQL", "Problem Solving"]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    icon: BarChart3,
    skills: ["python", "sql", "pandas", "numpy", "statistics", "matplotlib", "excel", "data visualization"],
    displaySkills: ["Python", "SQL", "Pandas", "Statistics", "Excel"]
  },
  {
    id: "web-developer",
    title: "Web Developer",
    icon: Globe,
    skills: ["javascript", "git", "apis", "databases", "css", "html", "frontend", "react", "sql"],
    displaySkills: ["JavaScript", "Git", "APIs", "Databases", "CSS"]
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    icon: Terminal,
    skills: ["docker", "git", "ci/cd", "cloud", "linux", "kubernetes", "terraform", "monitoring"],
    displaySkills: ["Docker", "Git", "CI/CD", "Cloud", "Linux"]
  },
  {
    id: "cs-student",
    title: "Computer Science Student",
    icon: BookOpen,
    skills: ["python", "dsa", "git", "oop", "basic math", "c/c++", "computer networks", "os"],
    displaySkills: ["Python", "DSA", "Git", "OOP", "Basic Math"]
  },
  {
    id: "no-tech",
    title: "No Tech Background",
    icon: User,
    skills: [],
    displaySkills: ["Nothing, start from scratch"]
  }
];

const targetRole = {
  id: "ai-engineer",
  title: "AI Engineer",
  icon: Brain,
  requiredSkills: [
    "python", "dsa", "sql", "mathematics", "statistics", "machine learning", 
    "deep learning", "neural networks", "pytorch", "tensorflow", "nlp", 
    "computer vision", "llms"
  ]
};

const aiEngineerRoadmap: RoadmapSection[] = [
  {
    id: 1,
    title: "Week 1 — AI Basics + Python",
    topics: ["AI Basics", "ML Overview", "DL Overview", "NLP Overview", "Gen AI", "Agentic AI", "Variables", "Strings", "Lists", "Dictionaries", "Loops", "Functions", "Lambda", "Modules", "File Handling", "Exception Handling", "Classes & Objects"],
    requiredSkills: ["python"],
  },
  {
    id: 2,
    title: "Week 2 — Data Structures & Algorithms",
    topics: ["Big O Notation", "Arrays", "Hash Table", "Linked List", "Stack", "Queue", "Tree", "Graph", "Binary Search", "Bubble Sort", "Recursion"],
    requiredSkills: ["dsa"],
    fullCoverSkills: ["dsa"]
  },
  {
    id: 3,
    title: "Week 3 — Advanced Python",
    topics: ["Inheritance", "Generators", "Iterators", "List Comprehensions", "Decorators", "Multithreading", "Multiprocessing"],
    requiredSkills: ["python", "oop"],
    fullCoverSkills: ["python", "oop"]
  },
  {
    id: 4,
    title: "Week 4 — Git & GitHub",
    topics: ["Version Control", "Git Basics", "add/commit/push", "Branches", "HEAD", "Diff", "Merge", "Pull Requests"],
    requiredSkills: ["git"],
    fullCoverSkills: ["git"]
  },
  {
    id: 5,
    title: "Week 5 — NumPy, Pandas, SQL",
    topics: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "SQL Basics", "SELECT", "WHERE", "JOINs"],
    requiredSkills: ["numpy", "pandas", "sql", "matplotlib"],
    fullCoverSkills: ["numpy", "pandas", "sql"]
  },
  {
    id: 6,
    title: "Week 6-8 — Math & Statistics for AI",
    topics: ["Linear Algebra", "Vectors", "Matrices", "Calculus", "Probability", "Normal Distribution", "Hypothesis Testing", "p-value", "Confidence Intervals", "Mean", "Median", "Mode", "Variance", "Standard Deviation", "Central Limit Theorem"],
    requiredSkills: ["mathematics", "statistics"],
    fullCoverSkills: ["mathematics", "statistics"]
  },
  {
    id: 7,
    title: "Week 9-11 — Machine Learning",
    topics: ["Supervised Learning", "Unsupervised Learning", "Linear Regression", "Logistic Regression", "Gradient Descent", "Decision Tree", "Random Forest", "XGBoost", "Model Evaluation", "MSE", "MAE", "F1 Score", "ROC Curve", "GridSearchCV", "K-Means", "DBScan", "PCA"],
    requiredSkills: ["machine learning"],
    fullCoverSkills: ["machine learning"]
  },
  {
    id: 8,
    title: "Week 12-13 — MLOps & FastAPI",
    topics: ["FastAPI", "REST APIs", "MLFlow", "Experiment Tracking", "Docker", "Kubernetes", "CI/CD", "AWS", "Azure"],
    requiredSkills: ["docker", "ci/cd", "cloud"],
  },
  {
    id: 9,
    title: "Week 14 — ML Projects",
    topics: ["Property Price Prediction", "Data Cleaning", "Feature Engineering", "Model Building", "Hyperparameter Tuning", "Flask/FastAPI Backend", "AWS Deployment", "Portfolio Building"],
    requiredSkills: [],
  },
  {
    id: 10,
    title: "Week 15-18 — Deep Learning",
    topics: ["Neural Networks", "Forward Propagation", "Back Propagation", "Multilayer Perceptron", "CNN", "RNN", "LSTM", "Transformers", "PyTorch", "TensorFlow"],
    requiredSkills: ["deep learning", "neural networks", "pytorch", "tensorflow"],
    fullCoverSkills: ["deep learning", "neural networks", "pytorch", "tensorflow"]
  },
  {
    id: 11,
    title: "Week 19-21 — NLP or Computer Vision",
    topics: ["Regex", "TF-IDF", "Word2Vec", "Embeddings", "Naive Bayes", "SpaCy", "NLTK", "BERT", "OpenCV", "YOLO", "Image Processing", "CNN"],
    requiredSkills: ["nlp", "computer vision"],
    fullCoverSkills: ["nlp", "computer vision"]
  },
  {
    id: 12,
    title: "Week 22-24 — Gen AI & Agentic AI",
    topics: ["LLMs", "Vector Databases", "Embeddings", "RAG", "LangChain", "MCP", "LangGraph", "CrewAI", "LLM Fine Tuning", "Agentic AI"],
    requiredSkills: ["llms"],
    fullCoverSkills: ["llms"]
  },
  {
    id: 13,
    title: "Week 25-27 — Gen AI Projects",
    topics: ["LLM Projects", "RAG Systems", "Agentic Applications", "Real World AI"],
    requiredSkills: [],
  },
  {
    id: 14,
    title: "Week 28-29 — Unguided Projects",
    topics: ["RAG Chatbot with RBAC", "NLP Drug Detection", "Portfolio Website", "GitHub Projects", "LinkedIn Building"],
    requiredSkills: [],
  },
  {
    id: 15,
    title: "Week 30-32 — Azure or AWS",
    topics: ["Azure Fundamentals", "Resource Groups", "Azure ML", "OpenAI Service", "AWS S3", "IAM", "SageMaker", "Bedrock", "MLOps Pipelines", "Model Monitoring", "CI/CD"],
    requiredSkills: ["cloud"],
  }
];

export default function CareerSwitchPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [resultsVisible, setResultsVisible] = useState(false);

  // Logic for calculation
  const { skippedSkills, toLearnSkills, filteredRoadmap } = useMemo(() => {
    if (!selectedRole) return { skippedSkills: [], toLearnSkills: [], filteredRoadmap: [] };

    const role = roles.find(r => r.id === selectedRole);
    if (!role) return { skippedSkills: [], toLearnSkills: [], filteredRoadmap: [] };

    const currentSkills = new Set(role.skills);
    
    const overlap = targetRole.requiredSkills.filter(skill => currentSkills.has(skill));
    const needed = targetRole.requiredSkills.filter(skill => !currentSkills.has(skill));

    const roadmap = aiEngineerRoadmap.map(section => {
      // Logic for skipped section
      const isFullyCovered = section.fullCoverSkills?.every(skill => currentSkills.has(skill)) ?? false;
      
      return {
        ...section,
        isSkipped: isFullyCovered,
        skippedTopics: section.topics.length > 0 && section.requiredSkills.some(s => currentSkills.has(s)) ? section.topics.slice(0, Math.floor(section.topics.length * 0.7)) : [] // Mocking some partial coverage for UI
      };
    });

    return { 
      skippedSkills: overlap, 
      toLearnSkills: needed,
      filteredRoadmap: roadmap
    };
  }, [selectedRole]);

  const handleShowRoadmap = () => {
    if (selectedRole && targetId) {
      setResultsVisible(true);
      // Optional: scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* 1. Hero Section */}
      <section className="bg-[#0f172a] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Back to Home</span>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Switch Your <span className="text-blue-400">Career</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Already working in tech? Skip what you know and learn only what's new. Use our smart career transition tool.
          </p>
        </div>
      </section>

      {/* 2. Two-Step Form Card */}
      <div className="max-w-[600px] mx-auto -mt-12 px-4 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* STEP 1 */}
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
              <h2 className="text-xl font-bold">What is your current role?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id);
                    setResultsVisible(false);
                  }}
                  className={`flex flex-col items-start p-5 rounded-2xl border-2 transition-all text-left group ${
                    selectedRole === role.id 
                      ? 'border-blue-600 bg-blue-50/30' 
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl mb-4 transition-colors ${
                    selectedRole === role.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}>
                    <role.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{role.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 w-full mb-1">Already knows:</span>
                    {role.displaySkills.map((skill, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2 */}
          <div className="p-8 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</div>
              <h2 className="text-xl font-bold">Where do you want to go?</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => {
                  setTargetId(targetRole.id);
                  setResultsVisible(false);
                }}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                  targetId === targetRole.id 
                    ? 'border-blue-600 bg-blue-50/30' 
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-3 rounded-xl ${
                  targetId === targetRole.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <targetRole.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{targetRole.title}</h3>
                  <p className="text-xs text-slate-500">The most in-demand role of 2026</p>
                </div>
                {targetId === targetRole.id && <Check className="w-5 h-5 ml-auto text-blue-600" />}
              </button>
            </div>
          </div>

          {/* STEP 3 - Button */}
          <div className="p-6 bg-slate-50/50 flex justify-center">
            <button
              onClick={handleShowRoadmap}
              disabled={!selectedRole || !targetId}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                selectedRole && targetId 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Zap className={`w-5 h-5 ${selectedRole && targetId ? 'fill-white' : ''}`} />
              Show My Custom Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* 3. RESULTS SECTION */}
      {resultsVisible && (
        <div id="results" className="max-w-4xl mx-auto mt-20 px-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-4">Your Intelligence Report</h2>
            <p className="text-slate-500">Based on your experience as a {roles.find(r => r.id === selectedRole)?.title}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Left Column - Skip */}
            <div className="bg-green-50/50 border border-green-100 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Topics You Can Skip</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skippedSkills.length > 0 ? skippedSkills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm border border-green-200">
                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    {skill.toUpperCase()}
                  </div>
                )) : (
                  <p className="text-green-600/70 text-sm italic">Nothing found yet. Time to start from scratch!</p>
                )}
              </div>
            </div>

            {/* Right Column - Learn */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">Topics You Need to Learn</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {toLearnSkills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-full font-bold text-sm shadow-md shadow-blue-500/20">
                    {skill.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROADMAP SECTIONS */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-blue-600" />
              Tailored Training Path
            </h3>
            
            <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-12">
              {filteredRoadmap.map((section, idx) => (
                <div 
                  key={section.id} 
                  className={`relative transition-all duration-500 ${section.isSkipped ? 'opacity-60' : ''}`}
                >
                  <div className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 ${
                    section.isSkipped 
                      ? 'bg-slate-300 border-slate-100' 
                      : 'bg-blue-600 border-white'
                  }`} />
                  
                  <div className={`p-6 rounded-3xl border transition-all ${
                    section.isSkipped 
                      ? 'bg-slate-50 border-slate-100 grayscale' 
                      : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{idx + 1}</span>
                        <h4 className={`text-xl font-bold ${section.isSkipped ? 'text-slate-500 line-through' : 'text-slate-900'}`}>{section.title}</h4>
                      </div>
                      
                      {section.isSkipped ? (
                         <span className="px-3 py-1 bg-slate-200 text-slate-500 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 w-fit">
                           <Check className="w-3.5 h-3.5" /> Skipped
                         </span>
                      ) : (
                         <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 w-fit">
                           <Clock className="w-3.5 h-3.5" /> New Skills
                         </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {section.topics.map((topic, i) => (
                         <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                           section.isSkipped 
                             ? 'bg-slate-100 text-slate-400 border-slate-200' 
                             : 'bg-slate-50 text-slate-600 border-slate-200'
                         }`}>
                           {topic}
                         </span>
                      ))}
                    </div>

                    {!section.isSkipped && (
                      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                        <button className="text-sm font-bold text-blue-600 flex items-center gap-1.5 hover:gap-2 transition-all">
                          View Resources <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
