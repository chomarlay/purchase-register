import React, { useContext } from 'react';
import ProductContext from '../../context/product/productContext';

const AttachmentItem = ({ attachment }) => {
  const productContext = useContext(ProductContext);
  const { deleteAttachment, getAttachment } = productContext;

  const { _id, fileName } = attachment;

  const onDownload = () => {
    getAttachment(_id);
  };

  const onDelete = () => {
    deleteAttachment(_id);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {fileName}
        <span style={{ float: 'right' }}>
          <button className='btn btn-dark btn-sm' onClick={onDownload}>
            Download
          </button>
          <button className='btn btn-danger btn-sm' onClick={onDelete}>
            Delete
          </button>
        </span>
      </h3>
    </div>
  );
};

export default AttachmentItem;
