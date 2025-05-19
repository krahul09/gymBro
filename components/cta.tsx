import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">
          Ready to Take Your Fitness Journey to the Next Level?
        </h2>
        <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
          Start exploring our extensive exercise library, create custom workouts, and track your progress today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-brand-100">
            <Link href="/exercises">
              Explore Exercises
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/workout-planner">Create Workout</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
