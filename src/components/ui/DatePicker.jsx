import React from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const DatePicker = ({
    label,
    error,
    value,
    onChange,
    showMonthYearPicker = false,
    required = false,
    className = "",
    containerClassName = "",
    placeholderText = "Select date",
    ...props
}) => {
    const baseInputClasses = `
    w-full px-4 py-2.5 rounded-lg border transition-all duration-200
    bg-white/50 backdrop-blur-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-gray-400
    text-gray-900 font-medium
  `;

    const borderClass = error
        ? "border-red-300 focus:border-red-500 ring-red-500/20"
        : "border-gray-200 hover:border-blue-300";

    return (
        <div className={`space-y-1.5 ${containerClassName}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative group">
                <ReactDatePicker
                    selected={value ? new Date(value) : null}
                    onChange={(date) => onChange(date)}
                    dateFormat={showMonthYearPicker ? "MM/yyyy" : "yyyy-MM-dd"}
                    showMonthYearPicker={showMonthYearPicker}
                    className={`${baseInputClasses} ${borderClass} ${className}`}
                    placeholderText={placeholderText}
                    showYearDropdown={!showMonthYearPicker}
                    scrollableYearDropdown={!showMonthYearPicker}
                    yearDropdownItemNumber={50}
                    wrapperClassName="w-full"
                    calendarClassName="glass-datepicker"
                    showPopperArrow={false}
                    {...props}
                />

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error.message}
                </p>
            )}

            <style>{`
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker__input-container {
          width: 100%;
        }
        
        /* Custom Calendar Styling */
        .glass-datepicker {
          font-family: inherit;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 1rem;
          overflow: hidden;
        }
        
        .react-datepicker__header {
          background-color: transparent;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding-top: 0;
        }
        
        .react-datepicker__current-month, 
        .react-datepicker-time__header, 
        .react-datepicker-year-header {
          font-weight: 600;
          color: #1e3a8a; /* blue-900 */
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
          width: 2.2rem;
          line-height: 2.2rem;
          margin: 0.2rem;
          color: #4b5563; /* gray-600 */
        }
        
        .react-datepicker__day-name {
          color: #9ca3af; /* gray-400 */
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
        }
        
        .react-datepicker__day:hover, 
        .react-datepicker__month-text:hover, 
        .react-datepicker__quarter-text:hover, 
        .react-datepicker__year-text:hover {
          border-radius: 0.5rem;
          background-color: #eff6ff; /* blue-50 */
          color: #2563eb; /* blue-600 */
        }
        
        .react-datepicker__day--selected, 
        .react-datepicker__day--in-selecting-range, 
        .react-datepicker__day--in-range,
        .react-datepicker__month-text--selected,
        .react-datepicker__month-text--keyboard-selected,
        .react-datepicker__year-text--selected,
        .react-datepicker__year-text--keyboard-selected {
          border-radius: 0.5rem;
          background-color: #2563eb; /* blue-600 */
          color: #fff;
          font-weight: 500;
        }
        
        .react-datepicker__day--selected:hover, 
        .react-datepicker__month-text--selected:hover,
        .react-datepicker__year-text--selected:hover {
          background-color: #1d4ed8; /* blue-700 */
        }
        
        .react-datepicker__day--keyboard-selected,
        .react-datepicker__month-text--keyboard-selected,
        .react-datepicker__year-text--keyboard-selected {
          background-color: #dbeafe; /* blue-100 */
          color: #1e40af; /* blue-800 */
          border-radius: 0.5rem;
        }
        
        .react-datepicker__triangle {
          display: none;
        }

        .react-datepicker__navigation {
          top: 1rem;
        }
        
        .react-datepicker__navigation-icon::before {
          border-color: #6b7280; /* gray-500 */
          border-width: 2px 2px 0 0;
          height: 8px;
          width: 8px;
        }

        .react-datepicker__year-read-view--down-arrow,
        .react-datepicker__month-read-view--down-arrow,
        .react-datepicker__month-year-read-view--down-arrow {
          border-color: #6b7280;
        }
      `}</style>
        </div>
    );
};

export default DatePicker;
