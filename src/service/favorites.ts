"use server";

let watchlist:any = [];

export async function addToWatchlist(movie: any) {
  const { poster_path, overview, release_date, title, id } = movie;
  if (!watchlist.some((m: any) => m.id === movie.id)) {
    watchlist.push({ poster_path, overview, release_date, title, id });
  }
  return watchlist;
}

export async function removeFromWatchlist(movieId: number) {
  watchlist = watchlist.filter((movie: any) => movie.id !== movieId);
  return watchlist;
}

export async function getWatchlist() {
  return watchlist;
}
