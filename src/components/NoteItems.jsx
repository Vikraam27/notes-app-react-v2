import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';

import { Link } from 'react-router-dom';
import { showFormattedDate, showFromattedTime } from '../utils';

function NoteItems({
  id, title, body, createdAt, tag, cardColor, tagColor,
}) {
  return (
    <div key={id} style={{ backgroundColor: cardColor }} className="note">
      <div className="note_header">
        <h3 className="note_header_title"><Link className="link_id" to={`/note/${id}`}>{title}</Link></h3>
        <p className="note_header_tag" style={{ backgroundColor: tagColor }}>{tag}</p>
      </div>
      <div className="note_body">
        <p className="note_body_text">
          {parser(body).length > 230 ? `${parser(body.substring(0, 221))}...` : parser(body)}
        </p>
      </div>
      <div className="note_footer">
        <p className="note_footer_time">{showFromattedTime(createdAt)}</p>
        <p className="note_footer_date">{showFormattedDate(createdAt)}</p>
      </div>
    </div>
  );
}

NoteItems.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  cardColor: PropTypes.string.isRequired,
  tagColor: PropTypes.string.isRequired,

};

export default NoteItems;
