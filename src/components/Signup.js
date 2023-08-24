import React, { useState } from 'react';
import { auth } from '../services/Firebase';
import { useHistory } from 'react-router-dom';
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
`;

const Signup = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log('Signed up successfully:', user);

      const idToken = await user.getIdToken();
      localStorage.setItem('userToken', idToken);

      setIsAuthenticated(true);
      history.push('/products');
    } catch (error) {
      setError('Error signing up: ' + error.message);
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container>
      <AuthContainer>
        <Title>Signup</Title>
        {error ? <p>{error}</p> : ''}
        <form onSubmit={handleSignup}>
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
          <SubmitButton type="submit" value="Sign Up" />
        </form>
        <Option>or Connect With Social Media</Option>
        <SocialLink>
          <i className="fab fa-google"></i> Sign up With Google
        </SocialLink>
      </AuthContainer>
    </Container>
  );
};

Signup.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Signup;
