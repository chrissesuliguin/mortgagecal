import React, { Component } from 'react';
import Header from './Header';
import Calculator from './Calculator';
import styled from "styled-components";
import './App.css';

const Container = styled.div`
  width: 1200px;
  margin: 0px auto;
  border: 2px #f0f0f0 solid;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Header />
          <Calculator />
        </Container>
      </div>
    );
  }
}

export default App;
