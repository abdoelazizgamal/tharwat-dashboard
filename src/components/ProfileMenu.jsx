import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

const ProfileMenu = ({ isProfileOpen, setIsProfileOpen }) => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsProfileOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const userInitials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <div ref={menuRef} className="relative flex items-center gap-2">
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2 p-2 hover:bg-blue-50/50 rounded-lg transition-all duration-200"
      >
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white text-sm font-medium">{userInitials}</span>
        </div>
        <span className="hidden md:block text-blue-900">{user?.fullName || 'User'}</span>
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg py-2 border border-white/20">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50/50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;