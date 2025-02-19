import { useNavigate } from 'react-router-dom';
import ReportsTable from '../components/ReportsTable';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const reports = [
    { id: 1, title: 'Monthly Sales Report', date: '2024-01-15', status: 'Published' },
    { id: 2, title: 'Customer Feedback Analysis', date: '2024-01-14', status: 'Draft' },
    { id: 3, title: 'Inventory Status', date: '2024-01-13', status: 'Published' },
    { id: 4, title: 'Financial Overview', date: '2024-01-12', status: 'Under Review' },
  ];

  return (
    <main className="p-6 md:p-10">
      <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-sm border border-white/20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blue-900">All Reports</h2>
            <button 
              onClick={() => navigate('/new-report')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Report
            </button>
          </div>
          <ReportsTable reports={reports} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;