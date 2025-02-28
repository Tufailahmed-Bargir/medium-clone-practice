'use client'
import { useForm } from "react-hook-form";
import { SigninSchema, SigninTypes } from "@ahmed_bargir/medium_types_new"; // Update with your login schema
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
 
export default function SignInForm() {
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
    try {
      
      const response = await axios.post('/api/login', data);
      console.log("Response:", response.data);

      // On success, store token and navigate to the dashboard or home
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        setTimeout(()=>{

            navigate("/"); 
        },1000)
      } else {
        toast.error(response.data.msg);
      }
    } catch (error:any) {
      toast.error("Something went wrong!"+error.message);
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
                className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Sign In
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
