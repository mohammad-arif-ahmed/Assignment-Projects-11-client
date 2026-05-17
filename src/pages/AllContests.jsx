import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import ContestCard from "../components/ContestCard";

import useAxiosSecure from "../hooks/useAxiosSecure";

const AllContests = () => {

  const axiosSecure = useAxiosSecure();

  const [activeTab, setActiveTab] =
    useState("All");

  const { data: contests = [] } = useQuery({

    queryKey: ["all-contests"],

    queryFn: async () => {

      const res = await axiosSecure.get(
        "/contests/approved/all"
      );

      return res.data;

    },

  });

  const contestTypes = [

    "All",

    "Web Development",

    "Cyber Security",

    "Health & Fitness",

    "Education",

    "Music",

  ];

  const filteredContests =
    activeTab === "All"
      ? contests
      : contests.filter(
          contest =>
            contest.contestType === activeTab
        );

  return (

    <div className="py-10">

      <div className="text-center mb-10">

        <h2 className="text-5xl font-bold">

          All Contests

        </h2>

        <p className="mt-4">

          Explore all active contests

        </p>

      </div>

      {/* tabs */}

      <div className="flex flex-wrap justify-center gap-3 mb-10">

        {
          contestTypes.map(type => (

            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={`btn ${
                activeTab === type
                  ? "btn-primary"
                  : "btn-outline"
              }`}
            >

              {type}

            </button>

          ))
        }

      </div>

      {/* contests */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {
          filteredContests.map(contest => (

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

export default AllContests;