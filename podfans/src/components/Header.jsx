import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillThunderbolt, AiOutlineLogout } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import { RiHomeLine } from 'react-icons/ri';
import SearchBar from './SearchBar';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide header on login page
  if (location.pathname === '/') return null;

  const handleSearch = (searchQuery) => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/'); // Redirect to login page
  };

  const NavItem = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className="text-white text-lg flex items-center hover:text-pink-300 transition duration-300 font-bold"
    >
      <Icon className="mr-2" />
      {label}
    </Link>
  );

  return (
    <header className="bg-pink-500 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to="/home"
              className="text-white text-3xl font-bold flex items-center hover:text-blue-300 transition duration-300"
            >
              <AiFillThunderbolt className="mr-2 text-pink-300" />
              PodPlay
            </Link>
            <nav className="flex space-x-4">
              <NavItem to="/home" icon={RiHomeLine} label="Home" />
              <NavItem to="/favourites" icon={FaRegHeart} label="Favourites" />
            </nav>
          </div>
          <div className="flex-grow mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={handleLogout}
            className="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center transition duration-300"
          >
            <AiOutlineLogout className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
