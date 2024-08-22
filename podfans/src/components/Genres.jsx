// Genres.jsx

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

export const getGenreNameById = (genreIds) => {
  if (!genreIds || genreIds.length === 0) {
    return [];
  }

  return genreIds.map(id => {
    const genre = genres.find(genre => genre.id === id);
    return genre ? genre.name : '';
  }).filter(Boolean); // Filter out any empty strings
};
