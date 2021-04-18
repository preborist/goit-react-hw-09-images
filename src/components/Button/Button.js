import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      type="button"
      className="Button"
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
