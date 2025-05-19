"use client"

import { useState, useEffect } from "react"
import { fetchData, exerciseOptions, type Exercise } from "@/lib/api"

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [bodyParts, setBodyParts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        setIsLoading(true)

        // Fetch body parts
        const bodyPartsData = await fetchData<string[]>(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          exerciseOptions,
        )
        setBodyParts(["all", ...bodyPartsData])

        // Fetch exercises
        const exercisesData = await fetchData<Exercise[]>(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions,
        )
        setExercises(exercisesData)
        setError(null)
      } catch (err) {
        setError("Failed to load exercises. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExercisesData()
  }, [])

  return { exercises, bodyParts, isLoading, error }
}

export function useFilteredExercises(exercises: Exercise[], bodyPart: string, searchTerm: string) {
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])

  useEffect(() => {
    let filtered = [...exercises]

    // Filter by body part
    if (bodyPart && bodyPart !== "all") {
      filtered = filtered.filter((exercise) => exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase())
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredExercises(filtered)
  }, [exercises, bodyPart, searchTerm])

  return filteredExercises
}
