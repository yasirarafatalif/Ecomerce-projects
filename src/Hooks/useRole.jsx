import React from "react";
import useAxios from "./useAxios";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const { data: role =[], isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-roles?email=${user?.email}`);
      return res.data.role;
    },
  });
  return { role, roleLoading };
};

export default useRole;
