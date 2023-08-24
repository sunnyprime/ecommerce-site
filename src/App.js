import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import ForgotPassword from './components/ForgotPassword';
import Navbar from './components/Navbar';
import styled, { createGlobalStyle } from 'styled-components';
import { auth } from './services/Firebase';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const AppContainer = styled.div`
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 80%;
  padding: 20px;
  margin-top: 20px;
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      // If userToken is present in local storage, verify it with Firebase
      auth
        .signInWithCustomToken(userToken)
        .then(() => {
          setIsAuthenticated(true); // User is authenticated
        })
        .catch((error) => {
          console.error('Error verifying user token:', error);
          localStorage.removeItem('userToken'); // Clear invalid userToken from local storage
        });
    }
  }, []);
  console.log('Inside App JS');
  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      {/* <Login setIsAuthenticated={setIsAuthenticated} test="123" /> */}
      <AppContainer>
        <GlobalStyles />
        <ContentContainer>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route
              path="/signup"
              render={(props) => (
                <Signup {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            />
            <Route path="/products" component={ProductsPage} />
            <Route path="/product/:productId" component={ProductDetail} />
          </Switch>
        </ContentContainer>
      </AppContainer>
    </Router>
  );
};

export default App;
