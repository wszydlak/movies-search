import React from 'react';

type SpinnerProps = {
  show: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ show }) => {
  return !show ? null : (
    <div className="spinner">
      <span className="spinner__line1" />
      <span className="spinner__line2" />
      <span className="spinner__line3" />
      <span className="spinner__line4" />
      <span className="spinner__line5" />
    </div>
  );
};

export default React.memo(Spinner);
