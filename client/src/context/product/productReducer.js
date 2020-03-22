import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_PRODUCTS,
  CLEAR_PRODUCTS,
  CLEAR_FILTER,
  PRODUCT_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      };
    default:
      return state;
  }
};
