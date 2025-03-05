// import { BlogCard } from "@/app/Components/BlogCard";
interface BlogCardProps{
    authorname: string;
    title: string;
    desc: string;
    publishedDate: string;
    id: number;
}
 
import { useRecoilStateLoadable} from "recoil";
// import {useGetBlogs} from "../hooks/getBlogs";
import { BlogCard } from "./BlogCard";
 
import Testing from "./Testing";
import { blogsState } from "../stores/atoms/atom";
// import { blogsState } from "../stores/atoms/blog";
 
interface BlogCardProps{
    
        id: number;
        title: string;
        desc: string;
        publish: boolean;
        authorId: string;
        createdAt: string;
        updatedAt: string;
     
}
export default function Blogs() {
    const [blogs] = useRecoilStateLoadable(blogsState)
//    const{  loading} = useGetBlogs()
      if(blogs.state ==='loading'){
        return <Testing />
         
      }
      console.log( blogs.state);
      
      
    return (
        <div className="flex flex-col justify-center items-center">
           
            {blogs.contents.map((data:BlogCardProps)=>{
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
