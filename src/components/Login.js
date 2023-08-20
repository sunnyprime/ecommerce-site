// components/Login.js
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const LoginContainer = styled.div`
  /* Your styling here */

  /* Example hover effect */
  &:hover {
    background-color: #f2f2f2;
    transition: background-color 0.3s ease-in-out;
  }
`;

const Login = () => {
    const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <LoginContainer style={animationProps}>
      {/* Your login form content */}
    </LoginContainer>
  );
};

export default Login;
