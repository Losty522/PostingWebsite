"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignInForm = () => {
  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setMessage("Signing in...");
    try {
      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!signInResponse || signInResponse.ok !== true) {
        setMessage(
          "Signing in failed, please make sure your password or email is correct"
        );
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
      router.refresh();
    }
  }, [status]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        <div className=" text-xl text-center mb-4">Sign in</div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Sign In
        </button>

        <p className="text-red-500 mb-4">{message}</p>

        <Link href="/auth/signup" className="text-blue-500">
          Create a new account
        </Link>
        <p className="mt-3">
          sample Email: <span className="text-red-500">sample@sample.com</span>
          <br />
          sample Password: <span className="text-red-500">test</span>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
