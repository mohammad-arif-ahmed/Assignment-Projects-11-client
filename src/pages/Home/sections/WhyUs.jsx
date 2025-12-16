import { FaTrophy, FaUsers, FaLock } from 'react-icons/fa';

const WhyUs = () => {
    const features = [
        {
            icon: FaTrophy,
            title: "Guaranteed Prizes",
            description: "We ensure timely and secure payment of prize money to all contest winners.",
            color: "text-primary"
        },
        {
            icon: FaUsers,
            title: "Diverse Community",
            description: "Connect with top talent and passionate creators from around the globe.",
            color: "text-secondary"
        },
        {
            icon: FaLock,
            title: "Secure Platform",
            description: "Your data and contest submissions are protected with industry-leading security.",
            color: "text-accent"
        }
    ];

    return (
        <section className="py-20 bg-base-200">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-5xl font-extrabold mb-4 text-primary">Why Choose ContestHub?</h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    We provide the best environment for creative competition and skill development.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border-t-4 border-primary">
                            <feature.icon className={`mx-auto text-6xl mb-4 ${feature.color}`} />
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-500">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;