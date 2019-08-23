import { all } from 'redux-saga/effects';

import { fetchMoviesWatcher, searchMoviesWatcher } from './movies';

export default function* root() {
  yield all([fetchMoviesWatcher(), searchMoviesWatcher()]);
}
