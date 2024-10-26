"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Movies from "@/components/Home/all-movies/Movies";
import Header from "@/components/Home/headers/Header";
import { useState } from "react";

type SearchFormInputs = {
  search: string;
};

const Home = () => {
  const { register, handleSubmit } = useForm<SearchFormInputs>();
  const [search, setSearch] = useState<string>("");

  const onSubmit: SubmitHandler<SearchFormInputs> = (data) => {
    setSearch(data.search);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-fit mx-auto my-4">
        <input
          {...register("search", { required: "Search term is required" })}
          type="text"
          className="border px-3 rounded-xl"
          placeholder="Search movies"
        />

        <button className="text-white bg-blue-600 border px-3 rounded-xl" type="submit">Search</button>
      </form>

      <Movies search={search} />
    </div>
  );
};

export default Home;
