
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

// Define the type for the user details
interface User {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
}

export default function UserProfile() {
    const router = useRouter();
    const { id } = router.query; // Get the ID from the URL
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!id) return; // Wait for the ID to be available
            try {
                const res = await axios.get(`/api/users/${id}`);
                const { _id, username, email, isVerified, isAdmin } = res.data.data;
                setUserData({ _id, username, email, isVerified, isAdmin });
            } catch (error: any) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserData();
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            {userData ? (
                <div className="p-4 bg-green-500 rounded text-white">
                    <p>ID: {userData._id}</p>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Verified: {userData.isVerified ? "Yes" : "No"}</p>
                    <p>Admin: {userData.isAdmin ? "Yes" : "No"}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}
