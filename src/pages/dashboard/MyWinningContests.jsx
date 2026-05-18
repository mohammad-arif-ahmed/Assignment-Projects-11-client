import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";

import useAuth from "../../hooks/useAuth";

const MyWinningContests = () => {

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const {
    data: contests = [],
  } = useQuery({

    queryKey: [
      "winning-contests",
      user?.email,
    ],

    enabled: !!user?.email,

    queryFn: async () => {

      const res = await axiosSecure.get(
        `/contests/winning/${user.email}`
      );

      return res.data;

    },

  });

  return (

    <div>

      <h2 className="text-4xl font-bold mb-8">

        My Winning Contests
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {
          contests.map((contest) => (

            <div
              key={contest._id}
              className="card bg-base-100 shadow-xl"
            >

              <figure>

                <img
                  src={contest.image}
                  alt=""
                  className="h-60 w-full object-cover"
                />

              </figure>

              <div className="card-body">

                <h2 className="card-title">

                  {contest.name}

                </h2>

                <p>

                  Prize Money:
                  <span className="font-bold text-primary ml-2">

                    ${contest.prizeMoney}

                  </span>

                </p>

                <p>

                  Winner:
                  <span className="font-semibold ml-2">

                    {contest.winnerName}

                  </span>

                </p>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

};

export default MyWinningContests;