import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCreateReportMutation } from '../store/api/reportsApi';

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
  const [createReport] = useCreateReportMutation();

  const onSubmit = async (data) => {
    try {
      await createReport(data).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to create report:', error);
    }
  };
  const renderInput = (label, name, type = "text", unit = "",) => {
    const requiredFields = [
      'certificateNumber', 'approvalDate', 'manufacturer', 'motorVehicle',
      'category', 'modelYear', 'productionCountry', 'productionDate', 'vin',
      'engineType', 'cylinders', 'displacement', 'airIntake', 'netEnginePower',
      'engineRPM', 'pollutantLimit', 'transmission', 'eCallSystem',
      'serviceBrakes', 'emergencyBrakes'
    ];
    const isRequired = requiredFields.includes(name);
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-blue-900">{label}{isRequired && ' *'}</label>
        <div className="relative">
          <input
            type={type}
            {...register(name, { required: isRequired ? `${label} is required` : false })}
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
  };
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
                {renderInput('CCR Number', 'certificateNumber', 'text', '', )}
                {renderInput('Approved On', 'approvalDate', 'date', '', )}
                {renderInput('Manufacturer', 'manufacturer', 'text', '', )}
                {renderInput('Motor Vehicle', 'motorVehicle', 'text', '', )}
                {renderInput('Category', 'category', 'text', '', )}
                {renderInput('Model Year', 'modelYear', 'text', '', )}
                {renderInput('Country of Production', 'productionCountry', 'text', '', )}
                {renderInput('Produced in and after', 'productionDate', 'month', '', )}
                {renderInput('VIN', 'vin', 'text', '', )}
              </div>
            </div>

            <div className={activeTab === 'technical' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Max Vehicle Weight', 'maxVehicleWeight', 'number', 'kg', )}
                {renderInput('Curb Weight', 'curb', 'number', 'kg', )}
                {renderInput('Front Axle Weight', 'frontAxleWeight', 'number', 'kg', )}
                {renderInput('Rear Axle Weight', 'rearAxleWeight', 'number', 'kg', )}
                {renderInput('Type of chassis and body', 'chassisType', 'text', '', )}
                {renderInput('Number of passengers', 'passengerCount', 'number', '', )}
              </div>
            </div>

            <div className={activeTab === 'dimensions' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Length', 'length', 'number', 'mm', )}
                {renderInput('Width', 'width', 'number', 'mm', )}
                {renderInput('Height', 'height', 'number', 'mm', )}
                {renderInput('(F1 - R1)', 'wheelbase', 'number', 'mm', )}
                {renderInput('Front Track', 'frontTrack', 'number', 'mm', )}
                {renderInput('Rear Track', 'rearTrack', 'number', 'mm', )}
              </div>
            </div>
            <div className={activeTab === 'engine' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Engine Type', 'engineType', 'text', '', )}
                {renderInput('Cylinders', 'cylinders', 'number', '', )}
                {renderInput('Displacement', 'displacement', 'number', 'cc', )}
                {renderInput('Air Intake', 'airIntake', 'text', '', )}
                {renderInput('Net Engine Power', 'netEnginePower', 'number', 'kW', )}
                {renderInput('at RPM', 'engineRPM', 'number', 'rpm', )}
                {renderInput('Pollutant Limit', 'pollutantLimit', 'text', '', )}
                {renderInput('Transmission', 'transmission', 'text', '', )}
              </div>
            </div>

            <div className={activeTab === 'other' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Service Brakes', 'serviceBrakes', 'text', '', )}
                {renderInput('Emergency Brakes', 'emergencyBrakes', 'text', '', )}
                {renderInput('Motor Vehicle Class', 'vehicleClass', 'text', '', )}
                {renderInput('FE (CAFE) Combined', 'fuelEconomy', 'number', 'km/L', )}
                {renderInput('e-Call (SoS) System', 'eCallSystem', 'text', '', )}
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