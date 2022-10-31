import React from 'react';
import { FaSave } from 'react-icons/fa';
import Proptypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import FloatingActionButton from '../components/FloatingActionButton';
import TextBox from '../components/TextBox';

function NewNotesPages({
  title, tag, body, onChangeHandler, onClickHandler,
}) {
  const navigate = useNavigate();
  return (
    <main>
      <input type="text" placeholder="Title" className="input_title" onChange={(e) => onChangeHandler('title', e.target.value)} value={title} />
      <input type="text" placeholder="Tags" maxLength={10} className="input_tags" onChange={(e) => onChangeHandler('tag', e.target.value)} value={tag} />
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
  tag: Proptypes.string.isRequired,
  body: Proptypes.string.isRequired,
  onChangeHandler: Proptypes.func.isRequired,
  onClickHandler: Proptypes.func.isRequired,
};
export default NewNotesPages;
