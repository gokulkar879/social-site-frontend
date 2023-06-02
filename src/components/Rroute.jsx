import React from 'react';
import { Navigate } from 'react-router-dom';

function Rroute({token, children}) {
    if(token) {
        return <Navigate to="/" replace/>
    }
  return children
}

export default Rroute;