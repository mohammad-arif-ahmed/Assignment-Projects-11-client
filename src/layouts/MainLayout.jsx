import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {

  return (
    <div className="min-h-screen flex flex-col bg-base-200">

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4">

        <Outlet />

      </main>

      <Footer />

    </div>
  );

};

export default MainLayout;