import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import useFetch from '../services/useFetch';

function Form({ history }) {
  const { submitLogin, submitRegister } = useFetch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [spanMessage, setSpanMessage] = useState(true);
  const [responseMessage, setResponseMessage] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const originPath = history.location.pathname;

  const validateEmail = (email) => {
    const emailRegex = (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i);
    const validEmail = emailRegex.test(email);
    return validEmail;
  };

  const validatePassword = (password) => {
    const minPasswordLength = 6;
    return password.length >= minPasswordLength;
  };

  const validateFullName = (firstName, lastName) => {
    if (originPath === '/login') return true;
    const schema = Joi.object({
      firstName: Joi.string().min(2),
      lastName: Joi.string().min(2),
    }).validate({ firstName, lastName });
    return schema;
  };

  const handleValidInputs = () => {
    validateFullName(fullName);
    validateEmail(email);
    validatePassword(password);
    setDisabled(!(!validateFullName.error && validateEmail && validatePassword))
  }

  useEffect(() => {
    handleValidInputs()
  }, [fullName, email, password]);
  
  const handleToken = (result) => {
    if (result.message) {
      setResponseMessage(result.message)
      return setSpanMessage(!spanMessage);
    } 
    localStorage.setItem('user', JSON.stringify({ token: result.token }));
    return history.push('/');
  };

  const handleSubmit = () => {
    if (originPath === '/login') return submitLogin(email, password).then((result) => handleToken(result));
    const data = { fullName, password, email }
    return submitRegister(data).then((result) => handleToken(result));
  };

  return (
    <div>
      <form>
        { originPath === '/register' && (
            <label htmlFor="name">
              FullName
              <input
                name="name"
                value={ fullName }
                data-testid="signup-name"
                onChange={ ({ target }) => setFullName(target.value) }
                />
            </label>
        )}
        <label htmlFor="email">
          Email
          <input
            data-testid={ originPath === '/register' ? 'signup-email' : 'login-email' }
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
            data-testid={ originPath === '/register' ? 'signup-password' : 'login-password' }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
      </form>
      <button
        type="button"
        data-testid={ originPath === '/register' ? 'signup-btn' : 'login-btn' }
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
      <span hidden={ spanMessage }>{ responseMessage }</span>
    </div>
  );
}

export default Form;
