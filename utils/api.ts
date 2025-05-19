export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "213f406631msh3b5d74d815d95d7p1d8e72jsnc7ec6bd25644",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
}

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "75d83e435cmsh283d89ea50b0619p1d652ejsn41d729181918",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
}

export const fetchData = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options)
  const data = await response.json()

  return data
}
