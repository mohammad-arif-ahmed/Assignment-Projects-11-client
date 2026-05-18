import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";

import useAuth from "../../hooks/useAuth";

const MyParticipatedContests = () => {

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const {
    data: payments = [],
  } = useQuery({

    queryKey: [
      "participated-contests",
      user?.email,
    ],

    enabled: !!user?.email,

    queryFn: async () => {

      const res = await axiosSecure.get(
       `/payments/my-contests?email=${user.email}`
      );

      return res.data;

    },

  });

  return (

    <div>

      <h2 className="text-4xl font-bold mb-8">

        My Participated Contests
      </h2>

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>

              <th>#</th>

              <th>Contest</th>

              <th>Price</th>

              <th>Transaction</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {
              payments.map(
                (payment, index) => (

                  <tr key={payment._id}>

                    <td>

                      {index + 1}

                    </td>

                    <td>

                      {payment.contestName}

                    </td>

                    <td>

                      ${payment.price}

                    </td>

                    <td>

                      {payment.transactionId}

                    </td>

                    <td>

                      {
                        new Date(
                          payment.paidAt
                        ).toLocaleDateString()
                      }

                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default MyParticipatedContests;