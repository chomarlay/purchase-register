import React, { Fragment, useContext } from 'react';
import ProductContext from '../../context/product/productContext';
import ProductItem from './ProductItem';

const Products = () => {
  const productContext = useContext(ProductContext);
  const { products, filtered } = productContext;

  if (products !== null && products.length === 0) {
    return <h4>Please enter products</h4>;
  }
  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(product => (
            <ProductItem key={product.id} product={product} />
          ))
        : products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
    </Fragment>
  );
};

export default Products;
