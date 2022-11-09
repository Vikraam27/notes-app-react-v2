import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import NoteItems from './NoteItems';
import colors from '../utils/color';
import AppContext from '../context/AppContext';

function NoteLists({ data }) {
  const { lang } = useContext(AppContext);
  let index = 0;
  if (data.length === 0) {
    return <p className="not-found">{lang === 'id' ? 'Note Tidak ditemukan' : 'Notes Not found'}</p>;
  }
  return (
    <div className="note_container">
      {data.map((item) => {
        if (index >= colors.length) {
          index = 0;
        }
        const note = (
          <NoteItems
            id={item.id}
            body={item.body}
            createdAt={item.createdAt}
            title={item.title}
            key={item.id}
            cardColor={colors[index].main}
          />
        );

        index += 1;
        return note;
      })}
    </div>
  );
}

NoteLists.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default NoteLists;
