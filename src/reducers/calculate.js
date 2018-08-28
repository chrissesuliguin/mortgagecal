import * as types from '../constants/ActionTypes';
import { List, Map, fromJS } from 'immutable';

function calculate(state = Map({input: Map()}), payload) {
  switch (payload.type) {
    case types.CALCULATE_DATA:
      return state.set('input', fromJS(payload.data));
    default:
      return state;
  }
}

export default calculate
