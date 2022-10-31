import React from 'react';
import Proptypes from 'prop-types';
import parser from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArchive, FaEdit, FaTrash } from 'react-icons/fa';
import { FiArchive } from 'react-icons/fi';
import { getNote } from '../utils/local-data';
import { showFormattedDate } from '../utils';
import FloatingActionButton from '../components/FloatingActionButton';

function NoteDetails({ onClickArchive, onDeleteNote, onOpenEditPage }) {
  const params = useParams();
  const navigate = useNavigate();
  const [noteDetails, setNoteDetails] = React.useState(getNote(params.id));

  if (!noteDetails?.id) {
    return <h1 className="not-found">Notes not found</h1>;
  }
  return (
    <div className="note_details">
      <div className="note_details_header">
        <h2>{noteDetails.title}</h2>
        <p>{showFormattedDate(noteDetails.createdAt)}</p>
      </div>
      <h4>{noteDetails.tag}</h4>
      {parser(noteDetails.body)}
      <FloatingActionButton
        icon={<FaTrash />}
        rightPotition={16}
        onClickHandler={() => {
          onDeleteNote(noteDetails.id);
          navigate('/');
        }}
      />
      {noteDetails.archived ? (
        <FloatingActionButton
          icon={<FaArchive />}
          rightPotition={80}
          onClickHandler={() => {
            onClickArchive(noteDetails.id);
            setNoteDetails(getNote(params.id));
          }}
        />
      ) : (
        <FloatingActionButton
          icon={<FiArchive />}
          rightPotition={80}
          onClickHandler={() => {
            onClickArchive(noteDetails.id);
            setNoteDetails(getNote(params.id));
          }}
        />
      )}
      <FloatingActionButton
        icon={<FaEdit />}
        rightPotition={146}
        onClickHandler={() => {
          onOpenEditPage(noteDetails.id);
          navigate(`/edit-note/${noteDetails.id}`);
        }}
      />
    </div>
  );
}

NoteDetails.propTypes = {
  onClickArchive: Proptypes.func.isRequired,
  onDeleteNote: Proptypes.func.isRequired,
  onOpenEditPage: Proptypes.func.isRequired,
};

export default NoteDetails;
