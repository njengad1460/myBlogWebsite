import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import './App.css'
import MyBlogs from "./pages/MyBlogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";

function App (){
  return (
    <>
    <userContextProvider>
    <Routes>
      <Route exact path = '/' element ={<Home/>}/>
      <Route exact path = '/login' element ={<Login/>}/>
      <Route exact path = '/register' element ={<Register/>}/>
      <Route exact path = '/write' element ={<CreatePost/>}/>
      <Route exact path = '/post/post/:id' element ={<PostDetails/>}/>
      <Route exact path = '/edit/:id' element ={<EditPost/>}/>
      <Route exact path = '/myblogs/:id' element ={<MyBlogs/>}/>
      <Route exact path = '/profile/id' element ={<Profile/>}/>
    </Routes>
    </userContextProvider>
    </>
    
  )
}

export default App;