// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { ArrowLeft, Edit, Trash2, Plus, X, Save, AlertCircle, Loader2 } from "lucide-react";
// import Layout from "./Layout";

// // API Configuration
// const BASE_URL = "http://127.0.0.1:8000";

// // API Functions
// const fetchTreks = async () => {
//   const response = await axios.get(`${BASE_URL}/api/details/`);
//   return response.data;
// };

// const createTrek = async (trekData) => {
//   const formData = new FormData();
//   Object.entries(trekData).forEach(([key, value]) => {
//     if (key === "image1" || key === "image2" || key === "image3" || key === "image4") {
//       if (value) formData.append(key, value);
//     } else if (Array.isArray(value)) {
//       formData.append(key, JSON.stringify(value));
//     } else if (value) {
//       formData.append(key, value);
//     }
//   });
//   const response = await axios.post(`${BASE_URL}/api/details/`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

// const updateTrek = async ({ id, trekData }) => {
//   const formData = new FormData();
//   Object.entries(trekData).forEach(([key, value]) => {
//     if (key === "image1" || key === "image2" || key === "image3" || key === "image4") {
//       if (value) formData.append(key, value);
//     } else if (Array.isArray(value)) {
//       formData.append(key, JSON.stringify(value));
//     } else if (value) {
//       formData.append(key, value);
//     }
//   });
//   const response = await axios.put(`${BASE_URL}/api/details/${id}/`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

// const deleteTrek = async (id) => {
//   await axios.delete(`${BASE_URL}/api/details/${id}/`);
// };

// // Animation Variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1, duration: 0.5 },
//   },
// };

// const childVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
// };

// const modalVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
//   exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
// };

// const AdminPanel = () => {
//   const queryClient = useQueryClient();
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editTrek, setEditTrek] = useState(null);
//   const [imagePreviews, setImagePreviews] = useState({ image1: "", image2: "", image3: "", image4: "" });
//   const [showCancelConfirm, setShowCancelConfirm] = useState(false);

//   const { register, handleSubmit, reset, setValue, formState: { errors, isDirty } } = useForm({
//     defaultValues: {
//       name: "",
//       difficulty: "",
//       duration: "",
//       overview: "",
//       longDescription: "",
//       max_elevation: "",
//       best_season: "",
//       rating: "",
//       reviews: "",
//       contact_number: "",
//       contact_email: "",
//       price: "",
//       distance: "",
//       accommodation: "",
//       startPoint: "",
//       endPoint: "",
//       highlights: "",
//       image1: null,
//       image2: null,
//       image3: null,
//       image4: null,
//     },
//   });

//   // Fetch Treks
//   const { data: treks, isLoading, error } = useQuery({
//     queryKey: ["treks"],
//     queryFn: fetchTreks,
//   });

//   // Mutations
//   const createMutation = useMutation({
//     mutationFn: createTrek,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["treks"]);
//       setIsAddModalOpen(false);
//       reset();
//       setImagePreviews({ image1: "", image2: "", image3: "", image4: "" });
//     },
//     onError: (error) => alert(`Failed to add trek: ${error.message}`),
//   });

//   const updateMutation = useMutation({
//     mutationFn: updateTrek,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["treks"]);
//       setIsEditModalOpen(false);
//       reset();
//       setImagePreviews({ image1: "", image2: "", image3: "", image4: "" });
//     },
//     onError: (error) => alert(`Failed to update trek: ${error.message}`),
//   });

//   const deleteMutation = useMutation({
//     mutationFn: deleteTrek,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["treks"]);
//     },
//     onError: (error) => alert(`Failed to delete trek: ${error.message}`),
//   });

//   const handleImageUpload = (e, fieldName) => {
//     const file = e.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImagePreviews((prev) => ({ ...prev, [fieldName]: url }));
//       setValue(fieldName, file);
//     }
//   };

//   const onSubmit = (data) => {
//     const trekData = {
//       name: data.name,
//       difficulty: data.difficulty,
//       duration: data.duration,
//       overview: data.overview,
//       longDescription: data.longDescription,
//       max_elevation: data.max_elevation,
//       best_season: data.best_season,
//       rating: Number(data.rating) || 0,
//       reviews: Number(data.reviews) || 0,
//       contact_number: data.contact_number,
//       contact_email: data.contact_email,
//       price: Number(data.price) || 0,
//       distance: data.distance,
//       accommodation: data.accommodation,
//       startPoint: data.startPoint,
//       endPoint: data.endPoint,
//       highlights: data.highlights.split(",").map((h) => h.trim()).filter(Boolean),
//       image1: data.image1,
//       image2: data.image2,
//       image3: data.image3,
//       image4: data.image4,
//     };

