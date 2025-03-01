
// 'use client'
// import { useForm, type SubmitHandler } from "react-hook-form"
// import axios from 'axios'
 
// import { toast, Toaster } from "sonner"
// import { useNavigate } from "react-router-dom"
// import { BACKEND_URL } from "../config"
 
// type BlogFormInputs = {
//   title: string
//   desc: string
// //   authorId: string
// }

// export default function BlogPublishForm() {
//   const redirect = useNavigate()  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<BlogFormInputs>()

// const onSubmit: SubmitHandler<BlogFormInputs> = async (data:BlogFormInputs) => {
//     try {
//       console.log(data)
//     const response = await axios.post(`${BACKEND_URL}/blog/create`, data,{
//         headers:{
//             authorization:localStorage.getItem('token')
//         }
//     })
//     console.log(response.data);
//     if(response.data.success){
//         toast.success("blog created success!")
//         setTimeout(() => {
//             redirect(`/blogs`)
//         }, 1000);
//     }
   
    
//     } catch (error) {
//       // @ts-expect-error error
//       toast.message('error found', error.message)
      
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//         <Toaster richColors position="bottom-right"/>
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <div>
//               <h1 className="text-2xl font-semibold">Publish Your Blog Post</h1>
//             </div>
//             <div className="divide-y divide-gray-200">
//               <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
//               >
//                 <div className="relative">
//                   <input
//                     {...register("title", { required: "Title is required" })}
//                     id="title"
//                     type="text"
//                     className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
//                     placeholder="Blog Title"
//                   />
//                   <label
//                     htmlFor="title"
//                     className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Blog Title
//                   </label>
//                   {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
//                 </div>
//                 <div className="relative">
//                   <textarea
//                     {...register("desc", { required: "Description is required" })}
//                     id="description"
//                     className="peer placeholder-transparent h-32 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 resize-none"
//                     placeholder="Blog Description"
//                   ></textarea>
//                   <label
//                     htmlFor="description"
//                     className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Blog Description
//                   </label>
//                   {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>}
//                 </div>
                
                  
//                 <div className="relative">
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
//                   >
//                     Publish Post
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'
import { useForm, type SubmitHandler } from "react-hook-form"
import axios from 'axios'
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom"
import { useState } from "react" // ✅ Import useState for loading
import { BACKEND_URL } from "../config"

type BlogFormInputs = {
  title: string
  desc: string
}

export default function BlogPublishForm() {
  const redirect = useNavigate()
  const [loading, setLoading] = useState(false) // ✅ Loading state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormInputs>()

  const onSubmit: SubmitHandler<BlogFormInputs> = async (data) => {
    setLoading(true)  
    try {
       
      console.log('data sending is', data, )
      const response = await axios.post(`${BACKEND_URL}/blog/create`, data,{
        headers: {
          Authorization: localStorage.getItem('token')
        },
      })

      console.log('token sending is', localStorage.getItem('token') )
      if (response.data.success) {
        toast.success("Blog created successfully!")
        setTimeout(() => {
          redirect(`/blogs`)
        }, 1000)
      }
    } catch (error) {
      console.error("Error:", error)
      let errorMessage = "Something went wrong!"
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.msg || "Failed to create blog"
      }
      toast.error(errorMessage) // ✅ Corrected error handling
    } finally {
      setLoading(false) // ✅ Stop loading
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Toaster richColors position="bottom-right" />
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Publish Your Blog Post</h1>
            <div className="divide-y divide-gray-200">
              <form onSubmit={handleSubmit(onSubmit)} className="py-8 space-y-4">
                <div className="relative">
                  <input
                    {...register("title", { required: "Title is required" })}
                    id="title"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Blog Title"
                  />
                  <label
                    htmlFor="title"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Blog Title
                  </label>
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div className="relative">
                  <textarea
                    {...register("desc", { required: "Description is required" })}
                    id="description"
                    className="peer placeholder-transparent h-32 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 resize-none"
                    placeholder="Blog Description"
                  ></textarea>
                  <label
                    htmlFor="description"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Blog Description
                  </label>
                  {errors.desc && <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>}
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 w-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center"
                    disabled={loading} // ✅ Disable button when loading
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 border-2 border-t-transparent border-white rounded-full"
                        viewBox="0 0 24 24"
                      ></svg>
                    ) : (
                      "Publish Post"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
