import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRole from '../Hooks/useRole';
import PremiumSpinner from '../Components/Shared/PremiumSpinner';

const AdminRoute = ({children}) => {
    const {role, roleLoading}= useRole();
    const navigate = useNavigate();
      if (roleLoading) return <PremiumSpinner></PremiumSpinner>
      if (role !== 'admin'){
        return navigate('/')
      }
    return children;
}

export default AdminRoute;