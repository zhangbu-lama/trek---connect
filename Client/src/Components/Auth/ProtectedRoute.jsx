import { Navigate } from "react-router-dom";
import useAuthStore from "../Store/AuthStore";
import React from "react";

const ProtectedRoute = ({ children }) => {
    const { user, adminToken,isAdmin } = useAuthStore();

    if (!user && !isAdmin) {
        return <Navigate to="/userlogin" replace />;
    }

    if (!adminToken && !user) {
        return <Navigate to="/admin/login" replace />;
    }


    return children;
};

export default ProtectedRoute;
