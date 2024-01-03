"use client";

import { signUp } from "@/app/actions/user/signUp";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setMessage("Signing up...");
    const message = await signUp(email, password, userName);
    setMessage(message);
    router.refresh();
    router.push("/auth/signin");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white">
        <h1 className="text-xl text-center">Sign up</h1>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          className="border border-gray-300 w-full p-1 mb-4 rounded-md"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700 mb-2">
          User Name
        </label>
        <input
          className="border border-gray-300 w-full p-1 mb-4 rounded-md"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          className="border border-gray-300 w-full p-1 mb-4 rounded-md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="block border bg-blue-500
           text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleSubmit}
          >
            Sign up
          </button>
          <Link href={"/auth/signin"}>
            <button
              className="block border bg-red-500
           text-white rounded-md px-4 py-2 ml-auto hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            >
              Cancel
            </button>
          </Link>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SignUpForm;
