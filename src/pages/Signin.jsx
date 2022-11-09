import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/input';
import useInput from '../hooks/useInput';
import Button from '../components/Button';
import useToast from '../hooks/useToast';
import FetchAPI from '../utils/API';

function Signin({ onLoginSuccess }) {
  const [showToast] = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const validate = async (e) => {
    e.preventDefault();
    handleError('', 'password');
    handleError('', 'email');
    let isValid = true;
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (!email) {
      handleError('email is required', 'email');
      isValid = false;
    }
    if (reg.test(email) === false) {
      handleError('Please input valid email', 'email');
      isValid = false;
    }
    if (password.length <= 8) {
      handleError('password must more than 8 character', 'password');
      isValid = false;
    }
    if (isValid) {
      const { error, data } = await FetchAPI.login({ email, password });
      if (error) {
        showToast(error);
      } else {
        onLoginSuccess(data);
        navigate('/');
      }
    }
  };

  return (
    <div className="container">
      <h1 className="logo-title">
        Notes
        <span>App</span>
      </h1>
      <h2 className="second_title">Log In</h2>
      <h3 className="description_form">Please login to your account</h3>
      <form action="POST" className="form__group">
        <Input
          IconName={MdAlternateEmail}
          label="Email"
          name="email"
          onChange={setEmail}
          placeholder="please input valid email"
          value={email}
          type="email"
          error={errors.email}
        />
        <Input
          IconName={FaLock}
          label="Password"
          name="password"
          onChange={setPassword}
          placeholder="please input password min 8 character"
          value={password}
          type="password"
          error={errors.password}
        />
        <Button
          name="Log in"
          onClick={validate}
          type="button"
        />
      </form>
      <p className="form_text">
        Don&apos;t have account ?
        {' '}
        <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

Signin.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Signin;
