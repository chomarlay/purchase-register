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
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        filtered:
          state.filtered !== null
            ? state.filtered.map(product =>
                product.id === action.payload.id ? action.payload : product
              )
            : null
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload
        ),
        // added extra to refresh the filtered list.  This was my experiment code, otherwise after delete the filtered list was not refreshed
        filtered:
          state.filtered !== null
            ? state.filtered.filter(product => product.id !== action.payload)
            : state.filtered
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_PRODUCTS:
      return {
        ...state,
        filtered: state.products.filter(product => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return product.name.match(regex) || product.description.match(regex);
        })
      };

    case CLEAR_FILTER:
      return {
        ...state,
        current: null
      };
    default:
      return state;
  }
};
