import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';

import { searchMovies as searchMoviesAction } from '../../store/actions';
import { selectPhrase, selectYear } from '../../store/selectors';
import Header from './Header';

const HeaderContainer = withRouter(({ history }) => {
  const phrase = useSelector(selectPhrase());
  const year = useSelector(selectYear());
  const dispatch = useDispatch();
  const onSearch = useCallback(
    (phrase: Search['phrase'], year?: Search['year']) => {
      dispatch(searchMoviesAction({ phrase, year }));
      if (phrase) {
        history.push(`/search?phrase=${phrase}${year ? `&year=${year}` : ''}`);
      } else {
        history.push('/');
      }
    },
    [dispatch, history]
  );

  return <Header year={year} phrase={phrase} onSearch={onSearch} />;
});

export default React.memo(HeaderContainer);
