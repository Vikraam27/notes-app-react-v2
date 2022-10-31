import React from 'react';
import PropTypes from 'prop-types';

function FloatingActionButton({ onClickHandler, icon, rightPotition }) {
  return (
    <div className="wrap">
      <button id="floating_btn" style={{ right: rightPotition }} type="button" onClick={(e) => onClickHandler(e)}>
        {icon}
      </button>
    </div>
  );
}

FloatingActionButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  rightPotition: PropTypes.number.isRequired,
};

export default FloatingActionButton;
