"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialSignIn = () => {
  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };

  

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full"
      >
        <FaGoogle className="text-red-500 text-lg" />
        Continue with Google
      </button>

      
    </div>
  );
};

export default SocialSignIn;