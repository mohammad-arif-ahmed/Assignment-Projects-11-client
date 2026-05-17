import { useQuery } from "@tanstack/react-query";

import axiosSecure from "../api/axiosSecure";

import ContestCard from "./ContestCard";

const PopularContests = () => {

  const { data: contests = [] } = useQuery({

    queryKey: ["popular-contests"],

    queryFn: async () => {

      const res = await axiosSecure.get(
        "/contests/popular"
      );

      return res.data;

    },

  });

  return (

    <div className="py-16">

      <div className="text-center mb-10">

        <h2 className="text-4xl font-bold">

          Popular Contests

        </h2>

        <p className="mt-3">

          Explore the most participated contests

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          contests.map(contest => (

            <ContestCard
              key={contest._id}
              contest={contest}
            />

          ))
        }

      </div>

    </div>

  );

};

export default PopularContests;