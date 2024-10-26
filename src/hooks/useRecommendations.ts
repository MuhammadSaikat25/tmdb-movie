const useRecommendations = async (id: string, page: number = 1) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API}&page=${page}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch recommendations: ${res.statusText}`);
  }

  return res.json();
};

export default useRecommendations;
