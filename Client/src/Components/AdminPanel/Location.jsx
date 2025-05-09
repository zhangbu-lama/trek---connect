import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Edit, Trash2, Plus, X, Save, AlertCircle } from 'lucide-react';
import useLocationStore from '../Store/useLocationStore';
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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const AdminPanel = () => {
  const { locations, setNewLocation, updateLocation, deleteLocation } = useLocationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      name: '',
      lat: '',
      lng: '',
      // image: null, // Uncomment if image upload is needed
    },
  });

  // Sync form with editing location
  useEffect(() => {
    if (editingId) {
      const location = locations.find((loc) => loc.id === editingId);
      if (location) {
        setValue('name', location.name || '');
        setValue('lat', location.lat || '');
        setValue('lng', location.lng || '');
        // setValue('image', null); // Uncomment if image upload is needed
      }
    } else {
      reset();
    }
  }, [editingId, locations, setValue, reset]);

  const onSubmit = (data) => {
    const locationData = {
      id: editingId || Date.now(),
      name: data.name,
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lng),
      markerType: 'stone',
      // icon: data.image ? URL.createObjectURL(data.image) : null, // Uncomment if image upload is needed
    };

    if (editingId) {
      updateLocation(editingId, locationData);
    } else {
      setNewLocation(locationData);
    }

    setIsModalOpen(false);
    reset();
    setEditingId(null);
  };

  const handleEdit = (location) => {
    setEditingId(location.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      deleteLocation(id);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowCancelConfirm(true);
    } else {
      setIsModalOpen(false);
      reset();
      setEditingId(null);
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

              <h1 className="text-4xl font-extrabold text-gray-500 tracking-tight">
                Stone Marker Management Dashboard
              </h1>
            </div>
            <button
              onClick={() => {
                reset();
                setEditingId(null);
                setIsModalOpen(true);
              }}
              className="bg-gray-300 text-emerald-600 font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 shadow-md"
            >
              <Plus className="h-5 w-5" />
              Add New Stone Marker
            </button>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-sky-100 to-emerald-50 text-sky-800">
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Name</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Latitude</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Longitude</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Marker Type</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations?.map((location) => (
                  <motion.tr
                    key={location.id}
                    variants={childVariants}
                    className="border-b border-gray-100 hover:bg-sky-50/50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 font-medium text-gray-800">{location.name}</td>
                    <td className="py-4 px-6 text-gray-600">{location.lat}</td>
                    <td className="py-4 px-6 text-gray-600">{location.lng}</td>
                    <td className="py-4 px-6 text-gray-600">{location.markerType}</td>
                    <td className="py-4 px-6 flex gap-3">
                      <button
                        onClick={() => handleEdit(location)}
                        className="text-sky-600 hover:text-sky-800 transition-colors duration-200"
                        title="Edit Location"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(location.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        title="Delete Location"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {locations?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No stone markers found. Add a new marker to get started!</p>
              </div>
            )}
          </motion.div>
        </main>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-sky-800 tracking-tight">
                  {editingId ? 'Edit Stone Marker' : 'Add New Stone Marker'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Location Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-sky-800 border-b border-gray-200 pb-2">Marker Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stone Name <span className="text-red-500">*</span>
                        <span className="ml-2 text-gray-400" title="Enter the name of the stone marker">
                          <AlertCircle className="h-4 w-4 inline" />
                        </span>
                      </label>
                      <input
                        {...register('name', { required: 'Stone name is required' })}
                        className={`w-full p-3 border rounded-lg shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
                        placeholder="e.g., Sacred Rock"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Latitude <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="any"
                        {...register('lat', {
                          required: 'Latitude is required',
                          validate: (value) => !isNaN(parseFloat(value)) || 'Latitude must be a valid number',
                        })}
                        className={`w-full p-3 border rounded-lg shadow-sm ${errors.lat ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
                        placeholder="e.g., 27.700"
                      />
                      {errors.lat && <p className="text-red-500 text-sm mt-1">{errors.lat.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Longitude <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="any"
                        {...register('lng', {
                          required: 'Longitude is required',
                          validate: (value) => !isNaN(parseFloat(value)) || 'Longitude must be a valid number',
                        })}
                        className={`w-full p-3 border rounded-lg shadow-sm ${errors.lng ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
                        placeholder="e.g., 85.300"
                      />
                      {errors.lng && <p className="text-red-500 text-sm mt-1">{errors.lng.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Optional Image Upload (Uncomment if needed) */}
                {/*
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-sky-800 border-b border-gray-200 pb-2">Marker Image</h3>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Marker Image (optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setValue('image', file);
                              // Add image preview state if needed
                            }
                          }}
                          className="w-full p-3 border rounded-lg shadow-sm border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                */}

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-all duration-200"
                  >
                    <Save className="h-5 w-5" />
                    {editingId ? 'Update Stone Marker' : 'Add Stone Marker'}
                  </button>
                </div>
              </form>

              {/* Cancel Confirmation Dialog */}
              {showCancelConfirm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
                  >
                    <h3 className="text-lg font-semibold text-sky-800">Confirm Cancel</h3>
                    <p className="text-gray-600 mt-2">Are you sure you want to cancel? All unsaved changes will be lost.</p>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={() => setShowCancelConfirm(false)}
                        className="px-4 py-2 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-200"
                      >
                        Stay
                      </button>
                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          reset();
                          setEditingId(null);
                          setShowCancelConfirm(false);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                      >
                        Confirm Cancel
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminPanel;