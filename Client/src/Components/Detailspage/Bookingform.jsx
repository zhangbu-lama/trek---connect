import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateBooking } from "../Hooks/useBooking";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    phone: "",
    start_date: "",
    travel_date: "",
    group_size: 1,
    destination: "",
    special_requirements: "",
  });

  const { mutate: addBooking, isLoading } = useCreateBooking();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      status: "Pending",
    };

    addBooking(bookingData, {
      onSuccess: () => {
        toast.success("Booking submitted successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email_address: "",
          phone: "",
          start_date: "",
          travel_date: "",
          group_size: 1,
          destination: "",
          special_requirements: "",
        });

        // Redirect to /esewapayment after short delay
        setTimeout(() => {
          navigate("/esewapayment");
        }, 1500);
      },
      onError: (error) => {
        toast.error(`Failed to submit booking: ${error.message}`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Book Your Trip</h2>
        <p className="text-center text-gray-500 mb-8">Fill in the details below to confirm your reservation.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="input-style"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="input-style"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              name="email_address"
              placeholder="Email"
              value={formData.email_address}
              onChange={handleChange}
              className="input-style"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-style"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="input-style"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Travel Date</label>
              <input
                type="date"
                name="travel_date"
                value={formData.travel_date}
                onChange={handleChange}
                className="input-style"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="group_size"
              placeholder="Group Size"
              value={formData.group_size}
              onChange={handleChange}
              className="input-style"
              min="1"
              required
            />
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={formData.destination}
              onChange={handleChange}
              className="input-style"
              required
            />
          </div>

          <textarea
            name="special_requirements"
            rows="4"
            placeholder="Any special requirements?"
            value={formData.special_requirements}
            onChange={handleChange}
            className="input-style w-full"
          />

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-2 rounded-md shadow-md transition"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Booking"}
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default BookingForm;
