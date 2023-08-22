import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';
import styled, { createGlobalStyle } from 'styled-components';
// import dotenv from 'dotenv';

// dotenv.config();


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

  return (
    <Router>
      <Navbar />
      <AppContainer>
        <GlobalStyles />
        <ContentContainer>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/product/:productId" component={ProductDetail} />
          </Switch>
        </ContentContainer>
      </AppContainer>
    </Router>
  );
};

export default App;
