const BestCreators = () => {
    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-5xl font-extrabold mb-4 text-primary">Our Top Creators</h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    Meet the contest organizers with the best track records.
                </p>
                
                {/* 📌 Placeholder Card (Temporary) */}
                 <div className="flex justify-center">
                    <div className="card w-96 bg-white shadow-xl border-t-2 border-dashed border-gray-400">
                        <div className="card-body">
                            <h3 className="card-title justify-center text-gray-500">
                                Loading Best Creators...
                            </h3>
                            <p className="text-sm text-gray-500">
                                Data for best creators will be fetched and displayed here later.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BestCreators;