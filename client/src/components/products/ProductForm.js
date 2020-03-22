import React, { useState, useContext } from 'react';
import ProductContext from '../../context/product/productContext';

const ProductForm = () => {
  const productContext = useContext(ProductContext);
  const { addProduct } = productContext;

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: 'Appliances',
    brand: '',
    model: '',
    serialNo: '',
    warranty: 0,
    amount: 0.0,
    purchaseDate: ''
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
    purchaseDate
  } = product;

  const onChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addProduct(product);
    setProduct({
      name: '',
      description: '',
      category: 'Appliances',
      brand: '',
      model: '',
      serialNo: '',
      warranty: 0,
      amount: 0.0,
      purchaseDate: ''
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Product</h2>
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
      <input
        type='text'
        placeholder='Brand'
        name='brand'
        value={brand}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Model'
        name='model'
        value={model}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Serial Number'
        name='serialNo'
        value={serialNo}
        onChange={onChange}
      />
      <h5>Warranty(months)</h5>
      <input
        type='number'
        placeholder='Warranty'
        name='warranty'
        value={warranty}
        onChange={onChange}
      />
      <h5>Amount</h5>
      <input
        type='number'
        placeholder='Amount'
        name='amount'
        value={amount}
        onChange={onChange}
      />
      <h5>Purchase Date</h5>
      <input
        type='date'
        placeholder='Purchase Date'
        name='purchaseDate'
        value={purchaseDate}
        onChange={onChange}
      />
      <input
        type='submit'
        value='Add Product'
        className='btn btn-primary btn-block'
      />
    </form>
  );
};

export default ProductForm;
