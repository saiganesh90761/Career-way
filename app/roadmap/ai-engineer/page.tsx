import Link from "next/link";
import { 
  Map, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Sparkles, 
  Lock, 
  PlayCircle 
} from "lucide-react";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import PaymentButton from "@/components/PaymentButton";

const roadmapData = [
  {
    id: 1,
    title: "Week 1 — AI Basics + Python",
    isFree: true,
    topics: ["AI Basics", "ML Overview", "DL Overview", "NLP Overview", "Gen AI", "Agentic AI", "Variables", "Strings", "Lists", "Dictionaries", "Loops", "Functions", "Lambda", "Modules", "File Handling", "Exception Handling", "Classes & Objects"],
    resources: [
      { name: "AI Basics YouTube", url: "https://www.youtube.com/watch?v=VGFpV3Qj4as" },
      { name: "Python Tutorials (Codebasics)", url: "https://bit.ly/3X6CCC7" },
      { name: "Corey's Python Tutorials", url: "https://bit.ly/3uqUgaZ" }
    ]
  },
  {
    id: 2,
    title: "Week 2 — Data Structures & Algorithms",
    isFree: true,
    topics: ["Big O Notation", "Arrays", "Hash Table", "Linked List", "Stack", "Queue", "Tree", "Graph", "Binary Search", "Bubble Sort", "Recursion"],
    resources: [
      { name: "DSA YouTube Playlist", url: "https://bit.ly/3uiW2Lf" }
    ]
  },
  {
    id: 3,
    title: "Week 3 — Advanced Python",
    isFree: true,
    topics: ["Inheritance", "Generators", "Iterators", "List Comprehensions", "Decorators", "Multithreading", "Multiprocessing"],
    resources: [
      { name: "Python Tutorials (video 17-27)", url: "https://bit.ly/3X6CCC7" }
    ]
  },
  {
    id: 4,
    title: "Week 4 — Git & GitHub",
    isFree: true,
    topics: ["Version Control", "Git Basics", "add/commit/push", "Branches", "HEAD", "Diff", "Merge", "Pull Requests"],
    resources: [
      { name: "Git YT playlist (codebasics)", url: "https://bit.ly/3SECQQ7" },
      { name: "Git YT playlist (Corey)", url: "https://bit.ly/3T0Yrmb" }
    ]
  },
  {
    id: 5,
    title: "Week 5 — NumPy, Pandas, SQL",
    isFree: false,
    topics: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "SQL Basics", "SELECT", "WHERE", "JOINs"],
    resources: [
      { name: "Math & Stats Course (chapters 4&5 free)", url: "https://codebasics.io/courses/math-and-statistics-for-data-science" },
      { name: "SQL Tutorial", url: "https://www.youtube.com/watch?v=Rm0xH2Vpfi0" }
    ]
  },
  {
    id: 6,
    title: "Week 6-8 — Math & Statistics for AI",
    isFree: false,
    topics: ["Linear Algebra", "Vectors", "Matrices", "Calculus", "Probability", "Normal Distribution", "Hypothesis Testing", "p-value", "Confidence Intervals", "Mean", "Median", "Mode", "Variance", "Standard Deviation", "Central Limit Theorem"],
    resources: [
      { name: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
      { name: "StatQuest YouTube", url: "https://www.youtube.com/@statquest" },
      { name: "Free YouTube playlist", url: "https://bit.ly/3QrSXis" },
      { name: "3Blue1Brown", url: "https://www.youtube.com/@3blue1brown" },
      { name: "Paid course", url: "https://codebasics.io/courses/math-and-statistics-for-data-science" }
    ]
  },
  {
    id: 7,
    title: "Week 9-11 — Machine Learning",
    isFree: false,
    topics: ["Supervised Learning", "Unsupervised Learning", "Linear Regression", "Logistic Regression", "Gradient Descent", "Decision Tree", "Random Forest", "XGBoost", "Model Evaluation", "MSE", "MAE", "F1 Score", "ROC Curve", "GridSearchCV", "K-Means", "DBScan", "PCA"],
    resources: [
      { name: "ML YouTube playlist (2M+ views)", url: "https://bit.ly/3io5qqX" },
      { name: "Feature engineering playlist", url: "https://bit.ly/3IFa3Yf" },
      { name: "AI Bootcamp", url: "https://codebasics.io/bootcamps/ai-data-science-bootcamp-with-virtual-internship" }
    ]
  },
  {
    id: 8,
    title: "Week 12-13 — MLOps & FastAPI",
    isFree: false,
    topics: ["FastAPI", "REST APIs", "MLFlow", "Experiment Tracking", "Docker", "Kubernetes", "CI/CD", "AWS", "Azure"],
    resources: [
      { name: "FastAPI tutorial", url: "https://bit.ly/497p6Ex" },
      { name: "What is MLOps", url: "https://bit.ly/3R4uGA0" },
      { name: "MLFlow Tutorial", url: "https://www.youtube.com/watch?v=6ngxBkx05Fs" },
      { name: "Docker Tutorial", url: "https://bit.ly/3uCNpeE" }
    ]
  },
  {
    id: 9,
    title: "Week 14 — ML Projects",
    isFree: false,
    topics: ["Property Price Prediction", "Data Cleaning", "Feature Engineering", "Model Building", "Hyperparameter Tuning", "Flask/FastAPI Backend", "AWS Deployment", "Portfolio Building"],
    resources: [
      { name: "Bangalore Price Prediction project", url: "https://bit.ly/3ivycWr" },
      { name: "FastAPI tutorial", url: "https://youtu.be/Wr1JjhTt1Xg" },
      { name: "Resume tips", url: "https://www.youtube.com/watch?v=buQSI8NLOMw" }
    ]
  },
  {
    id: 10,
    title: "Week 15-18 — Deep Learning",
    isFree: false,
    topics: ["Neural Networks", "Forward Propagation", "Back Propagation", "Multilayer Perceptron", "CNN", "RNN", "LSTM", "Transformers", "PyTorch", "TensorFlow"],
    resources: [
      { name: "Deep Learning playlist (TensorFlow)", url: "https://bit.ly/3vOZ3zV" },
      { name: "Potato disease classification project", url: "https://bit.ly/3QzkVJi" },
      { name: "CampusX PyTorch playlist", url: "https://bit.ly/3K353Qg" }
    ]
  },
  {
    id: 11,
    title: "Week 19-21 — NLP or Computer Vision",
    isFree: false,
    topics: ["Regex", "TF-IDF", "Word2Vec", "Embeddings", "Naive Bayes", "SpaCy", "NLTK", "BERT", "OpenCV", "YOLO", "Image Processing", "CNN"],
    resources: [
      { name: "NLP YouTube playlist", url: "https://bit.ly/3XnjfEZ" },
      { name: "Log Classification project", url: "https://bit.ly/4hu5EoL" }
    ]
  },
  {
    id: 12,
    title: "Week 22-24 — Gen AI & Agentic AI",
    isFree: false,
    topics: ["LLMs", "Vector Databases", "Embeddings", "RAG", "LangChain", "MCP", "LangGraph", "CrewAI", "LLM Fine Tuning", "Agentic AI"],
    resources: [
      { name: "Gen AI crash course", url: "https://bit.ly/3Fn7Zoh" },
      { name: "What is MCP", url: "https://youtu.be/tzrwxLNHtRY" },
      { name: "Build MCP server", url: "https://youtu.be/jLM6n4mdRuA" },
      { name: "Agentic AI (LangGraph)", url: "https://www.youtube.com/watch?v=CnXdddeZ4tQ" },
      { name: "CrewAI", url: "https://www.youtube.com/watch?v=G42J2MSKyc8" },
      { name: "LLM Fine Tuning", url: "https://youtu.be/IIvORO248Zs" }
    ]
  },
  {
    id: 13,
    title: "Week 25-27 — Gen AI Projects",
    isFree: false,
    topics: ["LLM Projects", "RAG Systems", "Agentic Applications", "Real World AI"],
    resources: [
      { name: "Gen AI project playlist", url: "https://bit.ly/4ilzEnX" }
    ]
  },
  {
    id: 14,
    title: "Week 28-29 — Unguided Projects",
    isFree: false,
    topics: ["RAG Chatbot with RBAC", "NLP Drug Detection", "Portfolio Website", "GitHub Projects", "LinkedIn Building"],
    resources: [
      { name: "RAG Chatbot project", url: "https://bit.ly/47SttUq" },
      { name: "NLP drug events project", url: "https://bit.ly/43oup1y" }
    ]
  },
  {
    id: 15,
    title: "Week 30-32 — Azure or AWS",
    isFree: false,
    topics: ["Azure Fundamentals", "Resource Groups", "Azure ML", "OpenAI Service", "AWS S3", "IAM", "SageMaker", "Bedrock", "MLOps Pipelines", "Model Monitoring", "CI/CD"],
    resources: [
      { name: "Find free resources on YouTube and official docs", url: "#" }
    ]
  }
];

