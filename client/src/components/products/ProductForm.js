import React, { useState, useContext, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';
import { CLEAR_CURRENT } from '../../context/types';

const ProductForm = () => {
  const productContext = useContext(ProductContext);
  const { addProduct, updateProduct, clearCurrent, current } = productContext;

  useEffect(() => {
    if (current !== null) {
      setProduct(current);
    } else {
      setProduct({
        name: '',
        description: '',
        category: 'Appliances',
        brand: '',
        model: '',
        serialNo: '',
        warranty: 0,
        amount: 0.0,
        purchaseDate: '',
      });
    }
  }, [productContext, current]);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: 'Appliances',
    brand: '',
    model: '',
    serialNo: '',
    warranty: 0,
    amount: 0.0,
    purchaseDate: '',
  });

  const {
    name,
    description,
    category,
    brand,
    model,
    serialNo,
    warranty,
    amount,
    purchaseDate,
  } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addProduct(product);
    } else {
      updateProduct(product);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  const convDate = (d) => {
    // TODO find a better way to convert from JSON datetime string to js date string
    return d.substr(0, 10);
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Product' : 'Add Product'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <input
        type='radio'
        name='category'
        value='Appliances'
        checked={category === 'Appliances'}
        onChange={onChange}
      />
      Appliances{' '}
      <input
        type='radio'
        name='category'
        value='Computers'
        checked={category === 'Computers'}
        onChange={onChange}
      />
      Computers{' '}
      <input
        type='radio'
        name='category'
        value='Others'
        checked={category === 'Others'}
        onChange={onChange}
      />
      Others
      <h5>Brand</h5>
      <input type='text' name='brand' value={brand} onChange={onChange} />
      <h5>Model</h5>
      <input type='text' name='model' value={model} onChange={onChange} />
      <h5>Serial Number</h5>
      <input type='text' name='serialNo' value={serialNo} onChange={onChange} />
      <h5>Warranty(months)</h5>
      <input
        type='number'
        name='warranty'
        value={warranty}
        onChange={onChange}
      />
      <h5>Amount</h5>
      <input type='number' name='amount' value={amount} onChange={onChange} />
      <h5>Purchase Date</h5>
      <input
        type='date'
        name='purchaseDate'
        value={convDate(purchaseDate)}
        onChange={onChange}
      />
      <input
        type='submit'
        value={current ? 'Update Product' : 'Add Product'}
        className='btn btn-primary btn-block'
      />
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ProductForm;
