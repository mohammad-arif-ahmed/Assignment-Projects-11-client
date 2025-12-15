
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logOut, loading } = useAuth(); 

    const activeLinkClass = ({ isActive }) => 
        isActive ? 'font-bold text-primary border-b-2 border-primary' : '';

    const navLinks = (
        <>
            {/* Standard Public Routes */}
            <li><NavLink to="/" className={activeLinkClass}>Home</NavLink></li>
            <li><NavLink to="/contests" className={activeLinkClass}>All Contests</NavLink></li>
            <li><NavLink to="/winners" className={activeLinkClass}>Winners</NavLink></li>
            
            {/* Conditional Routes */}
            {user ? (
                // Show Dashboard if user is logged in
                <li><NavLink to="/dashboard" className={activeLinkClass}>Dashboard</NavLink></li>
            ) : (
                // Show Register if user is logged out (or new)
                <li><NavLink to="/register" className={activeLinkClass}>Register</NavLink></li>
            )}
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

    // If loading, you can return a simple loading indicator
    if (loading) {
        // but ensure components handle 'user' being null temporarily.
    }


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
                                <li><Link to="/dashboard">{user.displayName || 'Dashboard'}</Link></li>
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