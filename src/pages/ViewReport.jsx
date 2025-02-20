import { useParams } from 'react-router-dom';
import {  useGetSingleReportQuery } from '../store/api/reportsApi';

const ViewReport = () => {
  const { id } = useParams();
  
  const { data, isLoading, error } = useGetSingleReportQuery(id);
  const report = data?.data
  if (isLoading) {
    return (
      <div className="p-6 md:p-10 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-10">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Error loading report. Please try again later.
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-6 md:p-10">
        <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg">
          Report not found.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-sm border border-white/20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-900">Certificate Details</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              CCR #{report.certificateNumber}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Report Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-blue-900">Manufacturer</h3>
                  <p className="mt-1 text-blue-800/70">{report.manufacturer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-900">Motor Vehicle</h3>
                  <p className="mt-1 text-blue-800/70">{report.motorVehicle}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-900">Category</h3>
                  <p className="mt-1 text-blue-800/70">{report.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-900">VIN</h3>
                  <p className="mt-1 text-blue-800/70">{report.vin}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-900">Production Year</h3>
                  <p className="mt-1 text-blue-800/70">{report.production}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-900">Approved On</h3>
                  <p className="mt-1 text-blue-800/70">
                    {new Date(report.approvedOn).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Weights */}
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-3">Weights</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Max Vehicle Weight</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.weights.maxVehicleWeight} kg</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Curb Weight</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.weights.curb} kg</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Front Axle Weight</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.maxAxleWeight.front} kg</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Rear Axle Weight</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.maxAxleWeight.rear} kg</p>
                  </div>
                </div>
              </div>

              {/* Engine Details */}
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-3">Engine Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Engine Type</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.engine.engineType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Cylinders</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.engine.cylinders}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Displacement</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.engine.displacement} cc</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Net Engine Power</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.engine.netEnginePower}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Air Intake</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.engine.airIntake}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Pollutant Limit</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.engine.pollutantLimit}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Transmission</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.engine.transmission}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">SOS System</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.engine.sosSystem}</p>
                  </div>
                </div>
              </div>

              {/* Dimensions */}
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-3">Dimensions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Length</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.dimensions.length} mm</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Width</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.dimensions.width} mm</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Height</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.dimensions.height} mm</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Wheelbase</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.wheelBase.f1r1} mm</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Front Track</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.track.front} mm</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Rear Track</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.track.rear} mm</p>
                  </div>
                </div>
              </div>

              {/* Body and Seating */}
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-3">Body and Seating</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Body Type</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.bodyAndSeating.typeOfBody}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Number of Seats</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.bodyAndSeating.numberOfSeats}</p>
                  </div>
                </div>
              </div>

              {/* Brakes */}
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-3">Brakes</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Service Brakes</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.brakes.serviceBrakes}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Emergency Brake</h4>
                    <p className="mt-1 text-blue-800/70">{report.specifications.brakes.emergencyBrake}</p>
                  </div>
                </div>
              </div>

              {/* Fuel Economy */}
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-3">Fuel Economy</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Vehicle Class</h4>
                    <p className="mt-1 text-blue-800/70">{report.fuelEconomy.motorVehicleClass}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Combined FE</h4>
                    <p className="mt-1 text-blue-800/70">{report.fuelEconomy.feCombined}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-start p-6 bg-white/40 rounded-xl">
              <h3 className="text-lg font-medium text-blue-900 mb-4">Certificate QR Code</h3>
              <img src={report.qrCode} alt="Certificate QR Code" className="w-64 h-64 object-contain" />
              <p className="mt-4 text-sm text-blue-800/70 text-center">Scan to verify certificate authenticity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;