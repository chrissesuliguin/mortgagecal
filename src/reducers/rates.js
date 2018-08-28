import * as types from '../constants/ActionTypes';
import { List, Map, fromJS } from 'immutable';

const inputInit = {
  price: 780000,
  tenure: 20,
  loan: 780000 * 0.8
}

function rates(
  state = Map({
    bankRates: List(),
    input: Map(inputInit),
    aveInterestRate: {}
  }), payload ){
  switch (payload.type) {
    case types.GET_RATES_SUCCESS:
      return state.set('bankRates', fromJS(payload.data));

    case types.GET_AVE_INTEREST_SUCCESS:
      return state.set('aveInterestRate', payload.data);

    case types.SAVE_INPUT:
      return state.set('input', Map(payload.data));
      
    case types.SAVE_MONTHLY_REPAYMENT:
      return state.setIn(['bankRates', payload.id, 'computedMonthly'], payload.data.computedMonthly)
                  .setIn(['bankRates', payload.id, 'totalRepayment'], payload.data.totalRepayment)
                  .setIn(['bankRates', payload.id, 'monthlyAmortization'], payload.data.monthlyAmortization);
    default:
      return state;
  }
}

export default rates;
