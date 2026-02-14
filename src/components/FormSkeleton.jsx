import React from 'react';

const FormSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 pb-20 animate-pulse">
            <div className="mx-auto space-y-6">
                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-3">
                        <div className="h-8 w-64 bg-gray-200 rounded-lg"></div>
                        <div className="h-4 w-48 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
                        <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Skeleton */}
                    <div className="w-full lg:w-64 flex-shrink-0 space-y-1">
                        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-sm border border-white/20 p-2 space-y-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-10 w-full bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>

                        <div className="mt-6 px-4">
                            <div className="h-32 w-full bg-blue-50/50 rounded-lg border border-blue-100/50"></div>
                        </div>
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="flex-1">
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-white/20 overflow-hidden min-h-[500px]">
                            <div className="px-6 py-5 border-b border-gray-100/50">
                                <div className="h-6 w-32 bg-gray-200 rounded-lg"></div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                            <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormSkeleton;
