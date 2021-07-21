import React, { useEffect, useState } from 'react';

import logo from '../../assets/logo.png';
import styles from './header.module.scss';

const currentYear = new Date().getFullYear();
const startYear = 1950;
const years = Array.from(
  { length: currentYear - startYear + 1 },
  (e, idx) => startYear + idx
).reverse();

type HeaderProps = {
  onSearch: (value: Search['phrase'], year?: Search['year']) => void;
  phrase?: Search['phrase'];
  year?: Search['year'];
};

const Header: React.FC<HeaderProps> = ({
  onSearch,
  phrase,
  year: initialYear
}) => {
  const [search, setSearch] = useState(phrase);
  const [year, setYear] = useState(initialYear);
  useEffect(() => {
    if (search !== undefined) {
      onSearch(search, year || undefined);
    }
  }, [onSearch, search, year]);

  return (
    <header className={styles['header']}>
      <div className={styles['logo']}>
        <img className={styles['logo__image']} alt="Logo" src={logo} />
        Movies Search
      </div>
      <form onSubmit={e => e.preventDefault()} className={styles['form']}>
        <input
          className={styles['form__input']}
          autoFocus={true}
          value={search}
          placeholder="Search"
          onChange={e => setSearch(e.target.value)}
        />
        {!!search && (
          <select
            value={year}
            onChange={e => setYear(e.target.value)}
            className={styles['form__select']}
            placeholder="Select year"
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={`search-year-option-${year}`} value={year}>
                {year}
              </option>
            ))}
            <option />
          </select>
        )}
      </form>
    </header>
  );
};

export default React.memo(Header);
