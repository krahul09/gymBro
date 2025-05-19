"use client";

import { useState } from "react";
import { useWorkout } from "@/context/workout-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2, Calendar, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WorkoutList() {
  const { workouts, removeWorkout, removeExerciseFromWorkout } = useWorkout();
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  if (workouts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center border border-gray-200 dark:border-gray-700">
        <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Workouts Yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Create your first workout to get started with your fitness journey.
        </p>
        <Button asChild>
          <Link href="/exercises">
            Browse Exercises
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {workouts.map((workout) => (
        <Card
          key={workout.id}
          className="border border-gray-200 dark:border-gray-700"
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{workout.name}</CardTitle>
                <CardDescription>
                  Created on {formatDate(workout.createdAt)}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeWorkout(workout.id)}
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Delete workout</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {workout.exercises.length}{" "}
              {workout.exercises.length === 1 ? "exercise" : "exercises"}
            </div>

            {workout.exercises.length > 0 ? (
              <Accordion
                type="single"
                collapsible
                value={expandedWorkout === workout.id ? workout.id : undefined}
                onValueChange={(value) => setExpandedWorkout(value)}
              >
                <AccordionItem value={workout.id} className="border-b-0">
                  <AccordionTrigger className="py-2">
                    Exercise List
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 mt-2">
                      {workout.exercises.map((item) => (
                        <div
                          key={item.exercise.id}
                          className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                        >
                          <div className="flex items-center gap-4">
                            {item.exercise.gifUrl && (
                              <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                <Image
                                  src={item.exercise.gifUrl}
                                  alt={item.exercise.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-medium capitalize">
                                {item.exercise.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.sets} sets × {item.reps} reps
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeExerciseFromWorkout(
                                workout.id,
                                item.exercise.id
                              )
                            }
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove exercise</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic text-sm">
                No exercises added yet
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/exercises">
                <Plus className="mr-2 h-4 w-4" />
                Add Exercises
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
