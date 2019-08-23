/* Movies */
declare type Movie = {
  id: number;
  title: string;
  vote: number;
  image?: {
    small: string;
    medium: string;
    large: string;
  };
  overview: string;
  date: string;
};

declare type Movies = {
  page: number;
  pages: number;
  total: number;
  movies: Movie[];
};

declare type ApiMovies = {
  page: number;
  results: ApiMovie[];
  total_pages: number;
  total_results: number;
};

declare type ApiMovie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  release_date: string;
};

/* Loading */
declare type Loading = {
  isLoading: boolean;
};

declare type Search = {
  phrase: string;
  year?: string;
};

/* Store */
declare type MoviesState = Readonly<Movies & Loading & Partial<Search>>;

declare type State = Readonly<{
  movies: MoviesState;
}>;
