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
  PRODUCT_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
        filtered:
          state.filtered !== null
            ? state.filtered.map((product) =>
                product._id === action.payload.id ? action.payload : product
              )
            : null,
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
        // added extra to refresh the filtered list.  This was my experiment code, otherwise after delete the filtered list was not refreshed
        filtered:
          state.filtered !== null
            ? state.filtered.filter((product) => product._id !== action.payload)
            : state.filtered,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_PRODUCTS:
      return {
        ...state,
        filtered: state.products.filter((product) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return product.name.match(regex) || product.description.match(regex);
        }),
      };

    case CLEAR_FILTER:
      return {
        ...state,
        current: null,
      };
    case CLEAR_PRODUCTS: // reset everything when logout
      return {
        ...state,
        current: null,
        filtered: null,
        error: null,
        products: null,
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
