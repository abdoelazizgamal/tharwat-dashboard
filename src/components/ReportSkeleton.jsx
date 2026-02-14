import logo from "../assets/logo.png";

const ReportSkeleton = () => {
    return (
        <div className="bg-[#dedfe0] min-h-screen pt-4 lato animate-pulse">
            {/* Header Skeleton */}
            <div
                style={{
                    boxShadow:
                        "0 2px 2px 0 rgba(0, 0, 0, .05), 0 0 0 1px rgba(0, 0, 0, .03)",
                }}
                className="bg-white py-1.5 z-10 relative px-4"
            >
                <div className="flex items-center gap-4 mb-3 container mx-auto max-w-[1150px]">
                    <div className="relative">
                        <div className="absolute bg-gray-200 w-24 h-24 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <img
                            src={logo}
                            alt="Mutabiq"
                            className="w-16 h-16 relative z-10 opacity-50"
                            loading="eager"
                            fetchPriority="high"
                        />
                    </div>
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>

            <div className="bg-[#f5f7fa] -mt-6 pt-4 pb-12">
                <div className="container mx-auto max-w-[1150px] mt-6 px-4">
                    {/* Title Skeleton */}
                    <div className="h-8 w-64 bg-gray-300 rounded my-3 py-2"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 py-6 md:p-6 md:col-span-2 shadow">
                            {/* Table Skeleton Rows */}
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex border-b border-gray-100 mb-2">
                                    <div className="w-1/4 h-10 bg-gray-100 mr-2 rounded"></div>
                                    <div className="w-3/4 h-10 bg-gray-200 rounded"></div>
                                </div>
                            ))}

                            {/* Motor Vehicle Box Skeleton */}
                            <div className="mt-4 bg-gray-100 p-6 h-32 rounded"></div>

                            {/* More Table Rows */}
                            <div className="mt-4 space-y-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="flex border-b border-gray-100">
                                        <div className="w-1/4 h-10 bg-gray-100 mr-2 rounded"></div>
                                        <div className="w-3/4 h-10 bg-gray-200 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Cards Skeleton */}
                        <div className="md:col-span-1 space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-white rounded-lg py-8 px-6 flex flex-col items-center shadow">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                                    <div className="h-6 w-40 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 w-56 bg-gray-100 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportSkeleton;