//     if (editTrek) {
//       updateMutation.mutate({ id: editTrek.id, trekData });
//     } else {
//       createMutation.mutate(trekData);
//     }
//   };

//   const openEditModal = (trek) => {
//     setEditTrek(trek);
//     reset({
//       name: trek.name,
//       difficulty: trek.difficulty,
//       duration: trek.duration,
//       overview: trek.overview,
//       longDescription: trek.longDescription || "",
//       max_elevation: trek.max_elevation,
//       best_season: trek.best_season,
//       rating: trek.rating.toString(),
//       reviews: trek.reviews.toString(),
//       contact_number: trek.contact_number,
//       contact_email: trek.contact_email,
//       price: trek.price?.toString() || "",
//       distance: trek.distance || "",
//       accommodation: trek.accommodation || "",
//       startPoint: trek.startPoint || "",
//       endPoint: trek.endPoint || "",
//       highlights: trek.highlights?.join(", ") || "",
//       image1: null,
//       image2: null,
//       image3: null,
//       image4: null,
//     });
//     setImagePreviews({
//       image1: trek.image1 ? `${BASE_URL}${trek.image1}` : "",
//       image2: trek.image2 ? `${BASE_URL}${trek.image2}` : "",
//       image3: trek.image3 ? `${BASE_URL}${trek.image3}` : "",
//       image4: trek.image4 ? `${BASE_URL}${trek.image4}` : "",
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this trek?")) {
//       deleteMutation.mutate(id);
//     }
//   };

//   const handleCancel = () => {
//     if (isDirty) {
//       setShowCancelConfirm(true);
//     } else {
//       setIsAddModalOpen(false);
//       setIsEditModalOpen(false);
//       reset();
//     }
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gradient-to-br from-sky-50 via-sky-100 to-emerald-50 font-sans">
//         {/* Header */}
//         <motion.header
//           className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-500 py-8 px-6 shadow-lg"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <div className="max-w-7xl mx-auto flex justify-between items-center">
//             <div className="flex items-center gap-6">
//               <Link
//                 to="/places"
//                 className="flex items-center gap-2 text-white hover:text-emerald-200 transition-colors duration-200"
//               >
//                 <ArrowLeft className="h-6 w-6" />
//                 <span className="text-lg font-medium">Back to Treks</span>
//               </Link>
//               <h1 className="text-4xl font-extrabold text-white tracking-tight">
//                 Trek Management Dashboard
//               </h1>
//             </div>
//             <button
//               onClick={() => {
//                 reset();
//                 setImagePreviews({ image1: "", image2: "", image3: "", image4: "" });
//                 setIsAddModalOpen(true);
//               }}
//               className="bg-white text-emerald-600 font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 shadow-md"
//             >
//               <Plus className="h-5 w-5" />
//               Add New Trek
//             </button>
//           </div>
//         </motion.header>

//         {/* Main Content */}
//         <main className="max-w-7xl mx-auto px-6 py-12">
//           {isLoading && (
//             <div className="text-center py-16">
//               <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mx-auto" />
//               <p className="text-lg font-medium text-gray-600 mt-4">Loading treks...</p>
//             </div>
//           )}
//           {error && (
//             <div className="text-center py-16 bg-red-50 rounded-lg p-6">
//               <p className="text-lg font-semibold text-red-600">Error: {error.message}</p>
//             </div>
//           )}
//           {!isLoading && !error && (
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
//             >
//               <table className="w-full table-auto">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-sky-100 to-emerald-50 text-sky-800">
//                     <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Name</th>
//                     <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Difficulty</th>
//                     <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Duration</th>
//                     <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Price ($)</th>
//                     <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Rating</th>
//                     <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {treks?.map((trek) => (
//                     <motion.tr
//                       key={trek.id}
//                       variants={childVariants}
//                       className="border-b border-gray-100 hover:bg-sky-50/50 transition-colors duration-150"
//                     >
//                       <td className="py-4 px-6 font-medium text-gray-800">{trek.name}</td>
//                       <td className="py-4 px-6 text-gray-600">{trek.difficulty}</td>
//                       <td className="py-4 px-6 text-gray-600">{trek.duration}</td>
//                       <td className="py-4 px-6 text-gray-600">{trek.price || "N/A"}</td>
//                       <td className="py-4 px-6 text-gray-600">
//                         {trek.rating} <span className="text-gray-500">({trek.reviews})</span>
//                       </td>
//                       <td className="py-4 px-6 flex gap-3">
//                         <button
//                           onClick={() => openEditModal(trek)}
//                           className="text-sky-600 hover:text-sky-800 transition-colors duration-200"
//                           title="Edit Trek"
//                         >
//                           <Edit className="h-5 w-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(trek.id)}
//                           className="text-red-500 hover:text-red-700 transition-colors duration-200"
//                           title="Delete Trek"
//                         >
//                           <Trash2 className="h-5 w-5" />
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//               {treks?.length === 0 && (
//                 <div className="text-center py-12">
//                   <p className="text-gray-500 text-lg">No treks found. Add a new trek to get started!</p>
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </main>

//         {/* Add/Edit Modal */}
//         {(isAddModalOpen || isEditModalOpen) && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
//             <motion.div
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//             >
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-3xl font-bold text-sky-800 tracking-tight">
//                   {isEditModalOpen ? "Edit Trek" : "Add New Trek"}
//                 </h2>
//                 <button
//                   onClick={handleCancel}
//                   className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
//                 >
//                   <X className="h-7 w-7" />
//                 </button>
//               </div>
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
//                 {/* Basic Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-2xl font-semibold text-sky-800 border-b border-gray-200 pb-2">Basic Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Trek Name <span className="text-red-500">*</span>
//                         <span className="ml-2 text-gray-400" title="Enter the full name of the trek">
//                           <AlertCircle className="h-4 w-4 inline" />
//                         </span>
//                       </label>
//                       <input
//                         {...register("name", { required: "Trek name is required" })}
//                         className={`w-full p-3 border rounded-lg shadow-sm ${errors.name ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
//                         placeholder="e.g., Annapurna Circuit"
//                       />
//                       {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Price ($) <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be positive" } })}
//                         className={`w-full p-3 border rounded-lg shadow-sm ${errors.price ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
//                         placeholder="e.g., 1200"
//                       />
//                       {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Difficulty <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         {...register("difficulty", { required: "Difficulty is required" })}
//                         className={`w-full p-3 border rounded-lg shadow-sm ${errors.difficulty ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
//                         placeholder="e.g., Moderate"
//                       />
//                       {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Duration <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         {...register("duration", { required: "Duration is required" })}
//                         className={`w-full p-3 border rounded-lg shadow-sm ${errors.duration ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
//                         placeholder="e.g., 12-18 days"
//                       />
//                       {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Short Description (Overview) <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       {...register("overview", { required: "Overview is required" })}
//                       className={`w-full p-3 border rounded-lg shadow-sm ${errors.overview ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
//                       rows="4"
//                       placeholder="Briefly describe the trek..."
//                     />
//                     {errors.overview && <p className="text-red-500 text-sm mt-1">{errors.overview.message}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Detailed Description
//                     </label>
//                     <textarea
//                       {...register("longDescription")}
//                       className="w-full p-3 border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200"
//                       rows="6"
//                       placeholder="Provide a detailed description of the trek..."
//                     />
//                   </div>
//                 </div>

