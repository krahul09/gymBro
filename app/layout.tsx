import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/context/theme-context"
import { WorkoutProvider } from "@/context/workout-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GymBro - Your Ultimate Fitness Companion",
  description: "Access hundreds of exercises, build custom workouts, and track your fitness progress with GymBro.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <WorkoutProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-16 md:pt-20">{children}</main>
              <Footer />
            </div>
          </WorkoutProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
