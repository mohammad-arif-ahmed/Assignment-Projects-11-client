import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ price, contestId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });

        if (!error && clientSecret) {
            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: card }
            });

            if (paymentIntent.status === 'succeeded') {
                const paymentInfo = {
                    transactionId: paymentIntent.id,
                    contestId,
                    price,
                    status: 'Paid'
                };
                // আপনার সার্ভার এপিআই
                await axiosSecure.post('/payments', paymentInfo);
                alert("Payment Successful!");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-4 border-2 border-gray-300 rounded-lg bg-gray-50 mb-6">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                                backgroundColor: '#f8fafc', // হালকা ব্যাকগ্রাউন্ড যাতে বর্ডার বোঝা যায়
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                    className="p-4 border border-gray-300 rounded-md shadow-sm bg-white"
                />
            </div>
            <button
                type="submit"
                disabled={!stripe || !clientSecret}
                className="btn btn-primary w-full text-white font-bold text-lg py-3 rounded-xl hover:shadow-lg transition-all"
            >
                Pay Now (${price})
            </button>
        </form>
    );
};

export default CheckoutForm;