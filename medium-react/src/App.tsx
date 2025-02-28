import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import SignUpForm from "./components/Signin";
import SignInForm from "./components/Signin";
import BlogPublishForm from "./components/CreateBlog";
import Blogs from "./components/Blogs";
import SingleBlogCard from "./components/SingleBlog";
 

export default function App() {
  return (
    <Router>
      

      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/create" element={<BlogPublishForm />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<SingleBlogCard />} />
       
      </Routes>
    </Router>
  );
}
