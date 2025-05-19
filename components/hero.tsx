"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  Dumbbell,
  BarChart3,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, white 2%, transparent 0%)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transform Your Body with{" "}
              <span className="text-gradient">GymBro</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Your ultimate fitness companion. Access hundreds of exercises,
              build custom workouts, and track your progress all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-accent1-500 hover:bg-accent1-600 text-white"
              >
                <Link href="/exercises">
                  Explore Exercises
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/workout-planner">Create Workout</Link>
              </Button>
            </div>

            <div className="relative">
              <form
                className="flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `/exercises?search=${encodeURIComponent(
                    searchTerm
                  )}`;
                }}
              >
                <Input
                  type="text"
                  placeholder="Search exercises..."
                  className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-accent1-500 pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-0 bg-transparent hover:bg-white/10"
                >
                  <Search className="h-5 w-5 text-white" />
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[500px] w-full">
              <Image
                src="/assets/hero.jpeg"
                alt="Fitness Training"
                fill
                className="object-cover rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/80 to-transparent rounded-lg" />
            </div>

            {/* Feature badges */}
            <div className="absolute top-10 -left-10 bg-white text-gray-900 rounded-lg p-4 shadow-lg flex items-center space-x-3">
              <div className="bg-accent1-500 rounded-full p-2">
                <Dumbbell className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">500+ Exercises</p>
                <p className="text-sm text-gray-600">
                  With detailed instructions
                </p>
              </div>
            </div>

            <div className="absolute bottom-20 -right-10 bg-white text-gray-900 rounded-lg p-4 shadow-lg flex items-center space-x-3">
              <div className="bg-accent2-500 rounded-full p-2">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">Workout Planner</p>
                <p className="text-sm text-gray-600">Create custom routines</p>
              </div>
            </div>

            <div className="absolute bottom-40 left-10 bg-white text-gray-900 rounded-lg p-4 shadow-lg flex items-center space-x-3">
              <div className="bg-brand-600 rounded-full p-2">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">Progress Tracking</p>
                <p className="text-sm text-gray-600">Monitor your gains</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
