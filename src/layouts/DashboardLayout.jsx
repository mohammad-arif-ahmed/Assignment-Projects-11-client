import { NavLink, Outlet } from 'react-router-dom';
import useUserRole from '../hooks/useUserRole'; 
import { 
    FaChartBar, FaUsers, FaTasks, 
    FaPlusSquare, FaListAlt, FaCheckCircle, 
    FaTrophy, 
    FaHome, 
} from 'react-icons/fa'; 
import LoadingSpinner from '../components/LoadingSpinner'; 

const DashboardLayout = () => {
    const { userRole, isLoading } = useUserRole();

    const isAdmin = userRole === 'Admin';
    const isCreator = userRole === 'Creator';

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex">
            {/* -------------------- Dashboard Sidebar -------------------- */}
            <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
                <div className="text-2xl font-bold mb-8 text-primary">Dashboard</div>
                <ul className="menu space-y-2">
                    {isAdmin ? (
                        <>
                            {/* ------- Admin Links ------- */}
                            <li>
                                <NavLink 
                                    to="/dashboard/admin-stats" 
                                    className={({ isActive }) => 
                                        isActive ? 'bg-gray-700 text-primary font-semibold' : 'hover:bg-gray-700'
                                    }
                                >
                                    <FaChartBar /> Admin Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/manage-users" 
                                    className={({ isActive }) => 
                                        isActive ? 'bg-gray-700 text-primary font-semibold' : 'hover:bg-gray-700'
                                    }
                                >
                                    <FaUsers /> Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/contest-review" 
                                    className={({ isActive }) => 
                                        isActive ? 'bg-gray-700 text-primary font-semibold' : 'hover:bg-gray-700'
                                    }
                                >
                                    <FaTasks /> Pending Contests Review
                                </NavLink>
                            </li>
                        </>
                    ) : isCreator ? (
                        <>
                            {/* ------- Creator Links ------- */}
                            <li>
                                <NavLink 
                                    to="/dashboard/add-contest" 
                                    className={({ isActive }) => 
                                        isActive ? 'bg-gray-700 text-primary font-semibold' : 'hover:bg-gray-700'
                                    }
                                >
                                    <FaPlusSquare /> Add Contest
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/my-created-contests" 
                                    className={({ isActive }) => 
                                        isActive ? 'bg-gray-700 text-primary font-semibold' : 'hover:bg-gray-700'
                                    }
                                >
                                    <FaListAlt /> My Created Contests
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/contest-submissions" 
                                    className={({ isActive }) => 
                                        isActive ? 'bg-gray-700 text-primary font-semibold' : 'hover:bg-gray-700'
                                    }
                                >
                                    <FaCheckCircle /> Contest Submissions
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* ------- Participant Links (Default User) ------- */}
                            <li>
                                <NavLink 
                                    to="/dashboard/my-participated-contests" 
                                    className={({ isActive }) => 
                                        isActive ? 'bg-gray-700 text-primary font-semibold' : 'hover:bg-gray-700'
                                    }
                                >
                                    <FaTrophy /> My Participated Contests
                                </NavLink>
                            </li>
                            {/* <li><NavLink to="/dashboard/profile"> ... </NavLink></li> */}
                        </>
                    )}
                    
                    {/* --- Divider --- */}
                    <div className="divider my-4 bg-gray-700 h-px"></div>
                    
                    {/* ------- Common Links (Back to Home) ------- */}
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                isActive ? 'bg-gray-700 text-primary font-semibold' : 'hover:bg-gray-700'
                            }
                        >
                            <FaHome /> Back to Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* -------------------- Dashboard Content -------------------- */}
            <div className="flex-1 p-8 bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;