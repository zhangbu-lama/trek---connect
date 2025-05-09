import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Loader2 } from 'lucide-react';
import useProductStore from '../Store/useProductstore';
import Layout from './Layout';

// Animation Variants (Copied from TrekAdminPanel)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0.5 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const AdminPanel = () => {
  const { bookings, deleteBooking } = useProductStore();

  // Placeholder for dynamic data fetching (e.g., with React Query)
  const isLoading = false; // Set to true if fetching data
  const error = null; // Set to error object if fetch fails

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      deleteBooking(id);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-emerald-50 font-sans">
        {/* Header */}
        <motion.header
          className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-500 py-8 px-6 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-white hover:text-emerald-200 transition-colors duration-200"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-4xl font-extrabold text-gray-400 tracking-tight">
                Booking Management Dashboard
              </h1>
            </div>
            {/* Optional: Add button for creating new bookings */}
            {/*
            <button
              onClick={() => {/* Open add booking modal * /}}
              className="bg-white text-emerald-600 font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 shadow-md"
            >
              <Plus className="h-5 w-5" />
              Add New Booking
            </button>
            */}
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {isLoading && (
            <div className="text-center py-16">
              <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mx-auto" />
              <p className="text-lg font-medium text-gray-600 mt-4">Loading bookings...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-16 bg-red-50 rounded-lg p-6">
              <p className="text-lg font-semibold text-red-600">Error: {error.message}</p>
            </div>
          )}
          {!isLoading && !error && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-sky-100 to-emerald-50 text-sky-800">
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Product Title</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Booked By</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Contact</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Start Date</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">End Date</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Booked On</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      variants={childVariants}
                      className="border-b border-gray-100 hover:bg-sky-50/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6 font-medium text-gray-800">{booking.productTitle}</td>
                      <td className="py-4 px-6 text-gray-600">{booking.userName}</td>
                      <td className="py-4 px-6 text-gray-600">{booking.contact}</td>
                      <td className="py-4 px-6 text-gray-600">{new Date(booking.startDate).toLocaleDateString()}</td>
                      <td className="py-4 px-6 text-gray-600">{new Date(booking.endDate).toLocaleDateString()}</td>
                      <td className="py-4 px-6 text-gray-600">{new Date(booking.createdAt).toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          title="Cancel Booking"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No bookings available at the moment.</p>
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default AdminPanel;