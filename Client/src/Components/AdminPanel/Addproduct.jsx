import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Edit, Trash2, Plus, X, Save, AlertCircle, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import useProductStore from '../Store/useProductstore';
import Layout from './Layout';

// API Configuration (Assuming similar to TrekAdminPanel)
const BASE_URL = 'http://127.0.0.1:8000';

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
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      title: '',
      name: '',
      price: '',
      description: '',
      duration: 24,
      image: null,
    },
  });

  // Sync form with editing product
  useEffect(() => {
    if (editingId) {
      const product = products.find((p) => p.id === editingId);
      if (product) {
        setValue('title', product.title || '');
        setValue('name', product.name || '');
        setValue('price', product.price || '');
        setValue('description', product.description || '');
        setValue('duration', product.duration || 24);
        setValue('image', null);
        setImagePreview(product.imageUrl ? `${BASE_URL}${product.imageUrl}` : '');
      }
    } else {
      reset();
      setImagePreview('');
    }
  }, [editingId, products, setValue, reset]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setValue('image', file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('duration', data.duration);
    if (data.image) formData.append('image', data.image);

    const expiresAt = new Date(Date.now() + Number(data.duration) * 60 * 60 * 1000).toISOString();
    const product = {
      id: editingId || uuidv4(),
      title: data.title,
      name: data.name,
      price: data.price,
      description: data.description,
      duration: data.duration,
      imageUrl: data.image ? URL.createObjectURL(data.image) : (editingId ? products.find((p) => p.id === editingId)?.imageUrl : ''),
      expiresAt,
    };

    if (editingId) {
      updateProduct(editingId, product);
    } else {
      addProduct(product);
    }

    setIsModalOpen(false);
    reset();
    setEditingId(null);
    setImagePreview('');
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowCancelConfirm(true);
    } else {
      setIsModalOpen(false);
      reset();
      setEditingId(null);
      setImagePreview('');
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

            <h1 className="text-4xl font-extrabold text-gray-400 tracking-tight">
            Product Management Dashboard
              </h1>
            </div>
            <button
              onClick={() => {
                reset();
                setEditingId(null);
                setImagePreview('');
                setIsModalOpen(true);
              }}
              className="bg-white text-emerald-600 font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 shadow-md"
            >
              <Plus className="h-5 w-5 text-gray-400" />
              Add New Product
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
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Title</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Name</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Price (Rs.)</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Duration (hrs)</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Expires At</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <motion.tr
                    key={product.id}
                    variants={childVariants}
                    className="border-b border-gray-100 hover:bg-sky-50/50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 font-medium text-gray-800">{product.title}</td>
                    <td className="py-4 px-6 text-gray-600">{product.name}</td>
                    <td className="py-4 px-6 text-gray-600">{product.price}</td>
                    <td className="py-4 px-6 text-gray-600">{product.duration}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(product.expiresAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-6 flex gap-3">
                      <button
                        onClick={() => startEdit(product)}
                        className="text-sky-600 hover:text-sky-800 transition-colors duration-200"
                        title="Edit Product"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        title="Delete Product"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {products?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found. Add a new product to get started!</p>
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
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-sky-800 border-b border-gray-200 pb-2">Product Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Title <span className="text-red-500">*</span>
                        <span className="ml-2 text-gray-400" title="Enter the title of the product">
                          <AlertCircle className="h-4 w-4 inline" />
                        </span>
                      </label>
                      <input
                        {...register('title', { required: 'Product title is required' })}
                        className={`w-full p-3 border rounded-lg shadow-sm ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
                        placeholder="e.g., Premium Widget"
                      />
                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('name', { required: 'Product name is required' })}
                        className={`w-full p-3 border rounded-lg shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
                        placeholder="e.g., Widget Pro"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (Rs.) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        {...register('price', {
                          required: 'Price is required',
                          min: { value: 0, message: 'Price must be positive' },
                        })}
                        className={`w-full p-3 border rounded-lg shadow-sm ${errors.price ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
                        placeholder="e.g., 999"
                      />
                      {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (hrs) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        {...register('duration', {
                          required: 'Duration is required',
                          min: { value: 1, message: 'Duration must be at least 1 hour' },
                        })}
                        className={`w-full p-3 border rounded-lg shadow-sm ${errors.duration ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
                        placeholder="e.g., 24"
                      />
                      {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      className={`w-full p-3 border rounded-lg shadow-sm ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
                      rows="4"
                      placeholder="Enter product description..."
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                  </div>
                </div>

                {/* Image */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-sky-800 border-b border-gray-200 pb-2">Product Image</h3>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Image <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full p-3 border rounded-lg shadow-sm border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all duration-200"
                        />
                      </div>
                    </div>
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Product Image Preview"
                          className="h-20 w-20 object-cover rounded-lg shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('');
                            setValue('image', null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

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
                    className="px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-all duration-200 disabled:bg-emerald-300 disabled:cursor-not-allowed"
                  >
                    <Save className="h-5 w-5" />
                    {editingId ? 'Update Product' : 'Add Product'}
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
                          setImagePreview('');
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