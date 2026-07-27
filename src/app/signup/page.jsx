"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();


  const handleSignUp = async (e) => {
    e.preventDefault();

    const form = e.target;

    const newUser = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    

    // TODO: Save user to database / Firebase
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error("Error creating user");
      return;
    }

    toast.success("User created successfully!");

    form.reset();
    setShowPassword(false);
    router.push("/login");
  };

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
              <h1 className="text-4xl font-bold">Sign Up</h1>

              <p className="text-gray-500 mt-3">
                Create your account to continue.
              </p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-5">
              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Name
                  </span>
                </label>

                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Email
                  </span>
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Password
                  </span>
                </label>

                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="input input-bordered w-full pr-12"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
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

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-3"
              >
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