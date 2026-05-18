import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";

import useAxiosSecure from "../hooks/useAxiosSecure";

import useAuth from "../hooks/useAuth";

const ContestDetails = () => {

  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

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
    _id,
    name,
    image,
    description,
    price,
    prizeMoney,
    participantsCount,
    contestType,
    deadline,
    taskInstruction,
  } = contest;

  const contestEnded =
    new Date(deadline) < new Date();

  // register contest
  const handleRegister = async () => {

    try {

      const paymentData = {

        contestId: _id,

        contestName: name,

        participantEmail: user.email,

        price,

        transactionId:
          "tran_" + Date.now(),

      };

      await axiosSecure.post(
        "/payments",
        paymentData
      );

      Swal.fire({

        icon: "success",

        title: "Contest Registered Successfully",

        timer: 1500,

        showConfirmButton: false,

      });

    } catch (error) {

      Swal.fire({

        icon: "error",

        title: error.message,

      });

    }

  };

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
              onClick={handleRegister}
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