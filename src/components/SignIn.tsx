"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SignIn = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    router.push("/auth/signin");
  }, []);

  return null;
};

export default SignIn;
