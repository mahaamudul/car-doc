"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const response= await signIn("credentials", {
      email,
      password,
      redirect:false
    })
    if(response.status===200){
      router.push("/");
    }

  }

  return (
    <section className="min-h-screen flex items-center py-16">
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div className="hidden lg:flex justify-center">
            <Image
              src="/assets/images/login/login.svg"
              alt="Login"
              width={600}
              height={600}
              priority
            />
          </div>

          {/* Right Side */}
          <div className="border border-gray-200 rounded-2xl shadow-sm p-8 lg:p-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold">Login</h1>

              <p className="text-gray-500 mt-3">
                Welcome back! Login to your account.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>

                <input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium">Password</label>

                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    name="password"
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

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="label cursor-pointer gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                  <span className="label-text">Remember me</span>
                </label>
              </div>

              {/* Login Button */}
              <input type="submit" className="btn btn-primary w-full" value="Login" />
            </form>

            <div className="divider">OR</div>

            <button className="btn btn-outline w-full">
              Continue with Google
            </button>

            <p className="text-center mt-8 text-gray-600">
              New to Car Doctor?{" "}
              <Link
                href="/signup"
                className="text-primary font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;