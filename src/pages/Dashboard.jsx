import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ReportsTable from '../components/ReportsTable';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const reports = [
    { id: 1, title: 'Monthly Sales Report', date: '2024-01-15', status: 'Published' },
    { id: 2, title: 'Customer Feedback Analysis', date: '2024-01-14', status: 'Draft' },
    { id: 3, title: 'Inventory Status', date: '2024-01-13', status: 'Published' },
    { id: 4, title: 'Financial Overview', date: '2024-01-12', status: 'Under Review' },
  ];

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

        <main className="p-6 md:p-10">
          <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-sm border border-white/20">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-blue-900">All Reports</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  New Report
                </button>
              </div>
              <ReportsTable reports={reports} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;