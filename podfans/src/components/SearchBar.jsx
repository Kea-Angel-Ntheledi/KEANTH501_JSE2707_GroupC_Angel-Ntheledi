import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search episodes, channels"
        className="w-full p-2 pl-10 rounded-full border-2 border-blue-700 bg-navy-800 text-white focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <AiOutlineSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-xl cursor-pointer"
        onClick={handleSubmit}
      />
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;