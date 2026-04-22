import React from 'react';

const AdminPanel = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Panel</h1>
            <p className="text-lg text-gray-600 mb-8">This is a placeholder for the Admin Panel component.</p>
            <div className="bg-white p-6 rounded-lg shadow-md border border-yellow-200">
                <p className="text-yellow-700 font-semibold">
                    Note: The original 'AdminPanel' file was missing, causing a 500 error. 
                    Please replace this file with your actual admin logic.
                </p>
            </div>
            <a 
                href="/" 
                className="mt-8 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
                Back to Home
            </a>
        </div>
    );
};

export default AdminPanel;
