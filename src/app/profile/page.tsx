"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define the type for the user details
interface User {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
}

export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = useState<User | null>(null);
    const [usersData, setUsersData] = useState<User[]>([]);

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            const { _id, username, email, isVerified, isAdmin } = res.data.data;
            setUserData({ _id, username, email, isVerified, isAdmin });
        } catch (error: any) {
            console.error("Error fetching current user details:", error);
            toast.error("Failed to fetch current user details.");
        }
    };

    const allUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/userdetail');
            console.log(res.data);
            setUsersData(res.data.data);
        } catch (error: any) {
            console.error("Error fetching all user details:", error);
            toast.error("Failed to fetch all user details.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            {userData && (
                <div className="p-4 bg-green-500 rounded text-white">
                    <p>ID: <Link href={`/profile/${userData._id}`}>{userData._id}</Link></p>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Verified: {userData.isVerified ? "Yes" : "No"}</p>
                    <p>Admin: {userData.isAdmin ? "Yes" : "No"}</p>
                </div>
            )}
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>

            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Current User Details
            </button>

            <button
                onClick={allUserDetails}
                className="bg-orange-400 mt-4 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
            >
                All User Details
            </button>

            {usersData.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-lg font-bold mb-4">All User Details</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200 text-white bg-gray-800">ID</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-white bg-gray-800">Username</th>
                                <th className="py-2 px-4 border-b border-gray-200 text-white bg-gray-800">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((user) => (
                                <tr key={user._id}>
                                    <td className="py-2 px-4 border-b border-gray-200 text-black bg-yellow-200">{user._id}</td>
                                    <td className="py-2 px-4 border-b border-gray-200  text-black bg-yellow-200">{user.username}</td>
                                    <td className="py-2 px-4 border-b border-gray-200  text-black bg-yellow-200">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
