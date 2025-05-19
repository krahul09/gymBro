import WorkoutForm from "@/components/workout-form"
import WorkoutList from "@/components/workout-list"

export default function WorkoutPlannerPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Workout Planner</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage your custom workout routines to achieve your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <WorkoutForm />
          </div>
          <div className="lg:col-span-2">
            <WorkoutList />
          </div>
        </div>
      </div>
    </div>
  )
}
