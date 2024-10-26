import Recommendations from "@/components/recommendations/Recommendations";
import AddToCart from "@/components/AddToCart";
import useGetCredits from "@/hooks/useGetCredits";
import { useMovieDetails } from "@/hooks/useMoviedetails";
import { Cast } from "@/type";
import React from "react";

const MovieDetails = async ({ params }: { params: any }) => {
  const movieDetails = await useMovieDetails(params.id);

  const movieCredits = await useGetCredits(params.id);

  const { cast } = movieCredits;

  const { poster_path, overview, genres, release_date, title } = movieDetails!;

  const dateStr = release_date;
  const year = dateStr.split("-")[0];

  return (
    <div className="p-10">
      <div className="lg:flex items-start gap-3">
        {/* Movie poster */}
        <img
          className="rounded-md w-[200px]"
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
        />

        <div className="flex flex-col gap-y-4">
          {/* name and year */}
          <p>
            <span className="text-gray-500 font-semibold">{title}</span>({year})
          </p>
          {/* genres */}
          <p className="flex items-start gap-x-2">
            {genres.map((data: any, i: number) => (
              <span key={i}>{data.name}</span>
            ))}
          </p>
          {/* addToCart */}
          <AddToCart movie={movieDetails} />
          {/* Overview */}
          <p className=" lg:w-[700px]">
            <span className="text-gray-800 font-semibold">Overview</span>
            <br />
            <span className="text-gray-600">{overview}</span>
          </p>
        </div>
      </div>

      {/* cast */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3 my-2 ">
        {cast.slice(0, 9).map((cast: Cast, i: number) => (
          <div className="border border-gray-400 rounded-md h-[300px]" key={i}>
            <img
              src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
              alt=""
              className=" h-[200px] w-[350px]"
            />

            <p className="text-gray-950 font-semibold text-left p-2">
              {cast.name}
            </p>
            <p className="text-left p-2">{cast?.character}</p>
          </div>
        ))}
      </div>
      {/* recommendations */}
      <Recommendations id={params.id} />
    </div>
  );
};

export default MovieDetails;
