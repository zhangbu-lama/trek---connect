import React from "react";
import { FaTimesCircle, FaHome, FaPhoneAlt, FaSyncAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PayFailure() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 transform transition-all duration-300 hover:shadow-2xl animate-fade-in-up">
                <div className="flex flex-col items-center text-center">
                    {/* Animated Failure Icon */}
                    <div className="mb-6 animate-bounce">
                        <FaTimesCircle className="text-6xl text-red-500" />
                    </div>

                    {/* Failure Text */}
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        Payment Failed!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Your transaction could not be processed. Please try
                        again or contact support if the issue persists.
                    </p>

                    {/* Dashboard Button */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg
                      transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mb-4"
                    >
                        <FaHome className="text-xl" />
                        Return to Dashboard
                    </button>

                    {/* Support Section */}
                    <div className="mt-8 border-t pt-6 w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-center gap-2 text-gray-600">
                                <FaPhoneAlt className="text-blue-500" />
                                <span>Support: +977 9800000000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayFailure;
