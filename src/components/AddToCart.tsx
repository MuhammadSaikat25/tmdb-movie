"use client";
import { useState, useEffect } from "react";
import { loadLocalWatchlist, saveLocalWatchlist } from "@/utils/localStorage";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoMdBookmark } from "react-icons/io";
import { addToWatchlist, removeFromWatchlist } from "@/service/favorites";

type Props = {
  movie: any;
};

function AddToCart({ movie }: Props) {
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const watchList = loadLocalWatchlist();
    setInWatchlist(watchList.some((item: any) => item.id === movie.id));
  }, [movie.id]);

  const toggleWatchlist = async () => {
    let updatedWatchlist;

    if (inWatchlist) {
      // Remove from both server and local storage
      updatedWatchlist = await removeFromWatchlist(movie.id);
    } else {
      // Add to both server and local storage
      updatedWatchlist = await addToWatchlist(movie);
    }

    // Update local storage and component state
    saveLocalWatchlist(updatedWatchlist);
    setInWatchlist(!inWatchlist);
  };

  return (
    <div>
      <button onClick={toggleWatchlist}>
        {inWatchlist ? <IoMdBookmark /> : <IoBookmarkOutline />}
      </button>
    </div>
  );
}

export default AddToCart;
