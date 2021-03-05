export interface MovieItem {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  media_type?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  onClick: (value: number) => void;
}

export interface MovieItemModal {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  title?: string;
  cast?: CastItem[];
  crew?: CrewItem[];
  poster_path?: string;
  overview?: string;
  release_date?: string;
  genres?: { name?: string; id?: number }[];
}

export interface MoviesList {
  moviesList: {
    movies: MovieItem[];
    totalResults: number;
    totalPages: number;
  };
}

export type CastItem = {
  adult?: boolean;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  order: number;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
};

export type CrewItem = {
  adult?: boolean;
  character?: string;
  credit_id?: string;
  department?: string;
  gender?: number;
  id?: number;
  job?: string;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
};
