import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const UserDashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate('/login');
    };

    const links = [
        { path: "/user-dash", label: "Approved Flats" },
        { path: "/user-dash/myflats", label: "My Flats" },
        { path: "/user-dash/enquiries", label: "My Enquiries" },
        { path: "/user-dash/enquiries/received", label: "Enquiries Received" },
    ];

    const linkBase = "block px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium";
    const linkActive = "bg-amber-400 text-white hover:bg-blue-700";

    return (
        <div className="flex min-h-screen bg-gray-100 pt-16">
            
            {/* Sidebar (Fixed) */}
            <aside className="w-64 bg-white/70 backdrop-blur-md shadow-xl p-6 flex flex-col">
                
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-bold text-xl text-gray-800">User Panel</h2>
                    <button
                        onClick={logout}
                        className="flex items-center gap-1 text-sm px-2 py-1 border rounded-lg 
                                   hover:bg-red-100 transition text-red-600"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                <nav className='flex-1'>
                    <ul className="space-y-3">
                        {links.map((link) => (
                         <li key={link.path}>
                          <NavLink to={link.path} end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`
                                    }>
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content (shifted right) */}
            <main className="flex-1 p-6 bg-gray-100">
                <div className='max-w-full mx-auto'>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
