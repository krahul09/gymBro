import Link from "next/link";
import {
  Dumbbell,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-10 h-10 bg-accent1-500 rounded-full flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent1-500 to-accent2-500">
                GymBro
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate fitness companion. Access hundreds of exercises,
              build custom workouts, and track your progress.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-accent1-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-accent1-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-accent1-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-accent1-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-accent1-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/exercises"
                  className="text-gray-400 hover:text-accent1-500 transition-colors"
                >
                  Exercises
                </Link>
              </li>
              <li>
                <Link
                  href="/workout-planner"
                  className="text-gray-400 hover:text-accent1-500 transition-colors"
                >
                  Workout Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators"
                  className="text-gray-400 hover:text-accent1-500 transition-colors"
                >
                  Fitness Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-accent1-500 transition-colors"
                >
                  Fitness Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-accent1-500 transition-colors"
                >
                  Nutrition Guide
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-accent1-500 transition-colors"
                >
                  Training Tips
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-accent1-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-4">
              Have questions or feedback? We&apos;d love to hear from you!
            </p>
            <Link
              href="mailto:contact@gymbro.com"
              className="flex items-center space-x-2 text-accent1-500 hover:text-accent1-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>kumar.rahul0525x@gmail.com</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} GymBro. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-accent1-500 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-accent1-500 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-accent1-500 text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