export default async function RoadmapPage() {
  const session = await auth()
  let isPaid = false

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { isPaid: true }
    })
    isPaid = user?.isPaid || false
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">

      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            AI Engineer Roadmap 2026
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mb-10 leading-relaxed">
            From complete beginner to job-ready AI Engineer in 8 months
          </p>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-sm text-slate-200 border border-slate-700 font-medium text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" /> 32 Weeks
            </div>
            <div className="px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-sm text-slate-200 border border-slate-700 font-medium text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" /> 4hrs/day
            </div>
            <div className="px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-sm text-slate-200 border border-slate-700 font-medium text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500 transition-colors" /> Beginner Friendly
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar - Left Fixed */}
          <div className="w-full lg:w-1/4">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Progress Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Your Progress</h3>
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-3 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: "0%" }}></div>
                </div>
                <p className="text-sm font-medium text-slate-500 mb-6">0 of 15 sections completed</p>
                
                {isPaid ? (
                  <div className="w-full py-3.5 px-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Pro Member Active
                  </div>
                ) : (
                  <PaymentButton className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md shadow-blue-600/20 text-sm flex items-center justify-center gap-2 group">
                    <Lock className="w-4 h-4" />
                    Upgrade to Pro - ₹200/mo
                  </PaymentButton>
                )}
              </div>

              {/* Contents Table */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hidden lg:block">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">Contents</h3>
                <ul className="space-y-3">
                  {roadmapData.map((item) => (
                    <li key={item.id}>
                      <a 
                        href={`#section-${item.id}`} 
                        className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors block truncate"
                      >
                        <span className="text-slate-400 mr-2">{item.id}.</span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Roadmap Content - Right Side */}
          <div className="w-full lg:w-3/4 space-y-8">
            {roadmapData.map((section) => (
              <div 
                key={section.id} 
                id={`section-${section.id}`} 
                className={`bg-white rounded-2xl border bg-clip-border shadow-sm overflow-hidden scroll-mt-32 ${
                  section.isFree || isPaid
                    ? 'border-l-4 border-l-green-500 border-r-slate-200 border-t-slate-200 border-b-slate-200' 
                    : 'border-l-4 border-l-orange-500 border-r-slate-200 border-t-slate-200 border-b-slate-200'
                }`}
              >
                <div className="p-6 md:p-8">
                  {/* Header & Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                      {section.title}
                    </h2>
                    {section.isFree ? (
                      <span className="self-start sm:self-auto px-3 py-1 bg-green-100 text-green-700 border border-green-200 text-xs font-bold uppercase tracking-wider rounded-full shrink-0">
                        Free
                      </span>
                    ) : (
                      <span className="self-start sm:self-auto px-3 py-1 bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold uppercase tracking-wider rounded-full shrink-0">
                        Pro
                      </span>
                    )}
                  </div>

                  {/* Topics Covered */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Topics Covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {section.topics.map((topic, i) => (
                        <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full font-medium border border-slate-200/60">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  {section.isFree || isPaid ? (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Resources</h4>
                      <ul className="space-y-3">
                        {section.resources.map((res, i) => (
                          <li key={i}>
                            <a 
                              href={res.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-start sm:items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300 transition-all group shadow-sm"
                            >
                              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                                <PlayCircle className="w-5 h-5 text-blue-600" />
                              </div>
                              <span className="text-sm sm:text-base font-semibold text-slate-700 group-hover:text-blue-700 transition-colors line-clamp-2">
                                {res.name}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="relative mt-2">
                      {/* Section Title */}
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 relative z-0">Resources</h4>
                      
                      {/* Blurred Content */}
                      <div className="filter blur-[5px] pointer-events-none select-none opacity-40">
                        <ul className="space-y-3">
                          {section.resources.map((res, i) => (
                            <li key={i}>
                              <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                  <PlayCircle className="w-5 h-5 text-slate-400" />
                                </div>
                                <span className="text-sm sm:text-base font-semibold text-slate-500">
                                  {res.name}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Locked Overlay */}
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-white/10 rounded-xl">
                        <div className="max-w-md w-full bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex flex-col items-center text-center">
                           <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mb-4 shadow-lg">
                             <Lock className="w-6 h-6 text-white" />
                           </div>
                           <h4 className="text-xl font-bold text-slate-900 mb-2">Upgrade to Pro to unlock resources</h4>
                           <p className="text-sm text-slate-500 mb-6">Get full access to all course links, projects and advanced material.</p>
                           <PaymentButton className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/30 text-sm flex items-center justify-center gap-2">
                             <Lock className="w-4 h-4" />
                             Unlock with Pro — ₹200/month
                           </PaymentButton>
                        </div>
                      </div>
                      
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Basic Footer just for the roadmap page */}
      <footer className="bg-slate-950 py-8 border-t border-slate-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center text-slate-500 text-sm">
          © 2025 CareerWay. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
