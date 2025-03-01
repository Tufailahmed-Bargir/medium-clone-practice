export const BlogSkeleton = () => {
    return (
//   <div role="status" className="animate-pulse">
//       <div className="p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-md cursor-pointer">
//           <div className="flex">
//           <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
//           <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
//           <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
  
//               <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
//                   {/* <Circle /> */}
//               </div>
  
//              <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
//                   <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
//              </div>
//           </div>
  
//           <div className="text-xl font-semibold pt-2">
//               <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
//           </div>
  
//           <div className="text-ms font-thin">
//               <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
//           </div>
  
//           <div className="text-slate-500 text-sm pt-4">
//               <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
//           </div>
  
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>

<div className="p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-md animate-pulse">
<div className="flex items-center">
  <Skeleton className="w-6 h-6 rounded-full bg-gray-300" />
  <Skeleton className="ml-2 h-4 w-24 bg-gray-300" />
  <Skeleton className="ml-2 h-4 w-16 bg-gray-300" />
</div>
<Skeleton className="h-6 w-3/4 mt-3 bg-gray-300" />
<Skeleton className="h-4 w-full mt-2 bg-gray-300" />
<Skeleton className="h-4 w-1/3 mt-4 bg-gray-300" />
</div>
  
    )
  }

  function Skeleton({ className }: { className: string }) {
    return <div className={`rounded-md bg-gray-300 animate-pulse ${className}`} />;
  }
  