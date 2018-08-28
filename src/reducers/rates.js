import * as types from '../constants/ActionTypes';
import { List, Map, fromJS } from 'immutable';

function rates(state = Map({bankRates: List(), input: Map(), aveInterestRate: {}}), payload) {
  switch (payload.type) {
    case types.GET_RATES_SUCCESS:
      return state.set('bankRates', fromJS(payload.data));

    case types.GET_AVE_INTEREST_SUCCESS:
      return state.set('aveInterestRate', fromJS(payload.data));

    case types.SAVE_INPUT:
      return state.set('input', payload.data);
      
    case types.SAVE_MONTHLY_REPAYMENT:
      return state.setIn(['bankRates', payload.id, 'computedMonthly'], payload.data.computedMonthly)
                  .setIn(['bankRates', payload.id, 'totalRepayment'], payload.data.totalRepayment);
    default:
      return state;
  }
}

export default rates;
