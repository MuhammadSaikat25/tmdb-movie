"use client";
import React, { useState, useEffect, useCallback } from "react";
import useRecommendations from "@/hooks/useRecommendations";
import { Movie } from "@/type";
import Link from "next/link";

interface RecommendationsProps {
  id: string;
}

const Recommendations: React.FC<RecommendationsProps> = ({ id }) => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = useCallback(
    async (pageNumber: number) => {
      setLoading(true);
      try {
        const data = await useRecommendations(id, pageNumber);
        setRecommendations((prevRecommendations) => [
          ...prevRecommendations,
          ...data.results,
        ]);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
      setLoading(false);
    },
    [id]
  );

  useEffect(() => {
    setRecommendations([]);
    setPage(1);
    fetchRecommendations(1);
  }, [id, fetchRecommendations]);

  useEffect(() => {
    if (page > 1) fetchRecommendations(page);
  }, [page, fetchRecommendations]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const renderRecommendations = (moviesToRender: Movie[]) => (
    <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-3 my-2 mx-auto w-fit">
      {moviesToRender.map((movie, i: number) => (
        <Link href={`/movie-details/${movie.id}`} key={i} className="recommendation-card">
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
    <div className="">
      <h1 className="text-left text-gray-950 font-semibold">Recommendations</h1>
      {renderRecommendations(recommendations)}
      {loading && <h2>Loading...</h2>}
    </div>
  );
};

export default Recommendations;
