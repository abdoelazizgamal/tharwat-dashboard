import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-0'}`}>
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;