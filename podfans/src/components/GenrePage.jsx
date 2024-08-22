import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GenrePage = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch genre');
        }
        const data = await response.json();
        setGenre(data);
        console.log(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenre();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!genre) {
    return <div>No genre found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{genre.title}</h1>
      <p className="text-gray-700 mb-4">{genre.description}</p>
    </div>
  );
};

export default GenrePage;
