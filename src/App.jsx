import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import { getImages } from './components/apiService/getImages';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoadig] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoadig(true);
      try {
        const { images, total_pages } = await getImages(query, page);
        if (!images.length) {
          return setIsEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...images]);
        setVisible(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoadig(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSearchSubmit = (query) => {
    setImages([]);
    setQuery(query);
    setError(null);
    setPage(1);
    setIsEmpty(false);
    setVisible(false);
  };

  const onLoadingMore = () => setPage((prevPage) => prevPage + 1);

  const isModalOpen = (src, alt) => {
    setModalIsOpen(true);
    setModalAlt(alt);
    setModalSrc(src);
  };

  const isModalClose = () => {
    setModalIsOpen(false);
    setModalAlt('');
    setModalSrc('');
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster />
      {!error && !isEmpty && !images.length && (
        <ErrorMessage message="Everything is ready to start image search" />
      )}
      {isLoading && <Loader />}
      {error && (
        <ErrorMessage message="Oops, it looks like we have a problem! But we're already solving it..." />
      )}
      {images.length > 0 && <ImageGallery images={images} openModal={isModalOpen} />}
      {isEmpty && <ErrorMessage message="Sorry, no images were found for your request" />}
      {isVisible && images.length > 0 && (
        <LoadMoreBtn onClick={onLoadingMore} disabled={isLoading} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        modalSrc={modalSrc}
        modalAlt={modalAlt}
        closeModal={isModalClose}
      />
    </>
  );
};

export default App;
