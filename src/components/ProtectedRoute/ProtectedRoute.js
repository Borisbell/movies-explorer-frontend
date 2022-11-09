import React from 'react';
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn }) => {
    if (!loggedIn) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;