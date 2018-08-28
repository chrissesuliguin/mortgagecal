import axios from 'axios';
import * as types from '../constants/ActionTypes';
import { calculate } from './calculate';

export const getRates = (api) => {
  return (dispatch) => {
    axios.get(api).then((response) => {
      const {status, data} = response;
      if(status){
        dispatch(getRatesSuccess(data));
        dispatch(calculate());
      }
    })
    .catch((err) => {
      console.log(err)
    })
  
    return {
      type: types.GET_RATES
    };
  };
};

export const getRatesSuccess = (data) => {
  return {
    type: types.GET_RATES_SUCCESS,
    data: data.result
  }
};

export const getAveInterest = (api) => {
  return (dispatch) => {
    axios.get(api).then((response) => {
      const {status, data} = response;
      if(status){
        dispatch(getAveInterestSuccess(data));
      }
    })
    .catch((err) => {
      console.log(err)
    })
  
    return {
      type: types.GET_AVE_INTEREST
    };
  };
};
export const getAveInterestSuccess = (data) => {
  return {
    type: types.GET_AVE_INTEREST_SUCCESS,
    data: data.result
  }
};
