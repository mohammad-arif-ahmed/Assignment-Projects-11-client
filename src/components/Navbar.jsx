// src/components/Navbar.jsx

import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    // Use the custom hook to access user state and logout function
    const { user, logOut, loading } = useAuth(); 

    // Links for the navigation bar
    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/contests">All Contests</NavLink></li>
            {/* Conditional Links based on user status */}
            {user ? (
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            ) : (
                <li><NavLink to="/register">Register</NavLink></li>
            )}
            <li><NavLink to="/winners">Winners</NavLink></li>
        </>
    );

    // Logout Handler
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Successfully logged out!');
            })
            .catch(error => {
                console.error(error);
                toast.error('Logout failed.');
            });
    };

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="navbar-start">
                <div className="dropdown">
                    {/* Hamburger menu for small screens (DaisyUI) */}
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                {/* Logo or App Name */}
                <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">ContestHub</Link>
            </div>
            
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            
            <div className="navbar-end">
                {user ? (
                    // User is logged in: Show Profile and Logout
                    <div className="flex items-center space-x-3">
                        {/* Profile Image/Dropdown */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img 
                                        alt="User Profile" 
                                        src={user.photoURL || 'https://i.ibb.co/601F9h7/user.png'} // Default Image
                                        title={user.displayName || user.email}
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link to="/dashboard/profile">{user.displayName || 'Profile'}</Link></li>
                                <li><a onClick={handleLogOut}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    // User is logged out: Show Login Button
                    <Link to="/login" className="btn btn-primary">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;