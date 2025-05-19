"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Exercise } from "@/lib/api"

interface Workout {
  id: string
  name: string
  exercises: {
    exercise: Exercise
    sets: number
    reps: number
  }[]
  createdAt: Date
}

interface WorkoutContextType {
  workouts: Workout[]
  addWorkout: (workout: Omit<Workout, "id" | "createdAt">) => void
  removeWorkout: (id: string) => void
  addExerciseToWorkout: (workoutId: string, exercise: Exercise, sets: number, reps: number) => void
  removeExerciseFromWorkout: (workoutId: string, exerciseId: string) => void
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined)

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([])

  const addWorkout = (workout: Omit<Workout, "id" | "createdAt">) => {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setWorkouts([...workouts, newWorkout])
  }

  const removeWorkout = (id: string) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id))
  }

  const addExerciseToWorkout = (workoutId: string, exercise: Exercise, sets: number, reps: number) => {
    setWorkouts(
      workouts.map((workout) => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            exercises: [...workout.exercises, { exercise, sets, reps }],
          }
        }
        return workout
      }),
    )
  }

  const removeExerciseFromWorkout = (workoutId: string, exerciseId: string) => {
    setWorkouts(
      workouts.map((workout) => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            exercises: workout.exercises.filter((ex) => ex.exercise.id !== exerciseId),
          }
        }
        return workout
      }),
    )
  }

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        addWorkout,
        removeWorkout,
        addExerciseToWorkout,
        removeExerciseFromWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  const context = useContext(WorkoutContext)
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider")
  }
  return context
}
