export default function MobileNotSupported() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-2">
            <h1 className="text-2xl font-bold mb-4">Mobile Not Supported</h1>
            <p className="text-lg mb-6">This application is not supported on mobile devices.</p>
            <p className="text-sm text-gray-600">Please access this application from a desktop or laptop computer.</p>
        </div>
    );
}