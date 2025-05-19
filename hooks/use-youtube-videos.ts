"use client"

import { useState, useEffect } from "react"
import { fetchData, youtubeOptions, type YoutubeSearchResponse } from "@/lib/api"

export function useYoutubeVideos(exerciseName: string | null) {
  const [videos, setVideos] = useState<YoutubeSearchResponse["contents"]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!exerciseName) {
      setVideos([])
      return
    }

    const fetchVideos = async () => {
      try {
        setIsLoading(true)
        const searchQuery = `${exerciseName} exercise demonstration`
        const data = await fetchData<YoutubeSearchResponse>(
          `https://youtube-search-and-download.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}`,
          youtubeOptions,
        )

        setVideos(data.contents?.slice(0, 4) || [])
        setError(null)
      } catch (err) {
        setError("Failed to load videos. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [exerciseName])

  return { videos, isLoading, error }
}
