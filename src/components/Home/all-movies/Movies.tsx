import React, { useState, useEffect, useCallback } from "react";
import { useSearchMovie } from "@/hooks/useSearchMovie";
import { Movie, MovieApiResponse } from "@/type";
import "./movies.css";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API;
const BASE_URL = "https://api.themoviedb.org/3";

interface MoviesProps {
  search: string;
}

const Movies: React.FC<MoviesProps> = ({ search }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    data: searchData,
    isLoading: searchLoading,
    refetch,
  } = useSearchMovie(search, page);

  // Fetch popular movies based on page, optimized for changing page numbers
  const fetchPopularMovies = useCallback(async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageNumber}`,
        { cache: "force-cache" }
      );
      const data: MovieApiResponse = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
    setLoading(false);
  }, []);

  // Reset movies and page on search change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    if (search) refetch();
    else fetchPopularMovies(1);
  }, [search, refetch, fetchPopularMovies]);

  // Load more movies when page changes
  useEffect(() => {
    if (page > 1) {
      search ? refetch() : fetchPopularMovies(page);
    }
  }, [page, search, refetch, fetchPopularMovies]);

  // Infinite scroll event handler
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      !loading &&
      !searchLoading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, searchLoading]);

  // Attach and detach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Update movies with search results
  useEffect(() => {
    if (searchData?.results) {
      setMovies((prevMovies) => [...prevMovies, ...searchData.results]);
    }
  }, [searchData]);

  // Render movie cards
  const renderMovies = (moviesToRender: Movie[]) => (
    <div className="movies">
      {moviesToRender.map((movie) => (
        <Link href={`/movie-details/${movie.id}`} key={movie.id} className="movie-card">
          <img
            width={200}
            height={300}
            className="rounded-md"
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="movie-list">
      <h1>{search ? "Search Results" : "Popular Movies"}</h1>
      {renderMovies(movies)}
      {(loading || searchLoading) && <h2>Loading...</h2>}
    </div>
  );
};

export default Movies;
