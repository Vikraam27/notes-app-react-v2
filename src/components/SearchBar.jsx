import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import AppContext from '../context/AppContext';

function SearchBar({ keyword, keywordChange }) {
  const { lang } = useContext(AppContext);
  return (
    <form className="search-form">
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            id="search"
            placeholder={lang === 'id' ? 'Cari note' : 'Search notes'}
            value={keyword}
            onChange={(e) => keywordChange(e.target.value)}
          />
          <button type="submit" id="submit-search" className="searchButton" aria-label="search">
            <FaSearch />
          </button>
        </div>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
