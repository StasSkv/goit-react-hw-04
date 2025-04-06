import css from './SearchBarBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const errorMessage = () => {
    toast('Enter text to search for', {
      duration: 1000,
      position: 'top-center',
      style: {
        background: '#ff0000',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
        width: '300px',
        height: '43px',
      },
    });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      errorMessage();
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <div>
          <FaSearch />
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
