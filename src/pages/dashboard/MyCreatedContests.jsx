import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";

import useAuth from "../../hooks/useAuth";

const MyCreatedContests = () => {

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const {
    data: contests = [],
    refetch,
  } = useQuery({

    queryKey: [
      "my-created-contests",
      user?.email,
    ],

    enabled: !!user?.email,

    queryFn: async () => {

      const res = await axiosSecure.get(
        `/contests/creator/${user.email}`
      );

      return res.data;

    },

  });

  // delete contest
  const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Are you sure?",

      text: "Contest will be deleted",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes Delete",

    });

    if (result.isConfirmed) {

      const res = await axiosSecure.delete(
        `/contests/${id}`
      );

      if (res.data.deletedCount > 0) {

        Swal.fire({
          icon: "success",
          title: "Contest Deleted",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();

      }

    }

  };

  return (

    <div>

      <h2 className="text-4xl font-bold mb-8">

        My Created Contests
      </h2>

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>

              <th>#</th>

              <th>Contest</th>

              <th>Status</th>

              <th>Participants</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              contests.map(
                (contest, index) => (

                  <tr key={contest._id}>

                    <td>

                      {index + 1}

                    </td>

                    <td>

                      {contest.name}

                    </td>

                    <td>

                      <span className="badge badge-primary">

                        {contest.status}

                      </span>

                    </td>

                    <td>

                      {contest.participantsCount}

                    </td>

                    <td>

                      <button
                        onClick={() =>
                          handleDelete(contest._id)
                        }
                        className="btn btn-error btn-sm"
                      >

                        Delete

                      </button>

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

export default MyCreatedContests;