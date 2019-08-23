export const selectIsLoading = () => (state: State) => state.movies.isLoading;

export const selectMoviesData = () => (state: State) => state.movies;

export const selectPhrase = () => (state: State) => state.movies.phrase;

export const selectYear = () => (state: State) => state.movies.year;

export const selectHasMore = () => (state: State) => {
  const { total, movies } = state.movies;
  return movies.length < total;
};
