"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, ChevronDown, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExerciseFilterProps {
  bodyParts: string[]
  selectedBodyPart: string
  setSelectedBodyPart: (bodyPart: string) => void
  onSearch: (term: string) => void
  isMobile?: boolean
}

export default function ExerciseFilter({
  bodyParts,
  selectedBodyPart,
  setSelectedBodyPart,
  onSearch,
  isMobile = false,
}: ExerciseFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const filterContent = (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
        isMobile ? "p-4" : "p-6",
      )}
    >
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="sm" className="absolute right-1 top-1">
            Search
          </Button>
        </div>
      </form>

      <Accordion type="single" collapsible defaultValue="bodyPart">
        <AccordionItem value="bodyPart" className="border-b-0">
          <AccordionTrigger className="py-3 text-lg font-medium">Body Part</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {bodyParts.map((bodyPart) => (
                <Button
                  key={bodyPart}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start capitalize py-2 px-3 h-auto font-normal text-base",
                    selectedBodyPart === bodyPart
                      ? "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
                      : "text-gray-700 dark:text-gray-300",
                  )}
                  onClick={() => setSelectedBodyPart(bodyPart)}
                >
                  <div className="flex items-center w-full">
                    <span>{bodyPart}</span>
                    {selectedBodyPart === bodyPart && <Check className="ml-auto h-4 w-4" />}
                  </div>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  // Mobile version with dropdown
  if (isMobile) {
    return (
      <div className="mb-6">
        <Button
          variant="outline"
          className="w-full flex justify-between items-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <span>Filter Exercises</span>
          </div>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isFilterOpen ? "transform rotate-180" : "")} />
        </Button>

        {isFilterOpen && <div className="mt-2">{filterContent}</div>}
      </div>
    )
  }

  // Desktop version
  return filterContent
}
