import React, { useState } from 'react';
import { auth } from '../services/Firebase'; // Make sure you import auth from Firebase
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const Option = styled.div`
  font-size: 14px;
  text-align: center;
  margin-top: 20px;

  button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
  }
`;

const SocialLink = styled.button`
  display: block;
  height: 45px;
  width: 100%;
  font-size: 15px;
  text-decoration: none;
  padding-left: 20px;
  line-height: 45px;
  color: #fff;
  border-radius: 5px;
  transition: all 0.3s ease;
  background: #dd4b39;
  border: none;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #c23321;
  }

  i {
    padding-right: 12px;
    font-size: 20px;
  }
};`;

const FacebookLink = styled.div`
display: block;
  height: 45px;
  width: 100%;
  font-size: 15px;
  text-decoration: none;
  padding-left: 20px;
  line-height: 45px;
  color: #fff;
  border-radius: 5px;
  transition: all 0.3s ease;
  background: linear-gradient(to right, #1877f2, #1877f2, #1877f2);
  border: none;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(to right, #1371e2, #1371e2, #1371e2);
  }

  i {
    padding-right: 12px;
    font-size: 20px;
  }
};
`;

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleForgotPassword = async () => {
    history.push('/forgot-password');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log('Logged in successfully:', user);

      const idToken = await user.getIdToken();
      localStorage.setItem('userToken', idToken);

      setIsAuthenticated(true);
      history.push('/products');
    } catch (error) {
      setError('Error logging in: ' + error.message);
      console.error('Error logging in:', error);
    }
  };

  const handleGmailLogin = async () => {
    try {
      const result = await auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      ); // Use GoogleAuthProvider
      const user = result.user;
      console.log('Logged in with Gmail successfully:', user);

      const idToken = await user.getIdToken();
      localStorage.setItem('userToken', idToken);

      setIsAuthenticated(true);
      history.push('/products');
    } catch (error) {
      setError('Error logging in with Gmail: ' + error.message);
      console.error('Error logging in with Gmail:', error);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      const result = await auth.signInWithPopup(
        new firebase.auth.FacebookAuthProvider()
      ); // Use FacebookAuthProvider
      const user = result.user;
      console.log('Logged in with Facebook successfully:', user);

      const idToken = await user.getIdToken();
      localStorage.setItem('userToken', idToken);

      setIsAuthenticated(true);
      history.push('/products');
    } catch (error) {
      setError('Error logging in with Facebook: ' + error.message);
      console.error('Error logging in with Facebook:', error);
    }
  };

  return (
    <Container>
      <AuthContainer>
        <Title>Login</Title>
        {error ? <p>{error}</p> : ''}
        <form onSubmit={handleLogin}>
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
          <InputBox>
            <Input
              type="password"
              placeholder="Enter Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Underline></Underline>
          </InputBox>
          <SubmitButton type="submit" value="Continue" />
        </form>
        <Option>
          <button type="button" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </Option>
        <Option>or Connect With Social Media</Option>
        <SocialLink onClick={handleGmailLogin}>
          <i className="fab fa-google"></i> Sign in With Google
        </SocialLink>
        <FacebookLink onClick={handleFacebookLogin}>
          <i className="fab fa-facebook-f"></i> Sign in With Facebook
        </FacebookLink>
      </AuthContainer>
    </Container>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
