import Banner from "./sections/Banner";
import PopularContests from "./sections/PopularContests";
import WhyUs from "./sections/WhyUs";
import BestCreators from "./sections/BestCreators";

const Home = () => {
    return (
        <div>
            {/* 1. Hero/Banner Section */}
            <Banner />

            {/* 2. Popular Contests Section (Server data will be fetched here later) */}
            <PopularContests />

            {/* 3. Why Choose Us Section */}
            <WhyUs />

            {/* 4. Best Creators Section (Server data will be fetched here later) */}
            <BestCreators />
        </div>
    );
};

export default Home;