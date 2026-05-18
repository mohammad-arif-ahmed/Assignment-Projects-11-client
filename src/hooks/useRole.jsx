import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";

import useAuth from "./useAuth";

const useRole = () => {

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading,
  } = useQuery({

    queryKey: [
      "user-role",
      user?.email,
    ],

    enabled: !!user?.email,

    queryFn: async () => {

      const res = await axiosSecure.get(
        `/users/role/${user.email}`
      );

      return res.data.role;

    },

  });

  return [role, isLoading];

};

export default useRole;