import React, { useState, useContext, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';

const AttachmentForm = () => {
  const productContext = useContext(ProductContext);
  const { addAttachment, current } = productContext;

  useEffect(() => {
    if (current !== null) {
      setProduct(current);
    }
  }, [productContext, current]);

  const [product, setProduct] = useState({
    _id: '',
    name: '',
    description: '',
  });

  const [file, setFile] = useState('');
  const { _id, name, description } = product;

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmit = (e) => {
    console.log('Add attachment');
    e.preventDefault();
    const formData = new FormData();
    formData.append('myAttachment', file);
    formData.append('productId', _id);
    addAttachment(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Upload Attachments</h2>
      <div />
      <div />
      <h3>
        {name} - {description}
      </h3>
      <div />
      <div />
      <div>
        <input type='file' onChange={onChange} />
      </div>
      <input
        type='submit'
        value='Upload'
        className='btn btn-primary btn-block'
      />
    </form>
  );
};

export default AttachmentForm;

/*
 <form action="/uploadfile" enctype="multipart/form-data" method="POST">
<input type="file" name="myFile" />
<input type="text" name="productId" />
<input type="submit" value="Upload a file" />
</form>  
*/
