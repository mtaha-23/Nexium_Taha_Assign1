'use client'

import { useState, FormEvent } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { quotes } from "@/data/quotes"

//Define type for a quote
type Quote = {
  topic: string
  text: string
}

export default function Home() {
  //array of Quote objects
  const [topic, setTopic] = useState('')
  const [results, setResults] = useState<Quote[]>([])

  //Adding type to event
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const filtered = quotes.filter(q => q.topic.toLowerCase() === topic.toLowerCase()).slice(0, 3)
    setResults(filtered)
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Enter a topic (e.g., life, success)"
          value={topic}
          onChange={e => setTopic(e.target.value)}
        />
        <Button type="submit">Get Quotes</Button>
      </form>

      <div className="mt-6 space-y-2">
        {results.length > 0 ? (
          results.map((q, idx) => (
            <div key={idx} className="border rounded p-2 shadow">
              {q.text}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No quotes yet.</p>
        )}
      </div>
    </main>
  )
}
