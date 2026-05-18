import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useState } from "react";

import Swal from "sweetalert2";

import useAxiosSecure from "../hooks/useAxiosSecure";

import useAuth from "../hooks/useAuth";

const PaymentForm = ({ contest }) => {

  const stripe = useStripe();

  const elements = useElements();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!stripe || !elements) {

      return;

    }

    setLoading(true);

    try {

      // create payment intent
      const res = await axiosSecure.post(
        "/payments/create-payment-intent",
        {
          price: contest.price,
        }
      );

      const clientSecret = res.data.clientSecret;

      const card = elements.getElement(CardElement);

      if (!card) return;

      // create payment method
      const { error } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (error) {

        Swal.fire({
          icon: "error",
          title: error.message,
        });

        setLoading(false);

        return;

      }

      // confirm payment
      const paymentResult =
        await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card,
              billing_details: {
                email: user?.email,
              },
            },
          }
        );

      if (
        paymentResult.paymentIntent.status ===
        "succeeded"
      ) {

        // save payment info
        const paymentData = {

          contestId: contest._id,

          contestName: contest.name,

          participantEmail: user.email,

          price: contest.price,

          transactionId:
            paymentResult.paymentIntent.id,

        };

        await axiosSecure.post(
          "/payments",
          paymentData
        );

        Swal.fire({

          icon: "success",

          title: "Payment Successful",

        });

      }

    } catch (error) {

      Swal.fire({

        icon: "error",

        title: error.message,

      });

    }

    setLoading(false);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <div className="border rounded-xl p-4">

        <CardElement />

      </div>

      <button
        disabled={!stripe || loading}
        className="btn btn-primary w-full"
      >

        {
          loading
            ? "Processing..."
            : `Pay $${contest.price}`
        }

      </button>

    </form>

  );

};

export default PaymentForm;