import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { blogsState } from "../stores/atoms/blog";

export function useGetBlogs() {
  const [blogs, setBlogs] = useRecoilState(blogsState)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
     
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8787/api/v1/blog/blogs",{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        });
        console.log('posts are');
        
        console.log(response.data);
        
        setBlogs(response.data.posts);
      } catch (err: any) {
        setError(err.message);
        console.log('error found', err.message);
        
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs(); // Call the async function

  }, []); // Empty dependency array means it runs once when the component mounts

  return { blogs, loading, error };
}


export function useGetSingleBlog({id}:{id:string|undefined}) {
  const [blog, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
     
    const fetchBlogs = async () => {
      try {
        console.log('id recieved is ', id);
        
        const response = await axios.get(`${BACKEND_URL}/blog/blog/${id}`,{
            headers:{ 
                Authorization:localStorage.getItem('token')
            }
        });
        console.log('a single post are');
        
        console.log(response.data);
        
        setBlogs(response.data.post);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs(); // Call the async function

  }, []); // Empty dependency array means it runs once when the component mounts

  return { blog, loading, error };
}


 
