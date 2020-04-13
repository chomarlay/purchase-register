import React, { useContext, useEffect } from 'react';
import Products from '../products/Products';
import ProductForm from '../products/ProductForm';
import AttachmentForm from '../products/AttachmentForm';
import ProductFilter from '../products/ProductFilter';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  useEffect(() => {
    // this is for when the reload button is clicked at the home page
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      {productContext.showAttachments ? (
        <div>
          <AttachmentForm />
        </div>
      ) : (
        <div>
          <ProductForm />
        </div>
      )}

      <div>
        <ProductFilter />
        <Products />
      </div>
    </div>
  );
};

export default Home;
