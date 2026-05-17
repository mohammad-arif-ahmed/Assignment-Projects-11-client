import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../hooks/useAxiosSecure";

const ContestDetails = () => {

  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const { data: contest = {} } = useQuery({

    queryKey: ["contest-details", id],

    queryFn: async () => {

      const res = await axiosSecure.get(
        `/contests/${id}`
      );

      return res.data;

    },

  });

  const {
    name,
    image,
    description,
    prizeMoney,
    participantsCount,
    contestType,
    deadline,
    taskInstruction,
  } = contest;

  const contestEnded =
    new Date(deadline) < new Date();

  return (

    <div className="py-10">

      <div className="card bg-base-100 shadow-xl">

        <figure>

          <img
            src={image}
            alt={name}
            className="w-full h-[400px] object-cover"
          />

        </figure>

        <div className="card-body">

          <div className="flex flex-wrap gap-3 items-center">

            <div className="badge badge-primary">

              {contestType}

            </div>

            <div className="badge badge-secondary">

              {participantsCount} Joined

            </div>

            <div className="badge badge-accent">

              Prize: ${prizeMoney}

            </div>

          </div>

          <h2 className="text-4xl font-bold mt-4">

            {name}

          </h2>

          <p className="mt-4 text-lg">

            {description}

          </p>

          <div className="mt-6">

            <h3 className="text-2xl font-semibold mb-2">

              Task Instructions

            </h3>

            <p>

              {taskInstruction}

            </p>

          </div>

          <div className="mt-6">

            <h3 className="text-xl font-bold">

              Deadline:
            </h3>

            <p className="text-lg">

              {deadline}
            </p>

          </div>

          <div className="mt-8">

            <button
              disabled={contestEnded}
              className="btn btn-primary"
            >

              {
                contestEnded
                  ? "Contest Ended"
                  : "Register Now"
              }

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ContestDetails;