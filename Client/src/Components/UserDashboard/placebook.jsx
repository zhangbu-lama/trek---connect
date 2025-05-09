import React, { useEffect, useState } from 'react';
import Sidebar from './UserSidebar';
import useBookingStore from '../Store/bookingStore';
import useAuthStore from '../Store/AuthStore';

function Placebook() {
  const { user } = useAuthStore();
  const { userBookings, fetchUserBookings } = useBookingStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      setIsLoading(true);
      fetchUserBookings(user._id).finally(() => setIsLoading(false));
    }
  }, [user, fetchUserBookings]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 md:ml-64 transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Bookings</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="border rounded-xl p-6 bg-white shadow-sm animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : userBookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No bookings found.</p>
            <p className="text-gray-400 mt-2">
              Start your journey by booking a trip today!
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBookings.map((booking) => (
              <li
                key={booking._id}
                className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-gray-800">
                    {booking.first_name} {booking.last_name}
                  </p>
                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Email:</strong> {booking.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {booking.phone}
                    </p>
                    <p>
                      <strong>Destination:</strong> {booking.destination}
                    </p>
                    <p>
                      <strong>Group Size:</strong> {booking.group_size}
                    </p>
                    <p>
                      <strong>Start Date:</strong>{' '}
                      {new Date(booking.start_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Travel Date:</strong>{' '}
                      {new Date(booking.travel_date).toLocaleDateString()}
                    </p>
                    {booking.special_requirements && (
                      <p>
                        <strong>Special Requirements:</strong>{' '}
                        {booking.special_requirements}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Placebook;