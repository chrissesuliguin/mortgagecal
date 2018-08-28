import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from "styled-components";
import { calculate } from '../../../actions/calculate';
import './Input.css';

const Container = styled.section`
  border: 2px #f0f0f0 solid;
  padding: 20px 40px;
`;

class Input extends Component {

  constructor(){
    super()
    this.years = [5, 10, 15, 20, 25];
    this.state = {
      price: '',
      loan: '',
      tenure: ''
    };
  }

  saveState(name, value) {
    this.setState({[name]: value});
  }

  submit() {
    this.props.calculate(this.state)
  }

  render() {
    return (
      <Container>
        <div className="calcu">
          <div className="calcu-input">
            <label>Property Price:</label>
            <input type="number" onChange={(e) => this.saveState('price', e.target.value)} />
          </div>
          <div className="calcu-input">
            <label>Loan Amount:</label>
            <input type="number" onChange={(e) => this.saveState('loan', e.target.value)} />
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
  calculate
};

// const mapStateToProps = ({
//   price: ''
// })

export default connect(null, mapDispatchToProps)(Input)