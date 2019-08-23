import { parse as queryStringParse } from 'query-string';

import {
  MOVIES_FETCH,
  MOVIES_RECEIVED,
  MOVIES_RESET,
  MoviesReceivedAction
} from '../actions';
import createReducer from '../utils/createReducer';

const queryParams: Partial<Search> = queryStringParse(window.location.search);
const phrase = queryParams.phrase || undefined;
const year = queryParams.year || undefined;

const initialState: MoviesState = {
  isLoading: false,
  phrase,
  year,
  movies: [],
  page: 0,
  pages: 0,
  total: 0
};

export default createReducer(initialState, {
  [MOVIES_FETCH]: state => {
    const { movies, total } = state;
    if (movies.length < total) {
      return {
        ...state,
        isLoading: true
      };
    }
    return state;
  },

  [MOVIES_RESET]: () => ({
    ...initialState,
    phrase: undefined,
    year: undefined
  }),
  [MOVIES_RECEIVED]: (
    state,
    {
      movies: { page, pages, total, movies },
      search: { phrase, year }
    }: MoviesReceivedAction
  ) => ({
    ...state,
    phrase,
    year,
    page,
    pages,
    total,
    movies: page === 1 ? [...movies] : [...state.movies, ...movies],
    isLoading: false
  })
});
