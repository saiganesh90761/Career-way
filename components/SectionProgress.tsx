"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

interface SectionProgressProps {
  roadmap: string;
  section: string;
  initialCompleted: boolean;
  onToggle?: (completed: boolean) => void;
}

export default function SectionProgress({ 
  roadmap, 
  section, 
  initialCompleted,
  onToggle
}: SectionProgressProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleToggle() {
    const newStatus = !completed
    setCompleted(newStatus)
    setLoading(true)

    try {
      const res = await fetch("/api/progress/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roadmap,
          section,
          completed: newStatus,
        }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || "Failed to update progress")
      }
      
      router.refresh()
      onToggle?.(newStatus)
    } catch (error: any) {
      console.error(error)
      alert("Error: " + error.message)
      // Rollback on error
      setCompleted(completed)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
        completed 
          ? "bg-green-100 text-green-700 border-green-200" 
          : "bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200"
      }`}
    >
      <CheckCircle2 className={`w-3.5 h-3.5 ${completed ? "text-green-600" : "text-slate-400"}`} />
      {completed ? "Completed" : "Mark as Done"}
    </button>
  )
}
