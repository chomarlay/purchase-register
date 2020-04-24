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
          <button
            className='badge badge-success'
            title='Download'
            onClick={onDownload}
          >
            <i class='fas fa-file-download'></i>
          </button>
          <button
            className='badge badge-danger'
            title='Delete'
            onClick={onDelete}
          >
            <i class='fa fa-trash'></i>
          </button>
        </span>
      </h3>
    </div>
  );
};

export default AttachmentItem;
