import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewReport = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    // Basic Information
    certificateNumber: '448226',
    approvalDate: '2023-02-26',
    manufacturer: 'Hyundai Motor Company',
    vehicleType: 'Motor Vehicle',
    model: 'Hyundai Creta SU2id 1.5L SUV FWD 5Doors',
    category: 'Multipurpose Vehicle',
    modelYear: '2024',
    productionCountry: 'INDONESIA',
    productionDate: '2023-03',
    vin: 'MF3PB812*R*******',

    // Weights
    maxVehicleWeight: '1660',
    curb: '1175',
    frontAxleWeight: '880',
    rearAxleWeight: '820',

    // Dimensions
    length: '4315',
    width: '1790',
    height: '1620',
    wheelbase: '2610',
    frontTrack: '1561',
    rearTrack: '1565',

    // Body and Seating
    chassisType: 'Monocoque',
    passengerCount: '5',

    // Engine Details
    engineType: 'Gasoline',
    cylinders: '4',
    displacement: '1497',
    airIntake: 'Regular',
    netEnginePower: '84',
    engineRPM: '6300',
    pollutantLimit: 'Euro4',
    transmission: 'CVT',
    eCallSystem: 'Provided',

    // Brakes
    serviceBrakes: 'Hydraulic',
    emergencyBrakes: 'Combined with the service brake',

    // Fuel Economy
    vehicleClass: 'Passenger Car',
    fuelEconomy: '18.1'
  });

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'technical', label: 'Technical' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'engine', label: 'Engine' },
    { id: 'other', label: 'Other Details' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderInput = (label, name, type = "text", unit = "") => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-blue-900">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="shadow w-full px-4 py-2 rounded-lg bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-900/60">
            {unit}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-10">
      <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-sm border border-white/20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-900">New Conformity Certificate</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              CCR #{formData.certificateNumber}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Tab */}
            <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Certificate Number', 'certificateNumber')}
                {renderInput('Approval Date', 'approvalDate', 'date')}
                {renderInput('Manufacturer', 'manufacturer')}
                {renderInput('Vehicle Type', 'vehicleType')}
                {renderInput('Model', 'model')}
                {renderInput('Category', 'category')}
                {renderInput('Model Year', 'modelYear')}
                {renderInput('Country of Production', 'productionCountry')}
                {renderInput('Production Date', 'productionDate', 'month')}
                {renderInput('VIN', 'vin')}
              </div>
            </div>

            {/* Technical Specifications Tab */}
            <div className={activeTab === 'technical' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Max Vehicle Weight', 'maxVehicleWeight', 'number', 'kg')}
                {renderInput('Curb Weight', 'curb', 'number', 'kg')}
                {renderInput('Front Axle Weight', 'frontAxleWeight', 'number', 'kg')}
                {renderInput('Rear Axle Weight', 'rearAxleWeight', 'number', 'kg')}
                {renderInput('Chassis Type', 'chassisType')}
                {renderInput('Passenger Count', 'passengerCount', 'number')}
              </div>
            </div>

            {/* Dimensions Tab */}
            <div className={activeTab === 'dimensions' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Length', 'length', 'number', 'mm')}
                {renderInput('Width', 'width', 'number', 'mm')}
                {renderInput('Height', 'height', 'number', 'mm')}
                {renderInput('Wheelbase', 'wheelbase', 'number', 'mm')}
                {renderInput('Front Track', 'frontTrack', 'number', 'mm')}
                {renderInput('Rear Track', 'rearTrack', 'number', 'mm')}
              </div>
            </div>

            {/* Engine Tab */}
            <div className={activeTab === 'engine' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Engine Type', 'engineType')}
                {renderInput('Cylinders', 'cylinders', 'number')}
                {renderInput('Displacement', 'displacement', 'number', 'cc')}
                {renderInput('Air Intake', 'airIntake')}
                {renderInput('Net Engine Power', 'netEnginePower', 'number', 'kW')}
                {renderInput('at RPM', 'engineRPM', 'number', 'rpm')}
                {renderInput('Pollutant Limit', 'pollutantLimit')}
                {renderInput('Transmission', 'transmission')}
              </div>
            </div>

            {/* Other Details Tab */}
            <div className={activeTab === 'other' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Service Brakes', 'serviceBrakes')}
                {renderInput('Emergency Brakes', 'emergencyBrakes')}
                {renderInput('Vehicle Class', 'vehicleClass')}
                {renderInput('Fuel Economy', 'fuelEconomy', 'number', 'km/L')}
                {renderInput('e-Call System', 'eCallSystem')}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-blue-100">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <span>Save Certificate</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewReport;