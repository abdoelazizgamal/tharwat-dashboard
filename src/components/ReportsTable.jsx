const ReportsTable = ({ reports }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-blue-50/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-blue-900 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blue-100/20">
          {reports.map((report) => (
            <tr key={report.id} className="hover:bg-blue-50/30 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                {report.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800/70">
                {report.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-3 py-1 rounded-full text-xs ${report.status === 'Published' ? 'bg-green-100/70 text-green-800' :
                    report.status === 'Draft' ? 'bg-gray-100/70 text-gray-800' :
                      'bg-yellow-100/70 text-yellow-800'
                  }`}>
                  {report.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <button className="text-blue-600 hover:text-blue-800 mr-3 transition-colors">View</button>
                <button className="text-blue-600 hover:text-blue-800 transition-colors">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;