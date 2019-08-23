import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router';

import { getMovies as getMoviesAction } from '../../store/actions';
import { selectHasMore, selectIsLoading } from '../../store/selectors';
import Movies from '../Movies';
import Spinner from '../Spinner';

const Main: React.FC = () => {
  const isLoading = useSelector(selectIsLoading());
  const hasMore = useSelector(selectHasMore());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      const removeListener = (callback: EventListener) => {
        window.removeEventListener('scroll', callback);
      };
      const callback = () => {
        const { documentElement } = document;
        const top = window.innerHeight + documentElement.scrollTop;
        const full = documentElement.offsetHeight;

        if (top >= full - 50) {
          dispatch(getMoviesAction());
          if (hasMore) {
            removeListener(callback);
          }
        }
      };

      window.addEventListener('scroll', callback);
      return () => {
        removeListener(callback);
      };
    }
  }, [dispatch, hasMore, isLoading]);
  return (
    <section>
      <Route path="/search" component={Movies} />
      <Spinner show={isLoading} />
    </section>
  );
};

export default React.memo(Main);
