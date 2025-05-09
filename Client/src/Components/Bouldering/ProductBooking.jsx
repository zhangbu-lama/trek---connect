import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../Store/useProductstore";
import { v4 as uuidv4 } from "uuid";
import { X } from "lucide-react";
import Down from "../HomePage/Down";

export default function ProductBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addBooking } = useProductStore();
  const product = products.find((p) => p.id === id);

  const [form, setForm] = useState({
    userName: "",
    contact: "",
    startDate: "",
    endDate: "",
  });
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    if (!product) {
      navigate("/bouldering");
    }
  }, [product, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      id: uuidv4(),
      productId: id,
      productTitle: product?.title || "Unknown Product",
      ...form,
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    setToast({ show: true, message: `Booking confirmed for ${product.title}!` });
    setTimeout(() => {
      setToast({ show: false, message: "" });
      navigate("/bouldering");
    }, 2000); // Show toast for 2 seconds before redirecting
  };

  const closeToast = () => {
    setToast({ show: false, message: "" });
  };

  if (!product) return null;

  return (
    <>
    <div className="min-h-screen bg-gray-50 p-8 relative">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-teal-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center justify-between max-w-sm">
            <span>{toast.message}</span>
            <button onClick={closeToast} className="ml-4 hover:text-teal-200">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-teal-800 mb-6">
          Book: {product.title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              placeholder="e.g. John Doe"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              placeholder="e.g. +91 123 456 7890"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>

    </>
  );
}