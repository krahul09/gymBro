"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Scale, Flame, Heart } from "lucide-react"

export default function CalculatorsPage() {
  // BMI Calculator
  const [bmiData, setBmiData] = useState({
    height: "",
    weight: "",
    result: null as number | null,
    category: "",
  })

  // BMR Calculator
  const [bmrData, setBmrData] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    result: null as number | null,
  })

  // Body Fat Calculator
  const [bodyFatData, setBodyFatData] = useState({
    gender: "male",
    waist: "",
    neck: "",
    height: "",
    hip: "", // for females
    result: null as number | null,
    category: "",
  })

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault()
    const height = Number.parseFloat(bmiData.height) / 100 // cm to m
    const weight = Number.parseFloat(bmiData.weight)

    if (height > 0 && weight > 0) {
      const bmi = weight / (height * height)
      let category = ""

      if (bmi < 18.5) category = "Underweight"
      else if (bmi < 25) category = "Normal weight"
      else if (bmi < 30) category = "Overweight"
      else category = "Obese"

      setBmiData({
        ...bmiData,
        result: Number.parseFloat(bmi.toFixed(1)),
        category,
      })
    }
  }

  const calculateBMR = (e: React.FormEvent) => {
    e.preventDefault()
    const weight = Number.parseFloat(bmrData.weight)
    const height = Number.parseFloat(bmrData.height)
    const age = Number.parseFloat(bmrData.age)

    if (weight > 0 && height > 0 && age > 0) {
      let bmr

      if (bmrData.gender === "male") {
        bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      } else {
        bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
      }

      setBmrData({
        ...bmrData,
        result: Math.round(bmr),
      })
    }
  }

  const calculateBodyFat = (e: React.FormEvent) => {
    e.preventDefault()
    const height = Number.parseFloat(bodyFatData.height)
    const waist = Number.parseFloat(bodyFatData.waist)
    const neck = Number.parseFloat(bodyFatData.neck)

    if (height > 0 && waist > 0 && neck > 0) {
      let bodyFat

      if (bodyFatData.gender === "male") {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
      } else {
        const hip = Number.parseFloat(bodyFatData.hip)
        if (hip > 0) {
          bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450
        } else {
          return // Need hip measurement for females
        }
      }

      let category = ""
      if (bodyFatData.gender === "male") {
        if (bodyFat < 6) category = "Essential fat"
        else if (bodyFat < 14) category = "Athletes"
        else if (bodyFat < 18) category = "Fitness"
        else if (bodyFat < 25) category = "Average"
        else category = "Obese"
      } else {
        if (bodyFat < 16) category = "Essential fat"
        else if (bodyFat < 21) category = "Athletes"
        else if (bodyFat < 25) category = "Fitness"
        else if (bodyFat < 32) category = "Average"
        else category = "Obese"
      }

      setBodyFatData({
        ...bodyFatData,
        result: Number.parseFloat(bodyFat.toFixed(1)),
        category,
      })
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Fitness Calculators</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Use these calculators to track your fitness metrics and set realistic goals.
          </p>
        </div>

        <Tabs defaultValue="bmi" className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="bmi" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span>BMI Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="bmr" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              <span>BMR Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="bodyfat" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Body Fat</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bmi">
            <Card>
              <CardHeader>
                <CardTitle>Body Mass Index (BMI) Calculator</CardTitle>
                <CardDescription>
                  BMI is a measure of body fat based on height and weight that applies to adult men and women.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateBMI}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Height (cm)</label>
                      <Input
                        type="number"
                        placeholder="e.g., 175"
                        value={bmiData.height}
                        onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                      <Input
                        type="number"
                        placeholder="e.g., 70"
                        value={bmiData.weight}
                        onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Calculate BMI
                  </Button>
                </form>

                {bmiData.result !== null && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Your Results</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your BMI</p>
                        <p className="text-2xl font-bold">{bmiData.result}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                        <p className="text-xl font-semibold">{bmiData.category}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="text-sm text-gray-500 dark:text-gray-400">
                Note: BMI is a general indicator and does not account for muscle mass.
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="bmr">
            <Card>
              <CardHeader>
                <CardTitle>Basal Metabolic Rate (BMR) Calculator</CardTitle>
                <CardDescription>
                  BMR is the number of calories your body needs to maintain basic functions at rest.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateBMR}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Age</label>
                      <Input
                        type="number"
                        placeholder="e.g., 30"
                        value={bmrData.age}
                        onChange={(e) => setBmrData({ ...bmrData, age: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Gender</label>
                      <select
                        value={bmrData.gender}
                        onChange={(e) => setBmrData({ ...bmrData, gender: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Height (cm)</label>
                      <Input
                        type="number"
                        placeholder="e.g., 175"
                        value={bmrData.height}
                        onChange={(e) => setBmrData({ ...bmrData, height: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                      <Input
                        type="number"
                        placeholder="e.g., 70"
                        value={bmrData.weight}
                        onChange={(e) => setBmrData({ ...bmrData, weight: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Calculate BMR
                  </Button>
                </form>

                {bmrData.result !== null && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Your Results</h4>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Your BMR</p>
                      <p className="text-2xl font-bold">{bmrData.result} calories/day</p>
                      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        This is the number of calories your body needs at complete rest. Your total daily calorie needs
                        will be higher based on your activity level.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bodyfat">
            <Card>
              <CardHeader>
                <CardTitle>Body Fat Percentage Calculator</CardTitle>
                <CardDescription>Estimate your body fat percentage using the U.S. Navy method.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateBodyFat}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Gender</label>
                      <select
                        value={bodyFatData.gender}
                        onChange={(e) => setBodyFatData({ ...bodyFatData, gender: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Height (cm)</label>
                      <Input
                        type="number"
                        placeholder="e.g., 175"
                        value={bodyFatData.height}
                        onChange={(e) => setBodyFatData({ ...bodyFatData, height: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Waist (cm)</label>
                      <Input
                        type="number"
                        placeholder="Measure at navel"
                        value={bodyFatData.waist}
                        onChange={(e) => setBodyFatData({ ...bodyFatData, waist: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Neck (cm)</label>
                      <Input
                        type="number"
                        placeholder="Measure below Adam's apple"
                        value={bodyFatData.neck}
                        onChange={(e) => setBodyFatData({ ...bodyFatData, neck: e.target.value })}
                        required
                      />
                    </div>
                    {bodyFatData.gender === "female" && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Hip (cm)</label>
                        <Input
                          type="number"
                          placeholder="Measure at widest point"
                          value={bodyFatData.hip}
                          onChange={(e) => setBodyFatData({ ...bodyFatData, hip: e.target.value })}
                          required
                        />
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Calculate Body Fat
                  </Button>
                </form>

                {bodyFatData.result !== null && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Your Results</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Body Fat Percentage</p>
                        <p className="text-2xl font-bold">{bodyFatData.result}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                        <p className="text-xl font-semibold">{bodyFatData.category}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="text-sm text-gray-500 dark:text-gray-400">
                Note: This is an estimate based on the U.S. Navy method. For more accurate results, consider
                professional body composition testing.
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
