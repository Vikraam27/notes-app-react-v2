import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  FaMoon, FaPlus, FaSun,
} from 'react-icons/fa';
import { BsTranslate } from 'react-icons/bs';
import NoteLists from '../components/NoteLists';
import SearchBar from '../components/SearchBar';
import FloatingActionButton from '../components/FloatingActionButton';
import AppContext from '../context/AppContext';

export default function HomePage({ notes, query, onChangeHandler }) {
  const [searchParams, setSearchParams] = useSearchParams(query || '');
  const { theme, toggleTheme, toggleLang } = useContext(AppContext);
  const keywords = searchParams.get('keyword');
  const navigate = useNavigate();
  const changeSearchQuery = (keyword) => {
    setSearchParams({ keyword });
    onChangeHandler('query', keyword);
  };
  return (
    <main>
      <SearchBar keyword={keywords || ''} keywordChange={changeSearchQuery} />
      <NoteLists data={notes} />
      <FloatingActionButton
        icon={<FaPlus />}
        rightPotition={16}
        onClickHandler={() => navigate('/new-note')}
      />
      {
        theme === 'light' ? (
          <FloatingActionButton
            icon={<FaMoon />}
            rightPotition={90}
            onClickHandler={() => toggleTheme()}
          />
        ) : (
          <FloatingActionButton
            icon={<FaSun />}
            rightPotition={90}
            onClickHandler={() => toggleTheme()}
          />
        )
      }
      <FloatingActionButton
        icon={<BsTranslate />}
        rightPotition={170}
        onClickHandler={() => toggleLang()}
      />
    </main>
  );
}

HomePage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  query: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};
