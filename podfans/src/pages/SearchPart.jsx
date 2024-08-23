import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AiFillThunderbolt } from 'react-icons/ai';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get('q');
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [location.search]);

  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://podcast-api.netlify.app');
      if (!response.ok) {
        throw new Error('Failed to fetch podcasts');
      }
      const data = await response.json();
      const filteredResults = data.filter(podcast => 
        podcast.title.toLowerCase().includes(query.toLowerCase()) ||
        podcast.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 flex items-center">
        <AiFillThunderbolt className="mr-2 text-blue-300" />
        Search Results
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      ) : searchResults.length === 0 ? (
        <p className="text-gray-700">No results found.</p>
      ) : (
        <ul className="space-y-4">
          {searchResults.map((podcast) => (
            <li key={podcast.id} className="bg-white p-4 rounded-lg shadow-md">
              <Link to={`/podcast/${podcast.id}`} className="flex items-center">
                <img src={podcast.image} alt={podcast.title} className="w-20 h-20 object-cover rounded-lg mr-4" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{podcast.title}</h2>
                  <p className="text-gray-700">{podcast.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;