//                 {/* Images */}
//                 <div className="space-y-6">
//                   <h3 className="text-2xl font-semibold text-sky-800 border-b border-gray-200 pb-2">Images</h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     {["image1", "image2", "image3", "image4"].map((field, index) => (
//                       <div key={field} className="flex items-start gap-4">
//                         <div className="flex-1">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Image {index + 1} {index === 0 && <span className="text-red-500">*</span>}
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="file"
//                               accept="image/*"
//                               onChange={(e) => handleImageUpload(e, field)}
//                               className="w-full p-3 border rounded-lg shadow-sm border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all duration-200"
//                             />
//                           </div>
//                         </div>
//                         {imagePreviews[field] && (
//                           <div className="relative">
//                             <img
//                               src={imagePreviews[field]}
//                               alt={`Image ${index + 1} Preview`}
//                               className="h-20 w-20 object-cover rounded-lg shadow-sm"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setImagePreviews((prev) => ({ ...prev, [field]: "" }));
//                                 setValue(field, null);
//                               }}
//                               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
//                             >
//                               <X className="h-3 w-3" />
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Trek Details */}
//                 <div className="space-y-6">
//                   <h3 className="text-2xl font-semibold text-sky-800 border-b border-gray-200 pb-2">Trek Details</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {[
//                       { id: "max_elevation", label: "Max Elevation", required: true, placeholder: "e.g., 5,416m" },
//                       { id: "best_season", label: "Best Season", required: true, placeholder: "e.g., Oct-Nov" },
//                       { id: "distance", label: "Distance", placeholder: "e.g., 160-230 km" },
//                       { id: "accommodation", label: "Accommodation", placeholder: "e.g., Teahouses" },
//                       { id: "startPoint", label: "Start Point", placeholder: "e.g., Besisahar" },
//                       { id: "endPoint", label: "End Point", placeholder: "e.g., Nayapul" },
//                       { id: "contact_number", label: "Contact Number", required: true, placeholder: "e.g., +1234567890" },
//                       { id: "contact_email", label: "Contact Email", required: true, placeholder: "e.g., info@trek.com" },
//                     ].map(({ id, label, required, placeholder }) => (
//                       <div key={id}>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           {label} {required && <span className="text-red-500">*</span>}
//                         </label>
//                         <input
//                           {...register(id, { required: required ? `${label} is required` : false })}
//                           className={`w-full p-3 border rounded-lg shadow-sm ${errors[id] ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
//                           placeholder={placeholder}
//                         />
//                         {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
//                       </div>
//                     ))}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Highlights (comma-separated)
//                     </label>
//                     <input
//                       {...register("highlights")}
//                       className="w-full p-3 border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200"
//                       placeholder="e.g., Thorong La Pass, Poon Hill"
//                     />
//                   </div>
//                 </div>

//                 {/* Rating and Reviews */}
//                 <div className="space-y-6">
//                   <h3 className="text-2xl font-semibold text-sky-800 border-b border-gray-200 pb-2">Rating & Reviews</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Rating (0-5)
//                       </label>
//                       <input
//                         type="number"
//                         {...register("rating", { min: { value: 0, message: "Rating must be 0-5" }, max: { value: 5, message: "Rating must be 0-5" } })}
//                         className={`w-full p-3 border rounded-lg shadow-sm ${errors.rating ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
//                         min="0"
//                         max="5"
//                         placeholder="e.g., 4.8"
//                         step="0.1"
//                       />
//                       {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Number of Reviews
//                       </label>
//                       <input
//                         type="number"
//                         {...register("reviews", { min: { value: 0, message: "Reviews must be positive" } })}
//                         className={`w-full p-3 border rounded-lg shadow-sm ${errors.reviews ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition-all duration-200`}
//                         placeholder="e.g., 124"
//                       />
//                       {errors.reviews && <p className="text-red-500 text-sm mt-1">{errors.reviews.message}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-all duration-200 disabled:bg-emerald-300 disabled:cursor-not-allowed"
//                     disabled={createMutation.isLoading || updateMutation.isLoading}
//                   >
//                     {createMutation.isLoading || updateMutation.isLoading ? (
//                       <Loader2 className="h-5 w-5 animate-spin" />
//                     ) : (
//                       <Save className="h-5 w-5" />
//                     )}
//                     {isEditModalOpen ? "Update Trek" : "Add Trek"}
//                   </button>
//                 </div>
//               </form>

//               {/* Cancel Confirmation Dialog */}
//               {showCancelConfirm && (
//                 <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
//                   >
//                     <h3 className="text-lg font-semibold text-sky-800">Confirm Cancel</h3>
//                     <p className="text-gray-600 mt-2">Are you sure you want to cancel? All unsaved changes will be lost.</p>
//                     <div className="flex justify-end gap-4 mt-6">
//                       <button
//                         onClick={() => setShowCancelConfirm(false)}
//                         className="px-4 py-2 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-200"
//                       >
//                         Stay
//                       </button>
//                       <button
//                         onClick={() => {
//                           setIsAddModalOpen(false);
//                           setIsEditModalOpen(false);
//                           reset();
//                           setShowCancelConfirm(false);
//                         }}
//                         className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
//                       >
//                         Confirm Cancel
//                       </button>
//                     </div>
//                   </motion.div>
//                 </div>
//               )}
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default AdminPanel;