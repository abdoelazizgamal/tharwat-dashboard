import { useNavigate } from 'react-router-dom';
import ReportsTable from '../components/ReportsTable';
import { useGetReportsQuery } from '../store/api/reportsApi';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetReportsQuery();

  return (
    <main className="p-6 md:p-10">
      <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-sm border border-white/20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blue-900">All Certificates</h2>
            <button
              onClick={() => navigate('/new-report')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Certificate
            </button>
          </div>

          {isLoading ? (
            <div className=" flex items-center justify-center p-6">
              <div className="relative flex flex-col items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full bg-blue-50 animate-pulse"></div>
                <img src="/logo.png" alt="Mutabiq" className="w-16 h-16 relative z-10 top-10" />
                <div className="absolute w-24 h-24 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <p className="mt-14 text-blue-900 font-medium animate-pulse">Loading...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              Error loading reports. Please try again later.
            </div>
          ) : !data?.data?.length ? (
            <div className="text-center py-8 text-gray-600">
              No reports found. Create your first report by clicking the "New Certificate" button.
            </div>
          ) : (
            <ReportsTable reports={data.data} />
          )}
        </div>
      </div>
    </main>
  );

};

export default Dashboard;