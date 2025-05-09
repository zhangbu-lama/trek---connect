import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Layout from './Layout';
import { useGetAllBookings } from '../Hooks/useBooking'; // ✅ Import hook

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

const Placebooking = () => {
  const { data, isLoading, error } = useGetAllBookings(); // ✅ Fetch API data

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-emerald-50 font-sans">
        <motion.header
          className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-500 py-8 px-6 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-gray-400 tracking-tight">
              Booking Records Dashboard
            </h1>
          </div>
        </motion.header>

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
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Customer</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Destination</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Email</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Seats</th>
                    <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((booking) => (
                    <motion.tr
                      key={booking._id}
                      variants={childVariants}
                      className="border-b border-gray-100 hover:bg-sky-50/50 transition-colors duration-150"
                    >
                      <td className="py-4 px-6 font-medium text-gray-800">
                        {booking.first_name} {booking.last_name}
                      </td>
                      <td className="py-4 px-6 text-gray-600">{booking.destination}</td>
                      <td className="py-4 px-6 text-gray-600">{booking.email}</td>
                      <td className="py-4 px-6 text-gray-600">{booking.travel_date}</td>
                      <td className="py-4 px-6 text-gray-600">{booking.group_size}</td>
                      <td className="py-4 px-6 text-gray-600">
                        <span className="px-3 py-1 rounded-full text-sm bg-green-200 text-green-800">
                        Success
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {data?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No bookings found.</p>
                </div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Placebooking;
