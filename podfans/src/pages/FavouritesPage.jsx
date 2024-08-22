import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillThunderbolt, AiFillHeart, AiOutlineDelete } from 'react-icons/ai';

const FavouritesPage = () => {
  const [likedEpisodes, setLikedEpisodes] = useState([]);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedEpisodes = () => {
      setIsLoading(true);
      try {
        const storedLikedEpisodes = JSON.parse(localStorage.getItem('likedEpisodes')) || [];
        console.log('Stored Liked Episodes:', storedLikedEpisodes);
        setLikedEpisodes(storedLikedEpisodes);
      } catch (error) {
        console.error('Error loading liked episodes:', error);
        setLikedEpisodes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedEpisodes();
  }, []);

  const handleUnlikeEpisode = (episodeId) => {
    setLikedEpisodes((prevLikedEpisodes) => {
      const updatedLikedEpisodes = prevLikedEpisodes.filter(ep => ep.id !== episodeId);
      localStorage.setItem('likedEpisodes', JSON.stringify(updatedLikedEpisodes));
      return updatedLikedEpisodes;
    });
  };

  const handleRemoveAllLikedEpisodes = () => {
    if (window.confirm('Are you sure you want to remove all liked episodes?')) {
      setLikedEpisodes([]);
      localStorage.removeItem('likedEpisodes');
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortEpisodes = (episodes, order) => {
    switch (order) {
      case 'A-Z':
        return [...episodes].sort((a, b) => a.title.localeCompare(b.title));
      case 'Z-A':
        return [...episodes].sort((a, b) => b.title.localeCompare(a.title));
      case 'Most Recent':
        return [...episodes].sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case 'Oldest':
        return [...episodes].sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return episodes;
    }
  };

  const sortedEpisodes = sortEpisodes(likedEpisodes, sortOrder);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center">
          <AiFillThunderbolt className="mr-2 text-yellow-500" />
          Favourites
        </h1>
        {likedEpisodes.length > 0 && (
          <button
            onClick={handleRemoveAllLikedEpisodes}
            className="px-4 py-2 rounded-full border bg-red-600 text-white flex items-center hover:bg-red-700 transition-colors"
          >
            <AiOutlineDelete className="mr-2" />
            Remove All
          </button>
        )}
      </div>
      
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => handleSortChange('A-Z')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'A-Z' ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}
        >
          A-Z
        </button>
        <button
          onClick={() => handleSortChange('Z-A')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'Z-A' ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}
        >
          Z-A
        </button>
        <button
          onClick={() => handleSortChange('Most Recent')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'Most Recent' ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}
        >
          Most Recent
        </button>
        <button
          onClick={() => handleSortChange('Oldest')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'Oldest' ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}
        >
          Oldest
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      ) : sortedEpisodes.length === 0 ? (
        <p className="text-gray-700">No liked episodes found.</p>
      ) : (
        <ul className="space-y-4">
          {sortedEpisodes.map((episode) => (
            <li key={episode.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div className="flex flex-col flex-grow mr-4">
                <Link to={`/podcast/${episode.podcastId}`} className="font-bold text-gray-900">{episode.title}</Link>
                <p className="text-gray-700 mb-2">{episode.description}</p>
                <p className="text-gray-600 mb-2">Season: {episode.season}, Episode: {episode.episode}</p>
                <audio controls src={episode.file} className="w-full"></audio>
              </div>
              <button
                onClick={() => handleUnlikeEpisode(episode.id)}
                className="ml-4 p-2"
              >
                <AiFillHeart className="text-red-600 text-2xl" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritesPage;