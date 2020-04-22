import React, { useState, useContext, useEffect, Fragment } from 'react';
import ProductContext from '../../context/product/productContext';
import Spinner from '../layout/Spinner';

const AttachmentForm = () => {
  const productContext = useContext(ProductContext);
  const {
    getAttachments,
    attachments,
    addAttachment,
    current,
  } = productContext;

  useEffect(() => {
    if (current !== null) {
      setProduct(current);
      // getAttachments(current); // product id
    }
    // eslint-disable-next-line
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
    <Fragment>
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
      <div>
        <h3> Attachments </h3>
        {attachments !== null ? (
          attachments.map((attachment) => (
            <li key={attachment._id}>{attachment.fileName}</li>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
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
