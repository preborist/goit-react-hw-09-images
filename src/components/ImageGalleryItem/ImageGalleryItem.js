import React from 'react';
import './ImageGalleryItem.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  id,
  webformatURL,
  toggleModal,
  setCurrentLargeImageURL,
}) => {
  return (
    <li
      index={id}
      className="ImageGalleryItem"
      onClick={() => {
        toggleModal();
        setCurrentLargeImageURL(id);
      }}
    >
      <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setCurrentLargeImageURL: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
