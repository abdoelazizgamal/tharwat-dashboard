import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDeleteReportMutation } from '../store/api/reportsApi';

const ReportsTable = ({ reports }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();
  const reportsPerPage = 10;

  // Filter reports based on search query
  const filteredReports = reports?.filter(report =>
    report.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current reports
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports?.slice(indexOfFirstReport, indexOfLastReport);

  // Reset to first page when search query changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async () => {
    try {
      await deleteReport(reportToDelete._id).unwrap();
      toast.success('Report deleted successfully');
      setShowDeleteModal(false);
      setReportToDelete(null);
    } catch (error) {
      console.error('Failed to delete report:', error);
      toast.error(error?.message || 'Failed to delete report');
    }
  };

  return (
    <>
      <div className="mb-4">
        <div className="relative shadow">
          <input
            type="text"
            placeholder="Search by Certificate Number..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-blue-900/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-50/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Certificate Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Manufacturer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Approved On</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-blue-900 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100/20">
            {currentReports?.map((report) => (
              <tr key={report._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                  {report.certificateNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800/70">
                  {report.manufacturer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800/70">
                  {report.variantModel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800/70">
                  {new Date(report.approvedOn).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                  <button 
                    onClick={() => navigate(`/report/${report._id}`)}
                    className="inline-flex cursor-pointer items-center justify-center p-2 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-200"
                    title="View Report"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => navigate(`/edit-report/${report._id}`)}
                    className="inline-flex cursor-pointer items-center justify-center p-2 rounded-lg text-emerald-600 hover:text-white hover:bg-emerald-600 transition-all duration-200"
                    title="Edit Report"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => {
                      setReportToDelete(report);
                      setShowDeleteModal(true);
                    }}
                    className="inline-flex cursor-pointer items-center justify-center p-2 rounded-lg text-red-600 hover:text-white hover:bg-red-600 transition-all duration-200"
                    title="Delete Report"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-blue-900/60">
          Showing {currentReports?.length} of {filteredReports?.length} reports
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50 cursor-pointer'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {Array.from({ length: Math.ceil((filteredReports?.length || 0) / reportsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil((filteredReports?.length || 0) / reportsPerPage)}
            className={`p-2 rounded-lg ${currentPage === Math.ceil((filteredReports?.length || 0) / reportsPerPage) ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50 cursor-pointer'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
              setReportToDelete(null);
            }
          }}
          className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4 transform transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-center text-gray-900">Delete Report</h3>
            <p className="text-center text-gray-500">
              Are you sure you want to delete the report with certificate number <span className="font-medium text-gray-900">{reportToDelete?.certificateNumber}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setReportToDelete(null);
                }}
                disabled={isDeleting}
                className={`px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportsTable;