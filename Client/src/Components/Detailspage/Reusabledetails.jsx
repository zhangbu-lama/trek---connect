
import React from "react";
import {
    Calendar,
    Mountain,
    Clock,
    BarChart2,
    Phone,
    Mail,
    Star,
    MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useDetailsByPlace } from "../Hooks/useDetails";

const BASE_URL = "http://127.0.0.1:8000";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, duration: 0.6 },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const DetailsPage = () => {
    const { id } = useParams();
    const { data: treks, isLoading, error } = useDetailsByPlace(id);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="text-4xl"
                >
                    <Mountain className="w-16 h-16 text-teal-400" />
                </motion.div>
            </div>
        );
    }

    if (error || !treks) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-red-400 text-3xl font-bold">
                {error ? `Error: ${error.message}` : "Trek not found"}
            </div>
        );
    }

    if (treks.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-red-400 text-3xl font-bold">
                No treks available for this place.
            </div>
        );
    }

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-6xl mx-auto">
                {treks.map((trek) => (
                    <div key={trek._id} className="mb-20">

                        <motion.div variants={childVariants} className="relative">
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                {trek.images.length > 0 ? (
                                    <img
                                        src={`${BASE_URL}/Uploads/${trek.images[0]}`}
                                        alt={trek.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-r from-teal-500 to-purple-600" />
                                )}
                                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
                                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                                        {trek.name}
                                    </h1>
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center gap-2 bg-teal-500/80 px-4 py-2 rounded-full">
                                            <Star className="w-6 h-6 text-yellow-300" />
                                            <span className="text-lg font-semibold">
                                                {trek.rating} ({trek.reviews} reviews)
                                            </span>
                                        </div>
                                        <Link to="/bookingform">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg"
                                            >
                                                Book Now
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Overview Section */}
                        <motion.div variants={childVariants} className="mt-12">
                            <h2 className="text-3xl font-bold text-teal-400 mb-6">Overview</h2>
                            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                                {trek.overview}
                            </p>
                        </motion.div>

                        {/* Details Grid */}
                        <motion.div variants={childVariants} className="mt-12">
                            <h2 className="text-3xl font-bold text-teal-400 mb-6">Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        icon: <Mountain className="w-10 h-10 text-teal-400" />,
                                        label: "Max Elevation",
                                        value: trek.max_elevation,
                                    },
                                    {
                                        icon: <Clock className="w-10 h-10 text-blue-400" />,
                                        label: "Duration",
                                        value: trek.duration,
                                    },
                                    {
                                        icon: <BarChart2 className="w-10 h-10 text-green-400" />,
                                        label: "Difficulty",
                                        value: trek.difficulty,
                                    },
                                    {
                                        icon: <Calendar className="w-10 h-10 text-red-400" />,
                                        label: "Best Season",
                                        value: trek.best_season,
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700"
                                    >
                                        <div className="flex items-center gap-4">
                                            {item.icon}
                                            <div>
                                                <p className="text-sm text-gray-400">{item.label}</p>
                                                <p className="text-lg font-semibold capitalize text-white">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Images Gallery */}
                        {trek.images.length > 0 && (
                            <motion.div variants={childVariants} className="mt-12">
                                <h2 className="text-3xl font-bold text-teal-400 mb-6">Gallery</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {trek.images.map((image, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative h-64 rounded-xl overflow-hidden shadow-lg"
                                            whileHover={{ scale: 1.03 }}
                                        >
                                            <img
                                                src={`${BASE_URL}/Uploads/${image}`}
                                                alt={`${trek.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 text-white text-sm text-center">
                                                {`${trek.name} ${index + 1}`}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Contact Section */}
                        <motion.div variants={childVariants} className="mt-12">
                            <h2 className="text-3xl font-bold text-teal-400 mb-6">Get in Touch</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4 bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700">
                                    <Mail className="w-10 h-10 text-teal-400" />
                                    <a
                                        href={`mailto:${trek.contact_email}`}
                                        className="text-teal-300 hover:text-teal-200 text-lg"
                                    >
                                        {trek.contact_email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-4 bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700">
                                    <Phone className="w-10 h-10 text-teal-400" />
                                    <a
                                        href={`tel:${trek.contact_number}`}
                                        className="text-teal-300 hover:text-teal-200 text-lg"
                                    >
                                        {trek.contact_number}
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Timestamps Section */}
                        <motion.div variants={childVariants} className="mt-12">
                            <h2 className="text-3xl font-bold text-teal-400 mb-6">Record Info</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: <Calendar className="w-10 h-10 text-teal-400" />,
                                        label: "Created",
                                        value: formatDate(trek.created_at),
                                    },
                                    {
                                        icon: <Calendar className="w-10 h-10 text-teal-400" />,
                                        label: "Last Updated",
                                        value: formatDate(trek.updated_at),
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700"
                                    >
                                        <div className="flex items-center gap-4">
                                            {item.icon}
                                            <div>
                                                <p className="text-sm text-gray-400">{item.label}</p>
                                                <p className="text-lg font-semibold text-white">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Sticky Book Now Button */}
                        <motion.div
                            className="fixed bottom-8 right-8 z-50"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/bookingform">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-2xl flex items-center gap-3"
                                >
                                    <Star className="w-6 h-6 text-yellow-300" />
                                    Book Now
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default DetailsPage;
