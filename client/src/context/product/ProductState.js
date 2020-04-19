import React, { useReducer } from 'react';
// import { v4 as uuidv4 } from 'uuid';
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
  SET_SHOW_ATTACHMENTS,
  CLEAR_SHOW_ATTACHMENTS,
  ADD_ATTACHMENT,
  GET_ATTACHMENTS,
} from '../types';

const ProductState = (props) => {
  const initialState = {
    current: null,
    filtered: null,
    error: null,
    products: null,
    showAttachment: false,
    attachments: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Get Products
  const getProducts = async () => {
    try {
      const res = await axios.get('api/purchases');
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
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
      dispatch({ type: ADD_PRODUCT, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // update Product
  const updateProduct = async (product) => {
    const config = {
      headers: {
        'Content-Type': 'application/json', // note: token is sent globally - see setToken.js
      },
    };
    try {
      const res = await axios.put(
        `api/purchases/${product._id}`,
        product,
        config
      );
      dispatch({ type: UPDATE_PRODUCT, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete('api/purchases/' + id);
      dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Add Attachment
  const addAttachment = async (attachment) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', // note: token is sent globally - see setToken.js
      },
    };
    try {
      const res = await axios.post('api/attachments', attachment, config);
      dispatch({ type: ADD_ATTACHMENT, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // get Attachments
  const getAttachments = async (product) => {
    try {
      const res = await axios.get(`api/attachments/product/${product._id}`);
      console.log(res.data);
      dispatch({ type: GET_ATTACHMENTS, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.msg });
    }
  };

  // Set Current Product
  const setCurrent = (product) => {
    dispatch({ type: SET_CURRENT, payload: product });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Set showAttachments
  const setShowAttachments = () => {
    dispatch({ type: SET_SHOW_ATTACHMENTS });
  };

  // clear  howAttachments
  const clearShowAttachments = () => {
    dispatch({ type: CLEAR_SHOW_ATTACHMENTS });
  };
  // Filter products
  const filterProducts = (text) => {
    dispatch({ type: FILTER_PRODUCTS, payload: text });
  };
  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Clear products
  const clearProducts = () => {
    dispatch({ type: CLEAR_PRODUCTS });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        showAttachments: state.showAttachments,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        setCurrent,
        clearCurrent,
        setShowAttachments,
        clearShowAttachments,
        addAttachment,
        getAttachments,
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
