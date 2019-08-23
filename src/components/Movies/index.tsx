import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { searchMovies as searchMoviesAction } from '../../store/actions';
import { selectMoviesData } from '../../store/selectors';
import Movies from './Movies';

const MoviesContainer: React.FC<RouteComponentProps> = ({ location }) => {
  const { movies, page, phrase, year } = useSelector(selectMoviesData());
  const dispatch = useDispatch();
  if (page === 0 && phrase) {
    dispatch(searchMoviesAction({ phrase, year }));
  }
  return <Movies movies={movies} />;
};

export default React.memo(MoviesContainer);
