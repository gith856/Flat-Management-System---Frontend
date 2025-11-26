import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate('/login');
    };

    const linkBase = "block px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 transition font-medium";
    const linkActive = "bg-amber-400 text-white hover:bg-blue-700";

    return (
        <div className="flex min-h-screen bg-gray-100 pt-16">
            {/* Sidebar */}
            <aside className="w-64 bg-white/70 backdrop-blur-md shadow-xl p-6 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                    <button
                        onClick={logout}
                        className="flex items-center gap-1 text-sm px-2 py-1 border rounded-lg hover:bg-red-100 transition text-red-600">
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1">
                    <ul className="space-y-3">
                        <li>
                            <NavLink
                                to="/admin-dash"
                                end
                                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin-dash/pending"
                                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
                            >
                                Pending Flats
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin-dash/approved"
                                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
                            >
                                Approved Flats
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin-dash/sold"
                                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
                            >
                                Sold Flats
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin-dash/enquiriesAll"
                                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}
                            >
                                All Enquiries
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Optional Footer */}
                <div className="mt-auto text-center text-gray-400 text-xs">
                    &copy; {new Date().getFullYear()} Admin Panel
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gray-100">
                <div className="max-w-full mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
