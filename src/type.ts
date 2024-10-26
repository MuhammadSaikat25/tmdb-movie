export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
  character?: string;
}
export interface watchList {
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}
