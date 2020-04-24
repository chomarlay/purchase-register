import React, { useState, useContext, useEffect, Fragment } from 'react';
import ProductContext from '../../context/product/productContext';
import Spinner from '../layout/Spinner';
import AttachmentItem from './AttachmentItem';

const AttachmentForm = () => {
  const productContext = useContext(ProductContext);
  const { attachments, addAttachment, current } = productContext;

  useEffect(() => {
    if (current !== null) {
      setProduct(current);
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
            <AttachmentItem key={attachment._id} attachment={attachment} />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
  );
};

export default AttachmentForm;
