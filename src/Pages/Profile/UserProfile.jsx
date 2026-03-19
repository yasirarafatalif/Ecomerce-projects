import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import useAxios from '../../Hooks/useAxios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const axios = useAxios();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ব্যাকেন্ড থেকে ইউজার প্রোফাইল আনা
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/profile', {
                    withCredentials: true, 
                });
                console.log(response)
                setUser(response.data);
            } catch (error) {
                console.error("Profile fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    if (!user) return <div className="text-center mt-10">Please login to view profile.</div>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">User Profile</h2>
            <div className="space-y-3">
                <p><span className="font-semibold text-gray-600">Name:</span> {user.name}</p>
                <p><span className="font-semibold text-gray-600">Email:</span> {user.email}</p>
                <p><span className="font-semibold text-gray-600">Role:</span> {user.role || 'User'}</p>
                {/* আপনার ডাটাবেসে আরও যা যা ফিল্ড আছে সেগুলো এখানে যোগ করুন */}
            </div>
            
            <button 
                className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => {/* Logout logic here */}}
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfile;