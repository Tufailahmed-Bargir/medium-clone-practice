import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { BACKEND_URL } from "../../config";

type Blog = {
  id: string;
  title: string;
  desc: string;
  publish: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export const blogsState = atom<Blog[]>({
  key: "blogsState",
  default:selector({
    key:"blogSelector",
    get:async()=>{
      const response = await axios.get("http://127.0.0.1:8787/api/v1/blog/blogs", {
        headers: {
          Authorization: localStorage.getItem('token') || ""    
        }
      });
      return response.data.posts
    }
  }),
});

 

export const singleBlogAtom = atomFamily({
  key:'singleBlogAtom',
  default:selectorFamily({
    key:"singleBlogAtomSelector",
    get:(id:string)=> async()=>{
        const response = await axios.get(`${BACKEND_URL}/blog/blog/${id}`,{
          headers:{ 
              Authorization:localStorage.getItem('token')
          }
      });
      return response.data.post
    }
  })
})
 