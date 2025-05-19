"use client"

import { useState } from "react"
import ExerciseCard from "@/components/exercise-card"
import ExerciseModal from "@/components/exercise-modal"
import type { Exercise } from "@/lib/api"
import { usePagination } from "@/hooks/use-pagination"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ExerciseGridProps {
  exercises: Exercise[]
}

export default function ExerciseGrid({ exercises }: ExerciseGridProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const { paginatedItems, currentPage, totalPages, goToPage, nextPage, prevPage } = usePagination(exercises, 9)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedItems.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} onClick={() => setSelectedExercise(exercise)} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Show first page, last page, current page, and pages around current page
                return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
              })
              .map((page, index, array) => {
                // Add ellipsis between non-consecutive pages
                const showEllipsis = index > 0 && page - array[index - 1] > 1

                return (
                  <div key={page} className="flex items-center">
                    {showEllipsis && <span className="px-2 text-gray-500">...</span>}
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page)}
                      className="w-9 h-9"
                    >
                      {page}
                    </Button>
                  </div>
                )
              })}
          </div>

          <Button variant="outline" size="icon" onClick={nextPage} disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Exercise Modal */}
      <ExerciseModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
    </div>
  )
}
