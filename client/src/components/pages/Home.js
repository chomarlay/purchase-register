import React from 'react';
import Products from '../products/Products';
import ProductForm from '../products/ProductForm';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ProductForm />
      </div>
      <div>
        <Products />
      </div>
    </div>
  );
};

export default Home;
