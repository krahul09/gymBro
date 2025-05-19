"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWorkout } from "@/context/workout-context"

export default function WorkoutForm() {
  const [workoutName, setWorkoutName] = useState("")
  const { addWorkout } = useWorkout()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (workoutName.trim()) {
      addWorkout({
        name: workoutName.trim(),
        exercises: [],
      })
      setWorkoutName("")
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4">Create New Workout</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="Workout name (e.g., Leg Day)"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!workoutName.trim()}>
            Create Workout
          </Button>
        </div>
      </form>
    </div>
  )
}
