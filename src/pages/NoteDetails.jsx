import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArchive, FaTrash } from 'react-icons/fa';
import { FiArchive } from 'react-icons/fi';
import { showFormattedDate } from '../utils';
import FloatingActionButton from '../components/FloatingActionButton';
import FetchAPI from '../utils/API';
import useToast from '../hooks/useToast';

function NoteDetails({ onClickArchive, onClickUnArchive, onDeleteNote }) {
  const params = useParams();
  const [showToast] = useToast();
  const navigate = useNavigate();
  const [noteDetails, setNoteDetails] = React.useState(null);
  const [initialize, setInitialize] = React.useState(true);

  const getNoteDetails = async () => {
    const { error, data } = await FetchAPI.getNote(params.id);

    if (error) {
      showToast(error);
      setInitialize(false);
    }
    setNoteDetails(data);
    setInitialize(false);
  };

  const onClickArchiveHandler = async (id) => {
    const { error } = onClickArchive(id);
    if (error) {
      showToast(error);
    }
    getNoteDetails();
  };

  const onClickUnArchiveHandler = async (id) => {
    const { error } = await onClickUnArchive(id);
    if (error) {
      showToast(error);
    }
    getNoteDetails();
  };

  const onDeleteNoteHandler = async (id) => {
    const { error, message } = await onDeleteNote(id);
    if (error) {
      showToast(message);
    }

    showToast(message);
    navigate('/');
  };

  useEffect(() => {
    getNoteDetails();
  }, [params.id]);

  if (initialize) {
    return (
      <div className="loader__container">
        <span className="loader" />
      </div>
    );
  }
  if (!initialize && !noteDetails?.id) {
    return <h1 className="not-found">Notes not found</h1>;
  }
  return (
    <div className="note_details">
      <div className="note_details_header">
        <h2>{noteDetails.title}</h2>
        <p>{showFormattedDate(noteDetails.createdAt)}</p>
      </div>
      {parser(noteDetails.body)}
      <FloatingActionButton
        icon={<FaTrash />}
        rightPotition={16}
        onClickHandler={() => {
          onDeleteNoteHandler(noteDetails.id);
          navigate('/');
        }}
      />
      {noteDetails.archived ? (
        <FloatingActionButton
          icon={<FaArchive />}
          rightPotition={80}
          onClickHandler={async () => {
            await onClickUnArchiveHandler(noteDetails.id);
            await getNoteDetails();
          }}
        />
      ) : (
        <FloatingActionButton
          icon={<FiArchive />}
          rightPotition={80}
          onClickHandler={async () => {
            await onClickArchiveHandler(noteDetails.id);
            await getNoteDetails();
          }}
        />
      )}
    </div>
  );
}

NoteDetails.propTypes = {
  onClickArchive: PropTypes.func.isRequired,
  onClickUnArchive: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
};
export default NoteDetails;
