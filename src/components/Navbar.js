// components/Navbar.js
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import { auth } from '../services/Firebase';

const NavbarContainer = styled.nav`
  position: relative;
`;

const Links = styled.ul`
  list-style-type: none;
  padding: 0;
  background: #432fbf;
  border-radius: 40px;
  box-shadow: 0px 10px 20px rgba(67, 47, 191, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  color: white;
  text-decoration: none;
  transition: 0.3s ease all;

  &:hover svg {
    stroke: white;
  }
`;

const SvgIcon = styled.svg`
  stroke: #9386ea;
  width: 28px;
  height: 28px;
  margin-right: 10px;
  transition: 0.4s ease all;
`;

const LinkText = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  opacity: 0;
  transition: 0.3s ease all;
  margin-left: 8px;

  ${StyledLink}:hover & {
    opacity: 1;
  }
`;

const GlobalStyles = createGlobalStyle`
  @media (max-width: 768px) {
    ${Links} {
      background: none;
      box-shadow: none;
      flex-direction: column;
      position: absolute;
      top: 60px;
      right: 0;
      width: 200px;
      border-radius: 0 0 20px 20px;
      z-index: 2;
      display: none;
    }

    ${StyledLink} {
      justify-content: flex-start;
      padding: 12px 20px;
    }

    ${SvgIcon} {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }

    ${LinkText} {
      margin-left: 8px;
    }

    ${NavbarContainer}:hover ${Links} {
      display: flex;
    }
  }
`;

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('userToken'); // Remove userToken from local storage
      setIsAuthenticated(false); // Update the authentication state
      history.push('/login'); // Redirect to login page after logout
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <NavbarContainer>
      <GlobalStyles />
      <Links>
        <StyledLink to="/products">
          <SvgIcon
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H2v16a2 2 0 002 2h16v-2H4V4z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 2L12 12M12 12L2 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SvgIcon>
          <LinkText>Products</LinkText>
        </StyledLink>
        <StyledLink to="/cart">
          <SvgIcon
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H5.2075L8.3545 15.487C8.60717 16.1285 9.24195 16.5 9.9225 16.5H18.75"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="9"
              cy="19.5"
              r="1.5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="16"
              cy="19.5"
              r="1.5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M15 8H4.5L5.85 14.122C5.94992 14.5994 6.31336 14.9674 6.79079 14.9674H20.2092C20.6866 14.9674 21.05 14.5994 21.15 14.122L22.5 8H15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SvgIcon>
          <LinkText>Cart</LinkText>
        </StyledLink>
        {isAuthenticated ? (
          <StyledLink to="/logout" onClick={handleLogout}>
            <SvgIcon
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 2C2.44772 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H10V20H4.41421L11.7071 12.7071C12.0976 12.3166 12.0976 11.6834 11.7071 11.2929L4.41421 4H10V2H3Z"
                fill="currentColor"
              />
              <path d="M20 12H10V14H20V12Z" fill="currentColor" />
            </SvgIcon>
            <LinkText>Logout</LinkText>
          </StyledLink>
        ) : (
          <>
            <StyledLink to="/login">
              <SvgIcon
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-.95 9.25h1.9c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-1.9c-.41 0-.75.34-.75.75s.34.75.75.75zm.2-1.57c.06.02.14.04.23.04s.17-.02.23-.04c.4-.11.72-.43.83-.83.11-.4.04-.82-.2-1.14-.13-.16-.29-.28-.48-.35-.11-.04-.23-.07-.36-.07s-.25.03-.36.07c-.2.07-.37.19-.5.35-.24.32-.31.74-.2 1.14.11.4.43.72.83.83z"
                  fill="currentColor"
                />
              </SvgIcon>
              <LinkText>Login</LinkText>
            </StyledLink>

            <StyledLink to="/signup">
              <SvgIcon
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16H7v-3H6v3H3v-1H2v1c0 .55.45 1 1 1h4v2H6c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h5v-2H5.5c-.83 0-1.5-.67-1.5-1.5S4.67 9.5 5.5 9.5H8v-2H5.5C3.57 7.5 2 9.07 2 11v1c0 1.93 1.57 3.5 3.5 3.5H8v1H5.5C4.12 16 3 14.88 3 13.5S4.12 11 5.5 11H8v-1H5.5C4.67 10 4 10.67 4 11.5S4.67 13 5.5 13H8v2H5.5C4.67 15 4 15.67 4 16.5S4.67 18 5.5 18H11v1h3v-1z"
                  fill="currentColor"
                />
              </SvgIcon>
              <LinkText>Signup</LinkText>
            </StyledLink>
          </>
        )}

        <StyledLink to="/profile">
          <SvgIcon
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-.95 9.25h1.9c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-1.9c-.41 0-.75.34-.75.75s.34.75.75.75zm.2-1.57c.06.02.14.04.23.04s.17-.02.23-.04c.4-.11.72-.43.83-.83.11-.4.04-.82-.2-1.14-.13-.16-.29-.28-.48-.35-.11-.04-.23-.07-.36-.07s-.25.03-.36.07c-.2.07-.37.19-.5.35-.24.32-.31.74-.2 1.14.11.4.43.72.83.83z"
              fill="currentColor"
            />
          </SvgIcon>
          <LinkText>Profile</LinkText>
        </StyledLink>
      </Links>
    </NavbarContainer>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Navbar;
