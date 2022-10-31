/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CustomToolbar() {
  return (
    <div id="toolbar">
      <select className="ql-font">
        <option value="arial" selected>
          Arial
        </option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium" selected>
          Size 3
        </option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
      <button className="ql-clean" type="button" />
    </div>
  );
}

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = [
  'arial',
  'comic-sans',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida',
];
Quill.register(Font, true);

function TextBox({ value, handleChange, defaultValue }) {
  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
  ];

  return (
    <div className="body_wrapper">
      <CustomToolbar />
      <ReactQuill
        value={value}
        onChange={(val) => handleChange('body', val)}
        placeholder="body"
        modules={modules}
        formats={formats}
        className="box"
        defaultValue={defaultValue}
      />
    </div>
  );
}

TextBox.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default TextBox;
