import React from 'react';
import PropTypes from 'prop-types';

function Button({ name, onClick, type }) {
  return (
    <button
      onClick={onClick}
      className="btn_custom"
      type={type === 'submit' ? 'submit' : 'button'}
    >
      <p className="btn_name">{name}</p>
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
export default Button;
