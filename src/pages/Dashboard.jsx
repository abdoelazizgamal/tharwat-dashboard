import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportsTable from '../components/ReportsTable';
import { useGetReportsQuery } from '../store/api/reportsApi';

const Dashboard = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isFetching: isLoading, error } = useGetReportsQuery({ page, limit });

  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setPage(1); // Reset to first page
  };

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

          {error ? (
            <div className="text-center py-8 text-red-600">
              Error loading reports. Please try again later.
            </div>
          ) : !isLoading && !data?.data?.length ? (
            <div className="text-center py-8 text-gray-600">
              No reports found. Create your first report by clicking the "New Certificate" button.
            </div>
          ) : (
            <ReportsTable
              reports={data?.data || []}
              isLoading={isLoading}
              pagination={{
                currentPage: data?.page || 1,
                totalPages: data?.totalPages || 1,
                totalReports: data?.total || 0,
                onPageChange: setPage,
                limit: limit,
                onLimitChange: handleLimitChange
              }}
            />
          )}
        </div>
      </div>
    </main>
  );

};

export default Dashboard;