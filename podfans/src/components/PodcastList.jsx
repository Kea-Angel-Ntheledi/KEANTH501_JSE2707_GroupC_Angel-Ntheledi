import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const PodcastList = ({ podcasts }) => {
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
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name || '')
      .filter(Boolean);
  };

  const truncateDescription = (description, maxLength) => {
    return description.length <= maxLength
      ? description
      : description.slice(0, maxLength) + '...';
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {podcasts.map((podcast) => (
          <Link
            to={`/podcast/${podcast.id}`}
            key={podcast.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden block transform transition duration-300 hover:scale-105"
          >
            {podcast.image ? (
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-700">No Image</span>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-900">
                {podcast.title}
              </h2>
              <p className="text-gray-800 mb-2">
                {truncateDescription(podcast.description, 100)}
              </p>
              <div className="flex flex-col">
                <span className="text-gray-700 mb-2">
                  Genres: {getGenresFromIds(podcast.genres).join(', ')}
                </span>
                <span className="text-gray-700 mb-2">
                  Seasons: {podcast.seasons.length}
                </span>
                <span className="text-gray-700">
                  Updated: {format(new Date(podcast.updated), 'MMMM dd, yyyy')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

PodcastList.propTypes = {
  podcasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      seasons: PropTypes.array.isRequired, // Updated to reflect that seasons is an array
      updated: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(PropTypes.number).isRequired, // Updated to be an array of numbers
    })
  ).isRequired,
};

export default PodcastList;
