import css from './ImageCard.module.css';

const ImageCard = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image.urls.regular, image.alt_description);
  };
  return (
    <div onClick={handleClick} className={css.card}>
      <img src={image.urls.small} alt={image.alt_description} className={css.img} />
    </div>
  );
};

export default ImageCard;
