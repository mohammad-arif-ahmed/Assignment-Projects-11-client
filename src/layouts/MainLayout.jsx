
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            {/* Added container for Tailwind/DaisyUI responsiveness */}
            <Navbar /> 
            <div className="min-h-[calc(100vh-300px)] container mx-auto px-4"> 
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;