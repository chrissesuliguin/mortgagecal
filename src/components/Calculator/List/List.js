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
  
  render(){
    const bankRates = this.props.rates;
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
          totalRepayment = 0,
          computedMonthly = [],
        }) => 
          <section className="list" key={_id}>
            <div className="list-preview list-flex">
              <div className="col-l flex-center">
                <img src={bankImageUrl} alt={bankName} className="logo"/>
                <div className="header">
                  <h2>{rateName}</h2>
                  <p>Interest Rate 1.35%</p>
                  <h1>$1,880 / month</h1>
                </div>
              </div>
              <div className="col-r rate">
                <span>Best Rate</span>
                <p>Range</p>
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
                    <p>Total repayment:</p> ${totalRepayment.toFixed(2)}
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
                          <div className="col col-5"> {item.monthlyLoan.toFixed(2)} </div>
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
});

export default connect(mapStateToProps, null)(List);