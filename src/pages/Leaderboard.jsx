import { useQuery } from "@tanstack/react-query";

import axios from "axios";

const Leaderboard = () => {

  const {
    data: users = [],
  } = useQuery({

    queryKey: ["leaderboard"],

    queryFn: async () => {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/leaderboard`
      );

      return res.data;

    },

  });

  return (

    <div className="py-10">

      <h2 className="text-5xl font-bold text-center mb-10">

        Leaderboard
      </h2>

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>

              <th>Rank</th>

              <th>User</th>

              <th>Email</th>

              <th>Wins</th>

            </tr>

          </thead>

          <tbody>

            {
              users.map(
                (user, index) => (

                  <tr key={user._id}>

                    <td>

                      🏆 {index + 1}

                    </td>

                    <td>

                      <div className="flex items-center gap-3">

                        <img
                          src={user.photo}
                          alt=""
                          className="w-12 h-12 rounded-full object-cover"
                        />

                        <p className="font-semibold">

                          {user.name}

                        </p>

                      </div>

                    </td>

                    <td>

                      {user.email}

                    </td>

                    <td>

                      <span className="badge badge-success">

                        {user.wins || 0}

                      </span>

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

export default Leaderboard;