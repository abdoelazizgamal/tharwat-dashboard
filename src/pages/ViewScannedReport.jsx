
import { useParams } from "react-router-dom";
import { useGetSingleReportQuery } from "../store/api/reportsApi";
import logo from "../assets/logo.png"
const ViewScannedReport = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleReportQuery(id);
  const report = data?.data

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full bg-blue-50 animate-pulse"></div>
        <img src={logo} alt="Motabiq" className="w-16 h-16 relative z-10 top-10" />
        <div className="absolute w-24 h-24 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <p className="mt-14 text-blue-900 font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
  if (error)
    return <div className="p-6 text-red-600">Error loading report</div>;
  if (!report)
    return <div className="p-6 text-yellow-600">Report not found</div>;

  return (
    <div className="bg-[#dedfe0] min-h-screen pt-4  lato">
      <div
        style={{
          boxShadow:
            "0 2px 2px 0 rgba(0, 0, 0, .16), 0 0 0 1px rgba(0, 0, 0, .08)",
        }}
        className="bg-white py-1.5 z-10 relative px-4"
      >
        <div className="flex items-center gap-4 mb-3 container mx-auto max-w-[1140px]">
          <div className="relative">
            <div className="absolute bg-white w-24 h-24 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <img
              src="logo.png"
              alt="Motabiq"
              className="w-16 h-16 relative z-10"
            />
          </div>
          <span className="text-xl font-light text-[#58595b] mb-5">
            Motabiq
          </span>
        </div>
      </div>
      <div className="bg-[#f5f7fa] -mt-6 pt-4 pb-8">
        <div className="container mx-auto max-w-[1140px] mt-6 px-4">
          <h2 className="text-2xl font-light my-3 py-2 text-[#262626]">
            Conformity Certificates
          </h2>
          {/* Vehicle Information Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shadow">
            <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-white">
                    <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                      <span className="text-sm font-normal text-[#262626]">CCR Number</span>
                    </td>
                    <td className="py-2 px-4 bg-[#f9f9f9] ">
                      <span className="text-[#262626] font-bold text-sm">{report.certificateNumber}</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white">
                    <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                      <span className="text-sm font-normal text-[#262626]">Approved On</span>
                    </td>
                    <td className="py-2 px-4  bg-[#f9f9f9]">
                      <span className="text-[#262626] font-bold text-sm">
                        {new Date(report.approvedOn).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-white">
                    <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                      <span className="text-sm font-normal text-[#262626]">Manufacturer</span>
                    </td>
                    <td className="py-2 px-4 bg-[#f9f9f9]">
                      <span className="text-[#262626] font-bold text-sm">{report.manufacturer}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 bg-[#e9e9e9]  p-6 text-[#555] text-xl  text-center font-meduim">
                <h3 className="  mb-2 ">
                  Motor Vehicle
                </h3>
                <p className="   ">
                  {report.motorVehicle}
                </p>
              </div>
              <div className="mt-4">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Category</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.category}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Model Year</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.production}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Country of Production</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.country}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Produced in and after</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">
                          <span className="text-sm font-medium">Month </span>{new Date(report.producedInAfter).getMonth() + 1}<span className="text-sm font-medium"> Year </span>{new Date(report.producedInAfter).getFullYear()}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">VIN</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.vin}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Technical Specifications */}
              <div className="mt-4">
                <h3 className="text-lg font-medium text-[#262626] mb-4 ">Technical Specifications</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#262626]" >
                        Weights
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Max Vehicle Weight</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.specifications?.weights?.maxVehicleWeight} <span className="text-sm font-medium">  kg</span></span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Curb</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.specifications?.weights?.curb} <span className="text-sm font-medium">  kg</span></span>
                      </td>
                    </tr>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#262626]" >
                        Maximum Axle Weight
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Front</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.specifications?.maxAxleWeight?.front} <span className="text-sm font-medium">  kg</span></span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Rear </span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.specifications?.maxAxleWeight?.rear} <span className="text-sm font-medium">  kg</span></span>
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
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#262626]" >
                        Dimensions
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Length</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.specifications?.dimensions?.length} 
                        <span className="text-sm font-medium">  mm</span>
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Width</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.specifications?.dimensions?.width} <span className="text-sm font-medium">  mm</span></span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Height</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.specifications?.dimensions?.height} <span className="text-sm font-medium">  mm</span></span>
                      </td>
                    </tr>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#262626]" >
                        Wheelbase
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">(F1-R1)	</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.wheelBase?.f1r1} <span className="text-sm font-medium">  mm</span></span>
                      </td>
                    </tr>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#262626]" >
                        Track
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Front </span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.specifications?.track?.front} <span className="text-sm font-medium">  mm</span></span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Rear </span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.specifications?.track?.rear} <span className="text-sm font-medium">  mm</span></span>
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
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#262626]" >
                        Body and Seating
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Type of chassis and body</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.bodyAndSeating?.typeOfBody}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Number of Passengers</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report.specifications?.bodyAndSeating?.numberOfSeats} <span className="text-sm font-medium">   (Including the Driver)</span></span>
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
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#262626]" >
                        Engine
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Engine Type</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.engine?.engineType}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Cylinders</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.engine?.cylinders}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Displacement</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.engine?.displacement}  
                        <span className="text-sm font-medium">   cc</span>
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Air Intake</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.engine?.airIntake}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Net Engine Power</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.engine?.netEnginePower}
                          <span className="text-sm font-normal"> kW </span>  at  {report?.specifications?.engine?.engineRPM}
                          <span className="text-sm font-normal"> rpm </span>

                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Pollutant Limit</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.engine?.pollutantLimit}</span>
                      </td>
                    </tr>
                    <tr className="border-y-[15px] border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Transmission</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.engine?.transmission}</span>
                      </td>
                    </tr>
                    <tr className="border-y-[15px] border-white ">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">e Call (SOS) System	</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.engine?.sosSystem}</span>
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
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#262626]" >
                        Brakes
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Service Brakes</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.brakes?.serviceBrakes}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Emergency Brake</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.specifications?.brakes?.emergencyBrake}</span>
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
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#262626]" >
                        Fuel Economy
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">Motor Vehicle Class</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.fuelEconomy?.motorVehicleClass}</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="py-2 px-4 bg-[#f0f0f0] w-1/4">
                        <span className="text-sm font-normal text-[#262626]">FE (CAFE) Combined</span>
                      </td>
                      <td className="py-2 px-4 bg-[#f9f9f9]">
                        <span className="text-[#262626] font-bold text-sm">{report?.fuelEconomy?.feCombined}
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
                      <td colSpan={2} className="py-2 px-4 font-bold text-sm text-[#262626]" >
                        Any other information or local standards to be complied
                      </td>
                    </tr>
                    <tr className=" border-b-[4px] border-white bg-[#f8f9fa]  ">
                      <td colSpan={2} className="py-2 px-4 font-normal text-sm text-[#262626]" >
                        {report?.complianceInfo}

                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:col-span-1 space-y-4 shadow">
              <div className="bg-white rounded-lg py-8 px-6 flex flex-col items-center text-center">
                <img src="/gas.svg" alt="Fuel Economy" className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-medium text-[#262626] mb-2">GSO Fuel Economy Guide</h3>
                <p className="text-base text-[#262626]">Browse and compare motor vehicles models based on fuel economy and technical specifications.</p>
              </div>
              <div className="bg-white rounded-lg py-8  px-6  flex flex-col items-center text-center">
                <img src="/paper.svg" alt="Custom Clearance" className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-medium text-[#262626] mb-2">Custom Clearance Guide</h3>
                <p className="text-base text-[#262626]">An indicative guide for customs clearance of new motor vehicles, motorcycles and tyres.</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ViewScannedReport;
