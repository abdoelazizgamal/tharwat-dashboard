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
      }} className='bg-white py-1.5' >
        <div className="flex items-center gap-4  mb-3 container  mx-auto max-w-5xl">
          <div className="relative">
            <div className='absolute bg-white w-24 h-24 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'  />
              <img src="/logo.png" alt="Mutabiq" className="w-16 h-16 relative z-10" />

          </div>
          <span className="text-xl font-light text-[#58595b] mb-5">Mutabiq</span>
        </div>
      </div>
      <div className="container mx-auto max-w-5xl">

      </div>
    </div>
  );
};

export default ViewScannedReport;