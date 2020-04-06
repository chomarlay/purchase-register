import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProductContext from './productContext';
import productReducer from './productReducer';
import axios from 'axios';

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

const ProductState = (props) => {
  const initialState = {
    current: null,
    filtered: null,
    error: null,
    products: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Get Products
  const getProducts = async () => {
    try {
      const res = await axios.get('api/purchases');
      dispatch({ type: 'GET_PRODUCTS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'PRODUCT_ERROR', payload: err.response.msg });
    }
  };

  // Add Product
  const addProduct = async (product) => {
    const config = {
      headers: {
        'Content-Type': 'application/json', // note: token is sent globally - see setToken.js
      },
    };
    try {
      const res = await axios.post('api/purchases', product, config);
      dispatch({ type: 'ADD_PRODUCT', payload: res.data });
    } catch (err) {
      dispatch({ type: 'PRODUCT_ERROR', payload: err.response.msg });
    }
  };

  // update Product
  const updateProduct = (product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  // Delete Product
  const deleteProduct = (id) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  // Set Current Product
  const setCurrent = (product) => {
    dispatch({ type: 'SET_CURRENT', payload: product });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  // Filter products
  const filterProducts = (text) => {
    dispatch({ type: 'FILTER_PRODUCTS', payload: text });
  };
  // Clear current
  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };

  // Clear products
  const clearProducts = () => {
    dispatch({ type: 'CLEAR_PRODUCTS' });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        setCurrent,
        clearCurrent,
        filterProducts,
        clearFilter,
        clearProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
