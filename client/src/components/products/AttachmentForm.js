import React, { useState, useContext, useEffect, Fragment } from 'react';
import ProductContext from '../../context/product/productContext';
import Spinner from '../layout/Spinner';
import AttachmentItem from './AttachmentItem';
import AlertContext from '../../context/alert/alertContext';

const AttachmentForm = () => {
  const productContext = useContext(ProductContext);
  const {
    attachments,
    addAttachment,
    current,
    attachmentUploaded,
    clearAttachmentAlert,
  } = productContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (current !== null) {
      setProduct(current);
    }
    if (attachmentUploaded) {
      setAlert('Attachment uploaded.', 'success');
      clearAttachmentAlert();
    }
    // eslint-disable-next-line
  }, [productContext, current, attachmentUploaded]);

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
    if (!file) {
      setAlert('Please select a file to upload.', 'danger');
    } else {
      formData.append('myAttachment', file);
      formData.append('productId', _id);
      addAttachment(formData);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>Upload Attachments</h2>
        <br />
        <br />

        <h3 className='text-dark'>
          {name} - {description}
        </h3>
        <br />

        <h4>Please select a file</h4>
        <div className='form-group'>
          <input type='file' onChange={onChange} id='myfile' name='myfile' />
        </div>
        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block'
        />
      </form>
      <br />
      <br />

      <hr />
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
