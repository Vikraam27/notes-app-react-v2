import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Proptypes from 'prop-types';

import FloatingActionButton from '../components/FloatingActionButton';
import TextBox from '../components/TextBox';

function EditNote({
  onEditNote, title, tag, body, onChangeHandler,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  if (!title || !tag || !body) {
    return <h1 className="not-found">Note not found</h1>;
  }
  return (
    <main>
      <input type="text" placeholder="Title" className="input_title" onChange={(e) => onChangeHandler('title', e.target.value)} value={title} />
      <input type="text" placeholder="Tags" maxLength={10} className="input_tags" onChange={(e) => onChangeHandler('tag', e.target.value)} value={tag} />
      <TextBox
        handleChange={onChangeHandler}
        value={body}
        defaultValue={body}
      />
      <FloatingActionButton
        icon={<FaCheck />}
        rightPotition={16}
        onClickHandler={() => {
          onEditNote({
            id, title, body, tag,
          });
          navigate('/');
        }}
      />
    </main>
  );
}

EditNote.propTypes = {
  onEditNote: Proptypes.func.isRequired,
  title: Proptypes.string.isRequired,
  tag: Proptypes.string.isRequired,
  body: Proptypes.string.isRequired,
  onChangeHandler: Proptypes.func.isRequired,
};
export default EditNote;
