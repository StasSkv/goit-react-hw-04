import Modal from 'react-modal';
import { useEffect } from 'react';

const customStyles = {
  content: {
    maxWidth: '90%',
    height: '90%',
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    background: 'rgba(0,0,0,0.7)',
  },
};

Modal.setAppElement('#root');

const ImageModal = ({ modalIsOpen, closeModal, modalSrc, modalAlt }) => {
  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={modalSrc}
          alt={modalAlt}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
