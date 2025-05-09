import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import {
    FaCircleCheck,
    FaReceipt,
    FaShieldHeart,
    FaHouse,
} from "react-icons/fa6";

const PaySuccess = () => {
    const navigate = useNavigate();
    const [search] = useSearchParams();
    const dataQuery = search.get("data");
    const [data, setData] = useState(null);
    const [resErr, setResErr] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!dataQuery) {
            setResErr("Missing transaction data.");
            setLoading(false);
            return;
        }
        try {
            const decoded = atob(dataQuery);
            const parsedData = JSON.parse(decoded);
            setData(parsedData);
            setLoading(false);
        } catch (err) {
            setResErr("Invalid transaction data.");
            setLoading(false);
        }
    }, [dataQuery]);

    if (loading) return <div>Loading...</div>;
    if (resErr)
        return <div className="text-red-500 text-center p-8">{resErr}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 animate-fade-in">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Status Icon */}
                    <div className="relative animate-pop-in">
                        <div
                            className={`absolute inset-0 ${data.status === "COMPLETE" ? "bg-emerald-100/50" : "bg-red-100/50"} rounded-full blur-lg animate-pulse`}
                        />
                        {data.status === "COMPLETE" ? (
                            <FaCircleCheck className="relative text-7xl text-emerald-500 z-10" />
                        ) : (
                            <FaTimesCircle className="relative text-7xl text-red-500 z-10" />
                        )}
                    </div>

                    {/* Header Section */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-emerald-700">
                            {data.status === "COMPLETE"
                                ? "Payment Successful!"
                                : "Payment Failed"}
                        </h1>
                        <p className="text-gray-600 text-lg">
                            {data.status === "COMPLETE"
                                ? "Thank you for your transaction"
                                : "Please try again or contact support"}
                        </p>
                    </div>

                    {/* Transaction Details */}
                    {data.status === "COMPLETE" && (
                        <div className="w-full space-y-4">
                            <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Amount:
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-emerald-600">
                                                NPR {data?.total_amount}
                                            </span>
                                            <FaReceipt className="text-emerald-500" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Transaction Code:
                                        </span>
                                        <span className="text-gray-500 font-medium">
                                            {data?.transaction_code}
                                        </span>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-gray-600">
                                            Transaction UUID:
                                        </span>
                                        <p className="font-mono text-sm text-gray-500 break-all">
                                            {data?.transaction_uuid}
                                        </p>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-gray-600">
                                            Product Code:
                                        </span>
                                        <p className="font-mono text-sm text-gray-500">
                                            {data?.product_code}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="w-full space-y-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl
                            transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3"
                        >
                            <FaHouse className="text-xl" />
                            Return to Dashboard
                        </button>

                        {data.status === "COMPLETE" && (
                            <button
                                onClick={() => navigate("/transactions")}
                                className="w-full border-2 border-emerald-200 hover:border-emerald-300 text-emerald-600 
                                font-semibold py-3 px-6 rounded-xl transition-all duration-300 bg-white hover:bg-emerald-50
                                flex items-center justify-center gap-3"
                            >
                                <FaReceipt className="text-lg" />
                                View Transaction History
                            </button>
                        )}
                    </div>

                    {/* Security Footer */}
                    <div className="pt-6 border-t border-emerald-100 w-full">
                        <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                            <FaShieldHeart className="text-emerald-500" />
                            <span>Secured by eSewa • PCI DSS Compliant</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaySuccess;
