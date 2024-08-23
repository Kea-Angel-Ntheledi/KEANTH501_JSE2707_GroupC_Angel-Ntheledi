import { useState, useEffect } from 'react';
import PodcastList from '../components/PodcastList';
import { AiFillThunderbolt } from 'react-icons/ai';
import Slider from 'react-slick';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(0);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        const data = await response.json();
        setPodcasts(data);
        setError(null);
      } catch (error) {
        setError('Error fetching podcasts. Please try again later.');
        console.error('Error fetching podcasts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  const genres = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Personal Growth' },
    { id: 2, name: 'Investigative Journalism' },
    { id: 3, name: 'History' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Entertainment' },
    { id: 6, name: 'Business' },
    { id: 7, name: 'Fiction' },
    { id: 8, name: 'News' },
    { id: 9, name: 'Kids and Family' },
  ];

  const getGenresFromIds = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : '';
    }).filter(Boolean); // Filter out any empty strings
  };

  const sortPodcasts = (podcasts, order) => {
    switch (order) {
      case 'A-Z':
        return [...podcasts].sort((a, b) => a.title.localeCompare(b.title));
      case 'Z-A':
        return [...podcasts].sort((a, b) => b.title.localeCompare(a.title));
      case 'Most Recent':
        return [...podcasts].sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case 'Oldest':
        return [...podcasts].sort((a, b) => new Date(a.updated) - new Date(b.updated));
      default:
        return podcasts;
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(parseInt(event.target.value));
  };

  const filterPodcastsByGenre = (podcasts, genreId) => {
    if (genreId === 0) return podcasts; // If "All" is selected, return all podcasts
    return podcasts.filter(podcast => podcast.genres.includes(genreId));
  };

  const sortedPodcasts = sortPodcasts(podcasts, sortOrder);
  const filteredPodcasts = filterPodcastsByGenre(sortedPodcasts, selectedGenre);

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + '...';
  };

  const shuffleArrayForCarousel = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds (3 seconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const shuffledPodcasts = shuffleArrayForCarousel(podcasts);

  return (
    <div className="container mx-auto py-8">
      {/* <div className="mb-8">
       
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-300"></div>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <Slider {...carouselSettings}>
            {shuffledPodcasts.map((podcast) => (
              <Link to={`/podcast/${podcast.id}`} key={podcast.id} className="outline-none p-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden block transform transition duration-300 hover:scale-105">
                  {podcast.image ? (
                    <img src={podcast.image} alt={podcast.title} className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-700">No Image</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-2 text-gray-900">{podcast.title}</h2>
                    <p className="text-gray-800 mb-2">
                      {truncateDescription(podcast.description, 80)}
                    </p>
                    <div className="flex flex-col">
                      <span className="text-gray-700 mb-1">
                        Genre: {getGenresFromIds(podcast.genres).join(', ')}
                      </span>
                      <span className="text-gray-700 mb-1">Seasons: {podcast.seasons}</span>
                      <span className="text-gray-700">
                        Updated: {format(new Date(podcast.updated), 'MMMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </div> */}

      <h2 className="text-2xl font-bold mb-4 flex items-center text-black">
        <span className='items-center'>😃Discover</span>
      </h2>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => handleSortChange('A-Z')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'A-Z' ? 'bg-pink-900 text-white' : 'bg-white text-pink-900'}`}
        >
          A-Z
        </button>
        <button
          onClick={() => handleSortChange('Z-A')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'Z-A' ? 'bg-blue-900 text-white' : 'bg-white text-pink-900'}`}
        >
          Z-A
        </button>
        <button
          onClick={() => handleSortChange('Most Recent')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'Most Recent' ? 'bg-blue-900 text-white' : 'bg-white text-pink-900'}`}
        >
          Most Recent
        </button>
        <button
          onClick={() => handleSortChange('Oldest')}
          className={`px-4 py-2 rounded-full border ${sortOrder === 'Oldest' ? 'bg-blue-900 text-white' : 'bg-white text-pink-900'}`}
        >
          Oldest
        </button>
        <select
          onChange={handleGenreChange}
          className="px-4 py-2 rounded-full border bg-white text-pink-900"
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-300"></div>
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <PodcastList podcasts={filteredPodcasts} />
      )}
    </div>
  );
};

export default HomePage;
