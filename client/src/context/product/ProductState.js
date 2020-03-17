import React, { useReducer } from 'react';
import uuid from 'uuid';
import ProductContext from './productContext';
import productReducer from './productReducer';

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

const ProductState = props => {
  const initialState = {
    products: []
  };

  const [state, dispatch] = useReducer(productReducer, initialState);
  return (
    <ProductContext.Provider
      value={{
        products: state.products
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
