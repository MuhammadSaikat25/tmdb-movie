import MovieDetailsSchema from "@/Schema/MovieDetailsSchema";

export const useMovieDetails = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60,
        },
      }
    );
    const data = await res.json();
    const movieDetail = MovieDetailsSchema.parse(data);
    return movieDetail;
  } catch (error) {
    console.log(error);
  }
};
