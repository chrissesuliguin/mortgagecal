import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { getData } from '../../actions/rates';
import Input from './Input/Input';
import List from './List/List';

const Container = styled.div`
  width: 960px;
  margin: 0px auto;
`;

class Calculator extends Component {

  componentWillMount(){
    const url = {
      bankRates: "https://qa.omh.sg/techtest/calculator/bankRates",
      average: "https://qa.omh.sg/techtest/calculator/bankRates/simplified"
    }
    this.props.getData(url);
  }

  render() {
    return (
      <Container>
        <Input />
        <List data={this.props.rates} />
      </Container>
    );
  }
}

const mapDispatchToProps = {
  getData
};



export default connect(null, mapDispatchToProps)(Calculator);
