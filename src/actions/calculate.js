import * as types from '../constants/ActionTypes';
import { List, Map, fromJS } from 'immutable';
import calculator from '../util/calculator';


export const calculateInput = data => {
  return (dispatch) => {
    dispatch(saveInput(data));
    dispatch(calculate());
  }
};
export const calculate = () => {
  return (dispatch, getState) => {
    const banks = getState().rates.get('bankRates').toJS();
    const inputVal = getState().rates.get('input').toJS();
    const ave = getState().rates.get('aveInterestRate');
    const { loan, tenure } = inputVal;

    banks.map((bank, index) => {
      const repayment = {
        computedMonthly: [],
        totalRepayment: 0,
        monthlyAmortization: {}
      };
      const {interestRates, interestRatesDetails} = bank;
      const rateDetails = List(interestRatesDetails).toJS();

      interestRates.map((interestRate, i) => {
        const calResult = calculator({interestRate: interestRate, tenure: tenure, loan: loan});
        calResult.interestRatesDetails = rateDetails[i];
        repayment.computedMonthly.push(calResult)
        const monthlyLoan = calResult.monthlyLoan;
        repayment.totalRepayment += (monthlyLoan) * 12;
      });
      repayment.monthlyAmortization = calculator({interestRate: ave.averageFirstYearInterestRate, tenure: tenure, loan: loan})
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
