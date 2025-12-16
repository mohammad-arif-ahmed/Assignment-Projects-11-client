import { Link } from "react-router-dom";

const PopularContests = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-5xl font-extrabold mb-4 text-primary">Popular Contests</h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    The most active and highly anticipated contests right now.
                </p>
                
                {/* 📌 Placeholder Card (Temporary) */}
                <div className="flex justify-center">
                    <div className="card w-96 bg-base-200 shadow-xl border-t-2 border-dashed border-gray-400">
                        <div className="card-body">
                            <h3 className="card-title justify-center text-gray-500">
                                Loading Popular Contests...
                            </h3>
                            <p className="text-sm text-gray-500">
                                The real data fetching and card rendering will be implemented in the next step.
                            </p>
                        </div>
                    </div>
                </div>

                <Link to="/all-contests" className="btn btn-secondary mt-12">
                    View All Contests
                </Link>
            </div>
        </section>
    );
};

export default PopularContests;