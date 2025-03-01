import { useParams } from "react-router-dom"
import { useGetSingleBlog } from "../hooks/getBlogs"
import { BlogSkeleton } from "./Skeleton"

 
export default  function BlogPost( ) {
    const {id} = useParams()
    console.log('id which is getting passed is ', id, typeof(id));
    
   const {blog, loading} = useGetSingleBlog({
    id:id||""
   })
   if(loading){
    return <div className="flex justify-center items-center font-bold h-screen">
        <BlogSkeleton />
    </div>
  }

    return (
      <article className="max-w-[900px] mx-auto px-6 py-8">
        <h1 className="text-[2.75rem] font-black leading-tight tracking-tight text-black mb-1">
           {/* {blog?.title} */}
        </h1>
        <h1>id got is {JSON.stringify(blog)}</h1>
  
        <div className="mb-6">
          <p className="text-gray-600 text-[0.9375rem]">Posted on August 24, 2023</p>
        </div>
  
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 text-[1.0625rem] leading-[1.6]">
            {blog?.desc}
          </p>
          <p className="text-gray-600 text-[1.0625rem] leading-[1.6]">
            Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under
            the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop
            Jokester.
          </p>
        
        </div>
  
        <div className="flex justify-between items-start mt-12">
          <div>
            <h2 className="text-[1rem] font-medium text-gray-900 mb-1">Author</h2>
            <div className="flex flex-col">
              <span className="text-[1.125rem] font-medium mb-1">Jokester</span>
              <span className="text-gray-500 text-[0.9375rem] leading-snug">
                Master of mirth, purveyor of puns, and the funniest person in the kingdom.
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>
        </div>
      </article>
    )
  }
  
  