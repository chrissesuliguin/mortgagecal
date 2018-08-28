import * as types from '../constants/ActionTypes';
import { List, Map, fromJS } from 'immutable';
export const calculate = data => {
  return (dispatch, getState) => {
    
    dispatch(saveInput(data));

    const banks = getState().rates.get('bankRates').toJS();
    banks.map((bank, index) => {
      const repayment = {
        computedMonthly: [],
        totalRepayment: 0,
      };
      const {interestRates, interestRatesDetails} = bank;
      const rateDetails = List(interestRatesDetails).toJS();

      interestRates.map((interestRate, i) => {
        const { loan, tenure } = data;
        const rated = (interestRate / 100) / 12;
        const monthlyLoanDenom = Math.pow((1 + rated), (tenure * 12)) - 1;
        const monthlyLoanNomin = rated * (Math.pow((1 + rated), (tenure * 12)));
        const monthlyLoan = loan * (monthlyLoanNomin / monthlyLoanDenom);
        const interestVal =  loan * rated;
        const principleVal = monthlyLoan - interestVal;

        repayment.computedMonthly.push({
          interestRate: interestRate,
          interestRatesDetails: rateDetails[i],
          monthlyLoan: monthlyLoan,
          interestVal: interestVal,
          principleVal: principleVal,
        })

        repayment.totalRepayment += monthlyLoan * 12;
      })
      dispatch(saveMonthlyRepayment(repayment, index));
    })
  }
};

export const saveMonthlyRepayment = (data, id) => {
  return {
    type: types.SAVE_MONTHLY_REPAYMENT,
    id,
    data
  }
};
export const saveInput = (data) => {
  return {
    type: types.SAVE_INPUT,
    data
  }
};
