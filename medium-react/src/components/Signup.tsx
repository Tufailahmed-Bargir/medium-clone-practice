'use client'
import { useForm } from "react-hook-form";
import { SignupSchema, SignupTypes } from "@ahmed_bargir/medium_types_new";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios'
import { Toaster, toast } from 'sonner';
import process from "node:process";
// import { useNavigate } from "react-router-dom";
 
export default function SignUpForm() {
//    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupTypes>({
    resolver:zodResolver(SignupSchema)
  });

  const onSubmit = async (data: SignupTypes) => {
   const response = await axios.post(process.env.BACKEND_URL``,data)
  

    console.log("Form Data:", data);
    console.log("response:", response.data);
    if(response.data.success){
        localStorage.setItem("token", response.data.token);
      setTimeout(()=>{
          toast.success('user created success')

        },1000)
        // navigate("/login"); 
    }else{
        toast.error(response.data.msg)   
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen grid md:grid-cols-2">
      {/* Left side - Sign up form */}
      <div className="flex items-center justify-center p-8">
      <Toaster position="bottom-right" richColors closeButton/>
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Create an account</h1>
            <p className="text-gray-500">
              Already have an account?{" "}
              <a href="/signin" className="text-gray-600 hover:underline">Login</a>
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register("name", { required: "Username is required" })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
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
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              Sign Up
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
  );
}
