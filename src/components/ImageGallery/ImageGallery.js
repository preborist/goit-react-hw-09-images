import React, { useState, useEffect, useCallback } from 'react';
import './ImageGallery.scss';
import Searchbar from '../Searchbar';
import ImageGalleryItem from '../ImageGalleryItem';
import galleryApi from '../../services/gallery-api';
import Button from '../Button';
import Loader from 'react-loader-spinner';
import Modal from '../Modal';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import shortid from 'shortid';
import toastr from 'toastr';
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-center',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentLargeImageURL, setCurrentLargeImageURL] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const findCurrentLargeImageURL = id => {
    let currentImage = images.find(image => image.id === id);
    setCurrentLargeImageURL(currentImage.largeImageURL);
  };

  const onChangeQuery = useCallback(query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchImages = () => {
      const options = {
        searchQuery,
        currentPage,
      };

      setIsLoading(true);

      galleryApi(options)
        .then(images => {
          setImages(prevImages => [...prevImages, ...images]);
          if (images.length === 0) {
            toastr['warning']('No results found!');
          }
        })
        .catch(error => setError(error.message))
        .finally(() => {
          setIsLoading(false);
          if (currentPage > 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        });
    };
    fetchImages();
  }, [currentPage, searchQuery]);

  const updatePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={currentLargeImageURL} />
      )}
      <Searchbar onSubmit={onChangeQuery} />
      <ul className="ImageGallery">
        {images.map(({ id, webformatURL }) => (
          <ImageGalleryItem
            id={id}
            key={shortid.generate()}
            webformatURL={webformatURL}
            toggleModal={toggleModal}
            setCurrentLargeImageURL={findCurrentLargeImageURL}
          />
        ))}
      </ul>
      {error && <h2>Извините, что-то пошло не так</h2>}
      {isLoading && (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      )}
      {shouldRenderLoadMoreButton && <Button onClick={updatePage} />}
    </>
  );
}
