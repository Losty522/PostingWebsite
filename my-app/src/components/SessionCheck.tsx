//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import authOptions from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import React from "react";
import SignIn from "./SignIn";

export const sessionCheck = async () => {
  console.log("checking session...");

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    console.log("inside");

    return <SignIn />;
  }
  return true;
};
