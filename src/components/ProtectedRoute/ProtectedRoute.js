import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

// const ProtectedRoute = ({ loggedIn, children, ...props }) => {
//   return (
//       <Route {...props}>
//         {loggedIn ? children : <Navigate to="/signin"/>}
//       </Route>
//   )
// }

export default ProtectedRoute;