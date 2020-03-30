import React, { useContext, useEffect } from 'react';
import Products from '../products/Products';
import ProductForm from '../products/ProductForm';
import ProductFilter from '../products/ProductFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    // this is for when the reload button is clicked at the home page
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

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
