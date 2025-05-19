"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Exercise } from "@/lib/api";
import { useYoutubeVideos } from "@/hooks/use-youtube-videos";
import { useWorkout } from "@/context/workout-context";
import {
  Dumbbell,
  Target,
  Package,
  Youtube,
  Info,
  Plus,
  Loader2,
} from "lucide-react";

interface ExerciseModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export default function ExerciseModal({
  exercise,
  onClose,
}: ExerciseModalProps) {
  const [activeTab, setActiveTab] = useState("details");
  const { videos, isLoading: isLoadingVideos } = useYoutubeVideos(
    exercise?.name || null
  );
  const { workouts, addExerciseToWorkout } = useWorkout();
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);

  useEffect(() => {
    if (workouts.length > 0) {
      setSelectedWorkout(workouts[0].id);
    }
  }, [workouts]);

  if (!exercise) return null;

  const handleAddToWorkout = () => {
    if (selectedWorkout && exercise) {
      addExerciseToWorkout(selectedWorkout, exercise, sets, reps);
      onClose();
    }
  };

  return (
    <Dialog open={!!exercise} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white dark:bg-gray-800">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold capitalize">
            {exercise.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information about this exercise
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="details"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="px-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="details" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>Details</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                <span>Videos</span>
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add to Workout</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="p-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <Image
                  src={exercise.gifUrl || "/placeholder.svg"}
                  alt={exercise.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Body Part
                      </p>
                      <p className="font-medium capitalize">
                        {exercise.bodyPart}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent1-100 dark:bg-accent1-900/30 flex items-center justify-center">
                      <Target className="h-5 w-5 text-accent1-600 dark:text-accent1-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Target Muscle
                      </p>
                      <p className="font-medium capitalize">
                        {exercise.target}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent2-100 dark:bg-accent2-900/30 flex items-center justify-center">
                      <Package className="h-5 w-5 text-accent2-600 dark:text-accent2-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Equipment
                      </p>
                      <p className="font-medium capitalize">
                        {exercise.equipment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-2">Instructions</h4>
              {exercise.instructions ? (
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {exercise.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Start by positioning yourself correctly. Maintain proper form
                  throughout the exercise. Focus on controlled movements and
                  proper breathing. Consult a fitness professional for
                  personalized guidance.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="p-6 pt-4">
            {isLoadingVideos ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
                <span className="ml-2">Loading videos...</span>
              </div>
            ) : videos.length > 0 ? (
              <div className="space-y-4">
                {videos.map((item, index) => (
                  <a
                    key={index}
                    href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="relative w-32 h-20 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                        <Image
                          src={
                            item.video.thumbnails[0]?.url ||
                            "/placeholder.svg?height=80&width=120"
                          }
                          alt={item.video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Youtube className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium line-clamp-2">
                          {item.video.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          YouTube
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Youtube className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium mb-2">No videos found</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  We couldn&apos;t find any video demonstrations for this
                  exercise.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="add" className="p-6 pt-4">
            {workouts.length > 0 ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Workout
                  </label>
                  <select
                    value={selectedWorkout || ""}
                    onChange={(e) => setSelectedWorkout(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  >
                    {workouts.map((workout) => (
                      <option key={workout.id} value={workout.id}>
                        {workout.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Sets
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={sets}
                      onChange={(e) => setSets(Number.parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Reps
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={reps}
                      onChange={(e) => setReps(Number.parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>

                <Button onClick={handleAddToWorkout} className="w-full mt-2">
                  Add to Workout
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <Dumbbell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium mb-2">No workouts found</h4>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Create a workout first to add exercises to it.
                </p>
                <Button asChild>
                  <a href="/workout-planner">Create Workout</a>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="p-6 pt-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
