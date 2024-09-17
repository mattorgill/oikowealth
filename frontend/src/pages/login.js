import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import { useSessionContext } from "../context/SessionContext";


function Login({ onLogin }) {

    const {loginUser, sessionError, setSessionError} = useSessionContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(email, password, navigate, onLogin);
      };

    const handleRegister = () => {
        setSessionError('');
        navigate('/register');
    };

    return (
        <LoginContainer>
            <LoginBox>
                <Title>Login</Title>
                <Form onSubmit={handleLogin}>
                {sessionError && <p className='error'>{sessionError}</p>}
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <Input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <Button type="submit">Login</Button>
                </Form>
                {/* {sessionError && <p>{sessionError}</p>} */}
                <RegisterButton onClick={handleRegister}>Register</RegisterButton>
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

const RegisterButton = styled(Button)`
  margin-top: 10px;
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

export default Login