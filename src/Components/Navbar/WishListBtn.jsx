import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import React from "react";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router-dom";

const WishListBtn = ({ user }) => {
  const axios = useAxios();
  const email = user?.email;

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wish-list-show", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(`/wishlist-show?email=${email}`);
      return res.data;
    },
  });

  return (
    <Link to="/wishlist" className="relative flex items-center ">
      <button className="p-2.5 hover:cursor-pointer bg-[#1A1A1A] text-white rounded-full hover:bg-black transition-all active:scale-95">
        <Heart size={16} />
      </button>

      {wishlist.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
          {wishlist.length}
        </span>
      )}
    </Link>
  );
};

export default WishListBtn;
