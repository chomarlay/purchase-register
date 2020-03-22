import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
    current: null,
    products: [
      {
        id: 1,
        name: 'Miele Fridge',
        description: 'Miele integrated fridge',
        category: 'Appliances',
        brand: 'Miele',
        model: 'Miele1-Frdg',
        serialNo: 'ML-727282',
        warranty: 5,
        amount: 3000.99,
        purchaseDate: '2020-02-12T00:00:00.000Z'
      },
      {
        id: 2,
        name: 'HP Mouse',
        description: 'HP wireless Mouse',
        category: 'Computers',
        brand: 'HP',
        model: 'HP-WIRELESS-mouse',
        serialNo: 'HPW-727282',
        warranty: 2,
        amount: 30.25,
        purchaseDate: '2019-09-12T00:00:00.000Z'
      }
    ]
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Add Product
  const addProduct = product => {
    product.id = uuidv4();
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  // Delete Product
  const deleteProduct = id => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  // Set Current Product
  const setCurrent = product => {
    dispatch({ type: 'SET_CURRENT', payload: product });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        current: state.current,
        addProduct,
        deleteProduct,
        setCurrent,
        clearCurrent
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
