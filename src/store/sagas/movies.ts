import { call, debounce, put, select, takeLatest } from 'redux-saga/effects';

import {
  MOVIES_FETCH,
  MOVIES_SEARCH,
  MoviesReceivedAction,
  receiveMovies,
  resetMovies,
  SearchMoviesAction
} from '../actions';
import { API } from '../services/api';

function* callMovies(page: Movies['page'], search: Search) {
  const movies: Movies = yield call(API.getMovies, page, search);
  yield put<MoviesReceivedAction>(receiveMovies(movies, search));
}

function* fetchMovies() {
  const { phrase, year }: Search = yield select((state: State) => {
    const { phrase, year } = state.movies;
    return { phrase, year };
  });

  if (!phrase) {
    yield put(resetMovies());
  } else {
    const canFetchMore = yield select((state: State) => {
      const { total, movies } = state.movies;
      return movies.length < total;
    });
    if (canFetchMore) {
      const page: Movies['page'] = yield select(
        (state: State) => state.movies.page
      );
      yield call(callMovies, page + 1, { phrase, year });
    }
  }
}

function* searchMovies(action: SearchMoviesAction) {
  const { phrase, year } = action;
  if (!phrase) {
    yield put(resetMovies());
  } else {
    yield call(callMovies, 1, { phrase, year });
  }
}

export function* fetchMoviesWatcher() {
  yield takeLatest(MOVIES_FETCH, fetchMovies);
}

export function* searchMoviesWatcher() {
  yield debounce(500, MOVIES_SEARCH, searchMovies);
}
