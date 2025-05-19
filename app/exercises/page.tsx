"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ExerciseFilter from "@/components/exercise-filter";
import ExerciseGrid from "@/components/exercise-grid";
import { useExercises, useFilteredExercises } from "@/hooks/use-exercises";
import { Loader2 } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function ExercisesPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const { exercises, bodyParts, isLoading, error } = useExercises();
  const filteredExercises = useFilteredExercises(
    exercises,
    selectedBodyPart,
    searchTerm
  );

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Exercise Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our extensive collection of exercises to find the perfect
            ones for your workout routine.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
            <span className="ml-2">Loading exercises...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Mobile filter */}
            {isMobile && (
              <ExerciseFilter
                bodyParts={bodyParts}
                selectedBodyPart={selectedBodyPart}
                setSelectedBodyPart={setSelectedBodyPart}
                onSearch={setSearchTerm}
                isMobile={true}
              />
            )}

            {/* Desktop sidebar */}
            {!isMobile && (
              <div className="md:w-64 flex-shrink-0">
                <ExerciseFilter
                  bodyParts={bodyParts}
                  selectedBodyPart={selectedBodyPart}
                  setSelectedBodyPart={setSelectedBodyPart}
                  onSearch={setSearchTerm}
                />
              </div>
            )}

            {/* Main content */}
            <div className="flex-1">
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold">
                    {filteredExercises.length}
                  </span>{" "}
                  exercises
                  {selectedBodyPart !== "all" && (
                    <>
                      {" "}
                      for{" "}
                      <span className="font-semibold capitalize">
                        {selectedBodyPart}
                      </span>
                    </>
                  )}
                  {searchTerm && (
                    <>
                      {" "}
                      matching{" "}
                      <span className="font-semibold">
                        &ldquo;{searchTerm}&rdquo;
                      </span>
                    </>
                  )}
                </p>
              </div>

              {filteredExercises.length > 0 ? (
                <ExerciseGrid exercises={filteredExercises} />
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">
                    No exercises found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your filters or search term to find exercises.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
