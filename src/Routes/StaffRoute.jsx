import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRole from '../Hooks/useRole';
import PremiumSpinner from '../Components/Shared/PremiumSpinner';

const StaffRoute = ({children}) => {
    const {role, roleLoading}= useRole();
    const navigate = useNavigate();
      if (roleLoading) return <PremiumSpinner></PremiumSpinner>
      if (role !== 'staff'){
        return navigate('/')
      }
    return children;
}

export default StaffRoute;