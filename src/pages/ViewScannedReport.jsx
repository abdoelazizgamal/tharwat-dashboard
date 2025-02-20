
import { useParams } from "react-router-dom";
import { useGetSingleReportQuery } from "../store/api/reportsApi";

const ViewScannedReport = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleReportQuery(id);
  const report = data?.data

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (error)
    return <div className="p-6 text-red-600">Error loading report</div>;
  if (!report)
    return <div className="p-6 text-yellow-600">Report not found</div>;

  return (
    <div className="bg-[#dedfe0] min-h-screen pt-4">
      <div
        style={{
          boxShadow:
            "0 2px 2px 0 rgba(0, 0, 0, .16), 0 0 0 1px rgba(0, 0, 0, .08)",
        }}
        className="bg-white py-1.5 z-10 relative px-4"
      >
        <div className="flex items-center gap-4 mb-3 container mx-auto max-w-6xl">
          <div className="relative">
            <div className="absolute bg-white w-24 h-24 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <img
              src="/logo.png"
              alt="Mutabiq"
              className="w-16 h-16 relative z-10"
            />
          </div>
          <span className="text-xl font-light text-[#58595b] mb-5">
            Mutabiq
          </span>
        </div>
      </div>
      <div className="bg-[#f5f7fa] -mt-6 pt-4">
        <div className="container mx-auto max-w-6xl mt-6 px-4">
          <h2 className="text-2xl font-light my-3 text-[#58595b]">
            Conformity Certificates
          </h2>
          {/* Vehicle Information Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-white">
                    <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                      <span className="text-sm font-normal text-[#58595b]">CCR Number</span>
                    </td>
                    <td className="py-2 px-4 bg-[#f9f9f9] ">
                      <span className="text-[#58595b] font-bold text-sm">{report.certificateNumber}</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white">
                    <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                      <span className="text-sm font-normal text-[#58595b]">Approved On</span>
                    </td>
                    <td className="py-2 px-6  bg-[#f9f9f9]">
                      <span className="text-[#58595b] font-bold text-sm">
                        {new Date(report.approvedOn).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-white">
                    <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                      <span className="text-sm font-normal text-[#58595b]">Manufacturer</span>
                    </td>
                    <td className="py-2 px-6 bg-[#f9f9f9]">
                      <span className="text-[#58595b] font-bold text-sm">{report.manufacturer}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 bg-[#e9e9e9]  p-6">
                <h3 className="text-xl font-medium text-[#58595b] mb-4 text-center">
                  Motor Vehicle
                </h3>
                <p className="text-xl text-[#58595b] text-center font-medium">
                  {report.motorVehicle}
                </p>
              </div>
              <div className="mt-4">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Category</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.category}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Model Year</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.production}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Country of Production</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">INDONESIA</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Produced in and after</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">Month 3 Year 2023</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">VIN</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.vin}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Technical Specifications */}
              <div className="mt-4">
                <h3 className="text-lg font-medium text-[#58595b] mb-4 ">Technical Specifications</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#58595b]" >
                        Weights
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Max Vehicle Weight</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.specifications?.weights?.maxVehicleWeight} kg</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Curb</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.specifications?.weights?.curb} kg</span>
                      </td>
                    </tr>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#58595b]" >
                        Maximum Axle Weight
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Front</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.specifications?.maxAxleWeight?.front} kg</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Rear </span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.specifications?.maxAxleWeight?.rear} kg</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Dimensions */}
              <div className="mt-4">

                <table className="w-full border-collapse">
                  <tbody>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#58595b]" >
                        Dimensions
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Length</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.specifications?.dimensions?.length} mm</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Width</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.specifications?.dimensions?.width} mm</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Height</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.specifications?.dimensions?.height} mm</span>
                      </td>
                    </tr>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#58595b]" >
                        Wheelbase
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">(F1-R1)	</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.wheelBase?.f1r1} mm</span>
                      </td>
                    </tr>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#58595b]" >
                        Track
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Front </span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.specifications?.track?.front} mm</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Rear </span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.specifications?.track?.rear} mm</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Body and Seating */}
              <div className="mt-4">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#58595b]" >
                        Body and Seating
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Type of chassis and body</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.bodyAndSeating?.typeOfBody}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Number of Passengers</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report.specifications?.bodyAndSeating?.numberOfSeats} (Including the Driver)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Engine */}
              <div className="mt-4">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#58595b]" >
                        Engine
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Engine Type</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.engine?.engineType}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Cylinders</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.engine?.cylinders}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Displacement</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.engine?.displacement} cc</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Air Intake</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.engine?.airIntake}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Net Engine Power</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.engine?.netEnginePower}
                          <span className="text-sm font-normal"> kW </span>  at  {report?.specifications?.engine?.engineRPM}
                          <span className="text-sm font-normal"> rpm </span>

                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Pollutant Limit</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.engine?.pollutantLimit}</span>
                      </td>
                    </tr>
                    <tr className="border-y-[15px] border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Transmission</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.engine?.transmission}</span>
                      </td>
                    </tr>
                    <tr className="border-y-[15px] border-white ">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">e Call (SOS) System	</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.engine?.sosSystem}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Brakes */}
              <div className="mt-4">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#58595b]" >
                        Brakes
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Service Brakes</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.brakes?.serviceBrakes}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Emergency Brake</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.specifications?.brakes?.emergencyBrake}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Fuel Economy */}
              <div className="mt-4">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#58595b]" >
                        Fuel Economy
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">Motor Vehicle Class</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.fuelEconomy?.motorVehicleClass}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#58595b]">FE (CAFE) Combined</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#58595b] font-bold text-sm">{report?.fuelEconomy?.feCombined}
                          <span className="text-sm font-normal">   km/L   </span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Any other information or local standards to be complied  */}
              <div className="mt-4">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#58595b]" >
                      Any other information or local standards to be complied
                      </td>
                    </tr>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-normal text-sm text-[#58595b]" >
                      1) Also comply with the National regulations for member countries mentioned in the Annex of the list of Technical Regulations for MV 2024 MY-D2, when exporting to those countries. 2) Height : 1620mm(16" tyre) / 1630mm(17" tyre) 3) Track : Front 1561 Rear 1565mm for 17" tyre and Front 1572 Rear 1576 for 18" tyre

                      </td>
                    </tr>
              
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center">
                <img src="/gas.svg" alt="Fuel Economy" className="w-12 h-12 mb-4" />
                <h3 className="text-lg font-medium text-[#58595b] mb-2">GSO Fuel Economy Guide</h3>
                <p className="text-sm text-[#58595b]">Browse and compare motor vehicles models based on fuel economy and technical specifications.</p>
              </div>
              <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center">
                <img src="/paper.svg" alt="Custom Clearance" className="w-12 h-12 mb-4" />
                <h3 className="text-lg font-medium text-[#58595b] mb-2">Custom Clearance Guide</h3>
                <p className="text-sm text-[#58595b]">An indicative guide for customs clearance of new motor vehicles, motorcycles and tyres.</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ViewScannedReport;
