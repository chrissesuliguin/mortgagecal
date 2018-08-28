import axios from 'axios';
import * as types from '../constants/ActionTypes';
import { calculate } from './calculate';

export const getData = ({bankRates, average}) => {
  return (dispatch) => {
    dispatch(getAveInterest(average)).then(() => {
      dispatch(getRates(bankRates));
    });
   
  }
};

export const getRates = (url) => {
  return (dispatch) => {
    axios.get(url).then((response) => {
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

export function getAveInterest (url) {
  return (dispatch) => {
    return axios.get(url).then((response) => {
      const {status, data} = response;
      if(status){
        dispatch(getAveInterestSuccess(data));
      }
    })
    .catch((err) => {
      console.log(err)
    })
  };
};
export const getAveInterestSuccess = (data) => {
  return {
    type: types.GET_AVE_INTEREST_SUCCESS,
    data: data.result
  }
};
