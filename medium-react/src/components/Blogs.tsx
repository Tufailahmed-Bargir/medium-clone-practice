// import { BlogCard } from "@/app/Components/BlogCard";
interface BlogCardProps{
    authorname: string;
    title: string;
    desc: string;
    publishedDate: string;
    id: number;
}
 
import {useGetBlogs} from "../hooks/getBlogs";
import { BlogCard } from "./BlogCard";
 
import Testing from "./Testing";
 
interface BlogCardProps{
    authorId: string;
    title: string;
    desc: string;
    publish: boolean;
    id: number;
}
export default function Blogs() {
   const{ blogs, loading} = useGetBlogs()
      if(loading){
        return <Testing />
         
      }
      
      
    return (
        <div className="flex flex-col justify-center items-center">
           
            {blogs.map((data:BlogCardProps)=>{
                return <BlogCard 
                title={data.title}
                authorname={data.authorId}
                desc={data.desc}
                id={data.id}
                publishedDate={data.publish}
                />
            })}
 

        </div>
    );
}
