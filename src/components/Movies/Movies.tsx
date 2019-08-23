import React from 'react';
import { useSelector } from 'react-redux';

import { selectIsLoading } from '../../store/selectors';
import Movie from './Movie';
import styles from './movies.module.scss';

type MoviesProps = Pick<Movies, 'movies'>;

const MoviesComponent: React.FC<MoviesProps> = ({ movies }) => {
  const isLoading = useSelector(selectIsLoading());

  if (movies.length) {
    return (
      <ul className={styles['list']}>
        {movies.map(movie => (
          <Movie key={movie.id} {...movie} />
        ))}
      </ul>
    );
  }
  return isLoading ? null : (
    <div className={styles['no-results']}>No movies found</div>
  );
};

export default React.memo(MoviesComponent);
