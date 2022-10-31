import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import NoteLists from '../components/NoteLists';
import SearchBar from '../components/SearchBar';
import FloatingActionButton from '../components/FloatingActionButton';

export default function HomePage({ notes, query, onChangeHandler }) {
  const [searchParams, setSearchParams] = useSearchParams(query || '');
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
    </main>
  );
}

HomePage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  query: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};
