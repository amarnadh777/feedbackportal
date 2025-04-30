import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import noProfile from "../assets/noprofile.jpg"
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.userData);

  

  const handleLogout = () => {
    dispatch(logout());
      localStorage.clear()
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between bg-gray-800 text-white p-4 shadow-md">
      
      <Link to="/">
        <div className="text-2xl font-bold">Feedback Portal</div>
      </Link>

      <div className="space-x-6 hidden md:flex items-center">
        <div className="flex items-center gap-3">
          <img
            src={user?.profilePic  ?  user.profilePic : noProfile } 
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
          />
          <span className="text-white font-medium capitalize">{user?.fullname}</span>
        </div>

        {user?.role === 'admin' ? (
          <>
          
            <Link to="/admin/myresponse" className="hover:text-gray-300">My responses</Link>
          </>
        ) : (
          <>
            <Link to="/myfeedback" className="hover:text-gray-300">My Feedbacks</Link>
          </>
        )}

        <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>


      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center space-y-4 py-4 md:hidden shadow-lg">
          <div className="flex items-center gap-3">
            <img
              src={user.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
            />
            <span className="text-white font-medium capitalize">{user.fullname}</span>
          </div>

          {user?.role === 'admin' ? (
            <>
              <Link to="/all-feedbacks" className="hover:text-gray-300">All Feedbacks</Link>
              <Link to="/manage-users" className="hover:text-gray-300">Manage Users</Link>
            </>
          ) : (
            <>
              <Link to="/myfeedback" className="hover:text-gray-300">My Feedbacks</Link>
            </>
          )}

          <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
