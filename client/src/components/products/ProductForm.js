import React, { useState } from 'react';

const ProductForm = () => {
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
    setProduct({ ...product, [e.target.name]: e.target.name });
  };
  return (
    <form>
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
      <h5>Catetory</h5>
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
      Computers
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
      <input
        type='text'
        placeholder='Warranty'
        name='warranty'
        value={warranty}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Amount'
        name='amount'
        value={amount}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Purchase Date'
        name='purchaseDate'
        value={purchaseDate}
        onChange={onChange}
      />
    </form>
  );
};

export default ProductForm;
