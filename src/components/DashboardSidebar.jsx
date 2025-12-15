
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardSidebar = () => {
    const { user } = useAuth();

    // The actual links will depend on the user's role (Admin/Contestant). 
    // For now, we use placeholders.
    const isAdmin = false; // <<< Role check logic will be implemented later
    const isContestant = true; 

    // --- Active Link Styling Helper ---
    const activeLinkClass = ({ isActive }) => 
        isActive ? 'text-primary font-bold border-r-4 border-primary' : '';

    return (
        <ul className="menu p-4 w-64 min-h-full text-base-content space-y-2">
            
            {/* Admin Links Placeholder */}
            {isAdmin && (
                <>
                    <li><NavLink to="/dashboard/manage-contests" className={activeLinkClass}>Manage Contests</NavLink></li>
                    <li><NavLink to="/dashboard/manage-users" className={activeLinkClass}>Manage Users</NavLink></li>
                </>
            )}

            {/* Contestant Links Placeholder */}
            {isContestant && (
                <>
                    <li><NavLink to="/dashboard/my-participations" className={activeLinkClass}>My Participations</NavLink></li>
                    <li><NavLink to="/dashboard/winning-contests" className={activeLinkClass}>Winning Contests</NavLink></li>
                    <li><NavLink to="/dashboard/profile" className={activeLinkClass}>Profile</NavLink></li>
                </>
            )}

            {/* Divider */}
            <div className="divider"></div> 
            
            {/* Shared Links (Back to Home) */}
            <li><NavLink to="/" className={activeLinkClass}>Home</NavLink></li>
        </ul>
    );
};

export default DashboardSidebar;