import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ element, ...rest }) => {
  const { user,setShowLogin,token } = useContext(AppContext); // Assuming 'user' is the authentication state

  if (!token) {
    // If there's no user (not logged in), redirect to login page
   
   return <Navigate to="/" />;
   

  }
else{

    return element; // If user is authenticated, render the component passed as element
}
};

export default ProtectedRoute;
