import React from "react";
import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import { useQuery} from "@tanstack/react-query";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const axois = useAxios();
  const { user } = useAuth();
  const email = user?.email;

  const { data: cartData = [] } = useQuery({
    queryKey: ["cart-data", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axois.get(`/cart?email=${email}`);
      return res.data;
    },
    
    
  });
  return (
    <CartContext.Provider value={{ cartData }}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
