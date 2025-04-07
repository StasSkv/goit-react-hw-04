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
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    const savedQuery = localStorage.getItem('query');
    const savedPage = JSON.parse(localStorage.getItem('page')) || 1;
    const savedImages = JSON.parse(localStorage.getItem('images')) || [];

    if (savedQuery) {
      setQuery(savedQuery);
      setPage(savedPage);
      setImages(savedImages);
      getImages(savedQuery, savedPage).then(({ total_pages }) => {
        setIsVisible(savedPage < total_pages);
      });
    }
  }, []);

  const handleSearchSubmit = async (newQuery) => {
    setImages([]);
    setQuery(newQuery);
    setError(null);
    setPage(1);
    setIsEmpty(false);
    setIsVisible(false);
    setIsLoading(true);

    try {
      const { images: newImages, total_pages } = await getImages(newQuery, 1);
      if (!newImages.length) {
        setIsEmpty(true);
        return;
      }
      setImages(newImages);
      setIsVisible(1 < total_pages);
      localStorage.setItem('query', newQuery);
      localStorage.setItem('page', JSON.stringify(1));
      localStorage.setItem('images', JSON.stringify(newImages));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoadingMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    try {
      const { images: newImages, total_pages } = await getImages(query, nextPage);
      if (!newImages.length) {
        setIsEmpty(true);
        return;
      }
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      setPage(nextPage);
      setIsVisible(nextPage < total_pages);
      localStorage.setItem('page', JSON.stringify(nextPage));
      localStorage.setItem('images', JSON.stringify(updatedImages));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      {isVisible && images.length > 0 && !isLoading && (
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
