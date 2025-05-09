import React from 'react';
import Footer from '../HomePage/Footer';
import Navbar from '../HomePage/Navbar';
import { Link } from 'react-router-dom';

function UserRegisterPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 font-archivo tracking-wide">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us and start your journey today
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <InputField id="name" label="Full Name" type="text" placeholder="Enter your name" />
              <InputField id="email" label="Email Address" type="email" placeholder="Enter your email" />
              <InputField id="password" label="Password" type="password" placeholder="Create a password" />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition"
              >
                Register
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex-1 h-px bg-gray-300" />
            <p className="text-sm text-gray-500">or register with</p>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4 justify-center mt-2">
            <SocialButton provider="Google" />
            <SocialButton provider="GitHub" />
          </div>

          {/* Link to Login */}
          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/userlogin" className="text-blue-600 hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Reuse same components
const InputField = ({ id, label, type, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required
      placeholder={placeholder}
      className="mt-1 block w-full rounded-md px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>
);

const SocialButton = ({ provider }) => {
  const logos = {
    Google: 'https://www.svgrepo.com/show/475656/google-color.svg',
    GitHub: 'https://www.svgrepo.com/show/512317/github-142.svg',
  };
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition text-gray-900 text-sm font-medium">
      <img src={logos[provider]} alt={provider} className="h-5 w-5" />
      {provider}
    </button>
  );
};

export default UserRegisterPage;
