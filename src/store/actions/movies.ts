import { Action } from 'redux';

export const MOVIES_FETCH = 'MOVIES_FETCH';
export const MOVIES_RECEIVED = 'MOVIES_RECEIVED';
export const MOVIES_SEARCH = 'MOVIES_SEARCH';
export const MOVIES_RESET = 'MOVIES_RESET';

export interface MoviesReceivedAction extends Action {
  readonly type: typeof MOVIES_RECEIVED;
  readonly search: Search;
  readonly movies: Movies;
}

export interface GetMoviesAction extends Action {
  readonly type: typeof MOVIES_FETCH;
}

export interface SearchMoviesAction extends Action {
  readonly type: typeof MOVIES_SEARCH;
  readonly phrase: Search['phrase'];
  readonly year?: Search['year'];
}

export interface ResetMoviesAction extends Action {
  readonly type: typeof MOVIES_RESET;
}

export const getMovies = (): GetMoviesAction => ({
  type: MOVIES_FETCH
});

export const searchMovies = (search: Search): SearchMoviesAction => ({
  type: 'MOVIES_SEARCH',
  phrase: search.phrase,
  year: search.year
});

export const receiveMovies = (
  movies: Movies,
  search: Search
): MoviesReceivedAction => ({
  type: MOVIES_RECEIVED,
  search,
  movies
});

export const resetMovies = (): ResetMoviesAction => ({
  type: 'MOVIES_RESET'
});
