/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Input({
  label,
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  IconName,
  error,
}) {
  const [hidePassword, setHidePassword] = React.useState(false);
  const [inputType, setInputType] = React.useState(type);
  return (
    <div className="input_container">
      <label htmlFor={name} className="input_label">{label}</label>
      <div className="input_wrapper">
        <IconName className="input_icons" />
        <input
          name={name}
          id={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          type={inputType}
        />
        {type === 'password' && (hidePassword ? (
          <FiEye
            className="input_icons"
            onClick={() => {
              setHidePassword(!hidePassword);
              setInputType('password');
            }}
          />
        ) : (
          <FiEyeOff
            className="input_icons"
            onClick={() => {
              setHidePassword(!hidePassword);
              setInputType('text');
            }}
          />
        ))}
      </div>
      {error && (<p className="input_error">{error}</p>)}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  IconName: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};
