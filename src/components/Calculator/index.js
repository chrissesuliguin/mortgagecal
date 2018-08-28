import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { getRates, getAveInterest } from '../../actions/rates';
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
    this.props.getRates(url.bankRates);
    this.props.getAveInterest(url.average);
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
  getRates,
  getAveInterest,
};



export default connect(null, mapDispatchToProps)(Calculator);
