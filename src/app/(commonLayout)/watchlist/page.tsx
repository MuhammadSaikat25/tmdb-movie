"use client";
import { IoMdBookmark } from "react-icons/io";
import { removeFromWatchlist } from "@/service/favorites";
import { watchList } from "@/type";
import { useEffect, useState } from "react";

const Watchlist = () => {
  const [cart, setCart] = useState<watchList[] | null>(null);

  useEffect(() => {
    const storedWatchList = localStorage.getItem("watchList");
    if (storedWatchList) {
      setCart(JSON.parse(storedWatchList));
    }
  }, []);

  const handleRemove = async (id: number) => {
    const updatedWatchlist = await removeFromWatchlist(id);

    setCart(updatedWatchlist);
    localStorage.setItem("watchList", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="p-4 flex items-center flex-wrap gap-5 ">
      {cart?.map((data: watchList, i: number) => (
        <div key={i} className="border w-fit h-fit p-2 rounded-md">
          <img
            src={`https://image.tmdb.org/t/p/w200${data.poster_path}`}
            alt={data.title || "Movie poster"}
          />
          <section className="flex items-center justify-between gap-2">
            <p>{data.title}</p>
            <p className="cursor-pointer" onClick={() => handleRemove(data.id)}>
              <IoMdBookmark />
            </p>
          </section>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
