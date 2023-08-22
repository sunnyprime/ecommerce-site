import React, { useState } from 'react';
import {auth} from '../services/Firebase';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
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
  position: relative;
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

const SocialLink = styled.a`
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
  background: ${(props) => props.background};
  margin-top: 20px;

  &:hover {
    background: ${(props) => props.hoverBackground};
  }

  i {
    padding-right: 12px;
    font-size: 20px;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const history = useHistory();

  const handleLogin = async e => {
    e.preventDefault();
  
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Logged in successfully');
      history.push('/products'); // Redirect to the products page on successful login
    } catch (error) {
      setError('Error logging in: ' + error.message);
      console.error('Error logging in:', error);
    }
  };


  return (
    <Container>
      <AuthContainer>
        <Title>Login</Title>
        {error? <p>{error}</p>:""}
        <form onSubmit={(e) => e.preventDefault()}>
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
          <SubmitButton type="submit" value="Continue" onClick={handleLogin} />
        </form>
        <Option>or Connect With Social Media</Option>
        <SocialLink href="#" background="#00acee" hoverBackground="#1abeff">
          <i className="fab fa-twitter"></i> Sign in With Twitter
        </SocialLink>
        <SocialLink href="#" background="#3b5998" hoverBackground="#476bb8">
          <i className="fab fa-facebook-f"></i> Sign in With Facebook
        </SocialLink>
      </AuthContainer>
    </Container>
  );
};

export default LoginPage;
