'use client'
import { useForm } from "react-hook-form";
import { SigninSchema, SigninTypes } from "@ahmed_bargir/medium_types_new"; // Update with your login schema
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BACKEND_URL } from "../config";
 
export default function SignInForm() {
  const [loading, setloaing]=useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninTypes>({
    resolver: zodResolver(SigninSchema),
  });

  // Handle form submission
  const onSubmit = async (data: SigninTypes) => {
    setloaing(true)
    try {

      
      const response = await axios.post(`${BACKEND_URL}/user/signin`, data);
      console.log("Response:", response.data);

      // On success, store token and navigate to the dashboard or home
      if (response.data.success) {
        localStorage.setItem("token", response.data.jwt);
        toast.success("Login successful!");
        setTimeout(()=>{

            navigate("/create"); 
        },1000)
      } else {
        toast.error(response.data.msg);
      }
    } catch (error:unknown) {
      // @ts-expect-error error type
      toast.error("Something went wrong!"+error.message);
    }finally{
      setloaing(false)
    }
  };

  return (
    <>
      {/* Toaster Component should be outside the form */}
      <Toaster position="bottom-right" richColors closeButton />

      <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen grid md:grid-cols-2">
        {/* Left side - Sign In form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Login to Your account</h1>
              <p className="text-gray-500">
                Don't have an account?{" "}
                <a href="/signup" className="text-gray-600 hover:underline">
                  Create account
                </a>
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <button
  type="submit"
  className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex justify-center items-center"
  disabled={loading} // Disable button while loading
>
  {loading ? (
    <>
      <svg
        className="animate-spin h-5 w-5 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      Signing up...
    </>
  ) : (
    "Sign in"
  )}
</button>
            </div>
          </div>
        </div>

        {/* Right side - Testimonial */}
        <div className="hidden md:flex items-center justify-center p-8 bg-gray-50">
          <div className="max-w-md space-y-4">
            <blockquote className="text-3xl font-medium">
              "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
            </blockquote>
            <div>
              <cite className="not-italic font-semibold">Jules Winnfield</cite>
              <p className="text-gray-500">CEO, Acme Inc</p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
