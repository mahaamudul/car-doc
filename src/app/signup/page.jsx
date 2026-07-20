"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex items-center py-16">
      <div className="max-w-7xl mx-auto w-full px-4">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

          <div className="hidden lg:flex justify-center">
            <Image
              src="/assets/images/login/login.svg"
              alt="Sign Up"
              width={600}
              height={600}
              priority
            />
          </div>

          {/* Right Side */}

          <div className="border border-gray-200 rounded-2xl shadow-sm p-8 lg:p-12">

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold">
                Sign Up
              </h1>

              <p className="text-gray-500 mt-3">
                Create your account to continue.
              </p>
            </div>

            <form className="space-y-5">

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Name
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Email
                  </span>
                </label>

                <input
                  type="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full"
                />
              </div>

              <div>

                <label className="label">
                  <span className="label-text font-medium">
                    Password
                  </span>
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="input input-bordered w-full pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              <button className="btn btn-primary w-full mt-3">
                Sign Up
              </button>

            </form>

            <div className="divider">OR</div>

            <button className="btn btn-outline w-full">
              Continue with Google
            </button>

            <p className="text-center mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Page;