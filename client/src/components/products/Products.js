import React, { Fragment, useContext, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';
import ProductItem from './ProductItem';
import Spinner from '../layout/Spinner';

const Products = () => {
  const productContext = useContext(ProductContext);
  const { getProducts, products, filtered, loading } = productContext;

  useEffect(() => {
    getProducts();
    //eslint-disable-next-line
  }, []);

  if (products !== null && products.length === 0 && !loading) {
    return <h4>Please enter products</h4>;
  }
  return (
    <Fragment>
      {products !== null && !loading ? (
        <div>
          {' '}
          {filtered !== null
            ? filtered.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))
            : products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Products;
