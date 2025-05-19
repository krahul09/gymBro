"use client";

import { useState, useEffect } from "react";
import ExerciseFilter from "@/components/exercise-filter";
import ExerciseCard from "@/components/exercise-card";
import ExerciseModal from "@/components/exercise-modal";
import { fetchData, exerciseOptions, Exercise } from "@/lib/api";
import { SearchBar } from "@/components/search-bar";

export default function ExerciseSection() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<string[]>(["all"]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData<string[]>(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      setBodyParts(["all", ...bodyPartsData]);

      const exercisesData = await fetchData<Exercise[]>(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );
      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, []);

  useEffect(() => {
    if (selectedBodyPart === "all") {
      setFilteredExercises(exercises);
    } else {
      const filtered = exercises.filter(
        (exercise) =>
          exercise.bodyPart.toLowerCase() === selectedBodyPart.toLowerCase()
      );
      setFilteredExercises(filtered);
    }
  }, [selectedBodyPart, exercises]);

  const handleSearch = (searchTerm: string) => {
    const searchedExercises = exercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExercises(searchedExercises);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-col md:flex-row mt-8">
        <ExerciseFilter
          bodyParts={bodyParts}
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
          onSearch={handleSearch}
        />
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onClick={() => setSelectedExercise(exercise)}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </section>
  );
}
