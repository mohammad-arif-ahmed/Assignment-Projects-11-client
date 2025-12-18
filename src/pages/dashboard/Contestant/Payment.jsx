import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// আপনার .env ফাইল থেকে স্ট্রাইপ কী (PK) লোড করুন
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    // উদাহরণস্বরূপ ডাটা (এগুলো আপনি কন্টেস্ট ডিটেইলস থেকে ডায়নামিকভাবে আনবেন)
    const price = 50; 
    const contestId = "contest_123";

    return (
        <div className="p-10 bg-slate-50 min-h-screen">
            {/* ডার্ক কালার হেডিং যাতে সাদা ব্যাকগ্রাউন্ডে দেখা যায় */}
            <h2 className="text-4xl font-extrabold text-slate-900 mb-10 text-center uppercase tracking-wider">
                Complete Your Payment
            </h2>
            
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                <div className="mb-6 border-b pb-4 text-slate-700">
                    <p className="text-lg font-medium">Contest ID: <span className="font-bold">{contestId}</span></p>
                    <p className="text-2xl font-bold text-blue-600">Amount to Pay: ${price}</p>
                </div>

                {/* Elements Wrapper ই মূলত Stripe এর কন্ট্রোল হ্যান্ডেল করে */}
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} contestId={contestId} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;