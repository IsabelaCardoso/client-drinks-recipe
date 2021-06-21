import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import useFetch from '../services/useFetch';

function Form({ history }) {
  const { submitLogin, submitRegister } = useFetch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userAlreadyRegistered, setUserAlreadyRegistered] = useState(true);

  // const [checkbox, setCheckbox] = useState(false);
  const [disabled, setDisabled] = useState(true);
  // const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);

  const originPath = history.location.pathname;

  const validateEmail = (email) => {
    const emailRegex = (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i);
    const validEmail = emailRegex.test(email);
    return validEmail;
  };

  const validatePassword = (password) => {
    console.log(password)
    const minPasswordLength = 6;
    return password.length >= minPasswordLength;
  };

  const validateRegisterFullName = (firstName, lastName) => {
    if (originPath === '/login') return true;
    const schema = Joi.object({
      firstName: Joi.string().min(2),
      lastName: Joi.string().min(2),
    }).validate({ firstName, lastName });
    return schema;
  };

  const handleValidInputs = () => {
    validateRegisterFullName(firstName, lastName);
    validateEmail(email);
    validatePassword(password);
    setDisabled(!(!validateRegisterFullName.error && validateEmail && validatePassword))
  }

  useEffect(() => {
    handleValidInputs()
  }, [firstName, lastName, email, password]);
  
  const handleToken = (result) => {
    if (result.message) return setUserAlreadyRegistered(!userAlreadyRegistered);
    localStorage.setItem('user', JSON.stringify({ token: result }));
    return history.push('/');
  };

  const handleSubmit = () => {
    if (originPath === '/login') return submitLogin(email, password).then((result) => handleToken(result));
    const data = { firstName, lastName, password, email }
    return submitRegister(data).then((result) => handleToken(result));
  };

  return (
    <div>
      <form>
        { originPath === '/register' && (
          <div>
            <label htmlFor="name">
              First Name
              <input
                type="name"
                name="name"
                value={ firstName }
                data-testid="signup-name"
                onChange={ ({ target }) => setFirstName(target.value) }
                />
            </label>
            <label htmlFor="name">
              Last Name
            <input
              type="name"
              name="name"
              value={ lastName }
              data-testid="signup-name"
              onChange={ ({ target }) => setLastName(target.value) }
              />
            </label>
          </div>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid={ originPath === '/register' ? 'signup-email' : 'email-input' }
            value={ email }
            name="email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={ password }
            data-testid={ originPath === '/register' ? 'signup-password' : 'password-input' }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
      </form>
      <button
        type="button"
        data-testid={ originPath === '/register' ? 'signup-btn' : 'signin-btn' }
        disabled={ disabled }
        onClick={ () => handleSubmit() }
      >
        { originPath === '/register' ? 'Register' : 'Sing in' }
      </button>
      { originPath !== '/register' && (
        <button
          type="button"
          data-testid="no-account-btn"
          onClick={ () => history.push('/register') }
        >
          Register
        </button>
      )}
      <span hidden={ userAlreadyRegistered }>User already registered</span>
    </div>
  );
}

export default Form;
