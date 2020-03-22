import React, { useContext } from 'react';
import ProductContext from '../../context/product/productContext';

const ProductItem = ({ product }) => {
  const productContext = useContext(ProductContext);
  const { deleteProduct } = productContext;

  const { id, name, category, description } = product;
  const onSetCurrent = () => {
    console.log('Set current');
  };

  const onDelete = () => {
    console.log('Delete');
    deleteProduct(id);
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}
        {' - '} {description}
        <span style={{ float: 'right' }}>
          <button className='btn btn-dark btn-sm' onClick={onSetCurrent}>
            Edit
          </button>
          <button className='btn btn-danger btn-sm' onClick={onDelete}>
            Delete
          </button>
        </span>
        <span
          style={{ float: 'left' }}
          className={
            'badge ' +
            (category === 'Computers' ? 'badge-primary' : 'badge-success')
          }
        >
          {category}
        </span>
      </h3>
    </div>
  );
};

export default ProductItem;
