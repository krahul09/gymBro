import {
  Dumbbell,
  Search,
  Youtube,
  Calendar,
  BarChart3,
  Calculator,
  Clock,
  Heart,
} from "lucide-react";

const features = [
  {
    name: "Extensive Exercise Library",
    description:
      "Access over 500 exercises with detailed instructions, animations, and video tutorials.",
    icon: Dumbbell,
  },
  {
    name: "Advanced Search & Filters",
    description:
      "Find the perfect exercises for your workout with our powerful search and filtering system.",
    icon: Search,
  },
  {
    name: "Video Demonstrations",
    description:
      "Watch professional demonstrations of each exercise to ensure proper form and technique.",
    icon: Youtube,
  },
  {
    name: "Workout Planner",
    description:
      "Create and save custom workout routines tailored to your specific fitness goals.",
    icon: Calendar,
  },
  {
    name: "Progress Tracking",
    description:
      "Monitor your fitness journey with detailed progress charts and statistics.",
    icon: BarChart3,
  },
  {
    name: "Fitness Calculators",
    description:
      "Calculate your BMI, body fat percentage, calorie needs, and more with our fitness tools.",
    icon: Calculator,
  },
  {
    name: "Workout Timer",
    description:
      "Stay on track during your workouts with our customizable interval timer.",
    icon: Clock,
  },
  {
    name: "Health Insights",
    description:
      "Get personalized recommendations and insights to optimize your fitness routine.",
    icon: Heart,
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for Your Fitness Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            GymBro provides all the tools and resources you need to achieve your
            fitness goals, from exercise guidance to workout planning and
            progress tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
