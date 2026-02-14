import React from 'react';

const Input = React.forwardRef(({
    label,
    error,
    unit,
    type = "text",
    isTextArea = false,
    className = "",
    containerClassName = "",
    required = false,
    ...props
}, ref) => {

    const baseInputClasses = `
    w-full px-4 py-2.5 rounded-lg border transition-all duration-200
    bg-white/50 backdrop-blur-sm
    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-gray-400
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
                {isTextArea ? (
                    <textarea
                        ref={ref}
                        className={`${baseInputClasses} ${borderClass} min-h-[120px] resize-y ${className}`}
                        {...props}
                    />
                ) : (
                    <input
                        ref={ref}
                        type={type === "number" ? "number" : type}
                        step={type === "number" ? "0.01" : undefined}
                        min={type === "number" ? "0" : undefined}
                        className={`${baseInputClasses} ${borderClass} ${className}`}
                        {...props}
                    />
                )}

                {unit && !isTextArea && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-sm text-gray-500 font-medium bg-gray-50/50 px-2 py-1 rounded">
                            {unit}
                        </span>
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-500 flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error.message}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
