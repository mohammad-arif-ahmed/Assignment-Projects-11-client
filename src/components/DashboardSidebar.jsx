
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { RiDashboardFill, RiHome2Line } from "react-icons/ri"; 
import { FaUserShield, FaPlusCircle, FaRegListAlt, FaClipboardCheck, FaMedal } from "react-icons/fa"; 
import { MdOutlineManageAccounts, MdOutlineGroup } from "react-icons/md"; 

const DashboardSidebar = () => {
    // 1. Fetch Auth and Role States
    const { user, logOut } = useAuth();
    const [role, isRoleLoading] = useUserRole(); 

    // Helper class for active link styling
    const activeLinkClass = ({ isActive }) => 
        isActive ? 'text-primary font-bold border-r-4 border-primary bg-base-300' : '';

    // If role data is still loading, show a loading spinner in the sidebar area
    if (isRoleLoading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[50vh] p-4">
                <span className="loading loading-spinner loading-md text-primary"></span>
            </div>
        );
    }
    
    // --- Define Link Sets based on Role ---
    
    // Links for Users with 'admin' role
    const adminLinks = (
        <>
            <h2 className="menu-title text-lg">Admin Dashboard</h2>
            <li><NavLink to="/dashboard/admin-profile" className={activeLinkClass}><FaUserShield /> Admin Profile</NavLink></li>
            <li><NavLink to="/dashboard/manage-users" className={activeLinkClass}><MdOutlineGroup /> Manage Users</NavLink></li>
            <li><NavLink to="/dashboard/manage-contests" className={activeLinkClass}><MdOutlineManageAccounts /> Manage Contests</NavLink></li>
        </>
    );

    // Links for Users with 'creator' role
    const creatorLinks = (
        <>
            <h2 className="menu-title text-lg">Creator Dashboard</h2>
            <li><NavLink to="/dashboard/add-contest" className={activeLinkClass}><FaPlusCircle /> Add Contest</NavLink></li>
            <li><NavLink to="/dashboard/my-contests" className={activeLinkClass}><FaRegListAlt /> My Created Contests</NavLink></li>
            <li><NavLink to="/dashboard/contest-submitted" className={activeLinkClass}><FaClipboardCheck /> Contest Submitted</NavLink></li>
        </>
    );
    
    // Links for Users with 'contestant' role (The default role)
    const contestantLinks = (
        <>
            <h2 className="menu-title text-lg">Contestant Dashboard</h2>
            <li><NavLink to="/dashboard/my-participations" className={activeLinkClass}><RiDashboardFill /> My Participations</NavLink></li>
            <li><NavLink to="/dashboard/winning-contests" className={activeLinkClass}><FaMedal /> Winning Contests</NavLink></li>
            <li><NavLink to="/dashboard/profile" className={activeLinkClass}><MdOutlineManageAccounts /> Profile</NavLink></li>
        </>
    );

    return (
        <ul className="menu p-4 w-64 min-h-full text-base-content space-y-2">
            
            {/* 1. Dynamic Role-based Links */}
            {role === 'admin' && adminLinks}
            {role === 'creator' && creatorLinks}
            {role === 'contestant' && contestantLinks}
            
            {/* 2. Divider and Shared Links */}
            <div className="divider"></div> 
            <li><NavLink to="/" className={activeLinkClass}><RiHome2Line /> Home Page</NavLink></li>
            {/* You can add more general links here if needed */}
        </ul>
    );
};

export default DashboardSidebar;