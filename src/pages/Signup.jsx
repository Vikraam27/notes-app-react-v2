import React, { useState } from 'react';

import { MdAlternateEmail, MdPerson } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../components/input';
import useInput from '../hooks/useInput';
import Button from '../components/Button';
import useToast from '../hooks/useToast';
import FetchAPI from '../utils/API';

function Signup() {
  const [showToast] = useToast();
  const navigate = useNavigate();
  const [fullname, setFullname] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [errors, setErrors] = useState({
    fullname: '',
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
    handleError('', 'fullname');

    let isValid = true;
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;

    if (!fullname) {
      handleError('fullname is required', 'fullname');
    }
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
      const { status, message } = await FetchAPI.register({ name: fullname, email, password });
      if (status === 'fail') {
        showToast(message);
      }

      if (status === 'success') {
        showToast(message);
        navigate('/signin');
      }
    }
  };

  return (
    <div className="container">
      <h1 className="logo-title">
        Notes
        <span>App</span>
      </h1>
      <h2 className="second_title">Create Account</h2>
      <h3 className="description_form">Please fill all field to create account</h3>
      <form action="POST" className="form__group">
        <Input
          IconName={MdPerson}
          label="Fullname"
          name="fullname"
          onChange={setFullname}
          placeholder="please input your fullname"
          value={fullname}
          type="text"
          error={errors.fullname}
        />
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
          name="Register"
          onClick={validate}
          type="button"
        />
      </form>
      <p className="form_text">
        already have account ?
        {' '}
        <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
}

export default Signup;
