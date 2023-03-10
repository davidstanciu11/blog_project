import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Wishlist from "./pages/Wishlist";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";

function App() {
  
  return (
    <div>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="wishlist" element={<Wishlist/>}/>
          <Route path="/*" element={<h1>Not Found</h1>}/>
        </Routes>
    </div>
  )
}

export default App
