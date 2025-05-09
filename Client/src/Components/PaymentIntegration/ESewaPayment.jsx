import React from "react";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

const ESewaPayment = () => {
    const [formData, setFormData] = React.useState({
        amount: 10,
        tax_amount: 0,
        total_amount: 10,
        transaction_uuid: uuidv4(),
        product_code: "EPAYTEST",
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: "http://localhost:5173/success",
        failure_url: "http://localhost:5173/failed",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: "",
        secret: "8gBm/:&EnhH.1/q",
    });

    const generateSignature = (
        total_amount,
        transaction_uuid,
        product_code,
        secret,
    ) => {
        const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
        const hash = CryptoJS.HmacSHA256(hashString, secret);
        return CryptoJS.enc.Base64.stringify(hash);
    };

    React.useEffect(() => {
        const { amount, transaction_uuid, product_code, secret } = formData;
        const signature = generateSignature(
            amount,
            transaction_uuid,
            product_code,
            secret,
        );
        setFormData((prev) => ({ ...prev, signature }));
    }, [formData.amount]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
            <div className="w-[450px] mx-auto bg-white rounded-xl shadow-2xl overflow-hidden ">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                    <h1 className="text-2xl font-bold text-white text-center">
                        <img
                            src="/esewa.png"
                            alt="eSewa Logo"
                            className="h-12 mx-auto"
                        />
                    </h1>
                    <p className="text-center text-blue-100 mt-2">
                        Secure Online Payment Gateway

                        For your booking pay 20000 NPR
                    </p>
                </div>

                {/* Payment Form */}
                <form
                    action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                    method="POST"
                    className="p-8 space-y-6"
                >
                    {/* Amount Input */}
                    <div>
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Payment Amount (NPR)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        amount: e.target.value,
                                        total_amount: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter amount"
                                min="1"
                                required
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                NPR
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Enter the amount you want to pay
                        </p>
                    </div>

                    {/* Hidden Fields */}
                    {Object.entries(formData).map(([name, value]) => {
                        if (name === "amount") return null;
                        return (
                            <input
                                key={name}
                                type="hidden"
                                id={name}
                                name={name}
                                value={value}
                                required
                            />
                        );
                    })}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                        Proceed to Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ESewaPayment;
