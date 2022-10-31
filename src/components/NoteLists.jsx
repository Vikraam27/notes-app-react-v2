import React from 'react';
import PropTypes from 'prop-types';

import NoteItems from './NoteItems';
import colors from '../utils/color';

function NoteLists({ data }) {
  let index = 0;
  if (data.length === 0) {
    return <p className="not-found">Notes Not found</p>;
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
            tag={item.tag}
            title={item.title}
            key={item.id}
            cardColor={colors[index].main}
            tagColor={colors[index].secondary}
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
