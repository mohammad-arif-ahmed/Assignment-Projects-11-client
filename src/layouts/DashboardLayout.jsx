
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar"; // Will be created next

const DashboardLayout = () => {
    return (
        <div className="flex">
            {/* Sidebar (Fixed width) */}
            <div className="w-64 min-h-screen bg-base-200">
                <DashboardSidebar /> 
            </div>
            {/* Content Area (Takes remaining width) */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;