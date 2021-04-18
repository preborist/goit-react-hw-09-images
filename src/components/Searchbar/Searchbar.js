import React, { useState, useCallback } from 'react';
import './Searchbar.scss';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = useCallback(e => {
    setQuery(e.currentTarget.value);
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      onSubmit(query);
      setQuery('');
    },
    [onSubmit, query],
  );

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
