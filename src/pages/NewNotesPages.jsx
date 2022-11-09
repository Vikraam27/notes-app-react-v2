import React, { useContext } from 'react';
import { FaSave } from 'react-icons/fa';
import Proptypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import FloatingActionButton from '../components/FloatingActionButton';
import TextBox from '../components/TextBox';
import AppContext from '../context/AppContext';

function NewNotesPages({
  title, body, onChangeHandler, onClickHandler,
}) {
  const navigate = useNavigate();
  const { lang } = useContext(AppContext);
  return (
    <main>
      <input
        type="text"
        placeholder={lang === 'id' ? 'Judul' : 'Title'}
        className="input_title"
        onChange={(e) => onChangeHandler('title', e.target.value)}
        value={title}
      />
      <TextBox handleChange={onChangeHandler} value={body} defaultValue={body} />
      <FloatingActionButton
        icon={<FaSave />}
        rightPotition={16}
        onClickHandler={() => {
          onClickHandler();
          navigate('/');
        }}
      />
    </main>
  );
}
NewNotesPages.propTypes = {
  title: Proptypes.string.isRequired,
  body: Proptypes.string.isRequired,
  onChangeHandler: Proptypes.func.isRequired,
  onClickHandler: Proptypes.func.isRequired,
};
export default NewNotesPages;
