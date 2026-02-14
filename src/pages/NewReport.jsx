import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useCreateReportMutation } from '../store/api/reportsApi';
import { toast } from 'react-hot-toast';
import Input from '../components/ui/Input';
import DatePicker from '../components/ui/DatePicker';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const NewReport = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const { pathname } = useLocation();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, control } = useForm({
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
      fuelEconomy: '',
      complianceInfo: ''
    }
  });

  const [createReport, { isLoading }] = useCreateReportMutation();

  // Function to check if a tab has errors
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
        country: formData.productionCountry,
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
            engineRPM: formData.engineRPM
          },
          brakes: {
            serviceBrakes: formData.serviceBrakes,
            emergencyBrake: formData.emergencyBrakes
          }
        },
        fuelEconomy: {
          motorVehicleClass: formData.vehicleClass,
          feCombined: formData.fuelEconomy
        },
        complianceInfo: formData.complianceInfo
      };

      await createReport(transformedData).unwrap();
      toast.success('Report created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to create report:', error);
      const errorMessage = error?.data?.message || error?.message || 'Failed to create report';

      if (errorMessage === 'Certificate number already exists') {
        setError('certificateNumber', {
          type: 'manual',
          message: 'Certificate number already exists'
        });
        if (activeTab !== 'basic') {
          setActiveTab('basic');
        }
      }

      toast.error(errorMessage);
    }
  };

  const onError = () => {
    const firstErrorTab = getFirstErrorTab();
    if (firstErrorTab && firstErrorTab !== activeTab) {
      setActiveTab(firstErrorTab);
      toast.error('Please fix the validation errors');
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'technical', label: 'Technical' },
    { id: 'dimensions', label: 'Dimensions' },
    { id: 'engine', label: 'Engine' },
    { id: 'other', label: 'Other Details' }
  ];

  const renderField = (name, label, type = "text", unit = "", isTextArea = false) => {
    const requiredFields = [
      'certificateNumber', 'approvalDate', 'manufacturer', 'motorVehicle',
      'category', 'modelYear', 'productionCountry', 'productionDate', 'vin',
      'engineType', 'cylinders', 'displacement', 'airIntake', 'netEnginePower',
      'engineRPM', 'pollutantLimit', 'transmission', 'eCallSystem',
      'serviceBrakes', 'emergencyBrakes'
    ];

    if (type === 'date' || type === 'month') {
      return (
        <Controller
          control={control}
          name={name}
          rules={{ required: requiredFields.includes(name) ? `${label} is required` : false }}
          render={({ field: { onChange, value, ref } }) => (
            <DatePicker
              label={label}
              value={value}
              onChange={onChange}
              error={errors[name]}
              required={requiredFields.includes(name)}
              showMonthYearPicker={type === 'month'}
              placeholderText={type === 'month' ? "Select month" : "Select date"}
            />
          )}
        />
      );
    }

    return (
      <Input
        label={label}
        type={type}
        unit={unit}
        isTextArea={isTextArea}
        error={errors[name]}
        required={requiredFields.includes(name)}
        {...register(name, { required: requiredFields.includes(name) ? `${label} is required` : false })}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 pb-20">
      <div className=" mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">New Conformity Certificate</h1>
            <p className="text-gray-500 mt-1">Create a new report by filling out the details below.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit, onError)}
              disabled={isLoading || isSubmitting}
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-all flex items-center gap-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <span>Save Certificate</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-2 sticky top-6">
              {tabs.map((tab) => {
                const hasError = hasTabErrors(tab.id);
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between group relative overflow-hidden ${isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <span className="relative z-10">{tab.label}</span>
                    {hasError && (
                      <span className="relative z-10 w-2 h-2 rounded-full bg-red-500"></span>
                    )}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-lg"></div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 px-4">
              <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Helpful Tip</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Fields marked with an asterisk (*) are required. Make sure to complete all tabs before saving.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
              <Card className="min-h-[500px]">
                <CardHeader>
                  <CardTitle>{tabs.find(t => t.id === activeTab)?.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('certificateNumber', 'CCR Number')}
                      {renderField('approvalDate', 'Approved On', 'date')}
                      {renderField('manufacturer', 'Manufacturer')}
                      {renderField('motorVehicle', 'Motor Vehicle')}
                      {renderField('category', 'Category')}
                      {renderField('modelYear', 'Model Year')}
                      {renderField('productionCountry', 'Country of Production')}
                      {renderField('productionDate', 'Produced in and after', 'month')}
                      {renderField('vin', 'VIN')}
                    </div>
                  </div>

                  <div className={activeTab === 'technical' ? 'block' : 'hidden'}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('maxVehicleWeight', 'Max Vehicle Weight', 'number', 'kg')}
                      {renderField('curb', 'Curb Weight', 'number', 'kg')}
                      {renderField('frontAxleWeight', 'Front Axle Weight', 'number', 'kg')}
                      {renderField('rearAxleWeight', 'Rear Axle Weight', 'number', 'kg')}
                      {renderField('chassisType', 'Type of chassis and body')}
                      {renderField('passengerCount', 'Number of passengers', 'number')}
                    </div>
                  </div>

                  <div className={activeTab === 'dimensions' ? 'block' : 'hidden'}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('length', 'Length', 'number', 'mm')}
                      {renderField('width', 'Width', 'number', 'mm')}
                      {renderField('height', 'Height', 'number', 'mm')}
                      {renderField('wheelbase', '(F1 - R1)', 'number', 'mm')}
                      {renderField('frontTrack', 'Front Track', 'number', 'mm')}
                      {renderField('rearTrack', 'Rear Track', 'number', 'mm')}
                    </div>
                  </div>

                  <div className={activeTab === 'engine' ? 'block' : 'hidden'}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('engineType', 'Engine Type')}
                      {renderField('cylinders', 'Cylinders', 'number')}
                      {renderField('displacement', 'Displacement', 'number', 'cc')}
                      {renderField('airIntake', 'Air Intake')}
                      {renderField('netEnginePower', 'Net Engine Power', 'number', 'kW')}
                      {renderField('engineRPM', 'at RPM', 'number', 'rpm')}
                      {renderField('pollutantLimit', 'Pollutant Limit')}
                      {renderField('transmission', 'Transmission')}
                    </div>
                  </div>

                  <div className={activeTab === 'other' ? 'block' : 'hidden'}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderField('serviceBrakes', 'Service Brakes')}
                      {renderField('emergencyBrakes', 'Emergency Brakes')}
                      {renderField('vehicleClass', 'Motor Vehicle Class')}
                      {renderField('fuelEconomy', 'FE (CAFE) Combined', 'number', 'km/L')}
                      {renderField('eCallSystem', 'e-Call (SoS) System')}
                    </div>
                    <div className="mt-6">
                      {renderField('complianceInfo', 'Additional Information and Local Standards', 'text', '', true)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReport;