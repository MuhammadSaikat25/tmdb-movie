import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async (
  movieQuery: string,
  page: number = 1
): Promise<MovieApiResponse> => {
  if (!movieQuery) {
    throw new Error("Movie query is required");
  }

  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      movieQuery
    )}&api_key=${API_KEY}&page=${page}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie data");
  }

  return res.json();
};

export const useSearchMovie = (
  movieQuery: string,
  page: number
): UseQueryResult<MovieApiResponse, Error> => {
  return useQuery({
    queryKey: ["movies", movieQuery, page],
    queryFn: () => fetchMovies(movieQuery, page),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: !!movieQuery,
  } as UseQueryOptions<MovieApiResponse, Error>);
};
