import React, { useContext, useRef, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';

const ProductFilter = () => {
  const productContext = useContext(ProductContext);
  const { filterProducts, clearFilter, filtered } = productContext;
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onFilter = e => {
    if (text.current.value !== null) {
      filterProducts(text.current.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Filter products ...'
        onChange={onFilter}
      />
    </form>
  );
};

export default ProductFilter;
