const useGetCredits = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    }
  );
  return res.json();
};

export default useGetCredits;
