import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

// import { useGlobalContext } from "../context/GlobalContext";
import { useSessionContext } from "../context/SessionContext";


function Registration({ onRegister }) {

    const {isValidPassword, registerUser, sessionError, setSessionError, sessionUser} = useSessionContext();
    const navigate = useNavigate();
    const [inputState, setInputState] = useState({
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    });

  const { email, firstName, lastName, password } = inputState;

  if (sessionUser) {
    console.log('registration session user is ', sessionUser);
    navigate('/home');
  }

  const handleInput = name => event => {
    setInputState({...inputState, [name]: event.target.value});
    // setError('')
  };

  const handleRegistration = (e) => {
      e.preventDefault();

      if (!isValidPassword(password)) {
        setSessionError('Password not valid...');
        return;
      }

      registerUser(inputState, navigate, onRegister);
  };
  const handleLogin = () => {
      setSessionError('');
      navigate('/login');
  };

  return (
      <LoginContainer>
          <LoginBox>
              <Title>Register</Title>
              <Form onSubmit={handleRegistration}>
              {sessionError && <p className='error'>{sessionError}</p>}
                  <Input 
                      type="firstName" 
                      placeholder="First Name" 
                      value={firstName} 
                      onChange={handleInput('firstName')} 
                      required
                  />
                  <Input 
                      type="lastName" 
                      placeholder="Last Name" 
                      value={lastName} 
                      onChange={handleInput('lastName')} 
                      required
                  />
                  <Input 
                      type="email" 
                      placeholder="Email" 
                      value={email} 
                      onChange={handleInput('email')} 
                      required
                  />
                  <Input 
                      type="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={handleInput('password')} 
                      required
                  />
                  <Button type="submit">Register</Button>
              </Form>
              <LoginButton onClick={handleLogin}>Login</LoginButton>
          </LoginBox>
      </LoginContainer>
  )
}

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

const LoginBox = styled.div`
  width: 400px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #333;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoginButton = styled(Button)`
  margin-top: 10px;
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

export default Registration