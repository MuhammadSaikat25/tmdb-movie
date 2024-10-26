export const loadLocalWatchlist = () => {
  if (typeof window !== "undefined") {
    const storedWatchlist = localStorage.getItem("watchList");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  }
  return [];
};

export const saveLocalWatchlist = (watchList: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }
};
