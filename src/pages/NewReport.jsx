import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const NewReport = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const {pathname} = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      certificateNumber: '',
      approvalDate: '',
      manufacturer: '',
      motorVehicle: '',
      category: '',
      modelYear: '',
      productionCountry: '',
      productionDate: '',
      vin: '',
      engineType: '',
      cylinders: '',
      displacement: '',
      airIntake: '',
      netEnginePower: '',
      engineRPM: '',
      pollutantLimit: '',
      transmission: '',
      eCallSystem: '',
      serviceBrakes: '',
      emergencyBrakes: '',
      maxVehicleWeight: '',
      curb: '',
      frontAxleWeight: '',
      rearAxleWeight: '',
      length: '',
      width: '',
      height: '',
      wheelbase: '',
      frontTrack: '',
      rearTrack: '',
      chassisType: '',
      passengerCount: '',
      vehicleClass: '',
      fuelEconomy: ''
    }, 
    // "mode" : "onChange"
  });
  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'technical', label: 'Technical' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'engine', label: 'Engine' },
    { id: 'other', label: 'Other Details' }
  ];
  const onSubmit = (data) => {
    console.log(data);
    navigate('/');
  };
  const renderInput = (label, name, type = "text", unit = "", required = false) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-blue-900">{label}</label>
      <div className="relative">
        <input
          type={type}
          {...register(name, { required: required ? `${label} is required` : false })}
          className={`shadow w-full px-4 py-2 rounded-lg bg-white/50 border ${errors[name] ? 'border-red-500' : 'border-white/30'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {unit && (
          <span className="absolute right-3 top-[20px] -translate-y-1/2 text-sm text-blue-900/60">
            {unit}
          </span>
        )}
        {errors[name] && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors[name].message}
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
            {pathname !=="/new-report" && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                CCR #{certificateNumber}
              </span>
            )}
          </div>

          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('CCR Number', 'certificateNumber', 'text', '', true)}
                {renderInput('Approved On', 'approvalDate', 'date', '', true)}
                {renderInput('Manufacturer', 'manufacturer', 'text', '', true)}
                {renderInput('Motor Vehicle', 'motorVehicle', 'text', '', true)}
                {renderInput('Category', 'category', 'text', '', true)}
                {renderInput('Model Year', 'modelYear', 'text', '', true)}
                {renderInput('Country of Production', 'productionCountry', 'text', '', true)}
                {renderInput('Produced in and after', 'productionDate', 'month', '', true)}
                {renderInput('VIN', 'vin', 'text', '', true)}
              </div>
            </div>

            <div className={activeTab === 'technical' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Max Vehicle Weight', 'maxVehicleWeight', 'number', 'kg', true)}
                {renderInput('Curb Weight', 'curb', 'number', 'kg', true)}
                {renderInput('Front Axle Weight', 'frontAxleWeight', 'number', 'kg', true)}
                {renderInput('Rear Axle Weight', 'rearAxleWeight', 'number', 'kg', true)}
                {renderInput('Type of chassis and body', 'chassisType', 'text', '', true)}
                {renderInput('Number of passengers', 'passengerCount', 'number', '', true)}
              </div>
            </div>

            <div className={activeTab === 'dimensions' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Length', 'length', 'number', 'mm', true)}
                {renderInput('Width', 'width', 'number', 'mm', true)}
                {renderInput('Height', 'height', 'number', 'mm', true)}
                {renderInput('(F1 - R1)', 'wheelbase', 'number', 'mm', true)}
                {renderInput('Front Track', 'frontTrack', 'number', 'mm', true)}
                {renderInput('Rear Track', 'rearTrack', 'number', 'mm', true)}
              </div>
            </div>
            <div className={activeTab === 'engine' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Engine Type', 'engineType', 'text', '', true)}
                {renderInput('Cylinders', 'cylinders', 'number', '', true)}
                {renderInput('Displacement', 'displacement', 'number', 'cc', true)}
                {renderInput('Air Intake', 'airIntake', 'text', '', true)}
                {renderInput('Net Engine Power', 'netEnginePower', 'number', 'kW', true)}
                {renderInput('at RPM', 'engineRPM', 'number', 'rpm', true)}
                {renderInput('Pollutant Limit', 'pollutantLimit', 'text', '', true)}
                {renderInput('Transmission', 'transmission', 'text', '', true)}
              </div>
            </div>

            <div className={activeTab === 'other' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Service Brakes', 'serviceBrakes', 'text', '', true)}
                {renderInput('Emergency Brakes', 'emergencyBrakes', 'text', '', true)}
                {renderInput('Motor Vehicle Class', 'vehicleClass', 'text', '', true)}
                {renderInput('FE (CAFE) Combined', 'fuelEconomy', 'number', 'km/L', true)}
                {renderInput('e-Call (SoS) System', 'eCallSystem', 'text', '', true)}
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