export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
  gifUrl: string;
  instructions?: string[];
}

export interface YoutubeVideo {
  video: {
    videoId: string;
    title: string;
    thumbnails: {
      url: string;
    }[];
  };
}

export interface YoutubeSearchResponse {
  contents: {
    video: {
      videoId: string;
      title: string;
      thumbnails: {
        url: string;
      }[];
    };
  }[];
}

// API configuration
export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "213f406631msh3b5d74d815d95d7p1d8e72jsnc7ec6bd25644",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "75d83e435cmsh283d89ea50b0619p1d652ejsn41d729181918",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

// Generic fetch function with error handling
export const fetchData = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
