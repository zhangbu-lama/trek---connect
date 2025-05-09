import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-900 bg-opacity-90 p-10 rounded-2xl shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white font-archivo tracking-wide">
            Join the Adventure
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Create an account to start exploring
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <InputField id="name" label="Full Name" type="text" placeholder="Enter your full name" />
            <InputField id="email" label="Email address" type="email" placeholder="Enter your email" />
            <InputField id="password" label="Password" type="password" placeholder="Enter your password" />
            <InputField id="confirm-password" label="Confirm Password" type="password" placeholder="Confirm your password" />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/admin/login" className="text-indigo-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-600" />
          <p className="text-sm text-gray-400">or continue with</p>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4 justify-center mt-2">
          <SocialButton provider="Google" />
          <SocialButton provider="GitHub" />
        </div>
      </div>
    </div>
  );
}

const InputField = ({ id, label, type, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required
      placeholder={placeholder}
      className="mt-1 block w-full rounded-md px-3 py-2 bg-slate-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);

const SocialButton = ({ provider }) => {
  const logos = {
    Google: 'https://www.svgrepo.com/show/475656/google-color.svg',
    GitHub: 'https://www.svgrepo.com/show/512317/github-142.svg'
  };
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 border border-gray-600 hover:bg-slate-700 transition text-white text-sm font-medium">
      <img src={logos[provider]} alt={provider} className="h-5 w-5" />
      {provider}
    </button>
  );
};

export default RegisterPage;
