"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Exercise } from "@/lib/api"
import { Dumbbell } from "lucide-react"

interface ExerciseCardProps {
  exercise: Exercise
  onClick: () => void
}

export default function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer card-hover border-gray-200 dark:border-gray-700" onClick={onClick}>
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
        <Image src={exercise.gifUrl || "/placeholder.svg"} alt={exercise.name} fill className="object-cover" />
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 capitalize">
          {exercise.bodyPart}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 capitalize line-clamp-1">{exercise.name}</h3>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
          <div className="flex items-center">
            <Dumbbell className="h-4 w-4 mr-1" />
            <span className="capitalize">{exercise.equipment}</span>
          </div>
          <div className="capitalize">{exercise.target}</div>
        </div>
      </CardContent>
    </Card>
  )
}
