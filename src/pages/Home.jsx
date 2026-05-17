import { useQuery } from "@tanstack/react-query";

import ContestCard from "../components/ContestCard";

import useAxiosSecure from "../hooks/useAxiosSecure";

const Home = () => {

  const axiosSecure = useAxiosSecure();

  const { data: contests = [] } = useQuery({

    queryKey: ["popular-contests"],

    queryFn: async () => {

      const res = await axiosSecure.get("/contests/popular");

      return res.data;

    },

  });

  return (

    <div>

      {/* hero section */}

      <div className="hero min-h-[70vh] rounded-3xl overflow-hidden mt-10 bg-base-200">

        <div className="hero-content text-center">

          <div className="max-w-2xl">

            <h1 className="text-5xl md:text-7xl font-bold">

              Discover Creative Contests

            </h1>

            <p className="py-6 text-lg">

              Join amazing competitions and win exciting prizes.

            </p>

            <input
              type="text"
              placeholder="Search contests..."
              className="input input-bordered w-full max-w-md"
            />

          </div>

        </div>

      </div>

      {/* popular contests */}

      <div className="mt-20">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold">

            Popular Contests

          </h2>

          <p className="mt-4">

            Most participated contests right now

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

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

    </div>

  );

};

export default Home;