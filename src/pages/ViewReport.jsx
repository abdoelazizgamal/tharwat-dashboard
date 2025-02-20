import { Link, useParams } from 'react-router-dom';
import {  useGetSingleReportQuery } from '../store/api/reportsApi';

const ViewReport = () => {
  const { id } = useParams();
  
  const { data, isLoading, error } = useGetSingleReportQuery(id);
  const report = data?.data
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full bg-blue-50 animate-pulse"></div>
        <img src="/logo.png" alt="Motabiq" className="w-16 h-16 relative z-10 top-10" />
        <div className="absolute w-24 h-24 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <p className="mt-14 text-blue-900 font-medium animate-pulse">Loading...</p>
      </div>
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
              <div className="flex gap-4 mt-6 flex-wrap justify-center">
                <Link
                  to={`/${report?._id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>View External</span>
                </Link>
                <a
                  href={report.qrCode}
                  download="certificate-qr-code.png"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download QR</span>
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    // Convert base64 to blob
                    fetch(report.qrCode)
                      .then(res => res.blob())
                      .then(blob => {
                        // Create a temporary URL for the blob
                        const blobUrl = URL.createObjectURL(blob);
                        // Create a temporary file from blob
                        const file = new File([blob], 'certificate-qr.png', { type: 'image/png' });
                        
                        // Create a share data object
                        const shareData = {
                          title: `Certificate CCR #${report.certificateNumber}`,
                          text: `View Certificate CCR #${report.certificateNumber} at: ${window.location.origin}/${id}`,
                          files: [file]
                        };

                        // Try using the Web Share API first
                        if (navigator.canShare && navigator.canShare(shareData)) {
                          navigator.share(shareData)
                            .then(() => console.log('Shared successfully'))
                            .catch((error) => {
                              console.log('Error sharing:', error);
                              // Fallback to WhatsApp URL
                              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`View Certificate CCR #${report.certificateNumber} at: ${window.location.origin}/${id}`)}`, '_blank');
                            })
                            .finally(() => {
                              // Clean up the blob URL
                              URL.revokeObjectURL(blobUrl);
                            });
                        } else {
                          // Fallback for browsers that don't support Web Share API
                          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`View Certificate CCR #${report.certificateNumber} at: ${window.location.origin}/${id}`)}`, '_blank');
                          URL.revokeObjectURL(blobUrl);
                        }
                      })
                      .catch(error => {
                        console.error('Error processing QR code:', error);
                        // Fallback to simple text sharing
                        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`View Certificate CCR #${report.certificateNumber} at: ${window.location.origin}/${id}`)}`, '_blank');
                      });
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;