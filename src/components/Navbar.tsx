"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  return (
    <div className=" flex items-center justify-center gap-4 bg-[#032541] p-2 text-white">
      <Link href={"/"} className="">
        TMDB
      </Link>
      <Link href={"/watchlist"}>Watchlist</Link>
    </div>
  );
};

export default Navbar;
