import BlogPost from "./components/FullBlogCard";
import Testing from "./components/Testing";
import { RecoilRoot } from "recoil";
 
import SignUpForm from "./components/Signup";
import SignInForm from "./components/Signin";
import BlogPublishForm from "./components/CreateBlog";
import Blogs from "./components/Blogs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // ✅ Correct import

export default function App() {
  return (
    <RecoilRoot>
      <Router> 
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/create" element={<BlogPublishForm />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/test" element={<Testing />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

function Home() {
  return <div>This is the home page</div>;
}
