export default function ExamsLoading() {
    return (
        <div className="p-6 space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>

            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                    >
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-full bg-gray-200 rounded animate-pulse mt-2"></div>
                        <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
