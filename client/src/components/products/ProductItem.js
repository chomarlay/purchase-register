import React from 'react';

const ProductItem = ({ product }) => {
  const { name, category } = product;
  const onSetCurrent = () => {
    console.log('Set current');
  };

  const onDelete = () => {
    console.log('Set current');
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
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
