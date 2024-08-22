import 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillThunderbolt, AiOutlineLogout } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import { RiHomeLine } from 'react-icons/ri';
import SearchBar from './SearchBar';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/') {
    return null; // Render nothing if on the login page
  }

  const handleSearch = (searchQuery) => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/'); // Navigate to login page
  };

  return (
    <header className="bg-navy-900 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-start">
            <Link to="/home" className="text-white text-3xl font-bold flex items-center hover:text-blue-300 transition duration-300 mb-2">
              <AiFillThunderbolt className="mr-2 text-blue-300" />
              PodPlay
            </Link>
            <nav className="flex flex-col space-y-2">
              <Link to="/home" className="text-white text-lg flex items-center hover:text-blue-300 transition duration-300 font-bold">
                <RiHomeLine className="mr-2" />
                Home
              </Link>
              <Link to="/favourites" className="text-white text-lg flex items-center hover:text-blue-300 transition duration-300 font-bold">
                <FaRegHeart className="mr-2" />
                Favourites
              </Link>
            </nav>
          </div>
          <div className="flex-grow mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={handleLogout}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center transition duration-300"
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
