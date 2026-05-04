import React from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

export default function MyOrder() {
  const { getMyOrder, myorder } = useAuth();

  useEffect(() => {
    if (myorder.length == 0) {
      getMyOrder();
    }
  }, []);
  console.log(myorder);

  return <div>MyOrder</div>;
}
