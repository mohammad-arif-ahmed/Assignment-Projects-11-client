import { Link } from "react-router-dom";

const bannerImage = "https://i.ibb.co.com/B534W5fT/coading.png"; 

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${bannerImage})` }}>
            <div className="hero-overlay bg-opacity-60 bg-black"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-4xl p-6">
                    <h1 className="mb-5 text-6xl font-extrabold text-white leading-tight">
                        Unleash Your Potential: Compete and Create with ContestHub
                    </h1>
                    <p className="mb-5 text-xl text-gray-200">
                        Join thousands of creators and professionals. Find exciting contests, showcase your skills, and win big prizes across various categories.
                    </p>
                    <Link to="/all-contests" className="btn btn-primary btn-lg text-lg font-bold mr-4">
                        Explore All Contests
                    </Link>
                    <Link to="/register" className="btn btn-outline btn-lg text-lg font-bold text-white border-white hover:bg-white hover:text-primary">
                        Join as a Creator
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;