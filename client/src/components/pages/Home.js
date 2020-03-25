import React from 'react';
import Products from '../products/Products';
import ProductForm from '../products/ProductForm';
import ProductFilter from '../products/ProductFilter';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ProductForm />
      </div>
      <div>
        <ProductFilter />
        <Products />
      </div>
    </div>
  );
};

export default Home;
