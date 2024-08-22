import 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PodcastPage from './components/PodcastPage';
import GenrePage from './components/GenrePage';
import FavouritesPage from './pages/FavouritesPage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SearchResults from './pages/SearchResults';


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login page */}
        <Route path="/home" element={<HomePage />} /> {/* Homepage */}
        <Route path="/podcast/:id" element={<PodcastPage />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="/favourites" element={<FavouritesPage />} /> {/* Favourites page */}
        <Route path="/search" element={<SearchResults />} />

      </Routes>
    </>
  );
};

export default App;
