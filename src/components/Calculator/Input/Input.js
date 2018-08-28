import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { calculateInput } from '../../../actions/calculate';
import './Input.css';

const Container = styled.section`
  border: 2px #f0f0f0 solid;
  padding: 20px 40px;
`;

class Input extends Component {

  constructor(props){
    super(props);
    this.years = [5, 10, 15, 20, 25];
    this.state = this.props.input;
  }

  computeLoan(price){
    return price * 0.8;
  }

  saveState(name, value) {
    this.setState({[name]: value});
    if(name === 'price')
      this.setState({'loan': this.computeLoan(value)});
  }

  submit() {
    this.props.calculateInput(this.state)
  }

  render() {
    return (
      <Container>
        <div className="calcu">
          <div className="calcu-input">
            <label>Property Price:</label>
            <input
              type="number"
              value={this.state.price}
              onChange={(e) => this.saveState('price', e.target.value)} />
          </div>
          <div className="calcu-input">
            <label>Loan Amount:</label>
            <input 
              type="number"
              value={this.state.loan}
              onChange={(e) => this.saveState('loan', e.target.value)}/>
          </div>
          <div className="calcu-input">
            <label>Tenure Years:</label>
            <div>
            {
              this.years.map((year, i) => 
                <button
                  onClick={(e) => this.saveState('tenure', year)}
                  key={i}
                  className={this.state.tenure === year ? 'active' : ''}
                > {year} </button>
              )
            }
            </div>
          </div>
        </div>
        <button className="btn-outline" onClick={() => this.submit()}>Recalculate</button>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  calculateInput
};

const mapStateToProps = state => ({
  input: state.rates.get('input').toJS(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Input)