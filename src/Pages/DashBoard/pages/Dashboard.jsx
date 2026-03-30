import React from 'react';
import useRole from '../../../Hooks/useRole';
import AdminDashboard from '../Admin/Pages/AdminDashboard';
import StaffDashboard from '../Staff/Pages/StaffDashboard';

const Dashboard = () => {
  const {role}= useRole();
  return (
    <div>

      {
        role ==="admin"&& <AdminDashboard></AdminDashboard>
      }

      {
        role ==="staff"&& <StaffDashboard></StaffDashboard>
      }
      
    </div>
  );
};

export default Dashboard;