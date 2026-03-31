"use client"

import { useState } from "react"

interface Props {
  sectionId: number
  topics: string[]
  roadmap: string
  isPaid: boolean
}

export default function ProgressTracker({ 
  sectionId, 
  topics, 
  roadmap,
  isPaid 
}: Props) {
  const [completed, setCompleted] = useState<string[]>([])

  async function toggleTopic(topic: string) {
    if (!isPaid) return
    
    const isCompleted = completed.includes(topic)
    
    if (isCompleted) {
      setCompleted(completed.filter(t => t !== topic))
    } else {
      setCompleted([...completed, topic])
    }

    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roadmap,
        section: sectionId.toString(),
        topic,
        completed: !isCompleted,
      }),
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic, i) => (
        <button
          key={i}
          onClick={() => toggleTopic(topic)}
          className={`px-3 py-1.5 text-sm rounded-full 
          font-medium border transition-all
          ${completed.includes(topic)
            ? "bg-green-100 text-green-700 border-green-300 line-through"
            : "bg-slate-100 text-slate-700 border-slate-200 hover:border-blue-300"
          }
          ${!isPaid ? "cursor-default" : "cursor-pointer"}
          `}
        >
          {completed.includes(topic) ? "✓ " : ""}{topic}
        </button>
      ))}
    </div>
  )
}
