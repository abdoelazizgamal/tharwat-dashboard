import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUpdateReportMutation, useGetSingleReportQuery } from '../store/api/reportsApi';
import { toast } from 'react-hot-toast';

const EditReport = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('basic');
  const { pathname } = useLocation();

  const { data: reportData, isLoading: isLoadingReport } = useGetSingleReportQuery(id);
  const [updateReport, { isLoading: isUpdating }] = useUpdateReportMutation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  useEffect(() => {
    if (reportData?.data) {
      const report = reportData.data;
      reset({
        certificateNumber: report.certificateNumber,
        approvalDate: new Date(report.approvedOn).toISOString().split('T')[0],
        manufacturer: report.manufacturer,
        motorVehicle: report.motorVehicle,
        category: report.category,
        modelYear: report.production,
        productionCountry: 'INDONESIA',
        productionDate: report.producedInAfter,
        vin: report.vin,
        engineType: report.specifications.engine.engineType,
        cylinders: report.specifications.engine.cylinders,
        displacement: report.specifications.engine.displacement,
        airIntake: report.specifications.engine.airIntake,
        netEnginePower: report.specifications.engine.netEnginePower,
        engineRPM: report.specifications.engine.engineRPM,
        pollutantLimit: report.specifications.engine.pollutantLimit,
        transmission: report.specifications.engine.transmission,
        eCallSystem: report.specifications.engine.sosSystem,
        serviceBrakes: report.specifications.brakes.serviceBrakes,
        emergencyBrakes: report.specifications.brakes.emergencyBrake,
        maxVehicleWeight: report.specifications.weights.maxVehicleWeight,
        curb: report.specifications.weights.curb,
        frontAxleWeight: report.specifications.maxAxleWeight.front,
        rearAxleWeight: report.specifications.maxAxleWeight.rear,
        length: report.specifications.dimensions.length,
        width: report.specifications.dimensions.width,
        height: report.specifications.dimensions.height,
        wheelbase: report.specifications.wheelBase.f1r1,
        frontTrack: report.specifications.track.front,
        rearTrack: report.specifications.track.rear,
        chassisType: report.specifications.bodyAndSeating.typeOfBody,
        passengerCount: report.specifications.bodyAndSeating.numberOfSeats,
        vehicleClass: report.fuelEconomy.motorVehicleClass,
        fuelEconomy: parseFloat(report.fuelEconomy.feCombined),
        complianceInfo: report.complianceInfo
      });
    }
  }, [reportData, reset]);
  const hasTabErrors = (tabId) => {
    const tabFields = {
      basic: ['certificateNumber', 'approvalDate', 'manufacturer', 'motorVehicle', 'category', 'modelYear', 'productionCountry', 'productionDate', 'vin'],
      technical: ['maxVehicleWeight', 'curb', 'frontAxleWeight', 'rearAxleWeight', 'chassisType', 'passengerCount'],
      dimensions: ['length', 'width', 'height', 'wheelbase', 'frontTrack', 'rearTrack'],
      engine: ['engineType', 'cylinders', 'displacement', 'airIntake', 'netEnginePower', 'engineRPM', 'pollutantLimit', 'transmission'],
      other: ['serviceBrakes', 'emergencyBrakes', 'vehicleClass', 'fuelEconomy', 'eCallSystem', 'complianceInfo']
    };
    return tabFields[tabId]?.some(field => errors[field]);
  };

  const getFirstErrorTab = () => {
    const tabOrder = ['basic', 'technical', 'dimensions', 'engine', 'other'];
    return tabOrder.find(tab => hasTabErrors(tab));
  };

  const onError = (errors) => {
    const firstErrorTab = getFirstErrorTab();
    if (firstErrorTab && firstErrorTab !== activeTab) {
      setActiveTab(firstErrorTab);
      toast.error('Please fix the validation errors');
    }
  };

  const onSubmit = async (formData) => {
    try {
      const transformedData = {
        certificateNumber: formData.certificateNumber,
        approvedOn: new Date(formData.approvalDate).toISOString(),
        manufacturer: formData.manufacturer,
        motorVehicle: formData.motorVehicle,
        category: formData.category,
        variantModel: formData.motorVehicle,
        production: formData.modelYear,
        producedInAfter: formData.productionDate,
        vin: formData.vin,
        specifications: {
          weights: {
            maxVehicleWeight: Number(formData.maxVehicleWeight),
            curb: Number(formData.curb)
          },
          maxAxleWeight: {
            front: Number(formData.frontAxleWeight),
            rear: Number(formData.rearAxleWeight)
          },
          dimensions: {
            length: Number(formData.length),
            width: Number(formData.width),
            height: Number(formData.height)
          },
          wheelBase: {
            f1r1: Number(formData.wheelbase)
          },
          track: {
            front: Number(formData.frontTrack),
            rear: Number(formData.rearTrack)
          },
          bodyAndSeating: {
            typeOfBody: formData.chassisType,
            numberOfSeats: Number(formData.passengerCount)
          },
          engine: {
            engineType: formData.engineType,
            cylinders: Number(formData.cylinders),
            displacement: Number(formData.displacement),
            airIntake: formData.airIntake,
            netEnginePower: formData.netEnginePower,
            pollutantLimit: formData.pollutantLimit,
            transmission: formData.transmission,
            sosSystem: formData.eCallSystem,
            engineRPM:formData.engineRPM
          },
          brakes: {
            serviceBrakes: formData.serviceBrakes,
            emergencyBrake: formData.emergencyBrakes
          }
        },
        fuelEconomy: {
          motorVehicleClass: formData.vehicleClass,
          feCombined: `${formData.fuelEconomy} km/L`
        },
        complianceInfo: formData.complianceInfo
      };

      await updateReport({ id, ...transformedData }).unwrap();
      toast.success('Report updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to update report:', error);
      toast.error(error?.message || 'Failed to update report. Please try again.');
    }
  };

  const renderInput = (label, name, type = "text", unit = "", isTextArea = false) => {
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
          {isTextArea ? (
            <textarea
              {...register(name, { required: isRequired ? `${label} is required` : false })}
              className={`shadow w-full px-4 py-2 rounded-lg bg-white/50 border ${errors[name] ? 'border-red-500' : 'border-white/30'} focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]`}
            />
          ) : (
            <input
              type={type === "number" ? "number" : type}
              step={type === "number" ? "0.01" : ""}
              min={type === "number" ? "0" : ""}

              {...register(name, { required: isRequired ? `${label} is required` : false })}
              className={`shadow w-full px-4 py-2 rounded-lg bg-white/50 border ${errors[name] ? 'border-red-500' : 'border-white/30'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          )}
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

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'technical', label: 'Technical' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'engine', label: 'Engine' },
    { id: 'other', label: 'Other Details' }
  ];

  if (isLoadingReport) {
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

  return (
    <div className="p-6 md:p-10">
      <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-sm border border-white/20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-blue-900">Edit Conformity Certificate</h2>
            {pathname !== "/new-report" && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                CCR #{reportData?.data?.certificateNumber}
              </span>
            )}
          </div>

          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer relative ${hasTabErrors(tab.id) ? 'text-red-600' : ''} ${activeTab === tab.id
                    ? hasTabErrors(tab.id) ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                    : hasTabErrors(tab.id) ? 'text-red-600 hover:bg-red-50' : 'text-blue-600 hover:bg-blue-50'
                  }`}
              >
                {tab.label}
                {hasTabErrors(tab.id) && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('CCR Number', 'certificateNumber', 'text', '',)}
                {renderInput('Approved On', 'approvalDate', 'date', '',)}
                {renderInput('Manufacturer', 'manufacturer', 'text', '',)}
                {renderInput('Motor Vehicle', 'motorVehicle', 'text', '',)}
                {renderInput('Category', 'category', 'text', '',)}
                {renderInput('Model Year', 'modelYear', 'text', '',)}
                {renderInput('Country of Production', 'productionCountry', 'text', '',)}
                {renderInput('Produced in and after', 'productionDate', 'month', '',)}
                {renderInput('VIN', 'vin', 'text', '',)}
              </div>
            </div>

            <div className={activeTab === 'technical' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Max Vehicle Weight', 'maxVehicleWeight', 'number', 'kg',)}
                {renderInput('Curb Weight', 'curb', 'number', 'kg',)}
                {renderInput('Front Axle Weight', 'frontAxleWeight', 'number', 'kg',)}
                {renderInput('Rear Axle Weight', 'rearAxleWeight', 'number', 'kg',)}
                {renderInput('Type of chassis and body', 'chassisType', 'text', '',)}
                {renderInput('Number of passengers', 'passengerCount', 'number', '',)}
              </div>
            </div>

            <div className={activeTab === 'dimensions' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Length', 'length', 'number', 'mm',)}
                {renderInput('Width', 'width', 'number', 'mm',)}
                {renderInput('Height', 'height', 'number', 'mm',)}
                {renderInput('(F1 - R1)', 'wheelbase', 'number', 'mm',)}
                {renderInput('Front Track', 'frontTrack', 'number', 'mm',)}
                {renderInput('Rear Track', 'rearTrack', 'number', 'mm',)}
              </div>
            </div>
            <div className={activeTab === 'engine' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Engine Type', 'engineType', 'text', '',)}
                {renderInput('Cylinders', 'cylinders', 'number', '',)}
                {renderInput('Displacement', 'displacement', 'number', 'cc',)}
                {renderInput('Air Intake', 'airIntake', 'text', '',)}
                {renderInput('Net Engine Power', 'netEnginePower', 'number', 'kW',)}
                {renderInput('at RPM', 'engineRPM', 'number', 'rpm',)}
                {renderInput('Pollutant Limit', 'pollutantLimit', 'text', '',)}
                {renderInput('Transmission', 'transmission', 'text', '',)}
              </div>
            </div>

            <div className={activeTab === 'other' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderInput('Service Brakes', 'serviceBrakes', 'text', '',)}
                {renderInput('Emergency Brakes', 'emergencyBrakes', 'text', '',)}
                {renderInput('Motor Vehicle Class', 'vehicleClass', 'text', '',)}
                {renderInput('FE (CAFE) Combined', 'fuelEconomy', 'number', 'km/L',)}
                {renderInput('e-Call (SoS) System', 'eCallSystem', 'text', '',)}
              </div>
              <div className="mt-6">
                {renderInput('Additional Information and Local Standards', 'complianceInfo', 'text', '', true)}
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
                disabled={isUpdating}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <span>Update Certificate</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditReport;