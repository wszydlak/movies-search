import cx from 'classnames';
import React, { useEffect, useState } from 'react';

import style from './progressive-image.module.scss';

type ProgressiveImageProps = {
  preview: string;
  src: string;
} & JSX.IntrinsicElements['img'];

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  preview,
  className,
  alt,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const image = new Image();
  image.onload = () =>
    setIsLoaded(currentValue => (currentValue === false ? true : currentValue));
  image.src = src;

  useEffect(() => {
    setIsLoaded(currentValue => (currentValue === true ? false : currentValue));
  }, [src]);

  return (
    <img
      src={isLoaded ? src : preview}
      className={cx(className, style['image'], {
        [style['image_progress']]: !isLoaded
      })}
      alt={alt}
      {...props}
    />
  );
};

export default React.memo<ProgressiveImageProps>(ProgressiveImage);
