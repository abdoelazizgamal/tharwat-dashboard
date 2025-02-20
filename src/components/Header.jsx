import ProfileMenu from './ProfileMenu';

const Header = ({ isSidebarOpen, setIsSidebarOpen, isProfileOpen, setIsProfileOpen }) => {
  return (
    <nav className="bg-white/60 backdrop-blur-xl border-b border-white/20 px-6  md:px-8 py-3 sticky left-0 right-0 top-0 z-50">
      <div className="flex justify-between items-center max-w-full mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-blue-900 hover:bg-blue-50/50 rounded-lg transition-all duration-300 cursor-pointer"
          >
            {isSidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            )}
          </button>
          <span className="text-xl font-semibold text-blue-900">Certificates Dashboard</span>
        </div>
        <ProfileMenu isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
      </div>
    </nav>
  );
};

export default Header;