import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRole from '../Hooks/useRole';
import PremiumLoader from '../Components/Shared/PremiumSpinner';

const StaffRoute = ({children}) => {
    const {role, roleLoading}= useRole();
    const navigate = useNavigate();
      if (roleLoading) return <PremiumLoader></PremiumLoader>
      if (role !== 'staff'){
        return navigate('/')
      }
    return children;
}

export default StaffRoute;