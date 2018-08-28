import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import './List.css';

const Container = styled.div`
  margin: 20px 0;
  max-height: 350px;
  overflow: auto;
`;

class List extends Component {

  getPercent(data){
    return String((data.principleVal / data.monthlyLoan) * 100);
  }
  getDecimal(num){
    return Number(num).toFixed(2);
  }
  
  render(){
    const bankRates = this.props.rates;
    const aveRate = this.props.averageRate.averageFirstYearInterestRate;
    const suffix = ['st', 'nd', 'rd', 'th'];
    return(
      <Container>
      {
        bankRates.map(({
          _id,
          rateName,
          bankName,
          bankImageUrl,
          lockInPeriod,
          rateTypeName,
          monthlyAmortization = {},
          totalRepayment = 0,
          computedMonthly = [],
        }) =>
          <section className="list" key={_id}>
            <div className="list-preview list-flex">
              <div className="col-l flex-center">
                <img src={bankImageUrl} alt={bankName} className="logo"/>
                <div className="header">
                  <h2>{rateName}</h2>
                  <p>Interest Rate {this.getDecimal(aveRate)}%</p>
                  <h1>${this.getDecimal(monthlyAmortization.monthlyLoan)} / month</h1>
                </div>
              </div>
              <div className="col-r rate flex">
                <p>Principal<br/><b>${this.getDecimal(monthlyAmortization.principleVal)}</b></p>
                <progress value={ this.getPercent(monthlyAmortization) } max="100" />
                <p>Interest<br/><b>${this.getDecimal(monthlyAmortization.interestVal)}</b></p>
              </div>
            </div>
            <div className="list-collapsed list-flex">
              <div className="col-l">
                <ul className="details">
                  <li>
                    <p>Rate type:</p> {rateTypeName}
                  </li>
                  <li>
                    <p>Lock-in Period:</p> {lockInPeriod}
                  </li>
                  <li>
                    <p>Total repayment:</p> ${this.getDecimal(totalRepayment)}
                  </li>
                </ul>
              </div>
              <div className="col-r">
                <ul className="table">
                  
                  <li className="th">
                    <div className="col col-2"> Year </div>
                    <div className="col col-5"> Interest Rate </div>
                    <div className="col col-5"> Monthly Repayment </div>
                  </li>
                  <div className="tbody">
                    {
                      computedMonthly.map((item, i) => (
                        <li key={i}>
                          <div className="col col-2"> {i+1}{suffix[i < 4 ? i : 3]} </div>
                          <div className="col col-5"> {item.interestRatesDetails} </div>
                          <div className="col col-5"> {this.getDecimal(item.monthlyLoan)} </div>
                        </li>
                      ))
                    }
                  </div>
                </ul>
              </div>
            </div>
          </section>
        )
      }
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  rates: state.rates.get('bankRates').toJS(),
  averageRate: state.rates.get('aveInterestRate'),
});

export default connect(mapStateToProps, null)(List);