import React from 'react';

import noImage from '../../assets/no-image.png';
import ProgressiveImage from '../ProgressiveImage';
import styles from './movies.module.scss';

type MovieProps = Pick<Movie, 'id' | 'title' | 'image' | 'vote'>;

const Movie: React.FC<MovieProps> = ({ id, title, image, vote }) => {
  return (
    <li className={styles['element']}>
      <div className={styles['element__link']}>
        <ProgressiveImage
          className={styles['element__image']}
          alt={title}
          preview={image ? image.small : noImage}
          src={image ? image.medium : noImage}
          onError={e => {
            (e.target as HTMLImageElement).src = noImage;
          }}
        />
        <span className={styles['element__vote-wrapper']}>
          <span className={styles['element__vote']}>{vote}</span>
        </span>
        <span className={styles['element__title']}>{title}</span>
      </div>
    </li>
  );
};

export default Movie;
