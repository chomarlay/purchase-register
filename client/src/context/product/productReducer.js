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
  DELETE_ATTACHMENT,
  GET_ATTACHMENTS,
  CLEAR_ATTACHMENTS,
  CLEAR_ATTACHMENT_ALERT,
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
    case ADD_ATTACHMENT:
      return {
        ...state,
        attachments: [action.payload, ...state.attachments],
        attachmentUploaded: true,
      };

    case DELETE_ATTACHMENT:
      return {
        ...state,
        attachments: state.attachments.filter(
          (attachment) => attachment._id !== action.payload
        ),
      };
    case GET_ATTACHMENTS:
      return {
        ...state,
        attachments: action.payload,
      };
    case SET_SHOW_ATTACHMENTS:
      return {
        ...state,
        showAttachments: true,
      };
    case CLEAR_SHOW_ATTACHMENTS:
      return {
        ...state,
        showAttachments: null,
        current: null,
        attachments: null,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        attachments: null,
      };
    case CLEAR_ATTACHMENTS:
      return {
        ...state,
        attachments: null,
      };
    case CLEAR_ATTACHMENT_ALERT:
      return {
        ...state,
        attachmentUploaded: false,
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
        attachments: null,
        attachmentUploaded: false,
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
