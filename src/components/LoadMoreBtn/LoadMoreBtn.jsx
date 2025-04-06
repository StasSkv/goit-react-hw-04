import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, disabled }) => {
  return (
    <button className={css.btnLoadMore} onClick={onClick} disabled={disabled}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
