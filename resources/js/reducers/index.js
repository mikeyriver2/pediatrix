import { combineReducers, compose } from 'redux';

const isMobile = (state = {}, action) => {
  switch (action.type) {
    case 'SET_IS_MOBILE': {
      const { payload } = action;
      return payload;
    } default:
      return state;
  }
};

const allReducers = combineReducers({
  isMobile,
});

export default allReducers;
