import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageContests = () => {

  const axiosSecure = useAxiosSecure();

  const {
    data: contests = [],
    refetch,
  } = useQuery({

    queryKey: ["manage-contests"],

    queryFn: async () => {

      const res = await axiosSecure.get(
        "/contests/admin/all"
      );

      return res.data;

    },

  });

  // update status
  const handleStatus = async (
    id,
    status
  ) => {

    const res = await axiosSecure.patch(
      `/contests/status/${id}`,
      { status }
    );

    if (res.data.modifiedCount > 0) {

      Swal.fire({
        icon: "success",
        title: `Contest ${status}`,
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();

    }

  };

  // delete
  const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Delete Contest?",

      icon: "warning",

      showCancelButton: true,

    });

    if (result.isConfirmed) {

      const res = await axiosSecure.delete(
        `/contests/${id}`
      );

      if (res.data.deletedCount > 0) {

        Swal.fire({
          icon: "success",
          title: "Deleted",
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

        Manage Contests

      </h2>

      <div className="overflow-x-auto">

        <table className="table">

          <thead>

            <tr>

              <th>#</th>

              <th>Name</th>

              <th>Status</th>

              <th>Actions</th>

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

                    <td className="space-x-2">

                      <button
                        onClick={() =>
                          handleStatus(
                            contest._id,
                            "approved"
                          )
                        }
                        className="btn btn-success btn-sm"
                      >

                        Approve

                      </button>

                      <button
                        onClick={() =>
                          handleStatus(
                            contest._id,
                            "rejected"
                          )
                        }
                        className="btn btn-warning btn-sm"
                      >

                        Reject

                      </button>

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

export default ManageContests;