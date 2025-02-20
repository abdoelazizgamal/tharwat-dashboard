import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetReportsQuery } from '../store/api/reportsApi';

const ViewScannedReport = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetReportsQuery();
  const report = data?.data?.find((report) => report._id === id);

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error loading report</div>;
  if (!report) return <div className="p-6 text-yellow-600">Report not found</div>;

  return (
    <div className="bg-[#dedfe0] min-h-screen pt-4">
      <div style={{
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .16), 0 0 0 1px rgba(0, 0, 0, .08)'
      }} className='bg-white py-1.5 z-10 relative' >
        <div className="flex items-center gap-4 mb-3 container mx-auto max-w-5xl">
          <div className="relative">
            <div className='absolute bg-white w-24 h-24 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
            <img src="/logo.png" alt="Mutabiq" className="w-16 h-16 relative z-10" />
          </div>
          <span className="text-xl font-light text-[#58595b] mb-5">Mutabiq</span>
        </div>
      </div>
      <div className='bg-[#f5f7fa] -mt-6 pt-4'>
      <div className="container mx-auto max-w-5xl mt-6 px-4">
            <h2 className="text-2xl font-light my-3 text-[#58595b]">Conformity Certificates</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 bg-gray-100 text-[#58595b] rounded-full text-sm">
              CCR #{report.certificateNumber}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-[#58595b] mb-2">CCR Number</h3>
              <p className="text-[#58595b]">{report.certificateNumber}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-[#58595b] mb-2">Approved On</h3>
              <p className="text-[#58595b]">{new Date(report.approvedOn).toLocaleDateString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-[#58595b] mb-2">Manufacturer</h3>
              <p className="text-[#58595b]">{report.manufacturer}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-medium text-[#58595b] mb-4">Motor Vehicle</h3>
            <p className="text-lg text-[#58595b] text-center">{report.motorVehicle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-[#58595b] mb-2">Category</h3>
              <p className="text-[#58595b]">{report.category}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-[#58595b] mb-2">Model Year</h3>
              <p className="text-[#58595b]">{report.production}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-[#58595b] mb-2">Country of Production</h3>
              <p className="text-[#58595b]">{report.productionCountry}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-[#58595b] mb-2">Produced in and after</h3>
              <p className="text-[#58595b]">{report.producedInAfter}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-[#58595b] mb-2">VIN</h3>
              <p className="text-[#58595b]">{report.vin}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ViewScannedReport;