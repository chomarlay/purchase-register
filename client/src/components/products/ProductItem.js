import React, { useContext } from 'react';
import ProductContext from '../../context/product/productContext';

const ProductItem = ({ product }) => {
  const productContext = useContext(ProductContext);
  const {
    deleteProduct,
    setCurrent,
    clearCurrent,
    setShowAttachments,
    clearShowAttachments,
    clearAttachments,
    getAttachments,
  } = productContext;

  const { _id, name, category, description } = product;

  const onSetCurrent = () => {
    clearShowAttachments();
    setCurrent(product);
  };

  const onAttachments = () => {
    clearAttachments();
    setCurrent(product);
    getAttachments(product);
    setShowAttachments();
  };

  const onDelete = () => {
    deleteProduct(_id);
    clearCurrent();
    clearShowAttachments();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}
        {' - '} {description}
        <span style={{ float: 'right' }}>
          <button
            className='badge badge-primary'
            title='Edit'
            onClick={onSetCurrent}
          >
            <i className='fas fa-edit'></i>
          </button>
          <button
            className='badge badge-success'
            title='Attachments'
            onClick={onAttachments}
          >
            <i className='far fa-file-alt'></i>
          </button>
          <button
            className='badge badge-danger'
            title='Delete'
            onClick={onDelete}
          >
            <i className='fa fa-trash'></i>
          </button>
        </span>
        <span
          style={{ float: 'left' }}
          className={
            'badge ' +
            (category === 'Computers'
              ? 'badge-primary'
              : category === 'Appliances'
              ? 'badge-success'
              : 'badge-dark')
          }
        >
          {category}
        </span>
      </h3>
    </div>
  );
};

export default ProductItem;
