import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
    Plus,
    X,
    Save,
    AlertCircle,
    CheckCircle,
    Edit,
    Trash2,
    Loader2,
    RefreshCw,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/Index";
import { fetchPlaces } from "../api/Place";
import Layout from "./Layout";
import { baseAPIurl } from "../../constant";

// API Functions for Treks
const fetchTreks = async () => {
    const response = await axiosInstance.get("/treks/all");
    return response.data.data;
};

const updateTrek = async ({ _id, data }) => {
    const response = await axiosInstance.put(`/treks/update/${_id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
};

const deleteTrek = async (_id) => {
    const response = await axiosInstance.delete(`/treks/delete/${_id}`);
    return response.data.data;
};

// Animation Variants
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

const toastVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const ManageTreks = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });
    const [selectedTrek, setSelectedTrek] = useState(null);

    console.log(selectedTrek);

    const {
        data: treks,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["treks"],
        queryFn: fetchTreks,
    });

    const { data: places, isLoading: placesLoading } = useQuery({
        queryKey: ["places"],
        queryFn: fetchPlaces,
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
            name: "",
            difficulty: "",
            place: "",
            duration: "",
            overview: "",
            max_elevation: "",
            best_season: "",
            contact_number: "",
            contact_email: "",
            rating: "",
            reviews: "",
            images: null,
        },
    });

    // Mutations
    const addTrekMutation = useMutation({
        mutationFn: (formData) =>
            axiosInstance.post("/treks/add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["treks"] });
            setToast({
                show: true,
                message: "Trek added successfully!",
                type: "success",
            });
            setTimeout(
                () => setToast({ show: false, message: "", type: "success" }),
                3000,
            );
        },
        onError: (error) => {
            setToast({
                show: true,
                message: `Failed to add trek: ${error.message}`,
                type: "error",
            });
            setTimeout(
                () => setToast({ show: false, message: "", type: "error" }),
                5000,
            );
        },
    });

    const updateTrekMutation = useMutation({
        mutationFn: updateTrek,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["treks"] });
            setToast({
                show: true,
                message: "Trek updated successfully!",
                type: "success",
            });
            setTimeout(
                () => setToast({ show: false, message: "", type: "success" }),
                3000,
            );
        },
        onError: (error) => {
            setToast({
                show: true,
                message: `Failed to update trek: ${error.message}`,
                type: "error",
            });
            setTimeout(
                () => setToast({ show: false, message: "", type: "error" }),
                5000,
            );
        },
    });

    const deleteTrekMutation = useMutation({
        mutationFn: deleteTrek,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["treks"] });
            setToast({
                show: true,
                message: "Trek deleted successfully!",
                type: "success",
            });
            setTimeout(
                () => setToast({ show: false, message: "", type: "success" }),
                3000,
            );
        },
        onError: (error) => {
            setToast({
                show: true,
                message: `Failed to delete trek: ${error.message}`,
                type: "error",
            });
            setTimeout(
                () => setToast({ show: false, message: "", type: "error" }),
                5000,
            );
        },
    });

    // Sync form with selectedTrek
    useEffect(() => {
        if (selectedTrek) {
            setValue("name", selectedTrek.name || "");
            setValue("difficulty", selectedTrek.difficulty || "");
            setValue("place", selectedTrek.place?._id || "");
            setValue("duration", selectedTrek.duration || "");
            setValue("overview", selectedTrek.overview || "");
            setValue("max_elevation", selectedTrek.max_elevation || "");
            setValue("best_season", selectedTrek.best_season || "");
            setValue("contact_number", selectedTrek.contact_number || "");
            setValue("contact_email", selectedTrek.contact_email || "");
            setValue("rating", selectedTrek.rating || "");
            setValue("reviews", selectedTrek.reviews || "");
            setValue("images", null);
            setImagePreviews(
                selectedTrek.images?.map(
                    (img) => `${baseAPIurl}/Uploads/${img}`,
                ) || [],
            );
            setIsModalOpen(true);
        } else {
            reset();
            setImagePreviews([]);
        }
    }, [selectedTrek, setValue, reset]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + imagePreviews.length > 4) {
            setToast({
                show: true,
                message: "You can upload a maximum of 4 images",
                type: "error",
            });
            setTimeout(
                () => setToast({ show: false, message: "", type: "error" }),
                5000,
            );
            return;
        }
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
        setValue("images", files);
    };

    const removeImage = (index) => {
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        if (imagePreviews[index].startsWith("blob:")) {
            URL.revokeObjectURL(imagePreviews[index]);
        }
        setImagePreviews(newPreviews);
        const newFiles = imagePreviews
            .filter((_, i) => i !== index)
            .map(
                (_, i) => document.querySelector('input[type="file"]').files[i],
            )
            .filter((file) => file);
        setValue("images", newFiles.length > 0 ? newFiles : null);
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("difficulty", data.difficulty);
        formData.append("place", data.place);
        formData.append("duration", data.duration);
        formData.append("overview", data.overview);
        formData.append("max_elevation", data.max_elevation);
        formData.append("best_season", data.best_season);
        formData.append("contact_number", data.contact_number);
        formData.append("contact_email", data.contact_email);
        if (data.rating) formData.append("rating", parseFloat(data.rating));
        if (data.reviews) formData.append("reviews", parseInt(data.reviews));
        if (data.images) {
            data.images.forEach((file) => formData.append("images", file));
        }

        if (selectedTrek) {
            updateTrekMutation.mutate({
                _id: selectedTrek._id,
                data: formData
            });
        } else {
            addTrekMutation.mutate(formData);
        }

        setIsModalOpen(false);
        reset();
        setImagePreviews([]);
        setSelectedTrek(null);
    };

    const handleEdit = (trek) => {
        setSelectedTrek(trek);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this trek?")) {
            deleteTrekMutation.mutate(id);
        }
    };

    const handleCancel = () => {
        if (isDirty || imagePreviews.length > 0) {
            setShowCancelConfirm(true);
        } else {
            setIsModalOpen(false);
            reset();
            setSelectedTrek(null);
            setImagePreviews([]);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-gray-50 to-emerald-50 font-sans">
                {/* Toast Notification */}
                <AnimatePresence>
                    {toast.show && (
                        <motion.div
                            variants={toastVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
                                toast.type === "success"
                                    ? "bg-teal-500 text-white"
                                    : "bg-red-500 text-white"
                            }`}
                        >
                            {toast.type === "success" ? (
                                <CheckCircle className="h-5 w-5" />
                            ) : (
                                <AlertCircle className="h-5 w-5" />
                            )}
                            <span>{toast.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header */}
                <motion.header
                    className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 py-8 px-6 shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <h1 className="text-4xl font-bold text-gray-400">
                            Trek Management
                        </h1>
                        <button
                            onClick={() => {
                                reset();
                                setImagePreviews([]);
                                setSelectedTrek(null);
                                setIsModalOpen(true);
                            }}
                            className="bg-white text-teal-600 font-semibold py-3 px-6 rounded-full flex items-center gap-2 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 shadow-md"
                        >
                            <Plus className="h-5 w-5" />
                            Add Trek
                        </button>
                    </div>
                </motion.header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-6 py-12">
                    {isLoading && (
                        <div className="text-center py-16">
                            <Loader2 className="h-12 w-12 text-teal-500 animate-spin mx-auto" />
                            <p className="text-lg font-medium text-gray-600 mt-4">
                                Loading treks...
                            </p>
                        </div>
                    )}
                    {error && (
                        <div className="text-center py-16 bg-red-50 rounded-lg p-6">
                            <p className="text-lg font-semibold text-red-600">
                                Error: {error.message}
                            </p>
                            <button
                                onClick={() => refetch()}
                                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-full flex items-center gap-2 hover:bg-teal-600 transition-all duration-200"
                            >
                                <RefreshCw className="h-5 w-5" />
                                Retry
                            </button>
                        </div>
                    )}
                    {!isLoading && !error && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-gray-100"
                        >
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800">
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                                            Difficulty
                                        </th>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                                            Place
                                        </th>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                                            Duration
                                        </th>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                                            Images
                                        </th>
                                        <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {treks?.length > 0 ? (
                                        treks.map((trek) => (
                                            <motion.tr
                                                key={trek._id}
                                                variants={childVariants}
                                                className="border-b border-gray-100 hover:bg-teal-50/30 transition-colors duration-150"
                                            >
                                                <td className="py-4 px-6 font-medium text-gray-800">
                                                    {trek.name}
                                                </td>
                                                <td className="py-4 px-6 text-gray-600">
                                                    {trek.difficulty || "N/A"}
                                                </td>
                                                <td className="py-4 px-6 text-gray-600">
                                                    {trek.place?.name || "N/A"}
                                                </td>
                                                <td className="py-4 px-6 text-gray-600">
                                                    {trek.duration || "N/A"}
                                                </td>
                                                <td className="py-4 px-6 text-gray-600">
                                                    {trek.rating || "N/A"}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {trek.images?.length > 0 ? (
                                                        <div className="flex gap-2">
                                                            {trek.images
                                                                .slice(0, 2)
                                                                .map(
                                                                    (
                                                                        img,
                                                                        index,
                                                                    ) => (
                                                                        <img
                                                                            key={
                                                                                index
                                                                            }
                                                                            src={`${baseAPIurl}/Uploads/${img}`}
                                                                            alt={`${trek.name} image ${index + 1}`}
                                                                            className="h-10 w-10 object-cover rounded-md"
                                                                        />
                                                                    ),
                                                                )}
                                                            {trek.images
                                                                .length > 2 && (
                                                                <span className="text-gray-600">
                                                                    +
                                                                    {trek.images
                                                                        .length -
                                                                        2}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">
                                                            No images
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 flex gap-3">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(trek)
                                                        }
                                                        className="text-teal-600 hover:text-teal-800 transition-colors duration-200"
                                                        title="Edit Trek"
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                trek._id,
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                                        title="Delete Trek"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="py-12 text-center text-gray-500 text-lg"
                                            >
                                                No treks found. Add a new trek
                                                to get started!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                </main>

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-gray-50 rounded-2xl p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold text-teal-800 tracking-tight">
                                    {selectedTrek
                                        ? "Edit Trek"
                                        : "Add New Trek"}
                                </h2>
                                <button
                                    onClick={handleCancel}
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    aria-label="Close modal"
                                >
                                    <X className="h-7 w-7" />
                                </button>
                            </div>
                            <form
                                id="trek-form"
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-12"
                            >
                                {/* Trek Details */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-teal-800 border-b border-gray-200 pb-2">
                                        Trek Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Trek Name{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                {...register("name", {
                                                    required:
                                                        "Trek name is required",
                                                })}
                                                className={`w-full p-4 text-lg border rounded-lg shadow-sm ${errors.name ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                                                placeholder="Enter trek name"
                                                aria-invalid={
                                                    errors.name
                                                        ? "true"
                                                        : "false"
                                                }
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Difficulty
                                            </label>
                                            <input
                                                {...register("difficulty")}
                                                className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                                                placeholder="e.g., Easy, Moderate, Hard"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Place
                                            </label>
                                            <select
                                                {...register("place")}
                                                className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                                            >
                                                <option value="">
                                                    Select a place
                                                </option>
                                                {placesLoading ? (
                                                    <option>
                                                        Loading places...
                                                    </option>
                                                ) : (
                                                    places?.map((place) => (
                                                        <option
                                                            key={place._id}
                                                            value={place._id}
                                                        >
                                                            {place.name}
                                                        </option>
                                                    ))
                                                )}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Duration
                                            </label>
                                            <input
                                                {...register("duration")}
                                                className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                                                placeholder="e.g., 5 days"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Overview
                                        </label>
                                        <textarea
                                            {...register("overview")}
                                            className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                                            rows="5"
                                            placeholder="Describe the trek..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Max Elevation
                                            </label>
                                            <input
                                                {...register("max_elevation")}
                                                className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                                                placeholder="e.g., 4000m"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Best Season
                                            </label>
                                            <input
                                                {...register("best_season")}
                                                className="w-full p-4 text-lg border rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200"
                                                placeholder="e.g., Spring, Autumn"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-teal-800 border-b border-gray-200 pb-2">
                                        Contact Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Contact Number
                                            </label>
                                            <input
                                                {...register("contact_number", {
                                                    pattern: {
                                                        value: /^\d+$/,
                                                        message:
                                                            "Contact number must be numeric",
                                                    },
                                                })}
                                                className={`w-full p-4 text-lg border rounded-lg shadow-sm ${errors.contact_number ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                                                placeholder="Enter contact number"
                                                aria-invalid={
                                                    errors.contact_number
                                                        ? "true"
                                                        : "false"
                                                }
                                            />
                                            {errors.contact_number && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {
                                                        errors.contact_number
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Contact Email
                                            </label>
                                            <input
                                                {...register("contact_email", {
                                                    pattern: {
                                                        value: /\S+@\S+\.\S+/,
                                                        message:
                                                            "Invalid email format",
                                                    },
                                                })}
                                                className={`w-full p-4 text-lg border rounded-lg shadow-sm ${errors.contact_email ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                                                placeholder="Enter contact email"
                                                aria-invalid={
                                                    errors.contact_email
                                                        ? "true"
                                                        : "false"
                                                }
                                            />
                                            {errors.contact_email && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {
                                                        errors.contact_email
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Rating and Reviews */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-teal-800 border-b border-gray-200 pb-2">
                                        Rating & Reviews
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Rating
                                            </label>
                                            <input
                                                {...register("rating", {
                                                    min: {
                                                        value: 0,
                                                        message:
                                                            "Rating must be at least 0",
                                                    },
                                                    max: {
                                                        value: 5,
                                                        message:
                                                            "Rating cannot exceed 5",
                                                    },
                                                })}
                                                type="number"
                                                step="0.1"
                                                className={`w-full p-4 text-lg border rounded-lg shadow-sm ${errors.rating ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                                                placeholder="e.g., 4.5"
                                                aria-invalid={
                                                    errors.rating
                                                        ? "true"
                                                        : "false"
                                                }
                                            />
                                            {errors.rating && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {errors.rating.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Number of Reviews
                                            </label>
                                            <input
                                                {...register("reviews", {
                                                    min: {
                                                        value: 0,
                                                        message:
                                                            "Reviews cannot be negative",
                                                    },
                                                })}
                                                type="number"
                                                className={`w-full p-4 text-lg border rounded-lg shadow-sm ${errors.reviews ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-teal-400 focus:border-teal-500 transition-all duration-200`}
                                                placeholder="e.g., 100"
                                                aria-invalid={
                                                    errors.reviews
                                                        ? "true"
                                                        : "false"
                                                }
                                            />
                                            {errors.reviews && (
                                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {errors.reviews.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Images */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-teal-800 border-b border-gray-200 pb-2">
                                        Trek Images (Up to 4)
                                    </h3>
                                    <div className="flex items-start gap-6">
                                        <div className="flex-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Upload Images (optional)
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageUpload}
                                                    className="w-full p-4 text-lg border border-gray-200 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all duration-200"
                                                    aria-label="Upload trek images"
                                                />
                                            </div>
                                        </div>
                                        {imagePreviews.length > 0 && (
                                            <div className="relative flex items-center gap-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {imagePreviews.map(
                                                        (preview, index) => (
                                                            <div
                                                                key={index}
                                                                className="relative"
                                                            >
                                                                <img
                                                                    src={
                                                                        preview
                                                                    }
                                                                    alt={`Trek Image Preview ${index + 1}`}
                                                                    className="h-24 w-24 object-cover rounded-lg shadow-sm"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removeImage(
                                                                            index,
                                                                        )
                                                                    }
                                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                                                                    aria-label={`Remove image ${index + 1}`}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            imagePreviews.forEach(
                                                                (preview) => {
                                                                    if (
                                                                        preview.startsWith(
                                                                            "blob:",
                                                                        )
                                                                    ) {
                                                                        URL.revokeObjectURL(
                                                                            preview,
                                                                        );
                                                                    }
                                                                },
                                                            );
                                                            setImagePreviews(
                                                                [],
                                                            );
                                                            setValue(
                                                                "images",
                                                                null,
                                                            );
                                                        }}
                                                        className="px-4 py-2 border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-teal-400"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        form="trek-form"
                                                        className="px-4 py-2 bg-teal-500 text-gray-700 rounded-full font-semibold flex items-center gap-2 hover:bg-teal-600 transition-all duration-200 disabled:bg-teal-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-teal-400"
                                                        disabled={
                                                            addTrekMutation.isLoading ||
                                                            updateTrekMutation.isLoading
                                                        }
                                                    >
                                                        {addTrekMutation.isLoading ||
                                                        updateTrekMutation.isLoading ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Save className="h-4 w-4" />
                                                        )}
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-teal-400"
                                        aria-label="Cancel form"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-emerald-500 text-gray-700 rounded-full font-semibold flex items-center gap-2 hover:bg-emerald-600 transition-all duration-200 disabled:bg-emerald-300 disabled:cursor-not-allowed focus:ring-2 focus:ring-teal-400"
                                        disabled={
                                            addTrekMutation.isLoading ||
                                            updateTrekMutation.isLoading
                                        }
                                        aria-label={
                                            selectedTrek
                                                ? "Update trek"
                                                : "Add trek"
                                        }
                                    >
                                        {addTrekMutation.isLoading ||
                                        updateTrekMutation.isLoading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <Save className="h-5 w-5" />
                                        )}
                                        {selectedTrek
                                            ? "Update Trek"
                                            : "Add Trek"}
                                    </button>
                                    <button
                                        type="submit"
                                        form="trek-form"
                                        className="px-10 py-4 bg-teal-500 text-gray-700 rounded-full font-bold flex items-center gap-2 hover:bg-teal-600 hover:scale-105 transition-all duration-200 disabled:bg-teal-300 disabled:cursor-not-allowed shadow-lg focus:ring-2 focus:ring-teal-400"
                                        disabled={
                                            addTrekMutation.isLoading ||
                                            updateTrekMutation.isLoading
                                        }
                                        aria-label="Confirm submission"
                                    >
                                        {addTrekMutation.isLoading ||
                                        updateTrekMutation.isLoading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <CheckCircle className="h-5 w-5" />
                                        )}
                                        Confirm
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
                                        <h3 className="text-lg font-semibold text-teal-800">
                                            Confirm Cancel
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            Are you sure you want to cancel? All
                                            unsaved changes will be lost.
                                        </p>
                                        <div className="flex justify-end gap-4 mt-6">
                                            <button
                                                onClick={() =>
                                                    setShowCancelConfirm(false)
                                                }
                                                className="px-4 py-2 border border-gray-200 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-teal-400"
                                            >
                                                Stay
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsModalOpen(false);
                                                    reset();
                                                    setSelectedTrek(null);
                                                    setImagePreviews([]);
                                                    setShowCancelConfirm(false);
                                                }}
                                                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 focus:ring-2 focus:ring-red-400"
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

export default ManageTreks;
