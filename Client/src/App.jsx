//import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuthStore from "./Components/Store/AuthStore.jsx";

// Navbar Components
import MainNavbar from "./Components/HomePage/Navbar.jsx";
import UserNavbar from "./Components/HomePage/UserNavbar.jsx";
import AdminNavbar from "./Components/HomePage/AdminNavbar.jsx";

// Public Pages
import Routing from "./Components/HomePage/Routing.jsx";
import Reusable from "./Components/Secondpage/Reusable.jsx";
import Reusabledetails from "./Components/Detailspage/Reusabledetails.jsx";
import BookingFormPage from "./Components/Detailspage/Bookingform.jsx";
import Bouldering from "./Components/Bouldering/Bouldering.jsx";
import Down from "./Components/HomePage/Down.jsx";

// Admin Authentication
import LoginPage from "./Components/Auth/Login.jsx";
import RegisterPage from "./Components/Auth/Register.jsx";

// Admin Panel Pages
import Dashboard from "./Components/AdminPanel/Dashboard.jsx";
import AddPage from "./Components/AdminPanel/AddPlacePage.jsx";
import AddDetails from "./Components/AdminPanel/AddDetails.jsx";
import ShowBookings from "./Components/AdminPanel/Placebooking.jsx";
import AddCategory from "./Components/AdminPanel/Category.jsx";
import Location from "./Components/AdminPanel/Location.jsx";
import AdminPanel from "./Components/AdminPanel/Addproduct.jsx";
import ShowBooking from "./Components/AdminPanel/ShowBooking.jsx";
import ProductBooking from "./Components/Bouldering/ProductBooking.jsx";

// User Pages
import UserLayout from "./Components/UserDashboard/UserLayout.jsx";
import UserSidebar from "./Components/UserDashboard/UserSidebar.jsx";
import Placebook from "./Components/UserDashboard/placebook.jsx";
import Productbooked from "./Components/UserDashboard/Productbooked.jsx";
import UserLoginPage from "./Components/UserAuth/Userlogin.jsx";
import UserRegisterPage from "./Components/UserAuth/UserRegister.jsx";
import ProtectedRoute from "./Components/Auth/ProtectedRoute.jsx";

//payment integration

import Sucess from "./Components/PaymentIntegration/Success.jsx";
import Failed from "./Components/PaymentIntegration/Failed.jsx";
import ESewaPayment from "./Components/PaymentIntegration/ESewaPayment.jsx";

function App() {
    const { user, adminToken, initializing, initializeAuth } = useAuthStore();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    if (initializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-gray-800 text-lg font-semibold animate-pulse">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <Router>
            {adminToken ? (
                <AdminNavbar />
            ) : user ? (
                <UserNavbar />
            ) : (
                <MainNavbar />
            )}
            <Routes>
                <Route path="/success" element={<Sucess />} />
                <Route path="/failed" element={<Failed />} />
                <Route path="/esewapayment" element={<ESewaPayment />} />

                <Route path="/" element={<Routing />} />
                <Route path="/trek" element={<Reusable />} />
                <Route path="/details/:id" element={<Reusabledetails />} />
                <Route path="/bouldering" element={<Bouldering />} />
                <Route path="/bookproduct" element={<ProductBooking />} />
                <Route path="/bookproduct/:id" element={<ProductBooking />} />
                <Route path="/down" element={<Down />} />

                <Route path="/adminlogin" element={<LoginPage />} />
                <Route path="/admin/register" element={<RegisterPage />} />
                <Route path="/userlogin" element={<UserLoginPage />} />
                <Route path="/userregister" element={<UserRegisterPage />} />

                {/* Admin Routes */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/addproduct"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminPanel />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/productbooking"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <ShowBooking />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/page"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-details"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-category"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AddCategory />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/addlocation"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <Location />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/show-bookings"
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <ShowBookings />
                        </ProtectedRoute>
                    }
                />

                {/* User Routes */}
                <Route
                    path="/placebooked"
                    element={
                        <ProtectedRoute requiredRole="user">
                            <Placebook />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/bookingform"
                    element={
                        <ProtectedRoute requiredRole="user">
                            <BookingFormPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/productbooked"
                    element={
                        <ProtectedRoute requiredRole="user">
                            <Productbooked />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute requiredRole="user">
                            <UserSidebar />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/userlayout"
                    element={
                        <ProtectedRoute requiredRole="user">
                            <UserLayout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/bookproduct"
                    element={
                        <ProtectedRoute requiredRole="user">
                            <ProductBooking />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;