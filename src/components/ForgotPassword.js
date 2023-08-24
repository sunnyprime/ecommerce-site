import React, { useState } from 'react';
import { auth } from '../services/Firebase';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AuthContainer = styled.div`
  background: #fff;
  max-width: 350px;
  width: 100%;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15);
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin: 20px 0 10px 0;
`;

const InputBox = styled.div`
  width: 100%;
  height: 45px;
  margin-top: 25px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 16px;
  border: none;
`;

const Underline = styled.div`
  position: absolute;
  height: 2px;
  width: 100%;
  background: #ccc;
  left: 0;
  bottom: 0;
`;

const SubmitButton = styled.input`
  background: linear-gradient(to right, #99004d 0%, #ff0080 100%);
  font-size: 17px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 20px;
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      if (email) {
        await auth.sendPasswordResetEmail(email);
        setSuccessMessage(
          'Password reset email sent. Please check your inbox.'
        );
        setError('');
      } else {
        setError('Please enter your email address.');
        setSuccessMessage('');
      }
    } catch (error) {
      setError('Error sending password reset email: ' + error.message);
      setSuccessMessage('');
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <Container>
      <AuthContainer>
        <Title>Forgot Password</Title>
        {error ? <p>{error}</p> : ''}
        {successMessage ? <p>{successMessage}</p> : ''}
        <form onSubmit={handleForgotPassword}>
          <InputBox>
            <Input
              type="text"
              placeholder="Enter Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Underline></Underline>
          </InputBox>
          <SubmitButton type="submit" value="Reset Password" />
        </form>
      </AuthContainer>
    </Container>
  );
};

export default ForgotPassword;
